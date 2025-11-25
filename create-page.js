/* ======================================================
   FStudio: create-page.js
   Full create page system for FExplorer (FStudio)
   - Simple mode (blocks + buttons + code blocks)
   - Code mode (file manager: create/edit/delete/rename/download)
   - Gamer mode (lightweight page type export)
   - Draft save / preview / publish
   - Integrates with global userCreatedPages & saveAppState()
   Usage: include this file after main.js (or ensure globals exist),
   then call loadFStudio() when opening the creator.
   ====================================================== */

(function () {
  // ---------- Helpers ----------
  function qs(root, sel) { return (root || document).querySelector(sel); }
  function qsa(root, sel) { return (root || document).querySelectorAll(sel); }
  function el(tag, props = {}) {
    const e = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'text') e.textContent = v;
      else if (k === 'html') e.innerHTML = v;
      else e.setAttribute(k, v);
    });
    return e;
  }

  function escapeHtml(text) {
    if (text == null) return '';
    text = String(text);
    return text.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]));
  }

  function uid(len = 6) {
    return Math.random().toString(36).substring(2, 2 + len);
  }

  function genPageId() {
    // keep same style as other pages
    return `fexplorer-${Math.floor(Math.random() * 10000).toString(36)}`;
  }

  // Local storage keys
  const DRAFT_KEY = 'fstudio_draft_v1';
  const FILES_PREFIX = 'fstudio_files_'; // + projectId
  // If main app uses userCreatedPages global, we'll use it. If not, create.
  if (typeof window.userCreatedPages === 'undefined') window.userCreatedPages = {};

  // Default draft structure
  function defaultDraft() {
    return {
      title: '',
      mode: 'simple', // 'simple' | 'code' | 'gamer'
      simpleContent: '', // HTML/text
      simpleElements: [], // array of elements { type:'text'|'button'|'list'|'codeblock', props:{} }
      // code mode stores a "projectId" referencing the file manager
      projectId: null,
      // gamer mode data
      gamerSettings: {
        theme: 'dark',
        objects: [] // { type: 'player'|'enemy'|'coin', x, y, w, h, color }
      }
    };
  }

  // ---------- Storage helpers ----------
  function saveDraft(draft) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }
  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return defaultDraft();
      const parsed = JSON.parse(raw);
      // ensure shape
      return Object.assign(defaultDraft(), parsed);
    } catch (e) {
      console.error('fstudio: loadDraft error', e);
      return defaultDraft();
    }
  }

  // File manager API: store per projectId
  function saveFiles(projectId, filesObj) {
    localStorage.setItem(FILES_PREFIX + projectId, JSON.stringify(filesObj));
  }
  function loadFiles(projectId) {
    try {
      const raw = localStorage.getItem(FILES_PREFIX + projectId);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (e) {
      console.error('fstudio: loadFiles error', e);
      return {};
    }
  }

  // ---------- UI renderers ----------
  // We'll generate a single root container that will be appended inside browserContent
  function loadFStudio() {
    if (!window.browserContent) {
      console.error('fstudio: browserContent not found');
      return;
    }
    // clear existing
    browserContent.innerHTML = '';

    const root = el('div', { id: 'fstudio_root', class: 'fstudio-root' });

    root.innerHTML = `
      <style>
/* ============================================================
   FSTUDIO 1.5 — MODERN UI (FExplorer Integration Style)
   Drop-in replacement for your old <style> block.
============================================================ */

.fstudio-root {
    font-family: inherit;
    padding: 14px;
    color: var(--text-color, #222);
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* -------------------- HEADER -------------------- */
.fstudio-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background: var(--panel-bg, #ffffff);
    padding: 14px 18px;

    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07);
}

.fstudio-title {
    font-size: 20px;
    font-weight: 700;
}

.fstudio-sub {
    font-size: 12px;
    color: var(--text-subtle, #888);
}

.fstudio-mode-buttons {
    display: flex;
    gap: 8px;
}

.fstudio-button {
    background: var(--panel-light, #5d88e5ff);
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.15s;
}
.fstudio-button:hover {
    opacity: 0.85;
}

.fstudio-button.primary {
    background: var(--accent, #2563eb);
    color: #fff;
}

.fstudio-button.primary:hover {
    opacity: 0.85;
}

/* -------------------- MAIN LAYOUT -------------------- */
.fstudio-main {
    display: flex;
    gap: 16px;
    flex: 1;
    min-height: 0;
}

/* LEFT PANEL */
.fstudio-left {
    width: 380px;
    min-width: 260px;
    max-width: 45%;

    background: var(--panel-bg, #ffffff);
    padding: 14px;

    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07);

    overflow-y: auto;
    box-sizing: border-box;
}

/* RIGHT PANEL */
.fstudio-right {
    flex: 1;

    background: var(--panel-bg, #ffffff);
    padding: 16px;

    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07);

    overflow-y: auto;
    box-sizing: border-box;
}

.fstudio-editor-row {
    margin-bottom: 12px;
}

/* Inputs */
.fstudio-input,
.fstudio-textarea {
    width: 100%;
    padding: 10px;
    border-radius: 8px;

    background: var(--input-bg, #fafafa);
    border: 1px solid var(--input-border, #d4d4d4);

    font-size: 14px;
    box-sizing: border-box;
}

/* Textarea */
.fstudio-textarea {
    min-height: 150px;
    font-family: monospace;
    resize: vertical;
    white-space: pre-wrap;
}

/* Element list */
.element-list {
    border: 1px dashed var(--divider-color, #dcdcdc);
    padding: 10px;
    border-radius: 8px;

    max-height: 220px;
    overflow-y: auto;
}

.element-item {
    padding: 6px;
    border-bottom: 1px solid var(--divider-color, #eee);
    display: flex;
    justify-content: space-between;
    gap: 8px;
}

/* Status text */
.small {
    font-size: 12px;
    color: var(--text-subtle, #ffffffff);
}

.status-message {
    margin-top: 8px;
    color: #068806;
    font-weight: 600;
}

/* -------------------- FILE MANAGER -------------------- */
.file-list {
    max-height: 240px;
    overflow-y: auto;
    border: 1px dashed var(--divider-color, #ddd);
    padding: 8px;
    border-radius: 8px;
}

.file-card {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--divider-color, #eee);
}

.file-card button {
    margin-left: 6px;
}

/* -------------------- GAMER MODE -------------------- */
.gamer-canvas {
    width: 100%;
    height: 300px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    font-size: 20px;
}
</style>
      <div class="fstudio-header">
        <div>
          <div class="fstudio-title">FStudio — Page Creator</div>
          <div class="fstudio-sub">Create Simple pages, Code projects (with file manager), or Gamer Mode pages.</div>
        </div>

        <div class="fstudio-mode-buttons">
          <button id="fstudio_btn_home" class="fstudio-button">Home</button>
          <button id="fstudio_btn_preview" class="fstudio-button">Preview</button>
          <button id="fstudio_btn_publish" class="fstudio-button primary">Publish</button>
        </div>
      </div>

      <div class="fstudio-main">
        <div class="fstudio-left">
          <div class="fstudio-editor-row">
            <label class="small">Title</label>
            <input id="fstudio_title" class="fstudio-input" placeholder="Page title...">
          </div>

          <div class="fstudio-editor-row">
            <label class="small">Mode</label>
            <div style="display:flex; gap:8px; margin-top:6px;">
              <button id="mode_simple" class="fstudio-button">Simple</button>
              <button id="mode_code" class="fstudio-button">Code</button>
              <button id="mode_gamer" class="fstudio-button">Gamer</button>
            </div>
          </div>

          <div id="fstudio_simple_area" style="display:none;">
            <div class="fstudio-editor-row">
              <label class="small">Main content (HTML/text)</label>
              <textarea id="fstudio_simple_content" class="fstudio-textarea" placeholder="Write your page content or HTML here..."></textarea>
            </div>

            <div style="margin-bottom:8px;">
              <div style="display:flex; gap:6px; align-items:center;">
                <label class="small" style="margin-right:auto;">Insert Element</label>
                <button id="insert_text" class="fstudio-button">Text</button>
                <button id="insert_button" class="fstudio-button">Button</button>
                <button id="insert_list" class="fstudio-button">List</button>
                <button id="insert_codeblock" class="fstudio-button">Code Block</button>
              </div>
            </div>

            <div class="element-list" id="element_list"></div>
            <div class="status-message" id="simple_save_msg"></div>
            <div style="margin-top:8px;">
              <button id="save_simple_draft" class="home-page-button primary">Save Draft</button>
            </div>
          </div>

          <div id="fstudio_code_area" style="display:none;">
            <div class="fstudio-editor-row">
              <label class="small">Project ID (auto generated for new)</label>
              <div style="display:flex; gap:8px;">
                <input id="code_project_id" class="fstudio-input" placeholder="new or existing project id">
                <button id="create_project" class="fstudio-button">New Project</button>
              </div>
            </div>

            <div class="fstudio-editor-row">
              <label class="small">Files</label>
              <div class="file-list" id="file_list"></div>
            </div>

            <div style="display:flex; gap:8px; margin-top:6px;">
              <input id="new_file_name" class="fstudio-input" placeholder="filename.ext" style="flex:1">
              <button id="create_file_btn" class="fstudio-button">Create</button>
            </div>

            <div class="status-message" id="code_save_msg"></div>
            <div style="margin-top:8px;">
              <button id="save_code_draft" class="home-page-button primary">Save Draft</button>
            </div>
          </div>

          <div id="fstudio_gamer_area" style="display:none;">
            <div class="fstudio-editor-row">
              <label class="small">Gamer Theme</label>
              <select id="gamer_theme" class="fstudio-input">
                <option value="dark">Dark</option>
                <option value="neon">Neon</option>
                <option value="retro">Retro</option>
              </select>
            </div>

            <div class="fstudio-editor-row">
              <label class="small">Objects</label>
              <div style="display:flex; gap:6px; margin-bottom:6px;">
                <select id="gobj_type" class="fstudio-input" style="width:140px;">
                  <option value="player">Player</option>
                  <option value="enemy">Enemy</option>
                  <option value="coin">Coin</option>
                </select>
                <button id="add_gobj" class="home-page-button">Add Object</button>
              </div>
              <div class="element-list" id="gobj_list"></div>
            </div>

            <div style="margin-top:8px;">
              <button id="save_gamer_draft" class="home-page-button primary">Save Draft</button>
            </div>
          </div>
        </div>

        <div class="fstudio-right">
          <div id="fstudio_preview_area">
            <h3>Preview</h3>
            <div id="fstudio_preview_inner" style="border:1px solid #f0f0f0;padding:10px;border-radius:6px;min-height:180px;">
              <p class="small">Preview will appear here...</p>
            </div>
          </div>
        </div>
      </div>
    `;

    browserContent.appendChild(root);

    // load draft into UI
    const draft = loadDraft();
    bindUi(root, draft);
    // initial render preview
    renderPreview(draft);
  }

  // ---------- UI binding & logic ----------
  function bindUi(root, draft) {
    // elements
    const titleInput = qs(root, '#fstudio_title');
    const modeSimpleBtn = qs(root, '#mode_simple');
    const modeCodeBtn = qs(root, '#mode_code');
    const modeGamerBtn = qs(root, '#mode_gamer');
    const simpleArea = qs(root, '#fstudio_simple_area');
    const codeArea = qs(root, '#fstudio_code_area');
    const gamerArea = qs(root, '#fstudio_gamer_area');

    const simpleContent = qs(root, '#fstudio_simple_content');
    const elementList = qs(root, '#element_list');
    const simpleSaveMsg = qs(root, '#simple_save_msg');
    const saveSimpleBtn = qs(root, '#save_simple_draft');

    const projectIdInput = qs(root, '#code_project_id');
    const createProjectBtn = qs(root, '#create_project');
    const fileList = qs(root, '#file_list');
    const newFileName = qs(root, '#new_file_name');
    const createFileBtn = qs(root, '#create_file_btn');
    const codeSaveMsg = qs(root, '#code_save_msg');
    const saveCodeBtn = qs(root, '#save_code_draft');

    const gamerTheme = qs(root, '#gamer_theme');
    const gobjType = qs(root, '#gobj_type');
    const addGobjBtn = qs(root, '#add_gobj');
    const gobjList = qs(root, '#gobj_list');
    const saveGamerBtn = qs(root, '#save_gamer_draft');

    const previewInner = qs(root, '#fstudio_preview_inner');
    const btnPreview = qs(root, '#fstudio_btn_preview');
    const btnPublish = qs(root, '#fstudio_btn_publish');
    const btnHome = qs(root, '#fstudio_btn_home');

    // initialize values from draft
    titleInput.value = draft.title || '';
    simpleContent.value = draft.simpleContent || '';
    projectIdInput.value = draft.projectId || '';
    gamerTheme.value = draft.gamerSettings?.theme || 'dark';

    // mode switching
    function showMode(mode) {
      simpleArea.style.display = (mode === 'simple') ? 'block' : 'none';
      codeArea.style.display = (mode === 'code') ? 'block' : 'none';
      gamerArea.style.display = (mode === 'gamer') ? 'block' : 'none';
      draft.mode = mode;
      saveDraft(draft);
      renderPreview(draft);
    }

    modeSimpleBtn.addEventListener('click', () => showMode('simple'));
    modeCodeBtn.addEventListener('click', () => showMode('code'));
    modeGamerBtn.addEventListener('click', () => showMode('gamer'));

    // pick initial mode display
    showMode(draft.mode || 'simple');

    // ---------- Simple Mode: element insertion & list ----------
    function renderElementList() {
      elementList.innerHTML = '';
      draft.simpleElements = draft.simpleElements || [];
      draft.simpleElements.forEach((elObj, idx) => {
        const item = el('div', { class: 'element-item' });
        item.innerHTML = `<div><strong>${escapeHtml(elObj.type)}</strong> ${elObj.type === 'codeblock' ? '<span class="small">[code]</span>' : ''}</div>
                          <div>
                            <button class="fstudio-button small edit-el" data-i="${idx}">Edit</button>
                            <button class="fstudio-button small remove-el" data-i="${idx}">Del</button>
                          </div>`;
        elementList.appendChild(item);
      });

      // attach
      qsa(elementList, '.edit-el').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const i = btn.dataset.i * 1;
          openEditElementDialog(i);
        });
      });
      qsa(elementList, '.remove-el').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const i = btn.dataset.i * 1;
          draft.simpleElements.splice(i, 1);
          saveDraft(draft);
          renderElementList();
          renderPreview(draft);
        });
      });
    }

    function openEditElementDialog(index) {
      const item = draft.simpleElements[index];
      if (!item) return;
      // simple prompt-based editor (quick)
      if (item.type === 'text') {
        const newText = window.prompt('Edit text HTML/content:', item.props.html || '');
        if (newText !== null) {
          item.props.html = newText;
          saveDraft(draft);
          renderElementList();
          renderPreview(draft);
        }
      } else if (item.type === 'button') {
        const newText = window.prompt('Button text:', item.props.text || 'Click');
        const newUrl = window.prompt('Button URL (fexplorer:... or http...):', item.props.url || '');
        if (newText !== null) {
          item.props.text = newText;
          item.props.url = newUrl || '';
          saveDraft(draft);
          renderElementList();
          renderPreview(draft);
        }
      } else if (item.type === 'list') {
        const lines = (item.props.items || []).join('\n');
        const newVal = window.prompt('List items (one per line):', lines);
        if (newVal !== null) {
          item.props.items = newVal.split('\n').map(l => l.trim()).filter(Boolean);
          saveDraft(draft);
          renderElementList();
          renderPreview(draft);
        }
      } else if (item.type === 'codeblock') {
        // code block editor
        const newHTML = window.prompt('HTML:', item.props.html || '');
        const newCSS = window.prompt('CSS (optional):', item.props.css || '');
        const newJS = window.prompt('JS (optional):', item.props.js || '');
        if (newHTML !== null) {
          item.props.html = newHTML;
          item.props.css = newCSS || '';
          item.props.js = newJS || '';
          saveDraft(draft);
          renderElementList();
          renderPreview(draft);
        }
      }
    }

    qs(root, '#insert_text').addEventListener('click', () => {
      draft.simpleElements.push({ type: 'text', props: { html: '<p>New text</p>' } });
      saveDraft(draft);
      renderElementList();
      renderPreview(draft);
    });
    qs(root, '#insert_button').addEventListener('click', () => {
      draft.simpleElements.push({ type: 'button', props: { text: 'Click me', url: '' } });
      saveDraft(draft);
      renderElementList();
      renderPreview(draft);
    });
    qs(root, '#insert_list').addEventListener('click', () => {
      draft.simpleElements.push({ type: 'list', props: { items: ['Item 1', 'Item 2'] } });
      saveDraft(draft);
      renderElementList();
      renderPreview(draft);
    });
    qs(root, '#insert_codeblock').addEventListener('click', () => {
      draft.simpleElements.push({ type: 'codeblock', props: { html: '<div>Code block</div>', css: '', js: '' } });
      saveDraft(draft);
      renderElementList();
      renderPreview(draft);
    });

    // save simple draft
    saveSimpleBtn.addEventListener('click', () => {
      draft.title = titleInput.value.trim();
      draft.simpleContent = simpleContent.value;
      saveDraft(draft);
      simpleSaveMsg.textContent = 'Draft saved.';
      setTimeout(() => simpleSaveMsg.textContent = '', 1800);
    });

    // render initial elements
    renderElementList();

    // ---------- Code Mode: file manager ----------
    function renderFileListForProject(projectId) {
      fileList.innerHTML = '';
      if (!projectId) {
        fileList.innerHTML = '<div class="small">No project selected.</div>';
        return;
      }
      const files = loadFiles(projectId) || {};
      const keys = Object.keys(files);
      if (!keys.length) {
        fileList.innerHTML = '<div class="small">No files yet in this project.</div>';
        return;
      }
      keys.forEach(fname => {
        const f = files[fname];
        const card = el('div', { class: 'file-card' });
        card.innerHTML = `
          <div style="flex:1">
            <strong>${escapeHtml(fname)}</strong>
            <div class="small">${(f.size || (String(f.content || '').length))} bytes</div>
          </div>
          <div>
            <button class="home-page-button small file-open" data-name="${escapeHtml(fname)}">Open</button>
            <button class="home-page-button small file-download" data-name="${escapeHtml(fname)}">DL</button>
            <button class="home-page-button small file-delete" data-name="${escapeHtml(fname)}">Del</button>
          </div>
        `;
        fileList.appendChild(card);
      });

      // attach handlers
      qsa(fileList, '.file-open').forEach(b => {
        b.addEventListener('click', () => {
          const name = b.dataset.name;
          openFileEditor(projectId, name);
        });
      });
      qsa(fileList, '.file-download').forEach(b => {
        b.addEventListener('click', () => {
          const name = b.dataset.name;
          downloadFile(projectId, name);
        });
      });
      qsa(fileList, '.file-delete').forEach(b => {
        b.addEventListener('click', () => {
          const name = b.dataset.name;
          if (confirm(`Delete file "${name}"?`)) {
            const files = loadFiles(projectId);
            delete files[name];
            saveFiles(projectId, files);
            renderFileListForProject(projectId);
          }
        });
      });
    }

    createProjectBtn.addEventListener('click', () => {
      const newId = uid(8);
      projectIdInput.value = newId;
      // initialize blank files
      saveFiles(newId, {
        'index.html': { content: '<!doctype html><h1>Hello from FStudio</h1>', size: 0 },
        'style.css': { content: 'body{font-family:Arial}', size: 0 }
      });
      renderFileListForProject(newId);
      codeSaveMsg.textContent = `Project created: ${newId}`;
      draft.projectId = newId;
      saveDraft(draft);
      setTimeout(() => codeSaveMsg.textContent = '', 1800);
    });

    createFileBtn.addEventListener('click', () => {
      const projectId = projectIdInput.value.trim();
      if (!projectId) { codeSaveMsg.textContent = 'Set a project ID first.'; return; }
      const fname = newFileName.value.trim();
      if (!fname) { codeSaveMsg.textContent = 'Enter filename.'; return; }
      const files = loadFiles(projectId);
      if (files[fname]) {
        codeSaveMsg.textContent = 'File exists.';
        return;
      }
      files[fname] = { content: '', size: 0 };
      saveFiles(projectId, files);
      newFileName.value = '';
      renderFileListForProject(projectId);
      draft.projectId = projectId;
      saveDraft(draft);
      codeSaveMsg.textContent = 'File created.';
      setTimeout(() => codeSaveMsg.textContent = '', 1600);
    });

    // open file editor (quick modal via prompt; for advanced, replace with real modal)
    function openFileEditor(projectId, fname) {
      const files = loadFiles(projectId);
      if (!files[fname]) { alert('File not found'); return; }
      const current = files[fname].content || '';
      const newContent = window.prompt(`Editing ${fname} (will replace entire content). Use \\n for newlines.`, current);
      if (newContent === null) return;
      files[fname].content = String(newContent);
      files[fname].size = files[fname].content.length;
      saveFiles(projectId, files);
      renderFileListForProject(projectId);
      codeSaveMsg.textContent = `${fname} saved.`;
      setTimeout(() => codeSaveMsg.textContent = '', 1400);
    }

    function downloadFile(projectId, fname) {
      const files = loadFiles(projectId);
      const file = files[fname];
      if (!file) return;
      const blob = new Blob([file.content || ''], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fname;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    // saving code draft stores the selected projectId in draft and persists files
    saveCodeBtn.addEventListener('click', () => {
      const projectId = projectIdInput.value.trim();
      if (!projectId) { codeSaveMsg.textContent = 'Set project ID or create new.'; return; }
      draft.projectId = projectId;
      saveDraft(draft);
      codeSaveMsg.textContent = 'Draft saved.';
      setTimeout(() => codeSaveMsg.textContent = '', 1200);
    });

    // initialize file list (if project id present)
    if (projectIdInput.value) renderFileListForProject(projectIdInput.value);

    // ---------- Gamer Mode ----------
    function renderGamerObjects() {
      gobjList.innerHTML = '';
      (draft.gamerSettings.objects || []).forEach((o, i) => {
        const r = el('div', { class: 'element-item' });
        r.innerHTML = `<div><strong>${escapeHtml(o.type)}</strong> x:${o.x} y:${o.y}</div><div>
          <button class="fstudio-button edit-gobj" data-i="${i}">Edit</button>
          <button class="home-page-button small del-gobj" data-i="${i}">Del</button>
        </div>`;
        gobjList.appendChild(r);
      });
      qsa(gobjList, '.edit-gobj').forEach(b => {
        b.addEventListener('click', () => {
          const idx = b.dataset.i * 1;
          const obj = draft.gamerSettings.objects[idx];
          const newX = prompt('x:', obj.x); if (newX === null) return;
          const newY = prompt('y:', obj.y); if (newY === null) return;
          obj.x = Number(newX) || obj.x;
          obj.y = Number(newY) || obj.y;
          saveDraft(draft);
          renderGamerObjects();
          renderPreview(draft);
        });
      });
      qsa(gobjList, '.del-gobj').forEach(b => {
        b.addEventListener('click', () => {
          const idx = b.dataset.i * 1;
          draft.gamerSettings.objects.splice(idx, 1);
          saveDraft(draft);
          renderGamerObjects();
          renderPreview(draft);
        });
      });
    }

    addGobjBtn.addEventListener('click', () => {
      const t = gobjType.value;
      const obj = { type: t, x: 10 + Math.floor(Math.random() * 160), y: 10 + Math.floor(Math.random() * 80), w: 24, h: 24, color: '#ffcc00' };
      draft.gamerSettings.objects = draft.gamerSettings.objects || [];
      draft.gamerSettings.objects.push(obj);
      saveDraft(draft);
      renderGamerObjects();
      renderPreview(draft);
    });

    saveGamerBtn.addEventListener('click', () => {
      draft.gamerSettings.theme = gamerTheme.value;
      saveDraft(draft);
      qs(root, '#code_save_msg').textContent = 'Gamer draft saved.';
      setTimeout(() => qs(root, '#code_save_msg').textContent = '', 1200);
    });

    // ---------- Preview & Publish ----------
    function buildSimpleHtml(d) {
      // compose simple content + elements
      let body = d.simpleContent || '';
      (d.simpleElements || []).forEach(elObj => {
        if (elObj.type === 'text') body += '\n' + (elObj.props.html || '');
        if (elObj.type === 'button') {
          const text = escapeHtml(elObj.props.text || 'Click');
          const url = escapeHtml(elObj.props.url || '#');
          body += `\n<button onclick="location.href='${url}'">${text}</button>`;
        }
        if (elObj.type === 'list') {
          body += '<ul>';
          (elObj.props.items || []).forEach(it => body += `<li>${escapeHtml(it)}</li>`);
          body += '</ul>';
        }
        if (elObj.type === 'codeblock') {
          // inject CSS and JS inside block with sandboxing by scoping to a wrapper id
          const id = 'cb_' + uid(6);
          body += `<div id="${id}">${elObj.props.html || ''}</div>`;
          if (elObj.props.css) body += `<style>#${id}{ }${elObj.props.css}</style>`;
          if (elObj.props.js) {
            // wrap in try/catch
            body += `<script>try{(function(){${elObj.props.js}})()}catch(e){console.error('codeblock error',e)}</script>`;
          }
        }
      });
      return `<!doctype html><html><head><meta charset="utf-8"></head><body>${body}</body></html>`;
    }

    function buildCodeProjectHtml(projectId) {
      const files = loadFiles(projectId);
      // prefer index.html, otherwise first .html file
      const index = files['index.html'] ? 'index.html' : Object.keys(files).find(n => n.endsWith('.html')) || Object.keys(files)[0];
      if (!index) return '<div>No files in project.</div>';
      const htmlContent = files[index].content || '';
      // collect css files
      let cssString = '';
      Object.keys(files).forEach(n => {
        if (n.endsWith('.css')) cssString += '\n/* ' + n + ' */\n' + (files[n].content || '');
      });
      // collect js files
      let jsString = '';
      Object.keys(files).forEach(n => {
        if (n.endsWith('.js')) jsString += '\n/* ' + n + ' */\n' + (files[n].content || '');
      });
      // build wrapper: inject css into head, js at end
      return `<!doctype html><html><head><meta charset="utf-8"><style>${cssString}</style></head><body>${htmlContent}<script>${jsString}</script></body></html>`;
    }

    function buildGamerHtml(d) {
      // a minimal "game" page based on objects in d.gamerSettings.objects
      const objs = d.gamerSettings.objects || [];
      const theme = d.gamerSettings.theme || 'dark';
      // produce JS that creates divs for objects and simple gravity/collision demo
      const js = `
        (function(){
          const root = document.getElementById('fstudio_game_root');
          if(!root) return;
          root.innerHTML = '';
          ${objs.map((o, i) => `
            const el${i} = document.createElement('div');
            el${i}.className = 'gobj ${o.type}';
            el${i}.style.left='${o.x}px'; el${i}.style.top='${o.y}px';
            el${i}.style.width='${o.w}px'; el${i}.style.height='${o.h}px';
            el${i}.style.background='${o.color}';
            el${i}.textContent='${o.type[0].toUpperCase()}';
            root.appendChild(el${i});
          `).join('\n')}
          // very lightweight "game loop" that animates enemies left-right
          let ticks=0;
          setInterval(()=> {
            ticks++;
            const enemies = document.querySelectorAll('#fstudio_game_root .enemy');
            enemies.forEach((en, idx)=>{
              const x = parseFloat(en.style.left)||0;
              en.style.left = (x + (Math.sin((ticks+idx)/10)*2)) + 'px';
            });
          }, 60);
        })();
      `;
      const css = `
        body{margin:0;font-family:Arial;background:${theme==='neon'?'#050':'#111'};color:#fff}
        #fstudio_game_root{position:relative;height:320px;background:${theme==='retro'? '#f0f0f0':'#111'};overflow:hidden}
        #fstudio_game_root .gobj{position:absolute;display:flex;align-items:center;justify-content:center;color:#000;border-radius:4px}
        #fstudio_game_root .player{background:#0f0;color:#000}
        #fstudio_game_root .enemy{background:#f00;color:#fff}
        #fstudio_game_root .coin{background:#ff0;color:#000}
      `;
      const html = `<div id="fstudio_game_root" style="height:320px;"></div>`;
      return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;
    }

    function renderPreview(draft) {
      previewInner.innerHTML = '<div class="small">Rendering preview...</div>';
      setTimeout(() => {
        if (draft.mode === 'simple') {
          previewInner.innerHTML = buildSimpleHtml(draft);
        } else if (draft.mode === 'code') {
          if (!draft.projectId) previewInner.innerHTML = '<div class="small">No project selected.</div>';
          else previewInner.innerHTML = buildCodeProjectHtml(draft.projectId);
        } else if (draft.mode === 'gamer') {
          previewInner.innerHTML = buildGamerHtml(draft);
        }
      }, 50);
    }

    // live updates
    titleInput.addEventListener('input', () => { draft.title = titleInput.value; saveDraft(draft); });
    simpleContent.addEventListener('input', () => { draft.simpleContent = simpleContent.value; saveDraft(draft); renderPreview(draft); });

    // preview and publish handlers
    btnPreview.addEventListener('click', () => {
      // store a preview snapshot into localStorage used by your main navigate preview
      const snapshot = Object.assign({}, draft);
      // If code mode, we snapshot the project files too (not strictly necessary)
      if (draft.mode === 'code' && draft.projectId) snapshot.projectFiles = loadFiles(draft.projectId);
      localStorage.setItem('fexplorerPreviewDraft', JSON.stringify(snapshot));
      // if you have a navigate function: use it to go to fexplorer:preview
      if (typeof navigate === 'function') navigate('fexplorer:preview');
      else alert('Preview saved to localStorage (fexplorerPreviewDraft). Use FExplorer preview route to view.');
    });

    btnHome.addEventListener('click', () => {
      if (typeof navigate === 'function') navigate('fexplorer:home');
      else alert('navigate() not found.');
    });

    btnPublish.addEventListener('click', () => {
      // validate
      if (!titleInput.value.trim()) return alert('Enter a title before publishing.');
      // create page object
      const pageId = genPageId();
      const pageObj = {
        id: pageId,
        title: titleInput.value.trim(),
        creationMode: (draft.mode === 'code') ? 'code' : (draft.mode === 'gamer' ? 'code' : 'simple'),
        simpleContent: draft.simpleContent || '',
        simpleButtons: [], // legacy: if you want buttons, convert elements
        buttons: [], // used by getPublishedUserPageHTML if simple; not necessary
        htmlCode: '',
        cssCode: '',
        jsCode: '',
        createdAt: Date.now()
      };

      if (draft.mode === 'simple') {
        // convert simple draft to page HTML
        pageObj.creationMode = 'simple';
        pageObj.content = draft.simpleContent || '';
        // append simpleElements rendering into pageObj.content
        (draft.simpleElements || []).forEach(elObj => {
          if (elObj.type === 'text') pageObj.content += '\n' + (elObj.props.html || '');
          if (elObj.type === 'button') {
            const t = escapeHtml(elObj.props.text || 'Click');
            const u = escapeHtml(elObj.props.url || '');
            pageObj.content += `\n<button onclick="location.href='${u}'">${t}</button>`;
          }
          if (elObj.type === 'list') {
            pageObj.content += '<ul>';
            (elObj.props.items || []).forEach(i => pageObj.content += `<li>${escapeHtml(i)}</li>`);
            pageObj.content += '</ul>';
          }
          if (elObj.type === 'codeblock') {
            pageObj.content += (elObj.props.html || '');
            if (elObj.props.css) pageObj.content += `<style>${elObj.props.css}</style>`;
            if (elObj.props.js) pageObj.content += `<script>try{${elObj.props.js}}catch(e){console.error('user codeblock',e)}</script>`;
          }
        });
      } else if (draft.mode === 'code') {
        // pack files into html/css/js fields (index + concatenation)
        pageObj.creationMode = 'code';
        pageObj.projectId = draft.projectId || (function(){const newId = uid(8); draft.projectId=newId; saveDraft(draft); return newId;})();
        const files = loadFiles(pageObj.projectId);
        // put raw files into pageObj for retrieval by navigate() or whatever
        pageObj.files = files;
        // create an HTML wrapper for fast preview
        pageObj.htmlCode = buildCodeProjectHtml(pageObj.projectId);
      } else if (draft.mode === 'gamer') {
        pageObj.creationMode = 'code';
        // gamer pages are code-mode: build full html
        pageObj.htmlCode = buildGamerHtml(draft);
      }

      // store into global userCreatedPages (main app expects key fexplorer-xxxx)
      userCreatedPages[pageId] = pageObj;
      // add to randomWebsiteUrls if you use that mechanic
      if (Array.isArray(window.randomWebsiteUrls)) {
        const pageUrl = `fexplorer:user-page-${pageId}`;
        if (!window.randomWebsiteUrls.includes(pageUrl)) window.randomWebsiteUrls.push(pageUrl);
      }

      // persist to main app storage
      if (typeof saveAppState === 'function') saveAppState();
      else localStorage.setItem('userCreatedPages', JSON.stringify(userCreatedPages));

      // navigate to new page
      if (typeof navigate === 'function') {
        navigate(`fexplorer:user-page-${pageId}`);
      } else {
        alert('Published (saved to localStorage). No navigate() function found to open the page.');
      }
    });

    // render initial gamer objects
    renderGamerObjects();

    // expose small API for external calls (optional)
    if (!window.FStudio) window.FStudio = {};
    window.FStudio.saveDraft = () => saveDraft(draft);
    window.FStudio.getDraft = () => draft;

    // sync initial preview
    renderPreview(draft);

    // expose a function to refresh file list if another script changes files
    window.FStudio.refreshFileList = () => {
      renderFileListForProject(projectIdInput.value.trim());
    };
  }

  // expose loader
  window.loadFStudio = loadFStudio;

  // auto-run if current url is create route and navigate is present
  try {
    if (typeof currentUrl !== 'undefined' && currentUrl && currentUrl.startsWith('fexplorer:create')) {
      // if the app called navigate and directly placed content somewhere, this ensures FStudio loads
      setTimeout(() => { if (typeof loadFStudio === 'function') loadFStudio(); }, 50);
    }
  } catch (e) {}
})();
