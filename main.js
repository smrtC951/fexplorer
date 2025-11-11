// =============================
// OS Window Style Switching
// =============================
function updateWindowStyle(osValue) {
    const frame = document.querySelector('.browser-frame');
    const controls = frame.querySelector('.browser-buttons');
    if (!frame || !controls) return;

    frame.classList.remove('window-mac', 'window-win11', 'window-win7', 'window-win8', 'window-winxp', 'window-macx', 'window-mac9', 'window-classic');
    controls.classList.remove('left', 'right');

    // Update navigation button images based on OS theme
    const backBtn = document.querySelector('#backButton img');
    const forwardBtn = document.querySelector('#forwardButton img');
    const homeBtn = document.querySelector('#homeButton img');
    const createBtn = document.querySelector('#createPageButton img');
    const infoBtn = document.querySelector('#informationButton img');

    switch (osValue) {
        case 'win11':
            frame.classList.add('window-win11');
            controls.classList.add('right'); // Windows-style: buttons on right
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            break;
        case 'win7':
            frame.classList.add('window-win7');
            controls.classList.add('right'); // Windows-style: buttons on right
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            break;
        case 'win8':
            frame.classList.add('window-win8');
            controls.classList.add('right'); // Windows-style: buttons on right
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            break;
        case 'winxp':
            frame.classList.add('window-winxp');
            controls.classList.add('right'); // Windows-style: buttons on right
            if (backBtn) backBtn.src = 'icons/xp-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/xp-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/xp-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/xp-info-icon.png';
            break;
        case 'macx':
            frame.classList.add('window-macx');
            controls.classList.add('left');
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            break;
        case 'mac9':
            frame.classList.add('window-mac9');
            controls.classList.add('left');
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            break;
        case 'classic':
            frame.classList.add('window-classic');
            controls.classList.add('left');
            if (backBtn) backBtn.src = 'icons/back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/info-icon.png';
            break;
        case 'default':
        default:
            frame.classList.add('window-mac');
            controls.classList.add('left'); // macOS-style: buttons on left
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            break;
    }
}


// Apply saved OS style on load
updateWindowStyle(localStorage.getItem('fexplorerSettingOS') || 'default');

// =============================
// Settings Logic
// =============================
function saveSettings() {
    try {
        const osSelect = browserContent.querySelector('#osSelect');
        const themeSelect = browserContent.querySelector('#themeSelect');
        const searchEngineSelect = browserContent.querySelector('#searchEngineSelect');
        const notificationsToggle = browserContent.querySelector('#notificationsToggle');
        const loginToggle = browserContent.querySelector('#loginToggle');
        const settingsStatus = browserContent.querySelector('#settingsStatus');

        if (osSelect) {
            localStorage.setItem('fexplorerSettingOS', osSelect.value);
            updateWindowStyle(osSelect.value);
        }
        if (themeSelect) {
            localStorage.setItem('fexplorerSettingTheme', themeSelect.value);
            if (themeSelect.value === 'Dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
        if (searchEngineSelect) {
            localStorage.setItem('fexplorerSearchEngine', searchEngineSelect.value);
        }
        if (notificationsToggle) {
            localStorage.setItem('fexplorerSettingNotifications', notificationsToggle.checked ? 'true' : 'false');
        }
        if (loginToggle) {
            localStorage.setItem('fexplorerSettingHideLogin', loginToggle.checked ? 'true' : 'false');
            // Update login message based on toggle state
            const loginMessageElement = document.querySelector('.login-message');
            if (loginMessageElement) {
                loginMessageElement.style.display = loginToggle.checked ? 'none' : 'block';
            }
        }

        if (settingsStatus) settingsStatus.textContent = 'Settings saved!';
    } catch (e) {
        console.error("Error saving settings", e);
    }
}

function resetSettings() {
    localStorage.removeItem('fexplorerSettingOS');
    localStorage.removeItem('fexplorerSettingTheme');
    localStorage.removeItem('fexplorerSearchEngine');
    localStorage.removeItem('fexplorerSettingNotifications');
    localStorage.removeItem('fexplorerSettingHideLogin');

    updateWindowStyle('default');
    document.body.classList.remove('dark-mode');
    
    // Show login message when settings are reset
    const loginMessageElement = document.querySelector('.login-message');
    if (loginMessageElement) {
        loginMessageElement.style.display = 'block';
    }

    const osSelect = browserContent.querySelector('#osSelect');
    const themeSelect = browserContent.querySelector('#themeSelect');
    const searchEngineSelect = browserContent.querySelector('#searchEngineSelect');
    const notificationsToggle = browserContent.querySelector('#notificationsToggle');
    const loginToggle = browserContent.querySelector('#loginToggle');
    const settingsStatus = browserContent.querySelector('#settingsStatus');

    if (osSelect) osSelect.value = 'default';
    if (themeSelect) themeSelect.value = 'Light';
    if (searchEngineSelect) searchEngineSelect.value = 'FExplorer Browser';
    if (notificationsToggle) notificationsToggle.checked = false;
    if (loginToggle) loginToggle.checked = false;
    if (settingsStatus) settingsStatus.textContent = 'Settings reset to default.';
}

function attachSettingsListeners() {
    const saveSettingsBtn = browserContent.querySelector('#saveSettingsBtn');
    const resetSettingsBtn = browserContent.querySelector('#resetSettingsBtn');

    if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
    if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);
}

// Apply saved theme on load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('fexplorerSettingTheme');
    if (savedTheme === 'Dark') {
        document.body.classList.add('dark-mode');
    }
    // Apply saved navigation icon
    try {
        updateNavIcon();
    } catch (e) {
        // updateNavIcon may be defined later in the file; ignore if not yet available
    }
    // Initialize create-page draft data and wire modal listeners
    try {
        initializeDraftPage();
        attachCreatePageListeners();
    } catch (e) {
        console.warn('Create page initialization skipped or failed', e);
    }
});

// =============================
// Global Elements
// =============================

    // On page load, apply saved OS style
    updateWindowStyle(localStorage.getItem('fexplorerSettingOS') || 'default');
const addressBar = document.getElementById('addressBar');
const goButton = document.getElementById('goButton');
const browserContent = document.getElementById('browserContent');
const backButton = document.getElementById('backButton');
const homeButton = document.getElementById('homeButton');
const settingsButton = document.getElementById('settingsButton');
const fpointsCounter = document.getElementById('fpointsCounter');
const cookiesCounter = document.getElementById('cookiesCounter');

const SETTINGS_URL = 'fexplorer:settings';
const HOME_URL = 'fexplorer:home';
const CREATE_PAGE_URL = 'fexplorer:create';
const PROGRAMS_URL = 'fexplorer:programs';
const COOKIE_URL = 'fexplorer:cookies';
const ACHIEVE_URL = 'fexplorer:achievements';
const SHOP_URL = 'fexplorer:shop';
const WIKI_URL = 'fexplorer:wiki';
const TERMINAL_URL = 'file:terminal';
const AI_URL = 'fexplorer:ai';
const EVENTS_URL = 'fexplorer:events';
const LOGIN_URL = 'fexplorer:placeholder';

const GOOG_COOLDOWN = 10000;
const DAILY_BONUS_COOLDOWN = 5 * 60 * 1000;
const BASE_DAILY_BONUS = 70;
const STOCK_UPDATE_INTERVAL = 10 * 1000;
const INITIAL_STOCK_PRICE = 100;
const RANDOM_USER_PAGE_AMOUNT = 5; // Base FPoints for visiting random user pages
const USER_PAGE_COOLDOWN = 60 * 1000; // 1 minute cooldown for FPoints from user pages
const RANDOM_PAGE_COOLDOWN = 60 * 1000; // 1 minute cooldown for FPoints from random pages
let lastRandomPageVisitTime = 0; // Timestamp of last random user page visit

let historyStack = [];
let currentUrl = '';

const uploadableVideosPool = [
];

const DEFAULT_MY_TUBE_VIDEOS_INITIAL = {
};

let myTubeVideos;
try {
    myTubeVideos = JSON.parse(localStorage.getItem('myTubeVideos')) || {};
    // OS window style switching logic
    function updateWindowStyle(osValue) {
        const frame = document.querySelector('.browser-frame');
        if (!frame) return;
        frame.classList.remove('window-mac', 'window-win11', 'window-win7', 'window-win8', 'window-winxp', 'window-macx', 'window-mac9', 'window-classic');
        switch (osValue) {
            case 'win11':
                frame.classList.add('window-win11');
                break;
            case 'win7':
                frame.classList.add('window-win7');
                break;
            case 'win8':
                frame.classList.add('window-win8');
                break;
            case 'winxp':
                frame.classList.add('window-winxp');
                break;
            case 'macx':
                frame.classList.add('window-macx');
                break;
            case 'mac9':
                frame.classList.add('window-mac9');
                break;
            case 'classic':
                frame.classList.add('window-classic');
                break;
            case 'default':
            default:
                frame.classList.add('window-mac');
                break;
        }
    }

    // On page load, apply saved OS style
    updateWindowStyle(localStorage.getItem('fexplorerSettingOS') || 'default');

} catch (e) {
    console.error("Failed to parse myTubeVideos from localStorage, using default.", e);
    myTubeVideos = {};
}
Object.keys(DEFAULT_MY_TUBE_VIDEOS_INITIAL).forEach(videoId => {
    if (!myTubeVideos[videoId]) {
        myTubeVideos[videoId] = DEFAULT_MY_TUBE_VIDEOS_INITIAL[videoId];
    }
});

let userChannel;
try {
    userChannel = JSON.parse(localStorage.getItem('userChannel')) || {
        name: null,
        subscribers: 0,
        uploadedVideoIds: [],
        ownedItems: {},
        activeTheme: 'default',
        equippedCosmetics: {},
        inventory: {
            items: {},      // Stores item data including state
            themes: {},     // Stores theme data and preferences
            cosmetics: {}   // Stores cosmetic states
        },
        stockOwned: 0,
        chatHistory: {}
    };
} catch (e) {
    console.error("Failed to parse userChannel from localStorage, using default.", e);
    userChannel = { // Fallback to a clean default if parsing fails
        name: null,
        subscribers: 0,
        uploadedVideoIds: [],
        ownedItems: {},
        activeTheme: 'default',
        equippedCosmetics: {},
        inventory: {
            items: {},
            themes: {},
            cosmetics: {}
        },
        stockOwned: 0,
        chatHistory: {}
    };
}

// Ensure all inventory structures exist
userChannel.ownedItems = userChannel.ownedItems || {};
userChannel.activeTheme = userChannel.activeTheme || 'default';
userChannel.equippedCosmetics = userChannel.equippedCosmetics || {};
userChannel.inventory = userChannel.inventory || {
    items: {},
    themes: {},
    cosmetics: {}
};

let instantgramsPosts = [];
let headbookPosts = [];
let FPOINTS_PER_LIKE = 1;
let aiPostTimer = null;

function generateAIInstantGramsCommentOrLike(postId, isUserPost) {
    // ...original logic...
}
function generateAIInstantGramsPost() {
    // ...original logic...
}
function handleAddHeadbookPost() {
    // ...original logic...
}
function handleAddHeadbookComment() {
    // ...original logic...
}
function handleSendMessage(contactName, chatInput) {
                updateWindowStyle('default');
    // ...original logic...
}

// ...existing code...
userChannel.stockOwned = userChannel.stockOwned || 0;

let userCookies = parseInt(localStorage.getItem('userCookies') || '0', 10);
let userFPoints = parseInt(localStorage.getItem('userFPoints') || '0', 10);
let userLuck = parseInt(localStorage.getItem('userLuck') || '0', 10);
let lastFinancialVisit = parseInt(localStorage.getItem('lastFinancialVisit') || '0', 10);
let lastGoogSearchTime = parseInt(localStorage.getItem('lastGoogSearchTime') || '0', 10);

let stockPrice = parseFloat(localStorage.getItem('stockPrice') || INITIAL_STOCK_PRICE.toString());
let lastStockUpdate = parseInt(localStorage.getItem('lastStockUpdate') || Date.now().toString(), 10);

let codeUnlocked = false;
let check500Cookies = false;

let informationStatus = 'Safe';

// New global variable for user-created pages
let userCreatedPages;
try {
    userCreatedPages = JSON.parse(localStorage.getItem('userCreatedPages')) || {};
} catch (e) {
    console.error("Failed to parse userCreatedPages from localStorage, using default.", e);
    userCreatedPages = {};
}

// Global variable to hold the current page being drafted
let draftPage = null; // Initialize to null or default empty structure

function initializeDraftPage() {
    draftPage = {
        title: '',
        creationMode: 'simple', // 'simple' or 'code'
        simpleContent: '', // For simple text/HTML
        simpleButtons: [], // For simple buttons { text, url }
        htmlCode: '<!-- Your HTML content here -->\n<h1>My Custom Page</h1>\n<p>This page was made with code! Try clicking the button.</p>\n<button id="myButton">Click Me</button>',
        cssCode: 'body { font-family: sans-serif; background-color: #e6ffe6; text-align: center; padding: 20px; }\nh1 { color: #28a745; }\n#myButton { background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; border: none; cursor: pointer; }',
        jsCode: 'document.getElementById("myButton").addEventListener("click", () => {\n  alert("Hello from JavaScript!");\n});',
    };
    try {
        const storedDraft = localStorage.getItem('draftPage');
        if (storedDraft) {
            const parsedDraft = JSON.parse(storedDraft);
            // Basic validation to ensure parsed data is an object and has expected properties
            if (typeof parsedDraft === 'object' && parsedDraft !== null) {
                // Merge loaded data, retaining defaults for new properties if not present
                Object.assign(draftPage, parsedDraft);
                // Ensure array properties exist even if empty
                draftPage.simpleButtons = draftPage.simpleButtons || [];
            }
        }
    } catch (e) {
        console.error("Failed to parse draftPage from localStorage, starting fresh.", e);
        // draftPage remains default empty object
    }
}

function saveDraftPage() {
    localStorage.setItem('draftPage', JSON.stringify(draftPage));
}

// -----------------------------
// Create Page Modal / Drafting
// -----------------------------

function openCreateModal() {
    const modal = document.getElementById('createModal');
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    renderDraftToForm();
}

function closeCreateModal() {
    const modal = document.getElementById('createModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

function switchCreateMode(mode) {
    const simple = document.getElementById('simpleMode');
    const code = document.getElementById('codeMode');
    const tabs = document.querySelectorAll('.create-tabs .tab');
    tabs.forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
    if (mode === 'code') {
        if (simple) simple.style.display = 'none';
        if (code) code.style.display = 'block';
        draftPage.creationMode = 'code';
    } else {
        if (simple) simple.style.display = 'block';
        if (code) code.style.display = 'none';
        draftPage.creationMode = 'simple';
    }
    saveDraftPage();
}

function updateDraftFromForm() {
    if (!draftPage) initializeDraftPage();
    const titleEl = document.getElementById('createTitle');
    const simpleContentEl = document.getElementById('createSimpleContent');
    const simpleButtonsEl = document.getElementById('createSimpleButtons');
    const htmlEl = document.getElementById('createHtmlCode');
    const cssEl = document.getElementById('createCssCode');
    const jsEl = document.getElementById('createJsCode');

    if (titleEl) draftPage.title = titleEl.value.trim();
    if (simpleContentEl) draftPage.simpleContent = simpleContentEl.value;
    if (simpleButtonsEl) {
        // parse simple buttons as lines of Label|URL
        const lines = simpleButtonsEl.value.split('\n').map(l => l.trim()).filter(Boolean);
        draftPage.simpleButtons = lines.map(l => {
            const parts = l.split('|');
            return { text: parts[0].trim(), url: (parts[1]||'').trim() };
        });
    }
    if (htmlEl) draftPage.htmlCode = htmlEl.value;
    if (cssEl) draftPage.cssCode = cssEl.value;
    if (jsEl) draftPage.jsCode = jsEl.value;

    saveDraftPage();
}

function renderDraftToForm() {
    if (!draftPage) initializeDraftPage();
    const titleEl = document.getElementById('createTitle');
    const simpleContentEl = document.getElementById('createSimpleContent');
    const simpleButtonsEl = document.getElementById('createSimpleButtons');
    const htmlEl = document.getElementById('createHtmlCode');
    const cssEl = document.getElementById('createCssCode');
    const jsEl = document.getElementById('createJsCode');

    if (titleEl) titleEl.value = draftPage.title || '';
    if (simpleContentEl) simpleContentEl.value = draftPage.simpleContent || '';
    if (simpleButtonsEl) {
        simpleButtonsEl.value = (draftPage.simpleButtons || []).map(b => `${b.text}|${b.url}`).join('\n');
    }
    if (htmlEl) htmlEl.value = draftPage.htmlCode || '';
    if (cssEl) cssEl.value = draftPage.cssCode || '';
    if (jsEl) jsEl.value = draftPage.jsCode || '';
}

function buildPreviewHtml() {
    updateDraftFromForm();
    let html = '';
    if (draftPage.creationMode === 'code') {
        html = `${draftPage.htmlCode || ''}`;
        // inject CSS and JS
        html = `<!doctype html><html><head><meta charset="utf-8"><style>${draftPage.cssCode || ''}</style></head><body>${html}
<script>${draftPage.jsCode || ''}</script></body></html>`;
    } else {
        // simple mode: wrap simpleContent and add buttons
        const buttonsHtml = (draftPage.simpleButtons || []).map(b => `<p><a href="${escapeHtml(b.url)}">${escapeHtml(b.text)}</a></p>`).join('');
        html = `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial, sans-serif;padding:18px;}</style></head><body><h1>${escapeHtml(draftPage.title || '')}</h1><div>${draftPage.simpleContent || ''}</div>${buttonsHtml}</body></html>`;
    }
    return html;
}

function previewDraft() {
    try {
        const iframe = document.getElementById('createPreviewFrame');
        if (!iframe) return;
        const content = buildPreviewHtml();
        // Use srcdoc for inline preview; fallback to writing into iframe if not supported
        try {
            iframe.srcdoc = content;
        } catch (e) {
            const doc = iframe.contentWindow.document;
            doc.open(); doc.write(content); doc.close();
        }
    } catch (e) {
        console.error('Preview failed', e);
    }
}

function publishDraft() {
    updateDraftFromForm();
    if (!draftPage.title || draftPage.title.trim() === '') {
        alert('Please enter a title before publishing.');
        return;
    }
    // create unique id (format: fexplorer-xxxx)
    const pageId = `fexplorer-${Math.floor(Math.random() * 10000).toString(36)}`;
    const pageObj = {
        id: pageId,
        title: draftPage.title,
        mode: draftPage.creationMode || 'simple',
        simpleContent: draftPage.simpleContent || '',
        simpleButtons: draftPage.simpleButtons || [],
        htmlCode: draftPage.htmlCode || '',
        cssCode: draftPage.cssCode || '',
        jsCode: draftPage.jsCode || '',
        createdAt: Date.now()
    };
    userCreatedPages[pageId] = pageObj;
    // add to random pool if needed
    const pageUrl = `fexplorer:user-page-${pageId}`;
    if (!randomWebsiteUrls.includes(pageUrl)) randomWebsiteUrls.push(pageUrl);
    saveAppState();
    closeCreateModal();
    // navigate to the new page (if app routing supports it)
    if (addressBar) addressBar.value = pageUrl;
    if (goButton) goButton.click();
    
    // Check for page creation achievements
    checkRelevantAchievements('page_create');
    
    alert('Page published! It may appear in random pages and is accessible via the address bar.');
}

function attachCreatePageListeners() {
    // open modal buttons
    const createBtn = document.getElementById('createPageButton');
    if (createBtn) createBtn.addEventListener('click', (e) => { e.preventDefault(); openCreateModal(); });
    const dropdownCreate = document.getElementById('dropdown2');
    if (dropdownCreate) dropdownCreate.addEventListener('click', (e) => { e.preventDefault(); openCreateModal(); });

    // modal controls
    const closeBtn = document.getElementById('closeCreateModal');
    if (closeBtn) closeBtn.addEventListener('click', closeCreateModal);
    const cancelBtn = document.getElementById('cancelCreateBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', closeCreateModal);
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) previewBtn.addEventListener('click', (e) => { e.preventDefault(); previewDraft(); });
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (saveDraftBtn) saveDraftBtn.addEventListener('click', (e) => { e.preventDefault(); updateDraftFromForm(); alert('Draft saved.'); });
    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) publishBtn.addEventListener('click', (e) => { e.preventDefault(); publishDraft(); });

    // mode tabs
    const tabs = document.querySelectorAll('.create-tabs .tab');
    tabs.forEach(t => t.addEventListener('click', () => switchCreateMode(t.dataset.mode)));

    // live-update draft when typing
    ['createTitle','createSimpleContent','createSimpleButtons','createHtmlCode','createCssCode','createJsCode'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', () => {
            // debounce not necessary for simple app
            updateDraftFromForm();
        });
    });
}

// Helper to escape HTML to prevent breaking the layout when inserting user input
function escapeHtml(text) {
    if (typeof text !== 'string') {
        text = String(text);
    }
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Inventory and Theme Management
function applyTheme(themeId) {
    const theme = userChannel.inventory.themes[themeId];
    if (!theme) return false;

    // Clear any existing JX1DX1 annoyance first
    if (typeof stopJx1dx1Annoyance === 'function') {
        stopJx1dx1Annoyance();
    }

    // Remove all theme classes first
    document.body.classList.remove('window-mac', 'window-win11', 'window-win7', 'window-macx', 'window-mac9', 'window-classic', 'window-win8', 'window-winxp');
    
    // Remove any overlay classes that start with 'theme-'
    Array.from(document.body.classList).forEach(cls => {
        if (cls.startsWith('theme-')) document.body.classList.remove(cls);
    });
    
    // Apply base theme
    if (theme.settings.baseTheme) {
        document.body.classList.add(`window-${theme.settings.baseTheme}`);
    }
    
    // Apply theme overlay if any
    if (theme.settings.overlay) {
        document.body.classList.add(`theme-${theme.settings.overlay}`);
    }

    // Update active theme
    userChannel.activeTheme = themeId;
    theme.active = true;

    // Start JX1DX1 annoyance if this is the JX1DX1 theme
    if (themeId === 'jx1dx1_theme' && typeof jx1dx1Annoyance === 'function') {
        jx1dx1Annoyance();
    }

    if (themeId === 'fexplorer_assistant' && typeof fexplorerAssistant === 'function') {
        fexplorerAssistant();
    }
    
    return true;
}

function toggleCosmetic(cosmeticId, shouldEquip = true) {
    const cosmetic = userChannel.inventory.cosmetics[cosmeticId];
    if (!cosmetic) return false;

    if (shouldEquip) {
        // Unequip any conflicting cosmetics of the same type
        Object.entries(userChannel.inventory.cosmetics).forEach(([id, item]) => {
            if (item.type === cosmetic.type && id !== cosmeticId) {
                item.equipped = false;
            }
        });
        
        cosmetic.equipped = true;
        userChannel.equippedCosmetics[cosmetic.type] = cosmeticId;
    } else {
        cosmetic.equipped = false;
        delete userChannel.equippedCosmetics[cosmetic.type];
    }
    
    return true;
}

function useInventoryItem(itemId) {
    const item = userChannel.inventory.items[itemId];
    if (!item || item.used) return false;

    switch(item.type) {
        case 'luck_modifier':
            userLuck += item.value;
            break;
        case 'mystery':
            // Mystery items are one-time use
            item.used = true;
            break;
        // Add more item types as needed
    }
    
    return true;
}

function saveAppState() {
    // Save core game state
    localStorage.setItem('userFPoints', userFPoints.toString());
    localStorage.setItem('userCookies', userCookies.toString());
    localStorage.setItem('userLuck', userLuck.toString());
    localStorage.setItem('lastFinancialVisit', lastFinancialVisit.toString());
    localStorage.setItem('lastGoogSearchTime', lastGoogSearchTime.toString());
    localStorage.setItem('stockPrice', stockPrice.toFixed(2));
    localStorage.setItem('lastStockUpdate', lastStockUpdate.toString());
    
    // Save user content and achievements
    localStorage.setItem('userCreatedPages', JSON.stringify(userCreatedPages));
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    
    // Save inventory state
    localStorage.setItem('userChannel', JSON.stringify(userChannel));
    
    saveDraftPage();
    updateFPointsDisplay();
    
    // Check for achievements after state changes
    checkRelevantAchievements();
}

// FExplorer Event Log
const fexplorerEvents = [
  {
    name: "Placeholder Event",
    date: "2025-11-08",
    desc: "Placeholder text",
    reward: 100
  },
];

const shopItems = [
    { id: 'luck_boost_1', name: 'Minor Luck Charm', description: 'Slightly increases FPoint earnings from Goog!', cost: 500, effect: { luck: 0.1 }, icon: 'icons/goog-logo.png' },
    { id: 'luck_boost_2', name: 'Major Luck Amulet', description: 'Significantly increases FPoint earnings from Goog!', cost: 750, effect: { luck: 0.3 }, icon: 'icons/goog-logo.png' },
    { id: 'mystery_box', name: 'Mystery Box', description: 'Contains a random cool item!', cost: 1000, effect: { mystery: true }, icon: 'icons/placeholder.png' },
    { id: 'golden_hat', name: 'Golden Browser Hat', description: 'A stylish cosmetic hat for your FExplorer browser icon.', cost: 5000, effect: { cosmetic: 'golden_hat' }, icon: 'icons/sandbox-icon.png' },
    { id: 'fexplorer_assistant', name: 'FExplorer Assistant', description: 'Gain a new friend - FExplorer Assistant!', cost: 1250, effect: { cosmetic: 'fexplorer_assistant' }, icon: 'icons/AI-logo.png' },
    { id: 'unluck_boost_1', name: 'Unlucky Charm', description: 'Decreases your luck slightly!', cost: 500, effect: { luck: -0.1 }, icon: 'icons/ONEMOREGAME!.jpg' },
    { id: 'more_user_luck', name: 'More User Luck', description: 'Decreases chance of dangerous user pages!', cost: 3000, effect: { luck: 0.75 }, icon: 'icons/fexplorer.png' },
    { id: 'halloween_theme', name: 'Halloween Theme', description: 'Receive a halloween theme!', cost: 666, effect: { cosmetic: 'halloween_theme' }, icon: 'icons/halloween-icon.png' },
    { id: 'win95_theme', name: 'Windows 95 Theme', description: 'Receive an old-school theme!', cost: 950, effect: { cosmetic: 'win95_theme' }, icon: 'icons/solitaire-icon.png' },
    { id: 'jx1dx1_theme', name: 'JX1DX1 Theme', description: 'BUY.ME.IF.YOU.DARE.', cost: 2008, effect: { cosmetic: 'jx1dx1_theme' }, icon: 'icons/jx1dx1.jpg' },
    { id: 'dynablocks_theme', name: 'Dynablocks Theme', description: 'Classic Roblox for the win!', cost: 2005, effect: { cosmetic: 'dynablocks_theme' }, icon: 'icons/dynablocks-icon.png'},
    { id: 'ie_title', name: 'Famous Internet Explorer title', description: 'Allows you to get the world famous Internet Explorer title!', cost: 1995, effect: { cosmetic: 'ie_title' }, icon: 'icons/fexplorer.png' }
];

// Achievement System
let unlockedAchievements = {};
try {
    unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements')) || {};
} catch (e) {
    console.error('Failed to load achievements, starting fresh', e);
    unlockedAchievements = {};
}

const achievementItems = [
    {
        id: 'first_joined',
        name: 'Welcome to FExplorer!',
        description: 'Visit FExplorer for the first time!',
        awards: [{ type: 'fpoints', amount: 10 }],
        checkUnlock: () => true // Auto-unlock on first visit
    },
    {
        id: '1000_fpoints',
        name: 'Big bucks',
        description: 'Get your first 1000 FPoints',
        awards: [{ type: 'fpoints', amount: 500 }],
        checkUnlock: () => userFPoints >= 1000
    },
    {
        id: '10k_fpoints',
        name: 'Extremely rich',
        description: 'Get 10,000 FPoints. Wow!',
        awards: [{ type: 'fpoints', amount: 1000 }],
        checkUnlock: () => userFPoints >= 10000
    },
    {
        id: '100k_fpoints',
        name: 'Do you even touch grass?',
        description: 'Get 100,000 FPoints. You either really like this browser or you just want this badge.',
        awards: [{ type: 'fpoints', amount: 10000 }],
        checkUnlock: () => userFPoints >= 100000
    },
    {
        id: '10x_luck',
        name: 'Luckiest Being Alive',
        description: 'Have a really high amount of Luck on your browser.',
        awards: [{ type: 'luck', amount: 0.5 }],
        checkUnlock: () => userLuck >= 10
    },
    {
        id: 'negative_luck',
        name: 'Unlucky Being',
        description: 'Get at least -5x Luck on your browser.',
        awards: [{ type: 'luck', amount: 0.1 }],
        checkUnlock: () => userLuck <= -5
    },
    {
        id: 'first_user_page',
        name: 'Content Creator',
        description: 'Create and publish your first user page!',
        awards: [{ type: 'fpoints', amount: 50 }],
        checkUnlock: () => Object.keys(userCreatedPages).length > 0
    },
    {
        id: 'shopaholic',
        name: 'Shopaholic',
        description: 'Purchase 5 items from the FExplorer Shop.',
        awards: [{ type: 'fpoints', amount: 200 }],
        checkUnlock: () => Object.keys(userChannel.ownedItems).length >= 5
    },
    {
        id: 'dangerous_page',
        name: 'Curiosity Killed the Cat',
        description: 'Visit every dangerous user page.',
        awards: [{ type: 'fpoints', amount: 666 }, { type: 'cosmetic', id: 'dangerous_page' }],
        checkUnlock: () => false // TODO: Add dangerous page tracking
    },
    {
        id: '100_user_page_visit',
        name: 'This guy does not shower!',
        description: 'Visited 100 random user pages.',
        awards: [{ type: 'fpoints', amount: 2000 }, { type: 'cosmetic', id: '100_user_page_visit' }],
        checkUnlock: () => false // TODO: Add page visit tracking
    },
    {
        id: 'jx1dx1_badge',
        name: 'congratulations.i.guess.',
        description: 'Did what JX1DX1 told you to do. <br> bmljZS5iYWRnZS5icm8u',
        awards: [{ type: 'fpoints', amount: 2008 }, { type: 'cosmetic', id: 'jx1dx1_badge' }],
        checkUnlock: () => false // TODO: Add tracking for visiting paranoid.com/jx1dx1
    },
    {
        id: 'code_badge',
        name: 'code_badge',
        description: 'Placed in all the codes, you sweat.',
        awards: [{ type: 'fpoints', amount: 2010 }, { type: 'cosmetic', id: 'binary_theme' }],
        checkUnlock: () => CodeUnlocked = true
    },
    {
        id: '5000_cookies',
        name: 'THE Cookie Clicker',
        description: 'Get to 5000 Cookies on Cookie Clicker.',
        awards: [{ type: 'fpoints', amount: 5000 }],
        checkUnlock: () => check500Cookies = true
    },
    {
        id: 'roblox_collector',
        name: 'Roblox Collector',
        description: 'Find and collect 5 Roblox-themed items around the browser.',
        awards: [{ type: 'fpoints', amount: 2006 }, { type: 'cosmetic', id: 'roblox_theme' }],
        checkUnlock: () => false // uhhh i forgot
    }
];

// Achievement Functions
function checkAchievements() {
    let anyUnlocked = false;
    achievementItems.forEach(achievement => {
        if (!unlockedAchievements[achievement.id] && achievement.checkUnlock()) {
            unlockAchievement(achievement);
            anyUnlocked = true;
        }
    });
    return anyUnlocked;
}

function unlockAchievement(achievement) {
    if (unlockedAchievements[achievement.id]) return;

    // Mark as unlocked and save
    unlockedAchievements[achievement.id] = {
        unlockedAt: Date.now(),
        awarded: true
    };
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));

    // Grant rewards
    achievement.awards.forEach(award => {
        switch(award.type) {
            case 'fpoints':
                userFPoints += award.amount;
                break;
            case 'luck':
                userLuck += award.amount;
                break;
            case 'cosmetic':
                if (!userChannel.ownedItems) userChannel.ownedItems = {};
                userChannel.ownedItems[award.id] = true;
                break;
        }
    });

    // Save changes and show notification
    saveAppState();
    showAchievementNotification(achievement);
}

// Binary Theme
function binaryTheme() {
    if (userChannel.ownedItems[award.id] === 'binary_theme') {

    }
};

// JX1DX1 being a fuckass if you have his theme
// This basically makes him annoying and puts alerts everytime you visit a page
// He also puts out special messages on other pages.
let jx1dx1AnnoyanceInterval = null;
let jx1dx1GlitchTimeout = null;

function stopJx1dx1Annoyance() {
    if (jx1dx1AnnoyanceInterval) {
        clearInterval(jx1dx1AnnoyanceInterval);
        jx1dx1AnnoyanceInterval = null;
    }
    if (jx1dx1GlitchTimeout) {
        clearTimeout(jx1dx1GlitchTimeout);
        jx1dx1GlitchTimeout = null;
    }
    // Clear any active glitch effects
    document.body.style.filter = '';
}

function stopfexplorerAssistant() {
    if (fexplorerAssistantInterval) {
        clearInterval(fexplorerAssistantInterval);
        fexplorerAssistantInterval = null;
    }
}

function fexplorerAssistant() {
    if (userChannel.activeTheme === 'fexplorer_assistant') {
        setTimeout(() => {
            if (userChannel.activeTheme === 'fexplorer_assistant') {
                const messages = [];
                
                if (currentUrl === 'fexplorer:home') {
                    messages.push('I see you like the home page!');
                    messages.push("There are many cool things to do!");
                    messages.push("Start searching! Wait that sounds disturbing.");
                }
                
                if (messages.length > 0) {
                    alert(messages[Math.floor(Math.random() * messages.length)]);
                }
            } else {
                stopfexplorerAssistant();
            }
        }, 1000);
    }
}

function jx1dx1Annoyance() {
    // Clear any existing interval first
    stopJx1dx1Annoyance();
    
    if (userChannel.activeTheme === 'jx1dx1_theme') {
        // Initial visit message for specific pages
        setTimeout(() => {
            if (userChannel.activeTheme === 'jx1dx1_theme') {
                const messages = [];
                
                if (currentUrl === 'fexplorer:home') {
                    messages.push('hello.friend. welcome.to.my.domain...');
                    messages.push("welcome.back.to.my.domain...");
                    messages.push("i.see.you.like.the.home.page. bahahahahaha.");
                } else if (currentUrl === 'fexplorer:shop') {
                    messages.push('ah.yes.the.shop. buy.something.interesting...');
                    messages.push('welcome.to.the.shop.i.guess.');
                } else if (currentUrl && currentUrl.startsWith('fexplorer:user-page-')) {
                    messages.push('visiting.user.pages? how.curious...');
                    messages.push("visiting.user.pages.is.a.risky.move...");
                    messages.push("do.you.really.trust.these.pages?");
                    messages.push("I.do.have.to.say.some.pages.have.different.variants... interesting...");
                    messages.push("I.think.these.pages.run.on.classic.html.not.html5. how.stupid.");
                } else if (currentUrl === 'paranoid.com/jx1dx1' || currentUrl === 'paranoid.com' || currentUrl === 'paranoid.com/error.html') {
                    messages.push("welcome.home...");
                    messages.push("i.knew.you'd.come.back...");
                    messages.push("your.loyalty.will.be.rewarded...");
                    messages.push("apples.will.grant.your.loyalty...");
                } else if (currentUrl === 'fexplorer:games') {
                    messages.push('ahh.yes. games.');
                    messages.push('some.of.these.games.are.fun.');
                } else if (currentUrl === 'fexplorer:games/cookie-clicker') {
                    messages.push('fun.fact.("cookies.are.broken.in.this.browser.") i.suggest.you.to.not.grind.for.it.');
                    messages.push('i.heard.you.can.get.an.achievement.');
                    messages.push('the.number.5000.is.crucial.in.cookie.clicker. not.all.but.this.one.');
                } else if (currentUrl === 'fexplorer:wiki') {
                    messages.push("who.even.reads.this.anyways? nerds?");
                    messages.push("wall.of.information.");
                } else if (currentUrl === 'fexplorer:quick-links') {
                    messages.push("theres.a.ton.of.pages.to.choose.from. which.one.will.you.choose?");
                    messages.push("very.delicous.pages.");
                } else if (currentUrl === 'black-market.net') {
                    messages.push('hey.i.wouldn\'t.buy.anything.here.if.i.were.you.');
                    messages.push('you.should.buy.at.the.official.shop.instead.');
                } else if (currentUrl === 'paranoid.com/code.html') {
                    messages.push('find.the.codes.scattered.across.the.web.');
                    messages.push('find.them.and.give.them.to.me.');
                } else if (currentUrl.startsWith('goog.com/search?q=') || (currentUrl.startsWith('ping.com/search?q=')) || currentUrl === 'goog.com' || currentUrl === 'ping.com') {
                    messages.push('searching.the.web.eh? baahahahahhahahaha.');
                    messages.push('i.see.that.you\'re.searching.the.internet. what.are.you.searching?');
                    messages.push('which.one.is.better? goog.or.ping? don\'t.say.fexplorer.search.');
                } else if (currentUrl === 'fexplorer:search') {
                    messages.push('don\'t.search.here. it\'s.very.broken.');
                } else if (currentUrl === `goog.com/search?q=jx1dx1`) {
                    messages.push('hey.that\'s.me.');
                    messages.push('you.could\'ve.searched.("paranoid").instead.but.whatever.');
                };
                
                if (messages.length > 0) {
                    alert(messages[Math.floor(Math.random() * messages.length)]);
                }
            } else {
                stopJx1dx1Annoyance();
            }
        }, 1000);

        // Visual glitch effect for specific pages
        if (currentUrl && (currentUrl === 'fexplorer:home' || currentUrl === 'fexplorer:shop' || currentUrl.startsWith('fexplorer:user-page-') || currentUrl === 'paranoid.com/jx1dx1' || currentUrl === 'paranoid.com/error.html')) {
            jx1dx1AnnoyanceInterval = setInterval(() => {
                if (userChannel.activeTheme !== 'jx1dx1_theme') {
                    stopJx1dx1Annoyance();
                    return;
                }

                // Add default messages
                messages.push("the.clock.is.ticking...");
                messages.push("you.can't.escape.jx1dx1...");
                messages.push("i.am.always.watching...");
                messages.push("apples.");
                messages.push("bahahahahhaahaahhaahhahaha.");
                messages.push("crazy.story.but.i.got.forsakened. bahahahaha.");
                messages.push("bahahahahahahahahahaha.");
                messages.push("i\'d.have.to.torture.you.if.you.logged.in.as.('i.has.a.face.lulz').");

                // Pick a random message and show it
                const message = messages[Math.floor(Math.random() * messages.length)];
                setTimeout(() => {
                    // Double-check theme is still active
                    if (userChannel.activeTheme === 'jx1dx1_theme') {
                        alert(message);
                    }
                }, Math.random() * 1000);

                // Visual glitch effect (30% chance)
                if (Math.random() < 0.3) {
                    document.body.style.filter = 'invert(100%)';
                    jx1dx1GlitchTimeout = setTimeout(() => {
                        if (document.body.style.filter === 'invert(100%)') {
                            document.body.style.filter = '';
                        }
                    }, 100);
                }
            }, 30000); // Every 30 seconds
        }
    }
}
// JX1DX1 achievement tracking
function trackJX1DX1Achievement() {
    const currentUrl = window.location.href;    
    if (currentUrl === 'paranoid.com/error.html') {
        if (userChannel.activeTheme === 'jx1dx1_theme') {
            unlockAchievement(achievementItems.find(a => a.id === 'jx1dx1_badge'));
        }
    }
}

// Achievement Notification (Alerts the user)
function showAchievementNotification(achievement) {
    alert(`Achievement Unlocked: ${achievement.name}\n\n${achievement.description}`);
    alert(`You have been awarded:\n` + achievement.awards.map(award => {
        switch(award.type) {
            case 'fpoints':
                return `${award.amount} FPoints`;
            case 'luck':
                return `${award.amount}x Luck`;
            case 'cosmetic':
                return `Cosmetic: ${award.id}`;
            default:
                return '';
        }
    }).join('\n'));
}

// Check achievements after relevant actions
function checkRelevantAchievements(context) {
    switch(context) {
        case 'fpoints':
            checkAchievements(); // Checks FPoints-based achievements
            break;
        case 'luck':
            checkAchievements(); // Checks luck-based achievements
            break;
        case 'page_create':
            checkAchievements(); // Checks page creation achievements
            break;
        case 'shop':
            checkAchievements(); // Checks shop-related achievements
            break;
        default:
            checkAchievements(); // Check all if context not specified
    }
}

function getRandomUserPage() {
    return `fexplorer:user-page-${getRandomNum()}`;
}
function getRandomNum() {
    return Math.floor(Math.random() * 1000000);
}
const url = `fexplorer:user-page-${getRandomNum()}`;
const randomWebsiteUrls = [
    `fexplorer:user-page-${getRandomNum()}`,
];
// Ensure user-created pages are added to randomWebsiteUrls pool on load
Object.keys(userCreatedPages).forEach(pageId => {
    const pageUrl = `fexplorer:user-page-${pageId}`;
    if (!randomWebsiteUrls.includes(pageUrl)) {
        randomWebsiteUrls.push(pageUrl);
    }
});

function updateFPointsDisplay() {
    if (fpointsCounter) {
        fpointsCounter.textContent = `${userFPoints.toLocaleString()} FPoints`;
    }
}

function showFPointsNotification(amount) {
    if (!fpointsCounter || amount <= 0) return;

    const notificationSpan = document.createElement('span');
    if (amount <= 0) {
        notificationSpan.textContent = `-${amount}`;
    } else {
        notificationSpan.textContent = `+${amount}`;
    }
    notificationSpan.classList.add('fpoints-notification');

    fpointsCounter.appendChild(notificationSpan);

    notificationSpan.addEventListener('animationend', () => {
        notificationSpan.remove();
    });
}

// Browser checking
function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) {
        return "Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("Safari")) {
        return "Safari";
    } else  if (userAgent.includes("Internet Explorer") || userAgent.includes("Netscape")) {
        return "bro i think you need to upgrade";
    } else {
        return "Unknown";
    }
}

// Internet Explorer title and icon
function getIeTitle() {
    if (userChannel.ownedItems['ie_title']) {
        return "Internet Explorer - The Browser You Love to Hate";
    } else {
        return "FExplorer";
    }
}
function getIeIcon() {
    if (userChannel.ownedItems['ie_title']) {
        return "icons/ie-icon.png";
    } else {
        return "icons/fexplorer.png";
    }
}
// Cookies
function updateCookiesDisplay() {
    if (cookiesCounter) {
        cookiesCounter.textContent = `${userCookies.toLocaleString()} Cookies`;
    }
}

function showCookiesNotification(amount) {
    if (!cookiesCounter || amount <= 0) return;

    const notificationSpan = document.createElement('span');
    notificationSpan.textContent = `+${amount}`;
    notificationSpan.classList.add('cookies--notification');

    cookiesCounter.appendChild(notificationSpan);

    notificationSpan.addEventListener('animationend', () => {
        notificationSpan.remove();
    });
}

function fluctuateStockPrice() {
    const now = Date.now();
    let periods = Math.floor((now - lastStockUpdate) / STOCK_UPDATE_INTERVAL);

    for (let i = 0; i < periods; i++) {
        const change = (Math.random() * 20 - 10);
        stockPrice += change;
        stockPrice = Math.max(50, Math.min(200, stockPrice));
    }
    lastStockUpdate = now;
    saveAppState();
}

function getTimeElapsedString(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 365) return `${days} day${days > 1 ? 's' : ''} ago`;
    return `${years} year${years > 1 ? 's' : ''} ago`;
}

// Function to generate the create page editor HTML
function getCreatePageEditorHTML() {
    if (!draftPage) {
        initializeDraftPage(); // Ensure draftPage is initialized if null
    }

    let simpleButtonsHtml = draftPage.simpleButtons.map((btn, index) => `
        <div class="created-button-preview">
            <span>Text: "${escapeHtml(btn.text)}" | URL: "${escapeHtml(btn.url)}"</span>
            <button class="remove-button" data-index="${index}">X</button>
        </div>
    `).join('');

    return `
            <header class="fexplorer-create-header">
                <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
                <span class="app-title">FExplorer Create</span>
                <nav>
                    <a href="#" data-url="fexplorer:home" class="app-header-button">Home</a>
                    <a href="#" data-url="fexplorer:create.hub" class="app-header-button">My Pages Hub</a>
                </nav>
            </header>
            <main class="fexplorer-create-main">
                <section class="fexplorer-create-form">
                    <h2>Create a Custom Page</h2>
                    <div class="mode-toggle">
                        <label><input type="radio" name="creationMode" value="simple" ${draftPage.creationMode === 'simple' ? 'checked' : ''}> Simple Mode</label>
                        <label><input type="radio" name="creationMode" value="code" ${draftPage.creationMode === 'code' ? 'checked' : ''}> Code Mode</label>
                    </div>
                    <div id="simpleEditorSection" style="display: ${draftPage.creationMode === 'simple' ? 'block' : 'none'};">
                        <div class="form-group">
                            <label for="pageTitleInput">Title</label>
                            <input type="text" id="pageTitleInput" maxlength="50" value="${escapeHtml(draftPage.title)}" placeholder="Page Title">
                        </div>
                        <div class="form-group">
                            <label for="pageContentInput">Content (HTML/Text)</label>
                            <textarea id="pageContentInput" rows="6" placeholder="Write your page content here">${escapeHtml(draftPage.simpleContent)}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Add Button</label>
                            <input type="text" id="buttonTextInput" maxlength="30" placeholder="Button Text">
                            <input type="text" id="buttonUrlInput" placeholder="Button URL (e.g. example.com)">
                            <button id="addPageButton" class="fexplorer-button">Add</button>
                        </div>
                        <div class="form-group">
                            <label>Buttons Added</label>
                            <div id="pageButtonsPreview">${simpleButtonsHtml}</div>
                            <p id="noButtonsMessage" style="${draftPage.simpleButtons.length > 0 ? 'display:none;' : ''}color:#888;">No buttons yet.</p>
                        </div>
                    </div>
                    <div id="codeEditorSection" style="display: ${draftPage.creationMode === 'code' ? 'block' : 'none'};">
                        <div class="form-group">
                            <label for="htmlCodeInput">HTML</label>
                            <textarea id="htmlCodeInput" rows="10" spellcheck="false">${escapeHtml(draftPage.htmlCode)}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="cssCodeInput">CSS (optional)</label>
                            <textarea id="cssCodeInput" rows="6" spellcheck="false">${escapeHtml(draftPage.cssCode)}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="jsCodeInput">JavaScript (optional)</label>
                            <textarea id="jsCodeInput" rows="6" spellcheck="false">${escapeHtml(draftPage.jsCode)}</textarea>
                        </div>
                        <small class="code-note">JS alerts are intercepted in preview. Images: 'fexplorer_logo.png'.</small>
                    </div>
                    <div class="fexplorer-create-actions">
                        <button id="previewUserPage" class="fexplorer-button" style="background-color: #007bff;">Preview</button>
                        <button id="publishUserPage" class="fexplorer-button">Publish</button>
                    </div>
                    <div id="pageStatusMessage" class="status-message" style="margin-top: 10px;"></div>
                </section>
            </main>
            <footer class="fexplorer-create-footer">
                <p>Your page is saved locally. Not accessible by others.</p>
            </footer>
        </div>
    `;
}

// Function to render the create page editor
function renderCreatePageEditor() {
    if (!draftPage) {
        initializeDraftPage(); // Ensure draftPage is initialized if null
    }
    browserContent.innerHTML = getCreatePageEditorHTML();
    attachCreatePageEditorEventListeners();
}

// New function to generate the FExplorer Creator Hub page HTML
function getFExplorerCreatorHubPageHTML() {
    let pagesGridHtml = '';
    const pageIds = Object.keys(userCreatedPages);

    if (pageIds.length > 0) {
        pagesGridHtml = pageIds.map(pageId => {
            const page = userCreatedPages[pageId];
            const pageUrl = `fexplorer:user-page-${pageId}`;
            const description = page.creationMode === 'simple' ? 'A simple page with text and buttons.' : 'A page built with custom HTML, CSS, and JavaScript.';
            return `
                <div class="hub-item-card">
                    <a href="#" data-url="${pageUrl}">
                        <h3>${escapeHtml(page.title)}</h3>
                        <p>${description}</p>
                    </a>
                    <a href="#" data-url="${pageUrl}" class="view-page-button">View Page</a>
                    <a href="#" class="view-page-button delete-page-button">Delete Page</a>
                </div>
            `;
        }).join('');
    }

    return `
        <div class="create-hub-page-layout">
            <div class="app-header">
                <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
                <span class="app-title">FExplorer Creator Hub</span>
                <a href="#" data-url="fexplorer:home" class="app-header-button">Back to Home</a>
                <a href="#" data-url="fexplorer:create" class="app-header-button">Create New Page</a>
            </div>
            <div class="create-hub-main-content">
                <h1>Your Published Pages</h1>
                <p class="tagline">Manage and share your own pages. Click on one of them to view it!</p>
                <div id="userPagesGrid" class="hub-item-grid">
                    ${pagesGridHtml}
                </div>
                <p id="noPagesMessage" class="status-message" style="${pageIds.length > 0 ? 'display: none;' : ''} margin-top: 30px;">
                    You haven't published any pages yet. <a href="#" data-url="fexplorer:create">Create your first page!</a>
                </p>
            </div>
            <p class="footer-note" style="text-align: center; margin: 20px;">Your creations, your FExplorer.</p>
        </div>
    `;
}

function getPublishedUserPageHTML(pageId) {
    const pageData = userCreatedPages[pageId];
    if (!pageData) {
        return `
            <div style="text-align: center; padding: 50px;">
                <h1>Page Not Found</h1>
                <p>The user-created page "${pageId}" could not be found.</p>
                <p>Return to <a href="#" data-url="fexplorer:home">FExplorer Home</a></p>
            </div>
        `;
    }

    if (pageData.creationMode === 'simple') {
        let buttonsHtml = pageData.buttons.map(btn => `
            <button class="user-page-button" data-url="${escapeHtml(btn.url)}">${escapeHtml(btn.text)}</button>
        `).join('');

        return `
            <div class="user-created-page-layout">
                <div class="app-header">
                    <img src="icons/placeholder.png" alt="FExplorer Logo" class="app-logo">
                    <span class="app-title">${escapeHtml(pageData.title)}</span>
                    <a href="#" data-url="fexplorer:home" class="app-header-button">Back to Home</a>
                    <a href="#" data-url="fexplorer:create.hub" class="app-header-button">Creator Hub</a>
                </div>
                <div class="user-page-content">
                    <h1>${escapeHtml(pageData.title)}</h1>
                    <div class="user-page-text">${pageData.content}</div>
                    <div class="user-page-buttons">
                        ${buttonsHtml}
                    </div>
                </div>
                <p class="footer-note" style="text-align: center; margin: 20px;">This is a user-created page.</p>
            </div>
        `;
    } else if (pageData.creationMode === 'code') {
         // The actual content injection for code pages happens in navigate function
        return `
            <div class="user-created-code-page-layout">
                <div class="app-header">
                    <img src="fexplorer.png" alt="FExplorer Logo" class="app-logo">
                    <span class="app-title">${escapeHtml(pageData.title)}</span>
                    <a href="#" data-url="fexplorer:home" class="app-header-button">Back to Home</a>
                    <a href="#" data-url="fexplorer:create.hub" class="app-header-button">Creator Hub</a>
                </div>
                <div class="user-code-page-content" id="userCodePageContent">
                    <!-- Custom HTML will be dynamically inserted here -->
                </div>
                <p class="footer-note" style="text-align: center; margin: 20px;">This is a user-created page (code mode).</p>
            </div>
        `;
    }
    return ''; // Should not happen
}

function deletePage (pageId) {
    if (userCreatedPages[pageId]) {
        delete userCreatedPages[pageId];
    }
}

const fakeContent = {
    // Example site
    'example.com': `
        <h1>Example Domain</h1>
        <p>This domain is for use in illustrative examples in documents. You may use this
        domain in examples without prior coordination or asking for permission.</p>
        <p><a href="#" data-url="https://www.iana.org/domains/example">More information...</a></p>
        <hr>
        <p>This is a page for <strong>example.com</strong>.</p>
    `,
    // Blank page
    'about:blank': `
    `,
    // Placeholder page for non-existent content
    'fexplorer:placeholder': `
    <h1>This is a placeholder page.</h1>
    <p>You might be directed to this page if the requested content is not available.</p>
    <br>
    <p>Want to make your own page? <a href="#" id="createPageButton">Click here</a></p>
    `,
    // Search Engine: Goog!
    'goog.com': `
        <div class="goog-homepage">
            <img src="icons/goog-logo.png" alt="Goog! Logo" class="goog-logo" style="width: 200px; margin-top: 40px;">
            <input type="search" id="googSearchInput" class="goog-search-input" placeholder="Search the web with Goog!">
            <button id="googSearchButton" class="goog-search-button home-page-button">Search!</button>
            <div id="googSearchResults" class="goog-search-results"></div>
            <p class="footer-note">© Goog | Made by smrtC951!</p>
        </div>
    `,
    // FExplorer Home Page
    // The randomWebsiteButton is just a random 'User Page' button (its just a random page)
    'fexplorer:home': `
        <div class="home-page-content">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>Welcome to FExplorer!</h1>
            <p class="tagline">A browser inside your browser.</p>
            <div class="home-page-search-container">
                <input type="search" class="home-page-search-input" placeholder="Search the web or type in a URL...">
                <button class="home-page-search-button">Search</button>
            </div>
            <div class="quick-links-section">
                <h2>Explore</h2>
                <div class="home-page-buttons-container">
                    <button class="home-page-button" data-url="fexplorer:quick-links">Quick Links</button>
                    <button id="randomWebsiteButton" class="home-page-button">Random Page</button>
                    <button class="home-page-button" data-url="fexplorer:updates">Updates</button>
					<button class="home-page-button" data-url="fexplorer:financial">Financials</button>
					<button class="home-page-button" data-url="fexplorer:settings">Settings</button>
                    <button class="home-page-button" data-url="fexplorer:games">Games</button>
                    <button class="home-page-button" data-url="fexplorer:about">About</button>
                    <button class="home-page-button" data-url="fexplorer:placeholder" id="yourAccountButton" disabled>Your Account</button>
                </div>
            </div>
            <p class="footer-note">Made by smrtC951!</p>
        </div>
    `,
    // FExplorer Quick Links Page
    'fexplorer:quick-links': `
        <div class="quick-links-page home-page-content">
            <h1>FExplorer Quick Links</h1>
            <p class="tagline">Easily jump to other sites.</p>
            <div class="quick-links-section">
                <h2>Available Links</h2>
                <ul class="quick-links">
                    <li>
                        <a href="#" data-url="example.com">Example Site</a>
                        <p class="link-description">It's in the name, buddy.</p>
                    </li>
                    <li>
                        <a href="#" data-url="about:blank">Blank Page</a>
                        <p class="link-description"></p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:home">FExplorer Home</a>
                        <p class="link-description">Return to the FExplorer welcome page.</p>
                    </li>
                    <li>
                        <a href="#" data-url="goog.com">Goog!</a>
                        <p class="link-description">Visit the Goog! search engine.</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:financial">FExplorer Financials</a>
                        <p class="link-description">Manage your FPoints and claim daily bonuses.</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:shop">FExplorer Shop</a>
                        <p class="link-description">Spend your FPoints on cool stuff and luck boosts.</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:updates">FExplorer Updates</a>
                        <p class="link-description">See what's new and what's coming next!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:create">Page Creator</a>
                        <p class="link-description">Create your own custom web pages!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:create.hub">Creator Hub</a>
                        <p class="link-description">View and manage all your published pages!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:games">FExplorer Games</a>
                        <p class="link-description">Explore a variety of games!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:programs">FExplorer Programs</a>
                        <p class="link-description">Explore a variety of professional programs!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:wiki">Encyclopedia</a>
                        <p class="link-description">Explore multiple sections of information about FExplorer!</p>
                    </li>
                    <li>
                        <a href="#" data-url="unknown.site">Unknown Site</a>
                        <p class="link-description">Haha funny 404 error</p>
                    </li>
                </ul>
            </div>
            <p class="footer-note">Back to <a href="#" data-url="fexplorer:home">FExplorer Home</a></p>
        </div>
    `,
    // FExplorer Financial Page
    'fexplorer:financial': `
        <div class="home-page-content">
            <img src="icons/financial-icon-new.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Financials</h1>
            <p class="tagline">Manage your FPoints and explore totally legal investments.</p>
            <div style="background-color: #f0f8ff; border: 1px solid #add8e6; border-radius: 8px; padding: 20px; max-width: 500px; width: 100%; margin-bottom: 20px;">
                <p style="font-size: 1.2em; font-weight: bold; color: #333;">Your FPoints: <span id="currentFPoints">${userFPoints.toLocaleString()}</span></p>
                <p style="font-size: 0.9em; color: #555;">Your Luck Multiplier: <span id="currentLuck">${userLuck.toFixed(1)}x</span></p>
            </div>

            <div style="background-color: #fff; border: 1px solid #eee; border-radius: 8px; padding: 20px; max-width: 500px; width: 100%; text-align: left; margin-bottom: 20px;">
                <h2>FPoint Daily Bonus</h2>
                <p>Claim a bonus of FPoints! (Available every 5 minutes)</p>
                <button id="claimDailyBonusButton" class="home-page-button" style="margin-top: 10px;">Claim Daily Bonus</button>
                <p id="dailyBonusMessage" style="font-size: 0.9em; margin-top: 10px;"></p>
            </div>

            <div class="stock-market-card" style="background-color: #fff; border: 1px solid #eee; border-radius: 8px; padding: 20px; max-width: 500px; width: 100%; text-align: left; margin-bottom: 20px;">
                <h2>The WebTech Stock</h2>
                <p style="font-size: 1.1em;">Current Price: <span id="stockPriceDisplay" style="font-weight: bold; color: #007bff;">${stockPrice.toFixed(2)}</span> FPoints per share</p>
                <p style="font-size: 0.9em;">Shares Owned: <span id="userOwnedStock" style="font-weight: bold;">${userChannel.stockOwned}</span></p>

                <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 150px;">
                        <input type="number" id="stockBuyInput" class="mytube-input" placeholder="Quantity to Buy" min="1" value="1" style="width: calc(100% - 20px); margin-bottom: 5px;">
                        <button id="buyStockButton" class="fexplorer-button" style="background-color: #28a745; width: 100%;">Buy Stock</button>
                    </div>
                    <div style="flex: 1; min-width: 150px;">
                        <input type="number" id="stockSellInput" class="mytube-input" placeholder="Quantity to Sell" min="1" value="1" style="width: calc(100% - 20px); margin-bottom: 5px;">
                        <button id="sellStockButton" class="mytube-button" style="background-color: #dc3545; width: 100%;">Sell Stock</button>
                    </div>
                </div>
                <p style="font-size: 0.8em; color: #666; margin-top: 15px;">Stock price depends over time. Buy low, sell high!</p>
            </div>

            <div style="background-color: #fff; border: 1px solid #eee; border-radius: 8px; padding: 20px; max-width: 500px; width: 100%; text-align: left; margin-bottom: 20px;">
                <h2>Other FPoints Options</h2>
                <button class="home-page-button" id="riskAllButton" style="flex: 1; min-width: 150px; background-color: #ffc107;">Risk all of it.</button>
            </div>

            <div class="quick-links-section" style="margin-top: 30px;">
                <div class="home-page-buttons-container">
                    <button class="home-page-button" data-url="fexplorer:shop">Visit the FPoints Shop</button>
                    <button class="home-page-button" data-url="fexplorer:home">Back to Home</button>
                </div>
            </div>
            <p class="footer-note">Made by smrtC951!</p>
        </div>
    `,
    // FExplorer Shop Page
    'fexplorer:shop': `
        <div class="shop-page-layout">
            <div class="app-header">
                <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
                <span class="app-title">FExplorer Shop</span>
                <div class="app-search-container">
                    <input type="search" id="shopSearchInput" class="app-search-input" placeholder="Search the shop...">
                    <button id="shopSearchButton" class="app-search-button">Search</button>
                </div>
                <a href="#" data-url="fexplorer:financial" class="app-header-button">Financials</a>
            </div>
            <div class="shop-main-content">
                <div class="shop-sidebar">
                    <div class="shop-account-info">
                        <h3>Your Account</h3>
                        <p>FPoints: <strong id="shopFPoints">${userFPoints.toLocaleString()}</strong></p>
                        <p>Luck: <strong id="shopLuck">${userLuck.toFixed(1)}x</strong></p>
                        <p>Owned Items: <strong id="ownedItems">None</strong></p>
                        <button class="luck-button">Convert All Luck</button>
                        <button class="refund-button">Refund</button>
                    </div>
                    <div class="shop-category-list">
                        <h3>Categories</h3>
                        <ul>
                            <li><a href="#" data-url="fexplorer:shop">All Items</a></li>
                            <li><a href="#" data-url="fexplorer:shop?category=boosts">Luck Boosts</a></li>
                            <li><a href="#" data-url="fexplorer:shop?category=cosmetics">Cosmetics</a></li>
                            <li><a href="#" data-url="fexplorer:shop?category=mystery">Mystery</a></li>
                        </ul>
                    </div>
                    <div class="shop-category-list">
                        <h3>Quick Navigation</h3>
                        <ul>
                            <li><a href="#" data-url="fexplorer:home">FExplorer Home</a></li>
                            <li><a href="#" data-url="fexplorer:quick-links">Quick Links</a></li>
                            <li><a href="#" data-url="fexplorer:shop.inventory">View Inventory</a></li>
                        </ul>
                    </div>
                </div>
                <div class="shop-listing">
                    <h1>Featured Items</h1>
                    <div class="shop-item-grid" id="shopItemsGrid">
                        <!-- Shop items will be dynamically inserted here by JavaScript -->
                    </div>
                    <p class="footer-note" style="text-align: center; margin-top: 30px;">Made by smrtC951!</p>
                </div>
            </div>
        </div>
    `,
    // FExplorer Inventory Page (Shop Subpage)
    'fexplorer:shop.inventory': `
        <div class="inventory-page-layout">
            <h1>Your Inventory</h1>
            
            <nav class="inventory-tabs">
                <button class="inventory-tab active" data-tab="all">All Items</button>
                <button class="inventory-tab" data-tab="themes">Themes</button>
                <button class="inventory-tab" data-tab="cosmetics">Cosmetics</button>
                <button class="inventory-tab" data-tab="consumables">Consumables</button>
            </nav>

            <div class="inventory-stats">
                <span>Active Theme: <strong id="activeThemeDisplay">Default</strong></span>
                <span>Items Owned: <strong id="itemCountDisplay">0</strong></span>
            </div>

            <div class="inventory-items" id="inventoryItems">
                <!-- Inventory items will be dynamically inserted here by JavaScript -->
            </div>
        </div>
    `,
    // FExplorer Updates Page
    'fexplorer:updates': `
        <div class="updates-page-content">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Updates</h1>
            <p class="tagline">Stay informed about the latest features and upcoming changes!</p>
			<h2>Update Name: Alpha 1.4 - The Alpha Update!</h2>
            <p>Release Date: <i>11 November, 2025</i></p>

            <div class="updates-section">
                <h2>Current Updates</h2>
                <ul>
                    <li>Better shop system!</li>
                    <li>A lot more shop items!</li>
                    <li>Minor Settings rework!</li>
                    <li>A ton more achievements!</li>
                    <li>New games on the horizon! Horizon would be a cool name.</li>
                    <li>Brand new Information button!</li>
                </ul>
            </div>

            <div class="home-page-buttons-container">
                <button class="home-page-button" data-url="fexplorer:home">Home</button>
                <button class="home-page-button" data-url="fexplorer:quick-links">Quick Links</button>
            </div>
            <p class="footer-note" style="margin-top: 20px;">Made by smrtC951!</p>
        </div>
    `,
    // FExplorer Settings Page
    'fexplorer:settings': `
        <div class="browser-frame">
            <div class="settings-page-content">
                <div class="app-header">
                    <img src="icons/settings-icon.png" alt="FExplorer Logo" class="app-logo">
                    <span class="app-title">Settings</span>
                </div>
                <div class="settings-section">
                    <h2>Main Settings</h2>
                    <p style="color: #ff6600ff;">Note: Refresh the page to see the changes!</p>
                    <ul>
                        <li>
                            <label for="osSelect">Operating System</label>
                            <select id="osSelect">
                                <option value="default">Mac OS (Default)</option>
                                <option value="win11">Windows 11</option>
                                <option value="win7">Windows 7</option>
                                <option value="win8">Windows 8</option>
                                <option value="winxp">Windows XP</option>
                                <option value="macx">Mac OS X</option>
                                <option value="mac9">Mac OS 9</option>
                                <option value="classic">Classic</option>
                                <option value="beos" disabled>BeOS</option>
                            </select>
                        </li>
                        <li>
                            <label for="themeSelect">Theme</label>
                            <select id="themeSelect">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="classic">Classic</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="red">Red</option>
                                <option value="custom" disabled>Custom</option>
                            </select>
                        </li>
                        <li>
                            <label for="searchEngineSelect">Search Engine</label>
                            <select id="searchEngineSelect">
                                <option value="fexplorer">FExplorer Browser</option>
                                <option value="goog">Goog</option>
                                <option value="ping" disabled>Ping (Coming Soon!)</option>
                            </select>
                        </li>
                        <li>
                            <label for="homepageSelect">Select your homepage</label>
                            <select id="homepageSelect">
                                <option value="fexplorer:home">FExplorer Home</option>
                                <option value="fexplorer:quick-links">Quick Links</option>
                                <option value="goog.com">Goog</option>
                                <option value="ping.com" disabled>Ping (Coming Soon!)</option>
                                <option value="paranoid.com/error.html" disabled>JX1DX1</option>
                            </select>
                        </li>
                        <li>
                            <label for="notificationsToggle">Enable Notifications</label>
                            <input type="checkbox" id="notificationsToggle">
                        </li>
                        <li>
                            <label for="loginToggle">Do not show log in message on startup</label>
                            <input type="checkbox" id="loginToggle">
                        </li>
                        <li>
                            <label for="resetSettingsBtn">Reset All Settings</label>
                            <button id="resetSettingsBtn" class="fexplorer-button settings-reset-btn" style="background-color:#e74c3c;color:#fff;">Reset</button>
                        </li>
                    </ul>
                    <button id="saveSettingsBtn" class="fexplorer-button settings-save-btn" style="background-color:#28a745;color:#fff;margin-top:10px;">Save Settings</button>
                </div>
                <div class="settings-section">
                    <h2>Browser Statistics</h2>
                    <p>This section shows you the status of your browser. Hopefully it's good.</p>
                    <p class="app-title">FExplorer Alpha 1.4</p>
                    <p>Web Browser: <span class="browser-name">idk</span></p>
                    <button class="home-page-button" data-url="fexplorer:log-in">Log in</button>
                </div>
                <div id="settingsStatus" style="margin-top:10px;color:#28a745;"></div>
            </div>
        </div>
    `,
    // FExplorer Log in page
    'fexplorer:log-in': `
        <div class="home-page-content">
            <h1>Log in to FExplorer!</h1>
            <p>Log in to FExplorer for even more customization!</p>
            <form id="loginForm">
                <input type="text" id="username" name="username" placeholder="Username..."><br>
                <input type="password" id="password" name="password" placeholder="Password..."><br>
                <input type="submit" value="Login">
                <input type="submit" value="Signup">
            </form>
        </div>
    `,
    'fexplorer:ai': `
        <div class="home-page-content">
            <h1>FExplorer AI Assistant</h1>
            <p>This feature will be coming in another update. Stay tuned!</p>
        </div>
    `,
    // Test Page for new features
    'fexplorer:test': `
        <div class="home-page-content">
            <h1>Oh, hello there!</h1>
			<p>You might be wondering what this page is for. Well, it's for testing out new features for the browser!</p>
            <p>Here's some free FPoints for you!</p>
            <button class="home-page-button bonus-button">Bonus</button>
        </div>
    `,
    // Events page
    'fexplorer:events': `
        <div class="home-page-content">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Events</h1>
            <p class="tagline">Wait for some cool events!</p>
			<p>There will be some events coming to FExplorer soon! You might wait for that because they reward you with tons of FPoints!</p>
            <p>I will update the Encyclopedia page for new events to come!</p>
            <button class="home-page-button" data-url="fexplorer:wiki">Visit the Encyclopedia</button>
            <br>
            <button class="home-page-button bonus-button">Bonus</button>
        </div>
    `,
    // Games Page
    'fexplorer:games': `
        <div class="quick-links-page home-page-content">
            <h1>FExplorer Games</h1>
            <p class="tagline">Play really cool mini-games!</p>
            <div class="quick-links-section">
                <h2>Available Games</h2>
                <ul class="quick-links">
                    <li>
                        <a href="#" data-url="fexplorer:games/sandbox">Sandbox Building</a>
                        <p class="link-description">Build and explore your own sandboxes!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:games/solitaire">Solitaire</a>
                        <p class="link-description">Play a classic game of Solitaire and earn or bet FPoints!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:games/tic-tac-toe">Tic Tac Toe</a>
                        <p class="link-description">Play a classic game of Tic Tac Toe to receive FPoints or Cookies!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:games/cookie-clicker">Cookie Clicker</a>
                        <p class="link-description">Click on cookies to get Cookies!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:games/fighting-weapon-balls">Fighting Weapon Balls</a>
                        <p class="link-description">Watch balls with weapons fight to their doom!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:games/work-at-a-factory">Work at a Factory!</a>
                        <p class="link-description">Work to get FPoints!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:games/interactive-game">Interactive Game: Into The Horizon</a>
                        <p class="link-description">Hey look! The interactive game is remastered!</p>
                    </li>
                </ul>

                <h2>External Games (From other websites)</h2>
                <ul class="quick-links">
                    <li>
                        <a href="https://www.roblox.com/games/88385299342844/PHASE-2-Bukit-Green-Automatic-Subway-BGAS">Bukit Green Automatic Subway</a>
                        <p class="link-description">No description available.</p>
                    </li>
                    <li>
                        <a href="https://www.roblox.com/games/88385299342844/PHASE-2-Bukit-Green-Automatic-Subway-BGAS">Progressbar Popup Blocker</a>
                        <p class="link-description">Close as much popups as possible!</p>
                    </li>
                    <li>
                        <a href="woblocks.html">WoBlocks</a>
                        <p class="link-description">Powering... uhhhhh</p>
                    </li>
                    <li>
                        <a href="https://www.roblox.com/games/104614807243057/untitled-shenanigans-public-beta">untitled shenanigans</a>
                        <p class="link-description">Fight other players for no reason!</p>
                    </li>
                </ul>
            </div>
        </div>
    `,
    // About Page
    'fexplorer:about': `
        <div class="quick-links-page home-page-content">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>About FExplorer</h1>
            <p>FExplorer is a fun and interactive way to explore the web while earning FPoints!</p>
            <p>There are pre-made pages, but you can make your own for free!</p>
        </div>
    `,
    // Programs Page
     'fexplorer:programs': `
        <div class="quick-links-page home-page-content">
            <h1>FExplorer Programs</h1>
            <p class="tagline">Download or access various programs.</p>
            <div class="quick-links-section">
                <h2>Available Programs</h2>
                <ul class="quick-links">
                    <li>
                        <a href="#" data-url="fexplorer:create.hub">Create Hub</a>
                        <p class="link-description">Create professional or stupid pages easily.</p>
                    </li>
                    <li>
                        <a href="#" data-url="scripts.visualeditor.com">Visual Scripts Editor</a>
                        <p class="link-description">Script your own programs visually.</p>
                    </li>
                    <li>
                        <a href="#" data-url="fxplorer.chatroom.com">FExplorer Chatroom</a>
                        <p class="link-description">No description available...</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:documents">FExplorer Documents</a>
                        <p class="link-description">Create your very own documents for free!</p>
                    </li>
                    <li>
                        <a href="placeholder.txt" download="placeholder.txt">placeholder</a>
                        <p class="link-description">placeholder</p>
                    </li>
                </ul>
            </div>
        </div>
    `,
    // Game: Sandbox Building
    'fexplorer:games/sandbox': `
        <div class="quick-links-page home-page-content">
            <img src="icons/sandbox-icon.png" alt="Sandbox Placeholder Logo" class="app-logo">
            <h1>Sandbox Building</h1>
            <p class="tagline">Build and explore your own sandboxes!</p>
            <div class="quick-links-section">
                <h2>Game Area</h2>
                <p>Sandbox Building game would be here. Play the demo version!</p>
                <div id="sandboxGameArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                <button class="home-page-button" id="startSandboxDemoButton">Start Sandbox Demo</button>
                </div>
            </div>
        </div>
    `,
    // Game: Solitaire
    'fexplorer:games/solitaire': `
        <div class="quick-links-page home-page-content">
            <img src="icons/solitaire-icon.png" alt="Solitaire Placeholder Logo" class="app-logo">
            <h1>Solitaire</h1>
            <p class="tagline">Play a classic game of Solitaire and earn FPoints!</p>
            <div class="quick-links-section">
                <h2>Game Area</h2>
                <p>Solitaire game would be here.</p>
                <div id="solitaireGameArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                    <button class="home-page-button" id="startSolitaireDemoButton">Start Solitaire!</button>
                </div>
            </div>
        </div>
    `,
    // Game: Tic Tac Toe
    'fexplorer:games/tic-tac-toe': `
        <div class="quick-links-page home-page-content">
            <img src="icons/tic-tac-toe-icon.png" alt="Tic Tac Toe Placeholder Logo" class="app-logo">
            <h1>Tic Tac Toe</h1>
            <p class="tagline">Play a classic game of Tic Tac Toe to receive FPoints or Cookies!</p>
            <div class="quick-links-section">
                <h2>Game Area</h2>
                <p>Tic Tac Toe game would be here. Try out the game!</p>
                <div id="ticTacToeGameArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                    <button class="home-page-button" id="startTicTacToeButton">Start Tic Tac Toe</button>
                </div>
            </div>
        </div>
    `,
    // Game: Cookie Clicker
    'fexplorer:games/cookie-clicker': `
        <div class="quick-links-page home-page-content">
            <img src="icons/cookie-icon.png" alt="Cookie Clicker Placeholder Logo" class="app-logo">
            <h1>Cookie Clicker</h1>
            <p class="tagline">Click on cookies to get Cookies!</p>
            <div class="quick-links-section">
                <h2>Game Area</h2>
                <p>Cookie Clicker game would be here. Start clicking!</p>
                <div id="cookieClickerGameArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                    <button class="home-page-button" id="startCookieClickerButton">Start Cookie Clicker</button>
                </div>
            </div>
        </div>
    `,
    // Game: Fighting Weapon Balls
    'fexplorer:games/fighting-weapon-balls': `
        <div class="quick-links-page home-page-content">
            <img src="icons/placeholder.png" class="app-logo">
            <h1>Fighting Weapon Balls</h1>
            <p class="tagline">Watch balls with weapons fight to their doom!</p>
            <p>This minigame is heavily inspired by another game called Weapon Ball Fight, which is on the Play Store!</p>
            <a href="https://play.google.com/store/apps/details?id=com.balangodev.weaponballfight" class="home-page-button">Play the original here!</a>
            <a href="fighting-weapon-balls.html" class="home-page-button">Play full game!</a>
            <div class="quick-links-section">
                <h2>Game Area</h2>
                <p>Fighting Weapon Balls game would be here. Start playing!</p>
                <div id="ballGameArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                    <iframe src="fighting-weapon-balls.html" width="800" height="400" frameborder="0" style="display: none;" id="iframe"></iframe>
                    <button class="home-page-button" id="startFWBButton">Start Game</button>
                </div>
            </div>
        </div>
    `,
    // Game: Work at a Factory
    'fexplorer:games/work-at-a-factory': `
    <div class="quick-links-page home-page-content">
            <img src="icons/hamburger-icon.png" class="app-logo">
            <h1>Work at a Factory!</h1>
            <p class="tagline">Work hard to get FPoints!</p>
            <p>There isn't a end goal to this game. Work to get FPoints!</p>
            <div class="quick-links-section">
                <h2>Game Area</h2>
                <p>Work at a Factory game would be here. Start playing!</p>
                <div id="factoryGameArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                    <button class="home-page-button" id="startFactoryGameButton">Start Game</button>
                </div>
            </div>
        </div>
    `,
    // Game: Interactive Game: Into The Horizon
    'fexplorer:games/interactive-game': `
    <div class="quick-links-page home-page-content">
            <h1>Interactive Game: Into The Horizon</h1>
            <p class="tagline">Get water at 5:50 am.. but in another neighbourhood?</p>
            <p>
            Oh no, it is 5:50 am! You have an extreme dehydration effect. So you plan to grab water inside the kitchen during this timing.
            Will you make it? Probably not, but at least you would try! Get endings for FPoints!
            </p>
            <div class="quick-links-section">
                <h2>Game Area</h2>
                <p>Game would be here. Start playing!</p>
                    <div id="iGameArea"></div>
                    <button id="startIGameButton" class="button">Start Interactive Game</button>
            </div>
        </div>
    `,
    // Search Engine: FExplorer Browser (default)
    'fexplorer:search': `
        <style>
            .fexplorer-search-page {
                display: flex;
                flex-direction: column;
            }
            .fexplorer-search-page .app-logo {
                width: 150px;
                margin-top: 20px;
            }
            .fexplorer-search-page h1 {
                margin-top: 10px;
                font-size: 2em;
            }
            .fexplorer-search-page p {
                font-size: 1.1em;
                color: #555;
            }
            .fexplorer-search-page .footer-note {
                margin-top: 30px;
            }
            .fexplorer-search-page .home-page-search-input {
                width: 100%;
                max-width: 500px;
                padding: 12px 20px;
                font-size: 1em;
                border: 1px solid #ccc;
                border-radius: 25px;
                outline: none;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                margin-top: 20px;
                box-sizing: border-box;
            }
            .fexplorer-search-page .home-page-search-button {
                background-color: #007bff;
                color: white;
                border: none;
                padding: 12px 25px;
                margin-top: 15px;
                cursor: pointer;
                font-size: 1em;
                transition: background-color 0.2s ease;
                border-radius: 25px;
                white-space: nowrap;
            }
            .fexplorer-search-page .home-page-search-button:hover {
                background-color: #0056b3;
                color: white;
                cursor: pointer;
            }
        </style>
        <div class="fexplorer-search-page goog-homepage home-page-content">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Search</h1>
            <p>This is the default search engine for FExplorer.</p>
            <p>Use the search bar on the homepage to search the web!</p>
            <input type="search" id="fexplorerSearchInput" class="home-page-search-input" placeholder="Search the web or type in a URL...">
            <button id="fexplorerSearchResults" class="home-page-search-button">Search</button>
            <p class="footer-note">© FExplorer | Made by smrtC951!</p>
        </div>
    `,
    // Search Engine: Ping
    'ping.com': `
        <div class="goog-homepage ping-homepage">
            <img src="icons/ping-icon.png" alt="Ping Logo" class="ping-logo" style="width: 200px; margin-top: 40px;">
            <input type="search" id="googSearchInput" class="goog-search-input" placeholder="Search the web with Ping!">
            <button id="googSearchButton" class="goog-search-button home-page-button">Search!</button>
            <div id="googSearchResults" class="goog-search-results"></div>
            <p class="footer-note">© Ping | Made by smrtC951!</p>
        </div>
    `,
    // Program: Visual Scripts Editor
    'scripts.visualeditor.com': `
        <div class="home-page-content visual-scripts-content">
            <img src="icons/placeholder.png" alt="Ping Logo" class="ping-logo" style="width: 200px; margin-top: 40px;">
            <h1>Visual Scripts Editor</h1>
            <p class="tagline">The Script Editor</p>
            <br>
            <p>Create or edit your very own scripts for a minimal price of 100 FPoints.</p>
            <p>We support many programming languages. You can even make your own too!</p>
            <br>
            <button class="home-page-button get-vse-button">Get Visual Scripts Editor</button>
        </div>
    `,
    // FAKE Program: FExplorer Chatroom
    'fxplorer.chatroom.com': `
    <div class="home-page-content">
            <img src="icons/old-fexplorer.png" class="ping-logo" style="width: 200px; margin-top: 40px;">
            <h1>FExplorer Chatroom!</h1>
            <p class="tagline">Chat with other people.</p>
            <br>
            <p>Chat with other people for a low price of 250 FPoints. Do it.</p>
            <br>
            <button class="home-page-button" data-url="fxplorer.chatroom.com/chatroom">Open Chatroom</button>
        </div>
    `,
    'fxplorer.chatroom.com/chatroom': `
    <div style="font-family: Times New Roman;">
            <h2>FExplorer Chatroom</h2>
            <div id="fakeChatroomSection" style="width: 400px; height: 200px; background-color: #e7e7e7ff;">
                <!-- Chat goes here -->
            </div>
            <div>
                <input type="search" placeholder="Type in your message...">
                <button>Enter</button>
            </div>
        </div>
    `,
    // Program: FExplorer Documents
    'fexplorer:documents': `
        <div class="home-page-content">
            <p>Coming soon!</p>
        </div>
    `,
    // Cookie Page
    'fexplorer:cookies':`
        <div class="home-page-content">
            <img src="icons/cookie-icon.png" alt="COOKIE!111" class="app-logo">
            <h1>Manage your cookies</h1>
            <p>In FExplorer, Cookies is a side in-game currency that can be traded with FPoints! You receive them by collecting and accepting them on other pages!</p>
            <br>
            <h2>Current amount of cookies</h2>
            <p id="cookiesCounter" style="color: #cc7e0a">0 Cookies</p>
            <br>
            <button class="cookie-button">Trade FPoints!</button>
            <p>Coming soon!</p>
        </div>
    `,
    // Achievements Page
    'fexplorer:achievements':`
    <div class="home-page-content quick-links-content">
            <img src="icons/badge-icon.png" class="app-logo">
            <h1>Achievements</h1>
            <p>In FExplorer, you can do certain tasks to get achievements for good rewards! Most rewards are just FPoints, but some will award you with items!</p>
            <br>
            <div class="quick-links-section">
                <h2>Badges</h2>
                <ul class="quick-links" id="achievementsList">
                    <!-- Achievements will be dynamically inserted here by JavaScript -->
                </ul>
            </div>
        </div>
    `,
    // Encyclopedia Page
    'fexplorer:wiki':`
    <div class="home-page-content quick-links-content">
            <img src="icons/fexplorer.png" class="app-logo">
            <h1>Encyclopedia</h1>
            <p>There are a lot of content in FExplorer. This page dedicates to arranging them into sections of information!</p>
            <br>
            <div class="quick-links-section">
                <div class="home-page-buttons-container">
                    <button class="home-page-button" data-url="fexplorer:wiki.currency">Currency</button>
                    <button class="home-page-button">Navigation</button>
                </div>
            </div>
            <br>
            <button class="bonus-button home-page-button">Bonus</button>
        </div>
    `,
    'fexplorer:wiki.currency':`
    <div class="home-page-content quick-links-content">
            <img src="icons/fexplorer.png" class="app-logo">
            <h1>Currency</h1>
            <p>There are some currencies in FExplorer, which you can use them to buy some cool cosmetics and themes!</p>
            <br>
            <div class="quick-links-section">
                <div class="home-page-buttons-container">
                    <button class="home-page-button wiki-button" id="fpointsWiki">FPoints</button>
                    <button class="home-page-button wiki-button" id="cookiesWiki">Cookies</button>
                </div>
            </div>
        </div>
    `,
    // Terminal Page
    'file:terminal':`
        <div class="home-page-content" style="color: black; font-family: Consolas, sans-serif;">
            <h1>FExplorer Terminal</h1>
            <p>There isn't really any such thing yet, so here's some cool text about colas.</p>
            <br>
            <p>I like colas. They are tasty and refreshing.</p>
        </div>
    `,
    // Corporate Pages
    // WoBlocks page
    'woblocks.com':`
        <div div class="home-page-content quick-links-content">
            <h1>WoBlocks</h1>
            <p class="tagline">Powering... uhhhhh</p>
            <br>
            <p>This page is under construction.</p>
            <br>
            <button class="bonus-button home-page-button">Bonus</button>
        </div>
    `,
    // Other pages
    // Cola Page
    'fexplorer://cola.com':`
        <div class="home-page-content quick-links-content">
            <h2>bloxy cola</h2>
            <br>
            <br>
            <br>
            <button class="bonus-button">Bonus</button>
        </div>
    `,
    'fexplorer://cats.com':`
        <div class="home-page-content quick-links-content">
            <h2>Cats</h2>
            <p>I like cats! Meow!</p>
            <br>
            <br>
            <br>
            <button class="bonus-button">Bonus</button>
        </div>
    `,
    'fexplorer://dogs.com':`
        <div class="home-page-content quick-links-content">
            <h2>Dogs</h2>
            <p>Dogs are cool.</p>
            <br>
            <br>
            <br>
            <button class="bonus-button">Bonus</button>
        </div>
    `,
    'fexplorer://burger.com':`
        <div class="home-page-content quick-links-content">
            <img src="icons/hamburger-icon.png" alt="BURGER!!!" class="app-logo">
            <h2>Burger</h2>
            <p>Burgers are cool.</p>
            <br>
            <br>
            <br>
            <button class="bonus-button">Bonus</button>
        </div>
    `,
    'fexplorer://day-specific.com':`
        <div class="home-page-content quick-links-content">
            <img src="icons/sandbox-icon.png" class="app-logo">
            <h2>Day specific message!</h2>
            <p id="specificMessage"></p>
            <button id="daySpecificButton">Click me!</button>
            <button class="bonus-button">Bonus</button>
        </div>
    `,
    'fexplorer://online-quiz.com':`
        <div class="home-page-content quick-links-content">
            <img src="icons/ONEMOREGAME!.jpg" class="app-logo">
            <h1>The Online Quiz!</h1>
            <p class="tagline">Try out the online quiz!</p>
            <p>This quiz is very awesome! Go and try it out!</p>
            <br>
            <div id="quizArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                    <button id="startQuizButton" class="home-page-button">Try it out!</button>
                </div>
        </div>
    `,
    'paranoid.com':`
        <div style="height: 450px; background-color: #4f0b0bff; color: #fff; font-family: Times New Roman;">
            <p>Does this website even exist?</p>
            <p>Maybe you're being paranoid.</p>
            <p>Maybe I am the one who is making you paranoid.</p>
        </div>
    `,
    'paranoid.com/jx1dx1':`
        <div style="height: 450px; background-color: #000000; color: #7b0000ff; font-family: 'Consolas', monospace;">
            <p>how.did.you.find.me.</p>
            <p>i.thought.i.was.hidden.</p>
            <p>now.you.have.to.leave.</p>
            <p>before.it.is.too.late.</p>
            <button class="home-page-button" data-url="fexplorer:home">Leave now</button>
            <button class="home-page-button" data-url="paranoid.com/error.html">Proceed on</button>
        </div>
    `,
    'paranoid.com/error.html':`
        <div class="jx1dx1-page" style="height: 450px; background-color: #000000; color: #7b0000ff; font-family: 'Consolas', monospace;">
            <!-- Depending text will come here -->
        </div>
    `,
    'paranoid.com/code.html':`
        <div style="height: 450px; background-color: #000000; color: #7b0000ff; font-family: 'Consolas', monospace;">
            <p>find.the.5.codes. and.then.i.will.give.you.a.price.</p>
            <p>for.your.information.they.are.not.in.order. so.you.can.just.put.them.in.one.by.one. lol.</p>
            <p id="codesCounter">codes.left: 5</p>
            <div id="jx1dx1Code">
                <input type="search" id="theCode" placeholder="type.in.the.code.">
                <button id="codeButton" style="cursor: pointer;">Enter</button>
            </div>
            <div id="jx1dx1Result" style="display: none;">
                <p>congratulations. you.got.all.5.codes. here\'s.your.reward.</p>
                <button id="rewardButton" style="cursor: pointer;">get.reward</button>
            </div>
        </div>
    `,
    'black-market.net':`
        <div class="home-page-content quick-links-content">
            <h1>Black Market</h1>
            <p class="tagline">A totally legal way to get things</p>
            <button class="bonus-button home-page-button">Bonus</button>
            <button id="blackMarketRefundButton" class="home-page-button" style="background-color: red;">Refund</button>
            <br>
            <p>Welcome to the black market, where you can buy things for a lower price! Don't tell anyone!</p>
            <br>
            <div id="blackMarketSection">
            <!-- Items will come here -->
            </div>
        </div>
    `,
    // Legacy FExplorer Page
    'fexplorer:legacy':`
        <div class="home-page-content">
            <img src="icons/old-fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>Welcome to the FExplorer Legacy page!</h1>
            <p class="tagline">Your window to the simulated web.</p>
            <div class="quick-links-section">
                <h2>Visit the legacy version here!</h2>
                <p>There are 2 versions of the legacy FExplorer available. The legacy version (Version 11) and the websim version (Demo 1)</p>
                <a href="https://smrtc951.github.io/fexplorer/legacy" class="home-page-button" >Visit Version 11</a>
                <a href="https://fexplorer.on.websim.com/" class="home-page-button" >Visit Websim Demo 1</a>
            </div>
        </div>
    `,
    // FExplorer Codes Page
    'fexplorer:codes':`
        <div class="home-page-content">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Codes!</h1>
            <p class="tagline">Get codes for free FPoints!</p>
            <p>Coming soon!</p>
        </div>
    `,
};

// Cookie button
const tradeCookiesButton = document.querySelector('.cookie-button');
if (tradeCookiesButton) {
    tradeCookiesButton.addEventListener('click', () => {
        let tradeAmount = window.prompt("Enter the amount of FPoints you want to trade for Cookies (1 FPoint = 2 Cookies):", "100");
        if (tradeAmount && !isNaN(tradeAmount)) {
            const tradeAmountNum = parseInt(tradeAmount, 10);
            if (userFPoints >= tradeAmountNum) {
                userFPoints -= tradeAmountNum;
                userCookies += tradeAmountNum * 2; // Example conversion rate
                updateFPointsDisplay();
                updateCookiesDisplay();
                saveAppState();
                showFPointsNotification(tradeAmountNum);
                showCookiesNotification(tradeAmountNum * 2);
            } else {
                alert("Not enough FPoints to trade for Cookies!");
            }
        }
    });
}

function applyFExplorerSettings() {
    // Apply OS style
    const osValue = localStorage.getItem('fexplorerSettingOS') || 'default';
    updateWindowStyle(osValue);
    // Apply theme
    const themeValue = localStorage.getItem('fexplorerSettingTheme') || 'light';
    if (themeValue === 'dark') {
        document.body.classList.add('fexplorer-dark-mode');
    } else {
        document.body.classList.remove('fexplorer-dark-mode');
    }
    if (themeValue === 'blue') {
        document.body.classList.add('fexplorer-blue-mode');
    } else {
        document.body.classList.remove('fexplorer-blue-mode');
    }
    if (themeValue === 'green') {
        document.body.classList.add('fexplorer-green-mode');
    } else {
        document.body.classList.remove('fexplorer-green-mode');
    }
    if (themeValue === 'red') {
        document.body.classList.add('fexplorer-red-mode');
    } else {
        document.body.classList.remove('fexplorer-red-mode');
    }
    if (themeValue === 'binary') {
        document.body.classList.add('fexplorer-binary-mode');
    } else {
        document.body.classList.remove('fexplorer-binary-mode');
    }
    if (themeValue === 'roblox') {
        document.body.classList.add('fexplorer-roblox-mode');
    } else {
        document.body.classList.remove('fexplorer-roblox-mode');
    }
    if (themeValue === 'custom') {
        document.body.classList.add('fexplorer-custom-mode');
    } else {
        document.body.classList.remove('fexplorer-custom-mode');
    }
    // Notifications (if you want to use this for future features)
    const notificationsEnabled = localStorage.getItem('fexplorerSettingNotifications') === 'true';
    // ...add notification logic here if needed...
    // Hide login message/button on startup if the user chose that setting
    try {
        const hideLogin = localStorage.getItem('fexplorerSettingHideLogin') === 'true';
        const loginUi = document.getElementById('yourAccountUi');
        if (loginUi) {
            loginUi.style.display = hideLogin ? 'none' : '';
        }
    } catch (e) {
        // ignore if DOM not ready or element missing
    }
    // Update navigation/app logo according to settings
    try {
        updateNavIcon();
    } catch (e) {
        // function may be defined later; ignore if not available yet
    }
}

function updateBackButtonState() {
    backButton.disabled = historyStack.length === 0;
}

// Enable username advantages
function enableUsernameAdvantage() {
    // FPoints Reward (100 per 30 minutes)
    let fpointsReward = 100;
    const lastClaimTime = localStorage.getItem('dailyRewardLastClaim');
    const currentTime = Date.now();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (!lastClaimTime || (currentTime - parseInt(lastClaimTime) >= oneDayInMilliseconds)) {
        // User is eligible for a reward
        alert('You got your 100 FPoints from the rewards!');
        userFPoints += fpointsReward;
        updateFPointsDisplay();
        saveAppState();
        // Add your reward logic here (e.g., update points, show item)
        localStorage.setItem('dailyRewardLastClaim', currentTime);
    } else {
        console.log("You already claimed your daily reward today. Come back in 30 minutes!");
        const timeRemaining = oneDayInMilliseconds - (currentTime - parseInt(lastClaimTime));
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        console.log(`Time remaining: ${hours}h ${minutes}m ${seconds}s`);
    }

    // Your Account
    if (currentUrl === 'fexplorer:home') {
        const yourAccountButton = browserContent.querySelector('#yourAccountButton');
        if (yourAccountButton) {
            yourAccountButton.disabled = false;
        };
    };
};


function attachDynamicEventListeners() {
    browserContent.querySelectorAll('.quick-links a[data-url], .search-results-page a[data-url], .shop-sidebar a[data-url], .user-page-buttons button[data-url], .hub-item-card a[data-url], .hub-item-card button[data-url], .random-website-button[data-url]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const url = event.target.closest('[data-url]').dataset.url;
            if (url) {
                navigate(url);
            }
        });
    });
    
    browserContent.querySelectorAll('.home-page-button[data-url]').forEach(button => {
        button.addEventListener('click', (event) => {
            const url = event.target.dataset.url;
            if (url) {
                navigate(url);
            }
        });
    });

    // JX1DX1's code
    if (currentUrl === 'paranoid.com/code.html') {
        const jx1dx1Code = browserContent.querySelector('#jx1dx1Code');
        const theCode = browserContent.querySelector('#theCode');
        const codeInput = browserContent.querySelector('input[type="search"]');
        const codeButton = browserContent.querySelector('#codeButton');
        const codesCounter = browserContent.querySelector('#codesCounter');
        const rewardButton = browserContent.querySelector('#rewardButton');
        const jx1dx1Result = browserContent.querySelector('#jx1dx1Result');
        let codeAmount = 0;
        let codesLeft = 5;
        let codeName = '';
        if (theCode && codeInput && codeButton) {
            codeButton.addEventListener('click', () => {
                if (codeAmount <= 4) {
                    alert('you.don\'t.have.enough.codes.');
                } else if (codeAmount >= 4){
                    alert('you.got.all.5.codes.');
                    jx1dx1Code.style.display = 'none';
                    codesCounter.style.display = 'none';
                    jx1dx1Result.style.display = 'block';
                };
            });
            codeInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') {
                    if (codeInput.value === 'bmljZS5iYWRnZS5icm8u' ||
                        codeInput.value === 'WU9VLkNBTlQuSElERS5GUk9NLkpYMURYMS4=' ||
                        codeInput.value === 'SVQuTUFZLkJFLllPVVIuTEFTVC4=' ||
                        codeInput.value === 'QU5ELklULldJTEwuQkUuWU9VUi5MQVNULkRBWS4=' ||
                        codeInput.value === 'QU5ELk1ZLk5BTUUuSVMuSlgxRFgxLiBXSEFUJ1MuWU9VUi5QT0lOVD8=') {
                        codeName = codeInput.value;
                        codeAmount += 1;
                        codesLeft -= 1;
                        alert(`you.got.one.code. only.${codesLeft}.more.codes.`);
                        if (codesLeft <= 0) {
                            codesCounter.textContent = 'you.already.got.all.5.codes.';
                            codesLeft = 0;
                            codeAmount = 5;
                        } else {
                            codesCounter.textContent = `codes.left: ${codesLeft}`;
                        };
                    } else if (codeInput.value === codeName) {
                        alert('you.already.placed.in.this.code!');
                    } else {
                        alert('invalid.code!');
                    }
                }
            });
            rewardButton.addEventListener('keydown', (e) => {
                codeUnlocked = true;
            });
        };
    }

    // Log in/Sign up system
    const loginForm = browserContent.querySelector('#loginForm');
    const usernameInput = browserContent.querySelector('#username');
    const passwordInput = browserContent.querySelector('#password');

    if (loginForm) {
        loginForm.addEventListener('submit', () => {
            event.preventDefault();
            const username = usernameInput.value
            const password = passwordInput.value

            if (password === '' || username === '') {
                alert('You need a username AND password!');
            } else {
                alert(`Welcome, ${username}!`);
                alert('You will receive more customization in the settings and a 30 minute reward of 100 FPoints!');
                enableUsernameAdvantage();
                navigate('fexplorer:home');
            }
        });
    }


    // Day specific 
    if (currentUrl === 'fexplorer://day-specific.com') {
        const dailyMessages = [
        "Happy Sunday! Time to relax.",
        "It's Monday, time to make it count!",
        "Hello Tuesday, let's keep the momentum going.",
        "Happy Wednesday! We're halfway through the week.",
        "It's Thursday. The weekend is almost here!",
        "TGIF! Enjoy your Friday.",
        "Have a wonderful Saturday!"
    ];
    const dailyText = [
        "End of the week!",
        "Start of the week!",
        "Third day in!",
        "Halfway there!",
        "Almost there!",
        "Friday!",
        "Weekends are good!"
    ];

    const today = new Date();
    const currentDayIndex = today.getDay();

    const messageToDisplay = dailyMessages[currentDayIndex];
    const messageToText = dailyText[currentDayIndex];
    const daySpecificButton = browserContent.querySelector('#daySpecificButton')

    if (specificMessage) {
        browserContent.querySelector('#specificMessage').innerHTML = messageToDisplay;
        if (daySpecificButton) {
            daySpecificButton.addEventListener('click', () => {
                daySpecificButton.innerText = messageToText;
                if (daySpecificButton.innerText = "Almost there!") {
                    daySpecificButton.innerText = messageToText;
                    alert('QU5ELklULldJTEwuQkUuWU9VUi5MQVNULkRBWS4=');
                } else {
                    daySpecificButton.innerText = messageToText;
                }
            });
        }
    }
    }


    // Delete page button
    browserContent.querySelectorAll('.delete-page-button').forEach(button => {
        button.addEventListener('click', () => {
            const confirmDelete = window.confirm('Are you sure you want to delete this page? This action cannot be undone.');
            if (confirmDelete) {
                // Proceed with deletion
                const pageId = button.closest('.page').dataset.id;
                deletePage(pageId);
            }
        });
    });

    // Browser name in Settings page (checks the real browser name)
    const browserNameElements = browserContent.querySelectorAll('.browser-name');
    browserNameElements.forEach(element => {
        element.textContent = getBrowserName();
        if (element.textContent === 'Unknown') {
            element.textContent = 'FExplorer (Embedded)';
        }
    });

    // Random Page button (its just a random page)
    const randomWebsiteButton = browserContent.querySelector('#randomWebsiteButton');
    if (randomWebsiteButton) {
        randomWebsiteButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * randomWebsiteUrls.length);
            const randomUrl = randomWebsiteUrls[randomIndex];
            navigate(randomUrl);
        });
    }

    // Sandbox Demo button
    const startSandboxDemoButton = browserContent.querySelector('#startSandboxDemoButton');
    if (startSandboxDemoButton) {
        startSandboxDemoButton.addEventListener('click', () => {
            startSandboxDemoButton.style.display = 'none';
            const sandboxGameArea = document.getElementById('sandboxGameArea');
            const sandboxContent = document.createElement('div');
            let sandboxContentHTML = sandboxContent.innerHTML = `
                <div style="align-items: center; display: flex; flex-direction: column;">
                    <p>Sandbox Demo Started! Build your world here.</p>
                    <div style="width: 100%; height: 300px; border: 1px solid #000; background-color: #e0e0e0; margin-top: 10px; display: flex; align-items: center; justify-content: center;">
                        <p>Your sandbox area!</p>
                    </div>
                    <div style="margin-top: 10px;">
                        <button style=" background-color: red; cursor: pointer;" id="resetSandboxButton">Reset Sandbox</button>
                        <button style=" background-color: grey; cursor: pointer;" id="selectMaterialsButton">Select Materials</button>
                    </div>
                </div>
            `;
            sandboxGameArea.appendChild(sandboxContent);
            const resetSandboxButton = document.getElementById('resetSandboxButton');
            if (resetSandboxButton) {
                resetSandboxButton.addEventListener('click', () => {
                    // Reset the sandbox area
                    sandboxGameArea.innerHTML = sandboxContentHTML;
                    startSandboxDemoButton.style.display = 'block';
                    alert('Sandbox has been reset!');
                });
            }
            const selectMaterialsButton = document.getElementById('selectMaterialsButton');
            if (selectMaterialsButton) {
                selectMaterialsButton.addEventListener('click', () => {
                    const materials = ['Sand', 'Water', 'Grass', 'Stone', 'Wood'];
                    const materialList = materials.join(', ');
                    alert('Available materials: ' + materialList);
                    const material = window.prompt('Type the name of the material you want to use:', 'Sand');
                    if (material) {
                        alert('You selected: ' + material);
                        // Add the ability to use the selected material in the sandbox (not implemented in this demo)
                        alert('Material functionality is not implemented in this demo yet.');
                    }
                });
            }
        });
    }

    // Solitaire button
    const startSolitaireDemoButton = browserContent.querySelector('#startSolitaireDemoButton');
    if (startSolitaireDemoButton) {
        startSolitaireDemoButton.addEventListener('click', () => {
            startSolitaireDemoButton.style.display = 'none';
            const solitaireGameArea = document.getElementById('solitaireGameArea');
            const solitaireContent = document.createElement('div');
            let solitaireContentHTML = solitaireContent.innerHTML = `
                <div style="align-items: center; display: flex; flex-direction: column;">
                    <p>Welcome to Solitaire!</p>
                    <div style="width: 300px; height: 300px; border: 1px solid #000; background-color: #e0e0e0; margin-top: 10px; display: flex; align-items: center; justify-content: center;">
                        <p>I ate the game. My bad.</p>
                    </div>
                </div>
            `;
            solitaireGameArea.appendChild(solitaireContent);
        });
    };

    // Quiz
    if (currentUrl === 'fexplorer://online-quiz.com') {
        const startQuizButton = browserContent.querySelector('#startQuizButton');
        if (startQuizButton) {
            startQuizButton.addEventListener('click', () => {
                startQuizButton.style.display = 'none';
                const quizArea = document.getElementById('quizArea');
                const quizContent = document.createElement('div');
                const questions = [
                    {
                        question: "What is FExplorer's main currency?",
                        options: ["Cookies", "FPoints", "Dollars", "Gems"],
                        correct: 1
                    },
                    {
                        question: "Which of these is NOT a feature in FExplorer?",
                        options: ["Cookie Clicker", "Tic Tac Toe", "Racing Game", "Sandbox"],
                        correct: 2
                    },
                    {
                        question: "What happens when you visit random user pages?",
                        options: ["Nothing", "You lose FPoints", "You gain FPoints", "The page crashes"],
                        correct: 2
                    },
                    {
                        question: "What is the current version at?",
                        options: ["Alpha 1.4", "Demo 1.3", "Demo 1", "Demo 1.2"],
                        correct: 0
                    },
                    {
                        question: "Are you able to get the Binary mode?",
                        options: ["Yes", "No", "Maybe"],
                        correct: 2
                    }
                ];
                let currentQuestion = 0;
                let score = 0;

                function displayQuestion() {
                    const q = questions[currentQuestion];
                    quizContent.innerHTML = `
                        <div style="align-items: center; display: flex; flex-direction: column;">
                            <h3>Question ${currentQuestion + 1}/${questions.length}</h3>
                            <p style="font-size: 1.2em; margin: 20px 0;">${q.question}</p>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${q.options.map((option, index) => `
                                    <button style="padding: 10px 20px; margin: 5px; cursor: pointer;" 
                                            class="quiz-option" 
                                            data-index="${index}">
                                        ${option}
                                    </button>
                                `).join('')}
                            </div>
                            <p style="margin-top: 20px;">Score: ${score}/${questions.length}</p>
                        </div>
                    `;

                    quizContent.querySelectorAll('.quiz-option').forEach(button => {
                        button.addEventListener('click', handleAnswer);
                    });
                }

                function handleAnswer(event) {
                    const selectedAnswer = parseInt(event.target.dataset.index);
                    const correct = questions[currentQuestion].correct;

                    if (selectedAnswer === correct) {
                        score++;
                        alert('Correct!');
                    } else {
                        alert('Wrong! The correct answer was: ' + questions[currentQuestion].options[correct]);
                    }

                    currentQuestion++;

                    if (currentQuestion < questions.length) {
                        displayQuestion();
                    } else {
                        showResults();
                    }
                }

                function showResults() {
                    const earnedFPoints = score * 50; // 50 FPoints per correct answer
                    userFPoints += earnedFPoints;
                    updateFPointsDisplay();
                    saveAppState();

                    quizContent.innerHTML = `
                        <div style="align-items: center; display: flex; flex-direction: column;">
                            <h2>Quiz Complete!</h2>
                            <p>Your final score: ${score}/${questions.length}</p>
                            <p>You earned ${earnedFPoints} FPoints!</p>
                            <button id="retakeQuizButton" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
                                Take Quiz Again
                            </button>
                        </div>
                    `;

                    showFPointsNotification(earnedFPoints);

                    const retakeButton = quizContent.querySelector('#retakeQuizButton');
                    if (retakeButton) {
                        retakeButton.addEventListener('click', () => {
                            currentQuestion = 0;
                            score = 0;
                            displayQuestion();
                        });
                    }
                }

                quizArea.appendChild(quizContent);
                displayQuestion();
            });
        }
    }


    // Get Visual Scripts Editor button
    const getVSEButton = browserContent.querySelector('.get-vse-button');
    if (getVSEButton) {
        getVSEButton.addEventListener('click', () => {
            if (getVSEButton.textContent === 'Open Visual Scripts Editor') {
                alert('Opening Visual Scripts Editor...');
                alert('Visual Scripts Editor is not implemented yet. Coming soon!');
            } else if (userFPoints >= 100)  {
                if (userFPoints >= 100) {
                    userFPoints -= 100;
                    updateFPointsDisplay();
                    saveAppState();
                    alert('You have purchased the Visual Scripts Editor for 100 FPoints!');
                    getVSEButton.textContent = 'Open Visual Scripts Editor';
                    showFPointsNotification(-100);
                }
            } else {
                alert('Not enough FPoints to purchase the Visual Scripts Editor!');
            }
        });
    }

    // Tic Tac Toe Start button
    const startTicTacToeButton = browserContent.querySelector('#startTicTacToeButton');
    if (startTicTacToeButton) {
        startTicTacToeButton.addEventListener('click', () => {
            startTicTacToeButton.style.display = 'none';
            const ticTacToeGameArea = document.getElementById('ticTacToeGameArea');
            const ticTacToeContent = document.createElement('div');
            let ticTacToeContentHTML = ticTacToeContent.innerHTML = `
                <div style="align-items: center; display: flex; flex-direction: column;">
                    <p>Tic Tac Toe Game Started! Play against another player.</p>
                    <div id="ticTacToeBoard" style="display: grid; grid-template-columns: repeat(3, 100px); grid-template-rows: repeat(3, 100px); gap: 5px; margin-top: 10px;">
                        <!-- Tic Tac Toe cells will be generated here -->
                    </div>
                    <div style="margin-top: 10px;">
                        <button style=" background-color: red; cursor: pointer;" id="resetTicTacToeButton">Reset Game</button>
                    </div>
                </div>
            `;
            ticTacToeGameArea.appendChild(ticTacToeContent);
            const ticTacToeBoard = document.getElementById('ticTacToeBoard');
            let currentPlayer = 'X';
            const cells = [];
            // Create 9 cells for the Tic Tac Toe board
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.style.width = '100px';
                cell.style.height = '100px';
                cell.style.border = '1px solid #000';
                cell.style.display = 'flex';
                cell.style.alignItems = 'center';
                cell.style.justifyContent = 'center';
                cell.style.fontSize = '2em';
                cell.style.cursor = 'pointer';
                cell.addEventListener('click', () => {
                    if (cell.textContent === '') {
                        cell.textContent = currentPlayer;
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    }
                });
                cells.push(cell);
                ticTacToeBoard.appendChild(cell);
            }
            // Mechanic to check for a win or draw can be added here and award FPoints/Cookies accordingly
            const checkWinner = () => {
                const winningCombinations = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];
                for (const combination of winningCombinations) {
                    const [a, b, c] = combination;
                    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                        alert('Player ' + cells[a].textContent + ' wins!');
                        // Award FPoints/Cookies for winning
                        alert('You earned 10 FPoints for winning!');
                        userFPoints += 10;
                        updateFPointsDisplay();
                        saveAppState();
                        return;
                    }
                }
                if (cells.every(cell => cell.textContent)) {
                    alert('It\'s a draw!');
                }
            };

            // Reset button functionality
            const resetTicTacToeButton = document.getElementById('resetTicTacToeButton');
            resetTicTacToeButton.addEventListener('click', () => {
                cells.forEach(cell => {
                    cell.textContent = '';
                });
                currentPlayer = 'X';
                alert('You finished the game! You\'ve earned 10 FPoints for playing!');
                userFPoints += 10;
                updateFPointsDisplay();
                saveAppState();
            });
        });
    }

    // Cookie Clicker Start button
    const startCookieClickerButton = browserContent.querySelector('#startCookieClickerButton');
    if (startCookieClickerButton) {
        startCookieClickerButton.addEventListener('click', () => {
            startCookieClickerButton.style.display = 'none';
            const cookieClickerGameArea = document.getElementById('cookieClickerGameArea');
            const cookieClickerContent = document.createElement('div');
            let cookieClickerContentHTML = cookieClickerContent.innerHTML = `
                <div style="align-items: center; display: flex; flex-direction: column;">
                    <p>Cookie Clicker Game Started! Click the cookie to earn Cookies.</p>
                    <p><strong>Cookies: <span id="cookieCount">0</span></strong></p>
                    <div style="margin-top: 10px;">
                        <button id="cookieClickerButton" class="cookie-button">Click me!</button>
                        <button id="cookieClickerShopButton" class="cookie-button">View Shop</button>
                    </div>
                    <div id="cookieClickerShopContent" style="display: none; margin: 5px;">
                        <h2>Placeholder item</h2>
                        <p><i>Cost: 30 Cookies</i></p>
                        <button id="placeholderItem" class="cookie-button cookie-clicker-buy-button">Buy</button>
                    </div>
                </div>`;
            cookieClickerGameArea.appendChild(cookieClickerContent);
            const cookieClickerButton = document.getElementById('cookieClickerButton');
            const cookieClickerShopButton = document.getElementById('cookieClickerShopButton');
            const cookieClickerShopContent = document.getElementById('cookieClickerShopContent');
            const placeholderItemButton = document.getElementById('placeholderItem');
            let cookieCount = 0;

            cookieClickerButton.addEventListener('click', () => {
                cookieCount++;
                document.getElementById('cookieCount').textContent = cookieCount;
                // Award Cookies to the user
                userCookies++;
                updateCookiesDisplay();
                saveAppState();
            });

            cookieClickerShopButton.addEventListener('click', () => {
                if (cookieClickerShopButton.textContent === 'View Shop') {
                    cookieClickerShopContent.style.display = 'block';
                    cookieClickerShopButton.textContent = 'Close Shop';
                } else if (cookieClickerShopButton.textContent === 'Close Shop') {
                    cookieClickerShopContent.style.display = 'none';
                    cookieClickerShopButton.textContent = 'View Shop';
                }
            });
            placeholderItemButton.addEventListener('click', () => {
                if (cookieCount >= 29) {
                    alert('You bought placeholderItem for 30 Cookies!');
                    cookieCount -= 30;
                    document.getElementById('cookieCount').textContent = cookieCount;
                    updateCookiesDisplay();
                    saveAppState();
                } else {
                    alert('Not enough Cookies!');
                }
            });
            if (cookieCount >= 4999) {
                check500Cookies = true;
            } else {
                check500Cookies = false;
            }
        });
    }

    // FWB Start Button
    const startFWBButton = browserContent.querySelector('#startFWBButton');
    if (startFWBButton) {
        startFWBButton.addEventListener('click', () => {
            startFWBButton.style.display = 'none';
            const ballGameArea = document.getElementById('ballGameArea');
            const iframe = document.getElementById('iframe');
            iframe.style.display = 'block';
        });
    }

    // Factory Game start
const startFactoryGameButton = browserContent.querySelector('#startFactoryGameButton');

if (startFactoryGameButton) {
  startFactoryGameButton.addEventListener('click', () => {
    startFactoryGameButton.style.display = 'none';

    const factoryGameArea = document.getElementById('factoryGameArea');
    if (!factoryGameArea) return;

    // Clear old content
    factoryGameArea.innerHTML = '';

    // Step 1: Job selection screen
    factoryGameArea.innerHTML = `
      <div style="align-items: center; display: flex; flex-direction: column; gap: 10px;">
        <h2>Who do you want to work as?</h2>
        <button class="home-page-button job-select" data-job="cashier">Cashier</button>
        <button class="home-page-button job-select" data-job="worker">Worker</button>
        <button class="home-page-button job-select" data-job="security">Security Worker</button>
      </div>
    `;

    // Step 2: Handle job selection
    const jobButtons = factoryGameArea.querySelectorAll('.job-select');

    jobButtons.forEach(button => {
      button.addEventListener('click', () => {
        const job = button.getAttribute('data-job');
        let jobName = '';
        let jobFPoints = 0;
        let jobDescription = '';

        if (job === 'cashier') {
          jobName = 'Cashier';
          jobFPoints = 10;
          jobDescription = `
            <p>You handle customers and transactions.</p>
            <button class="home-page-button" id="cashierWorkButton">Work Shift</button>
          `;
        } else if (job === 'worker') {
          jobName = 'Factory Worker';
          jobFPoints = 15;
          jobDescription = `
            <p>You maintain the production line.</p>
            <button class="home-page-button" id="workerWorkButton">Work Shift</button>
          `;
        } else if (job === 'security') {
          jobName = 'Security Worker';
          jobFPoints = 25;
          jobDescription = `
            <p>You sit in the security room, waiting for any criminals or intruders to arrive.</p>
            <button class="home-page-button" id="workerWorkButton">Work Shift</button>
          `;
        }

        // Step 3: Show job info screen
        factoryGameArea.innerHTML = `
          <div style="align-items: center; display: flex; flex-direction: column; gap: 8px;">
            <h3>Your job is: ${jobName}</h3>
            <p>Base Payment: ${jobFPoints} FPoints</p>
            <div id="jobInformation">${jobDescription}</div>
            <button class="home-page-button" id="quitJobButton">Quit Job</button>
          </div>
        `;

        // Step 4: Work & quit buttons
        const quitButton = factoryGameArea.querySelector('#quitJobButton');
        const workButton = factoryGameArea.querySelector('#cashierWorkButton') || factoryGameArea.querySelector('#workerWorkButton');

        if (workButton) {
          workButton.addEventListener('click', () => {
            alert(`You completed a shift as ${jobName} and earned ${jobFPoints} FPoints!`);
            userFPoints += jobFPoints;
            saveAppState && saveAppState();
          });
        }

        if (quitButton) {
          quitButton.addEventListener('click', () => {
            alert('You quit your job.');
            startFactoryGameButton.style.display = 'inline-block';
            factoryGameArea.innerHTML = '';
          });
        }
      });
    });
  });
}

// ---- 1. Setup start button ----
const startIGameButton = browserContent.querySelector('#startIGameButton');

if (startIGameButton) {
  startIGameButton.addEventListener('click', () => {
    startIGameButton.style.display = 'none';

    const iGameArea = document.getElementById('iGameArea');
    if (!iGameArea) return;

    // Create the main game container
    const iGameContent = document.createElement('div');
    iGameContent.id = 'iGameContent';
    iGameContent.style.display = 'flex';
    iGameContent.style.flexDirection = 'column';
    iGameContent.style.alignItems = 'center';
    iGameContent.style.padding = '20px';
    iGameContent.style.borderRadius = '12px';
    iGameContent.style.background = '#f0f0f0';
    iGameContent.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
    iGameContent.style.textAlign = 'center';
    iGameArea.innerHTML = '';
    iGameArea.appendChild(iGameContent);

    // Create Achievements section
    const achievementsSection = document.createElement('div');
    achievementsSection.id = 'iGameAchievements';
    achievementsSection.style.marginTop = '20px';
    achievementsSection.style.width = '80%';
    achievementsSection.style.textAlign = 'left';
    achievementsSection.style.background = '#fff';
    achievementsSection.style.borderRadius = '8px';
    achievementsSection.style.padding = '10px 15px';
    achievementsSection.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
    iGameArea.appendChild(achievementsSection);

    // Save references globally
    window.iGameContainer = iGameContent;
    window.iGameAchievements = achievementsSection;

    // Start game + achievements UI
    renderScene('intro');
    updateAchievementsUI();
  });
}

// ---- 2. Scene Data ----
const iGameScenes = {
  intro: {
    text: "You wake up in your bedroom. You see a door and a computer.",
    choices: [
      { label: "Open the door", next: "hallway" },
      { label: "Use the computer", next: "computer" }
    ]
  },
  hallway: {
    text: "You open and see the kitchen and the living room.",
    choices: [
      { label: "Go to the living room", next: "living_room" },
      { label: "Go to the kitchen", next: "kitchen" },
      { label: "Go back", next: "intro" }
    ]
  },
  living_room: {
    text: "You see a door leading to your neighbourhood and a TV.",
    choices: [
      { label: "Watch some TV", next: "tv_ending" },
      { label: "Go outside", next: "outside_ending" },
      { label: "Go back", next: "hallway" }
    ]
  },
  kitchen: {
    text: "You see bread.",
    choices: [
      { label: "Eat bread", next: "bread_ending" },
      { label: "Go back", next: "hallway" }
    ]
  },
  computer: {
    text: "The screen lights up with the words: 'Welcome to FExplorer Mode.'",
    choices: [
      { label: "Access secret files", next: "code_ending" },
      { label: "Turn off computer", next: "intro" }
    ]
  },
  tv_ending: {
    text: "Hello everybody, my name is Markiplier. 📺<br><em>Ending: TV</em>",
    ending: "TV",
    choices: [{ label: "Start again", next: "intro" }]
  },
  code_ending: {
    text: "You discover a hidden mode! 🔒<br><em>Ending: Secret Discovery</em>",
    ending: "Secret Discovery",
    choices: [{ label: "Start again", next: "intro" }]
  },
  bread_ending: {
    text: "You eat the bread 🍞<br><em>Ending: Bread</em>",
    ending: "Bread",
    choices: [{ label: "Start again", next: "intro" }]
  },
  outside_ending: {
    text: "HEY WAIT A MINUTE-- 🗣️<br><em>Ending: Outside</em>",
    ending: "Outside",
    choices: [{ label: "Start again", next: "intro" }]
  }
};

// List of all endings for display
const ALL_ENDINGS = ["TV", "Secret Discovery", "Bread", "Outside"];

// ---- 3. Scene Renderer ----
function renderScene(sceneKey) {
  const scene = iGameScenes[sceneKey];
  const container = window.iGameContainer;
  if (!scene || !container) return;

  let html = `<p>${scene.text}</p>`;

  if (scene.choices) {
    html += `<div style="margin-top: 12px;">`;
    scene.choices.forEach(choice => {
      html += `<button class="button" data-next="${choice.next}">${choice.label}</button>`;
    });
    html += `</div>`;
  }

  container.innerHTML = html;

  if (scene.ending) unlockEnding(scene.ending);

  // Add click events for all data-next buttons
  const choiceButtons = container.querySelectorAll('[data-next]');
  choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => renderScene(btn.dataset.next));
  });
}

// ---- 4. Endings Tracker ----
function unlockEnding(name) {
  const endings = JSON.parse(localStorage.getItem("fexplorer_endings") || "[]");
  if (!endings.includes(name)) {
    endings.push(name);
    localStorage.setItem("fexplorer_endings", JSON.stringify(endings));
    alert(`New ending unlocked: ${name}! You gained 50 FPoints!`);
    userFPoints += 50;
    saveAppState();
    updateAchievementsUI();
  }
}

// ---- 5. Achievements Panel ----
function updateAchievementsUI() {
  const endings = JSON.parse(localStorage.getItem("fexplorer_endings") || "[]");
  const box = window.iGameAchievements;
  if (!box) return;

  let html = `<h3 style="cursor:pointer;">🏆 Endings / Achievements</h3><ul style="list-style:none;padding:0;transition:all 0.3s;">`;

  ALL_ENDINGS.forEach(ending => {
    const unlocked = endings.includes(ending);
    html += `
      <li style="
        margin: 5px 0;
        padding: 6px 10px;
        border-radius: 6px;
        background: ${unlocked ? '#d4ffd4' : '#f5f5f5'};
        color: ${unlocked ? '#000' : '#999'};
        transition: 0.3s;
      ">
        ${unlocked ? '✅' : '🔒'} ${ending}
      </li>
    `;
  });

  html += `</ul>`;
  box.innerHTML = html;

  // Collapsible toggle
  const title = box.querySelector('h3');
  const list = box.querySelector('ul');
  let collapsed = false;
  title.addEventListener('click', () => {
    collapsed = !collapsed;
    list.style.display = collapsed ? 'none' : 'block';
  });
}

    // Encyclopedia page
    const fpointsWiki = document.getElementById('fpointsWiki');
    const cookiesWiki = document.getElementById('cookiesWiki');
    if (fpointsWiki) {
        fpointsWiki.addEventListener('click', () => {
            alert('FPoints is the main currency in FExplorer. You can buy items with it in the shop.');
            userFPoints += 10;
            updateFPointsDisplay();
            saveAppState();
        })
    }
    if (cookiesWiki) {
        cookiesWiki.addEventListener('click', () => {
            alert('Cookies is a currency for FExplorer. It\'s quite broken.');
            userFPoints += 10;
            updateFPointsDisplay();
            saveAppState();
        })
    }


    // For the random user page (excluding the main user page)
    if (currentUrl.startsWith('fexplorer:user-page-')) {
        const randomTemplates = [
            // Default Page (Variant 1)
            `<div class="random-user-page">
                <h2>Default User Page</h2>
                <p>This is a default user page. Nothing special here.</p>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Default Page (Variant 2: Welcome)
            `<div class="random-user-page">
                <h2>Welcome!</h2>
                <p>Welcome to my page! Enjoy your stay!</p>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Default Page (Variant 3: Wonders)
            `<div class="random-user-page">
                <h2>Here's a thought:</h2>
                <p>Actually, I don't.</p>
                <button class="bonus-button">Bonus</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Default Page (Variant 4: Apple)
            `<div class="random-user-page">
                <h2>I like apples!</h2>
                <p>I hope you do too!</p>
                <br>
                <button class="bonus-button">Bonus</button>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Default Page (Variant 5: Burger)
            `<div class="random-user-page">
                <h2>I like burgers!</h2>
                <p>Click this cool button to find out why!</p>
                <button class="burger-button">Burger</button>
                <br>
                <button class="bonus-button">Bonus</button>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Mystery page (Variant 1)
            `<div class="random-user-page">
                <h2>Mystery Page</h2>
                <p>What secrets does this page hold? No one knows.</p>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Mystery page (Variant 2: Navigation)
            `<div class="random-user-page">
                <h2>Mystery Page</h2>
                <p>This page can send you to other parts of the browser. Who knows where it could be?</p>
                <a href="#" class="mystery-link">Mystery hyperlink</a>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Lucky page
            `<div class="random-user-page">
                <h2>Lucky Page</h2>
                <p>You found a lucky user page! Maybe you'll get bonus FPoints? Click one of these 3 buttons to see!</p>
                <button class="luck-page-button">Is it me?</button>
                <p>Remember, it all depends on luck!</p>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Boring page
            `<div class="random-user-page">
                <h2>Boring Page</h2>
                <p>This page is so boring... Nothing to see here.</p>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // 404 page (Variant 1)
            `<div class="random-user-page">
                <h2>404?</h2>
                <p>This page doesn't exist... or does it?</p>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // 404 page (Variant 2: Error loading)
            `<div class="random-user-page">
                <h2>404 - Page quit loading</h2>
                <p>The page has quitted loading.</p>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // 404 page (Variant 3: BSOD)
            `<div class="random-user-page" style="background-color: #0077D6; color: white; font-family: 'Segoe UI Light', monospace;">
                <h1>:(</h1>
                <p>The page ran into a problem and needs to reload. We're just collecting some error info, and then we'll restart for you.</p>
                <h5>0% complete</h5>
                <br>
                <p>For more information about this issue and possible fixes, visit our website: <a href="#" data-url="fexplorer:random-user-page-" class="random-link" style="color: white;">Random hyperlink</a></p>
            </div>`,
            // Awesome page (Variant 1: Default)
            `<div class="random-user-page">
                <h2>Awesome Page</h2>
                <p>I AM AWESOME! YOU ARE AWESOME! WE ARE AWESOME!!</p>
                <button class="bonus-button">Bonus</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Awesome page (Variant 2: ONE MORE GAME!)
            `<div class="random-user-page">
                <img src="icons/ONEMOREGAME!.jpg">
                <h2>ONE MORE GAME!</h2>
                <p>ONE MORE GAME!</p>
                <button class="bonus-button">ONE MORE GAME!</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">ONE MORE GAME!</a>
            </div>`,
            // Awesome page (Variant 3: 67 MANGOES!!)
            `<div class="random-user-page">
                <h2>67 MANGOES!!</h2>
                <p>I HAVE 67 MANGOES!! WANT SOME??</p>
                <button class="mango-button1">GIVE ME MANGOES!!</button>
                <button class="mango-button2">No thanks..</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Suspicious page (Variant 1)
            `<div class="random-user-page dangerous-page" style="background-color: #f2ff00ff; color: black;">
                <h2>TOTALLY NORMAL PAGE!</h2>
                <p>Why hello there, fellow user!</p>
                <p>Why don't you click here to get unlimited FPoints?</p>
                <button class="suspicious-button">Click me!</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Suspicious page (Variant 2: Opposite)
            `<div class="random-user-page dangerous-page" style="background-color: #7700ffff; color: black;">
                <h2>THIS IS NOT A NORMAL PAGE!!</h2>
                <p>Hey you, yes you!</p>
                <p>This is NOT a normal page. Click here to escape!</p>
                <button class="suspicious-button2">Click me!</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Dangerous page!! (Variant 1)
            `<div class="random-user-page dangerous-page" style="background-color: #ff0000ff; color: white;">
                <h2>DANGEROUS PAGE!!</h2>
                <p>This page is dangerous! Click the button below to proceed at your own risk!</p>
                <button class="dangerous-button">Proceed</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Dangerous page (Variant 2)
            `<div class="random-user-page dangerous-page" style="background-color: #22ff00ff; color: white;">
                <h2>TOTALLY SAFE PAGE!!</h2>
                <p>This page is totally safe! Click the button below to get your reward!</p>
                <button class="dangerous-button2">Get reward</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Broken page (Variant 1)
            `<div class="random-user-page" style="font-family: 'Times New Roman', monospace; color: #000;">
                <h2>Broken Page</h2>
                <p>Oops! This page seems to be broken. Try refreshing or going back.</p>
                <button class="broken-button">NILL</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Broken page (Variant 2 - 404)
            `<div class="random-user-page" style="font-family: 'Arial'; color: #000;">
                <h2>404 - Page not found</h2>
                <p>The requested URL could not be found.</p>
                <p>The site either could not load or does not exist.</p>
                <p>You can also create your own page!</p>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            `,
            // Broken page (Variant 2 - Someone broke it)
            `<div class="random-user-page" style="font-family: 'Arial'; color: #000;">
                <h2>This page is broken!</h2>
                <p>Someone broke the damn page! Who did this?!</p>
                <button class="broken-button">I don't know!</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            `,
            // FPoints filled page (Variant 1)
            `<div class="random-user-page">
                <h2>FPoints Galore!</h2>
                <p>This page is filled with FPoints! Click the button below to claim some!</p>
                <p>However, it will disappear afterwards!</p>
                <button class="fpoints-button">Claim FPoints</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // FPoints filled page (Variant 2)
            `<div class="random-user-page">
                <h2>FPoints-filled Page!</h2>
                <p>This button has a ton of FPoints on it! Go and collect it!</p>
                <p>However, it will disappear afterwards!</p>
                <button class="fpoints-button">Claim FPoints</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Data selling page
            `<div class="random-user-page">
                <h2>Data Selling Page</h2>
                <p>Want to sell your FPoints/data to us? PLEASE DO IT!!</p>
                <button class="data-selling-button">Sell Data</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Policies page
            `<div class="random-user-page">
                <h2>Policies Page</h2>
                <p>Welcome to the policies page. Here are some random policies:</p>
                <ul>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                    <li>Blah blah blah blah blah blah blah blah</li>
                </ul>
                <p>I hope you'll follow these guidelines because otherwise we will contact the authorities.</p>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Images page (Variant 1 - Solitaire)
            `<div class="random-user-page">
                <h2>My cool images</h2>
                <p>These are my cool images. Look at them! They're very nice!</p>
                <img src="icons/solitaire-icon.png" alt="Image"></li>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
                <p></p>
                <br>
                <button class="bonus-button">Bonus</button>
            </div>`,
            // Images page (Variant 2 - Builder)
            `<div class="random-user-page">
                <h2>My cool images</h2>
                <p>These are my cool images. Look at them! They're very nice!</p>
                <img src="icons/sandbox-icon.png" alt="Image"></li>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
                <p></p>
                <br>
                <button class="bonus-button">Bonus</button>
            </div>`,
            // Images page (Variant 3 - Pop Up)
            `<div class="random-user-page">
                <h2>My cool images</h2>
                <p>These are my cool images. Look at them! They're very nice!</p>
                <img src="icons/pop-up-icon.png" alt="Image"></li>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
                <p></p>
                <br>
                <button class="bonus-button">Bonus</button>
            </div>`,
            // Images page (Variant 4 - Legacy)
            `<div class="random-user-page">
                <h2>My cool images</h2>
                <p>These are my cool images. Look at them! They're very nice!</p>
                <img src="icons/old-fexplorer.png" alt="Image"></li>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
                <p></p>
                <br>
                <button class="bonus-button">Bonus</button>
            </div>`,
            // Images page (Variant 5 - JX1DX1)
            `<div class="random-user-page" style="background-color: #1a1a1a; color: #ff0000ff;">
                <h2>My cool images</h2>
                <p>These are my cool images. Look at them! They're very nice!</p>
                <img src="icons/jx1dx1.jpg" alt="Image"></li>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
                <p></p>
                <br>
                <button class="bonus-button">Bonus</button>
            </div>`,
            // Drinks page (Variant 1: Water)
            `<div class="random-user-page" style="background-color: #0651d2ff; color: #ffffffff;">
                <h2>Water</h2>
                <p>Water is good to drink because you can get hydrated!</p>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
                <br>
                <button class="bonus-button" style="background-color: #052d71ff; color: #ffffffff;">Get hydrated!</button>
            </div>`,
            // Drinks page (Variant 2: Vending Machine)
            `<div class="random-user-page" style="font-family: 'Times New Roman', monospace; color: #000;">
                <h2>Welcome to the vending machine...</h2>
                <p>Which of these consumptions determine your fate?</p>
                <br>
                <button class="drink-button">Bloxy Cola</button>
                <button class="drink-button">Bloxaide</button>
                <button class="drink-button">Uranium Cola</button>
                <button class="drink-button">H2O</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
                <br>
                <button class="bonus-button">Bonus</button>
            </div>`,
            // Halloween Page (Variant 1)
            `<div class="random-user-page" style="background-color: #000000; color: #ff7518;">
                <h2>Happy Halloween!</h2>
                <p>Trick or Treat! Click the button below for a spooky surprise!</p>
                <button class="bonus-button halloween-button" style="background-color: #ff7518; color: #000000;">Spooky Surprise!</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link" style="color: #ff7518;">Random hyperlink</a>
            </div>`,
            // Halloween Page (Variant 2: JX1DX1)
            `<div class="random-user-page" style="background-color: #1a1a1a; color: #ff0000ff;">
                <h2>THE.CLOCK.IS.TICKING.</h2>
                <p>i.hope.you.like.apples.</p>
                <button class="bonus-button" id="jx1dx1Halloween" style="background-color: #ff0000ff; color: #1a1a1a;">That's nice</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link" style="color: #ff0000ff;">Random hyperlink</a>
            </div>`,
            // Halloween Page (Variant 3: Thanksgiving)
            `<div class="random-user-page" style="background-color: #000000; color: #ff7518;">
                <h2>Happy Thanksgiving!</h2>
                <p>I don't really know what Thanksgiving is, but here's a bonus button with turkey text on it.</p>
                <button class="bonus-button halloween-button" style="background-color: #ff7518; color: #000000;">Get turkey</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link" style="color: #ff7518;">Random hyperlink</a>
            </div>`,
            // Betting page
            `<div class="random-user-page">
                <h2>Betting Page</h2>
                <p>Feeling lucky? Place your bets and see if you can win big!</p>
                <button class="betting-button">Place Bet</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // 
        ];
        const randomIndex = Math.floor(Math.random() * randomTemplates.length);
        let contentHtml = randomTemplates[randomIndex];
        browserContent.innerHTML = contentHtml;
    }

    // Suspicious button (button be invisible afterwards lol)
    const suspiciousButton = browserContent.querySelector('.suspicious-button');
    const suspiciousButton2 = browserContent.querySelector('.suspicious-button2');
    if (suspiciousButton) {
        suspiciousButton.addEventListener('click', () => {
            alert('Haha, nice try! No unlimited FPoints for you!');
            suspiciousButton.style.display = 'none';
        });
    }
    if (suspiciousButton2) {
        suspiciousButton2.addEventListener('click', () => {
            alert('SIKE!! This is actually a normal page, stupid!');
            suspiciousButton2.style.display = 'none';
        });
    }

    // 67 Mangoes buttons
    const mangoButton1 = browserContent.querySelector('.mango-button1');
    if (mangoButton1) {
        mangoButton1.addEventListener('click', () => {
            const mangoPoints = 10;
            userFPoints += mangoPoints;
            saveAppState();
            showFPointsNotification(mangoPoints);
            alert('You received 10 FPoints for taking the mangoes!');
            mangoButton1.style.display = 'none';
        });
    }
    const mangoButton2 = browserContent.querySelector('.mango-button2');
    if (mangoButton2) {
        mangoButton2.addEventListener('click', () => {
            alert('No mangoes for you!');
            mangoButton2.style.display = 'none';
            alert('In fact, I will take 5 FPoints from you for purely existing!');
            const mangoPenalty = 5;
            userFPoints -= mangoPenalty;
            saveAppState();
            showFPointsNotification(-mangoPenalty);
            alert('What a loser! >:)');
        });
    }

    // Betting button
    const bettingButton = browserContent.querySelector('.betting-button');
    if (bettingButton) {
        bettingButton.addEventListener('click', () => {
            const betAmount = window.prompt("Enter the amount of FPoints you want to bet:", "50");
            if (betAmount && !isNaN(betAmount)) {
                const betAmountNum = parseInt(betAmount, 10);
                if (userFPoints >= betAmountNum) {
                    const win = Math.random() < 0.5; // 50% chance to win
                    if (win) {
                        const winnings = betAmountNum * 2;
                        userFPoints += winnings;
                        saveAppState();
                        showFPointsNotification(winnings);
                        if (betAmountNum >= 250) {
                            alert("Congratulations! You won " + winnings + " FPoints!");
                            alert("WU9VLkNBTlQuSElERS5GUk9NLkpYMURYMS4=");
                        } else {
                            alert("Congratulations! You won " + winnings + " FPoints!");
                        }
                    } else {
                        userFPoints -= betAmountNum;
                        saveAppState();
                        showFPointsNotification(-betAmountNum);
                        alert("Sorry, you lost " + betAmountNum + " FPoints. Better luck next time!");
                    }
                    bettingButton.style.display = 'none';
                } else {
                    alert("Not enough FPoints to place that bet!");
                }
            }
        });
    }

    // Broken button (disappears and also random amounts)
    const brokenButton = browserContent.querySelector('.broken-button');
    // Random amounts of broken buttons
    const randomBrokenAmount = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < randomBrokenAmount; i++) {
        if (brokenButton) {
            const clone = brokenButton.cloneNode(true);
            brokenButton.parentNode.insertBefore(clone, brokenButton.nextSibling);
            clone.addEventListener('click', () => {
                clone.style.display = 'none';
            });
        }
    }
    if (brokenButton) {
        brokenButton.addEventListener('click', () => {
            brokenButton.style.display = 'none';
        });
    }

    // Drink button (deducts 15 FPoints but increases luck by 0.5)
    const drinkButton = browserContent.querySelector('.drink-button');
    if (drinkButton) {
        drinkButton.addEventListener('click', () => {
            const earnedFPoints = 15;
            userFPoints -= earnedFPoints;
            userLuck += 0.5;
            saveAppState();
            showFPointsNotification(userFPoints);
            alert('Exchanged 15 FPoints for 0.5 Luck rate!');
            alert(`FPoints left: ${userFPoints.toLocaleString()} Luck rate: ${userLuck.toLocaleString()}`)
            drinkButton.ststyle.display = 'none';
        });
    }

    // Bonus button (works like FPoints button but gives 25 to 75 FPoints)
    const bonusButton = browserContent.querySelector('.bonus-button');
    if (bonusButton) {
        bonusButton.addEventListener('click', () => {
            const randomBonusPoints = Math.floor(Math.random() * 51) + 25;
            userFPoints += randomBonusPoints;
            saveAppState();
            showFPointsNotification(randomBonusPoints);
            bonusButton.style.display = 'none';
        });
    }

    // Burger button burger-button
    const burgerButton = browserContent.querySelector('.burger-button');
    if (burgerButton) {
        burgerButton.addEventListener('click', () => {
            alert('I have no idea!');
            alert('I just like the juicy taste!');
            alert('Wait that\'s a reason.');
            userFPoints += 647; // burger -> 627572676572 (hex) -> 647 (add them all up)
            saveAppState();
            showFPointsNotification(userFPoints);
            burgerButton.style.display = 'none';
        });
    };

    // Halloween button
    const halloweenButton = browserContent.querySelector('.halloween-button');
    const jx1dx1Halloween = browserContent.querySelector('#jx1dx1Halloween');
    if (halloweenButton) {
        halloweenButton.addEventListener('click', () => {
            const randomHalloweenPoints = Math.floor(Math.random() * 101) + 50;
            userFPoints += randomHalloweenPoints;
            saveAppState();
            showFPointsNotification(randomHalloweenPoints);
            alert("Happy Halloween! You received " + randomHalloweenPoints + " FPoints!");
            halloweenButton.style.display = 'none';
        });
    }
    if (jx1dx1Halloween) {
        jx1dx1Halloween.addEventListener('click', () => {
            const randomHalloweenPoints = Math.floor(Math.random() * 101) + 50;
            userFPoints += randomHalloweenPoints;
            saveAppState();
            showFPointsNotification(randomHalloweenPoints);
            alert("Happy Halloween! You received " + randomHalloweenPoints + " FPoints!");
            alert('SVQuTUFZLkJFLllPVVIuTEFTVC4=');
            jx1dx1Halloween.style.display = 'none';
        });
    }

    // FPoints button (gives random amount of FPoints between 20 and 200)
    const fpointsButton = browserContent.querySelector('.fpoints-button');
    if (fpointsButton) {
        fpointsButton.addEventListener('click', () => {
            const randomFPoints = Math.floor(Math.random() * 181) + 20;
            userFPoints += randomFPoints;
            saveAppState();
            showFPointsNotification(randomFPoints);
            fpointsButton.style.display = 'none';
        });
    }

    // Dangerous button (gives random amount of FPoints between -500 and 1000, so the user can lose FPoints)
    // If the user has less than that, they'll be in debt
    const dangerousButton = browserContent.querySelector('.dangerous-button');
    const dangerousButton2 = browserContent.querySelector('.dangerous-button2');
    if (dangerousButton) {
        dangerousButton.addEventListener('click', () => {
            const randomDangerousPoints = Math.floor(Math.random() * 1501) - 500;
            userFPoints += randomDangerousPoints;
            saveAppState();
            showFPointsNotification(randomDangerousPoints);
            dangerousButton.style.display = 'none';
            if (randomDangerousPoints < 0) {
                alert('Oh no! You lost ' + Math.abs(randomDangerousPoints) + ' FPoints! Better luck next time!');
            } else {
                alert('Phew! You gained ' + randomDangerousPoints + ' FPoints! Lucky you!');
            }
        });
    }
    if (dangerousButton2) {
        dangerousButton2.addEventListener('click', () => {
            const randomDangerousPoints = Math.floor(Math.random() * 1501) - 500;
            userFPoints += randomDangerousPoints;
            saveAppState();
            showFPointsNotification(randomDangerousPoints);
            dangerousButton2.style.display = 'none';
            if (randomDangerousPoints < 0) {
                alert('You lost ' + Math.abs(randomDangerousPoints) + ' FPoints! It was a scam all along!');
            } else {
                alert('You gained ' + randomDangerousPoints + ' FPoints! I guess it wasn\'t a scam after all.');
            }
        });
    }
    // SELL MY DATA! :D
    const dataSellingButton = browserContent.querySelector('.data-selling-button');
    if (dataSellingButton) {
        dataSellingButton.addEventListener('click', () => {
            const randomSellingAmount = Math.floor(Math.random() * 101) + 50; // between 50 and 150
            userFPoints -= randomSellingAmount;
            saveAppState();
            alert('Thank you for your data! You know what? We don\'t want it anymore. We have a lot of it. Bye!');
            dataSellingButton.style.display = 'none';
        });
    }

    // The random user pages have 5 FPoints for visiting every time (works like the other pages that give FPoints)
   if (currentUrl.startsWith('fexplorer:user-page-')) {
        const baseFPoints = 2;
        const earnedFPoints = Math.round(baseFPoints * userLuck);
        userFPoints += earnedFPoints;
        saveAppState();
        showFPointsNotification(earnedFPoints);
    }

    // Lucky Page - Buttons (clone the button 3 times)
    const luckPageButtons = browserContent.querySelectorAll('.luck-page-button');
    luckPageButtons.forEach(button => {
        for (let i = 0; i < 2; i++) {
            const clone = button.cloneNode(true);
            button.parentNode.insertBefore(clone, button.nextSibling);
            clone.addEventListener('click', () => {
                clone.style.display = 'none';
                button.style.display = 'none';
                const luckyFPoints = Math.floor(Math.random() * 50) + 1;
                const earnedFPoints = Math.round(luckyFPoints * userLuck);
                const specialMessage = luckyFPoints === 100 ? ' (GOD DAMN!!)' : luckyFPoints === 50 ? ' (Jackpot!)' : luckyFPoints >= 30 ? ' (Awesome!)' : luckyFPoints >= 20 ? ' (Nice!)' :  luckyFPoints >= 10 ? ' (Good!)' :  luckyFPoints >= 5 ? ' (You can\'t even afford anything with this.)' : '';
                userFPoints += earnedFPoints;
                saveAppState();
                alert("You've received " + earnedFPoints + " FPoints for clicking the button!" + specialMessage);
                showFPointsNotification(earnedFPoints);
            });
        }
    });
    luckPageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const luckyFPoints = Math.floor(Math.random() * 50) + 1;
            const earnedFPoints = Math.round(luckyFPoints * userLuck);
            const specialMessage = luckyFPoints === 100 ? ' (GOD DAMN!!)' : luckyFPoints === 50 ? ' (Jackpot!)' : luckyFPoints >= 30 ? ' (Awesome!)' : luckyFPoints >= 20 ? ' (Nice!)' :  luckyFPoints >= 10 ? ' (Good!)' :  luckyFPoints >= 5 ? ' (You can\'t even afford anything with this.)' : '';
            userFPoints += earnedFPoints;
            saveAppState();
            alert("You've received " + earnedFPoints + " FPoints for clicking the button!" + specialMessage);
            showFPointsNotification(earnedFPoints);
        });
    });
    // Random hyperlink
    const randomLinks = browserContent.querySelectorAll('.random-link');
    randomLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const url = link.getAttribute('data-url');
            navigate(url);
            if (url === 'fexplorer:random-user-page-') { // send the user to another random page with the random url
                const randomIndex = Math.floor(Math.random() * 1000000); // large number to avoid collisions
                navigate(`fexplorer:user-page-${randomIndex}`);
            }
        });
    });
    const mysteryLinks = browserContent.querySelectorAll('.mystery-link');
    mysteryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const mysteryNavigate = [
                `fexplorer:home`,
                `fexplorer:user-page-${randomIndex}`
            ];
            event.preventDefault();
            const url = navigate(mysteryNavigate);
            navigate(url);
            if (url === 'fexplorer:random-user-page-') { // send the user to another random page with the random url
                const randomIndex = Math.floor(Math.random() * 1000000); // large number to avoid collisions
                navigate(`fexplorer:user-page-${randomIndex}`);
                alert('It sent you to another user page! How mysterious.');
            } else if (url === 'fexplorer:home') {

            };
        });
    });

    // Random user page appearance
    const userPageButtons = browserContent.querySelectorAll('.user-page-button');
    userPageButtons.forEach(button => {
        const randomIndex = Math.floor(Math.random() * userPageAppearances.length);
        button.style.backgroundImage = `url(${userPageAppearances[randomIndex]})`;
    });

    if (currentUrl.startsWith('goog.com') || currentUrl.startsWith('ping.com')) {
        const googSearchInput = browserContent.querySelector('#googSearchInput');
        const googSearchButton = browserContent.querySelector('#googSearchButton');

        if (googSearchInput && googSearchButton) {
            const performGoogSearch = () => {
                const query = googSearchInput.value.trim();
                if (query) {
                    const now = Date.now();
                    if (now - lastGoogSearchTime > GOOG_COOLDOWN) {
                        const baseFPoints = Math.floor(Math.random() * 5) + 1;
                        const earnedFPoints = Math.round(baseFPoints * userLuck);
                        userFPoints += earnedFPoints;
                        lastGoogSearchTime = now;
                        saveAppState();
                        showFPointsNotification(earnedFPoints);
                    } else {
                        alert(`Wait ${Math.ceil((GOOG_COOLDOWN - (now - lastGoogSearchTime)) / 1000)} seconds before searching again to earn FPoints!`);
                    }
                    if (currentUrl === 'goog.com') {
                        navigate(`goog.com/search?q=${encodeURIComponent(query)}`);
                    } else if (currentUrl === 'ping.com') {
                        navigate(`ping.com/search?q=${encodeURIComponent(query)}`);
                    };
                };
            };

            googSearchButton.addEventListener('click', performGoogSearch);
            googSearchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    performGoogSearch();
                }
            });
        }
    }
    if (currentUrl.startsWith('fexplorer:search')) {
        const fexplorerSearchInput = browserContent.querySelector('#fexplorerSearchInput');
        const fexplorerSearchButton = browserContent.querySelector('#fexplorerSearchButton');

        if (fexplorerSearchInput && fexplorerSearchButton) {
            const performGoogSearch = () => {
                const query = fexplorerSearchInput.value.trim();
                if (query) {
                    const now = Date.now();
                    if (now - lastGoogSearchTime > GOOG_COOLDOWN) {
                        const baseFPoints = Math.floor(Math.random() * 5) + 1;
                        const earnedFPoints = Math.round(baseFPoints * userLuck);
                        userFPoints += earnedFPoints;
                        lastGoogSearchTime = now;
                        saveAppState();
                        showFPointsNotification(earnedFPoints);
                    } else {
                        alert(`Wait ${Math.ceil((GOOG_COOLDOWN - (now - lastGoogSearchTime)) / 1000)} seconds before searching again to earn FPoints!`);
                    }
                    navigate(`goog.com/search?q=${encodeURIComponent(query)}`);
                }
            };

            googSearchButton.addEventListener('click', performGoogSearch);
            googSearchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    performGoogSearch();
                }
            });
        }
    }

    if (currentUrl === HOME_URL) {
        const fexplorerSearchInput = browserContent.querySelector('.home-page-search-input');
        const fexplorerSearchButton = browserContent.querySelector('.home-page-search-button');

        if (fexplorerSearchInput && fexplorerSearchButton) {
            const performFExplorerSearch = () => {
                const query = fexplorerSearchInput.value.trim();
                if (query) {
                    navigate(`goog.com/search?q=${encodeURIComponent(query)}`);
                }
            };

            fexplorerSearchButton.addEventListener('click', performFExplorerSearch);
            fexplorerSearchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    performFExplorerSearch();
                }
            });
        }
    }


    // Chatroom functionality
    if (currentUrl === 'fxplorer.chatroom.com/chatroom') {
        const chatSection = browserContent.querySelector('#fakeChatroomSection');
        const chatInput = browserContent.querySelector('input[type="search"]');
        const chatButton = browserContent.querySelector('button');
        if (chatSection && chatInput && chatButton) {
            // Add some styling to the chat section
            chatSection.style.padding = '10px';
            chatSection.style.overflowY = 'auto';
            
            // Add a welcome message from FBot
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'chat-message bot';
            welcomeMsg.style.marginBottom = '5px';
            welcomeMsg.textContent = 'FBot: Welcome to the chat! I\'m FBot, your chat companion.';
            chatSection.appendChild(welcomeMsg);
            
            // Keyword-specific responses
            const keywordResponses = {
                'hello': ["Hi there!", "Hello! How can I help?", "Hey! Nice to meet you!"],
                'help': ["What do you need help with?", "Try checking out the wiki!", "I can tell you about FExplorer features."],
                'jx1dx1': ["Shh... we don't talk about him...", "I heard he is quite dangerous...", "He has his own theme, you know..."],
                'black market': ["I know a guy who sells stuff there...", "Careful what you buy there!", "The prices are surprisingly good..."],
                'shop': ["The shop has some cool items!", "Have you seen the mystery boxes?", "Save up those FPoints!"],
                'fpoints': ["You can earn FPoints in many ways!", "Try using Goog search for FPoints!", "The black market loves FPoints..."],
                'cookies': ["Mmm... cookies...", "You can trade FPoints for cookies!", "Cookies make everything better!"],
                'secret': ["There are many secrets in FExplorer...", "Have you found any Easter eggs yet?", "Some pages have hidden variants..."],
                'bye': ["See you later!", "Come back soon!", "Bye! Don't forget to save your settings!"],
                'game': ["I think there are some cool games on FExplorer games.", "Go ahead and play them!", "My favourite game is Solitaire!"],
                'user': ["These users are very talented! They made their own pages!", "Try their pages if you want to! It's very random.", "There are many random pages!"],
                'give me a code': ["no.", "You have to find them on your own!", "Find them at the random pages."],
                'fake chatroom': ["Wait, what?", "Are you sure you're not tweaking?"],
                'online quiz': ["You should try out the online quiz!", "Are you talking about the online quiz available in the internet?"]
            };

            // Default responses when no keywords match
            const defaultResponses = [
                "That's interesting! Tell me more.",
                "I see what you mean.",
                "Wow, I never thought about it that way!",
                "Have you tried using FExplorer's other features?",
                "Sometimes I browse random user pages for fun!",
                "I love chatting with FExplorer users!",
                "What's your favorite FExplorer feature?",
                "I like FExplorer! It's fun!"
            ];
            
            function addMessage(text, isBot = false) {
                const msgDiv = document.createElement('div');
                msgDiv.className = 'chat-message ' + (isBot ? 'bot' : 'user');
                msgDiv.style.marginBottom = '5px';
                msgDiv.style.color = isBot ? '#0066cc' : '#000000';
                
                const username = isBot ? 'FBot' : (userChannel?.name || 'User');
                msgDiv.textContent = `${username}: ${text}`;
                
                chatSection.appendChild(msgDiv);
                chatSection.scrollTop = chatSection.scrollHeight;
            }
            
            // Optional follow-up responses mapping (sent only when a keyword matched)
            const keywordFollowUps = {
                'hello': ["How's your day going?", "Anything fun planned?"],
                'help': ["Which area do you need help with — shop, pages, or settings?", "Try 'help shop' to get shopping tips."],
                'jx1dx1': ["Be careful searching for him.", "Some pages related to them are... odd."],
                'black market': ["I wouldn't stay there too long.", "Some items there are one-time deals."],
                'shop': ["There's a mystery box you might like.", "Save up for the cooler cosmetics!"],
                'fpoints': ["Goog searches are a reliable source of FPoints.", "Try mini-games for bonus FPoints."],
                'cookies': ["Cookies are tasty — trade them wisely.", "You can use cookies in some mini-games."],
                'secret': ["Easter eggs are hidden on some user pages.", "Look for strange filenames to find secrets."],
                'bye': ["Take care!", "Come back soon!"],
                'give me a code': ["I can't just give you the code!", "You have to find them on your own!", "Find them at the random pages."],
                'fake chatroom': ["Are you trolling right now?"],
                'online quiz': ["It's really fun, trust me!", "You get rewarded with tons of FPoints if you know a lot about the browser!"]
            };

            // Conversation context (stores the last user message)
            let lastUserMessage = '';

            // Typing indicator helpers
            function showTyping() {
                if (!chatSection.querySelector('.chat-typing')) {
                    const t = document.createElement('div');
                    t.className = 'chat-typing bot';
                    t.style.marginBottom = '5px';
                    t.style.fontStyle = 'italic';
                    t.style.color = '#0066cc';
                    t.textContent = 'FBot is typing...';
                    chatSection.appendChild(t);
                    chatSection.scrollTop = chatSection.scrollHeight;
                }
            }

            function hideTyping() {
                const t = chatSection.querySelector('.chat-typing');
                if (t) t.remove();
            }

            function botReply(userMessage) {
                // Save user message into context
                lastUserMessage = userMessage || '';

                // Normalize and find matched keyword (first match wins)
                const msgLower = (userMessage || '').toLowerCase();
                let matchedKeyword = null;
                let possibleResponses = defaultResponses;

                for (const [keyword, responses] of Object.entries(keywordResponses)) {
                    if (msgLower.includes(keyword)) {
                        matchedKeyword = keyword;
                        possibleResponses = responses;
                        break;
                    }
                }

                // Pick primary reply
                const primary = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

                // Show typing, then send primary reply after a short randomized delay
                const primaryDelay = 800 + Math.random() * 800; // 800-1600ms
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    addMessage(primary, true);
                }, primaryDelay);

                // If a keyword matched, also send a follow-up reply referencing context
                if (matchedKeyword) {
                    // Prefer explicit follow-ups for the keyword, fall back to other responses
                    const followPool = (keywordFollowUps[matchedKeyword] && keywordFollowUps[matchedKeyword].length > 0)
                        ? keywordFollowUps[matchedKeyword]
                        : possibleResponses;

                    // Pick follow-up that's different from primary when possible
                    let follow = followPool[Math.floor(Math.random() * followPool.length)];
                    if (follow === primary && followPool.length > 1) {
                        const alt = followPool.filter(r => r !== primary);
                        follow = alt[Math.floor(Math.random() * alt.length)];
                    }

                    // If the follow-up contains a placeholder {user}, replace it with a snippet of the user's message
                    if (follow.includes('{user}')) {
                        const snippet = (lastUserMessage || '').substring(0, 60);
                        follow = follow.replace(/\{user\}/g, snippet);
                    }

                    // Schedule typing + follow-up after primary
                    const followDelay = primaryDelay + 700 + Math.random() * 800; // follow after primary
                    setTimeout(() => {
                        showTyping();
                        const typingTime = 500 + Math.random() * 800;
                        setTimeout(() => {
                            hideTyping();
                            addMessage(follow, true);
                        }, typingTime);
                    }, followDelay);
                }
            }
            
            chatButton.addEventListener('click', () => {
                const msg = chatInput.value.trim();
                if (msg) {
                    addMessage(msg, false);
                    chatInput.value = '';
                    botReply(msg);
                }
            });
            
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    chatButton.click();
                }
            });
        }
    }

    // JX1DX1 page and its variants
    if (currentUrl === 'paranoid.com/jx1dx1' || currentUrl === 'paranoid.com/error.html') {
        const jx1dx1Page = browserContent.querySelector('.jx1dx1-page');
        if (jx1dx1Page) {
            // Check if JX1DX1 theme is active
            const hasJx1dx1Theme = userChannel.activeTheme === 'jx1dx1_theme' && 
                                 userChannel.inventory.themes['jx1dx1_theme']?.active;

            if (hasJx1dx1Theme) {
                // Award applePoints and FPoints for having the correct theme
                const applePoints = 25;
                const fPointReward = 50;
                
                // Award FPoints if not already awarded for this session
                if (!userChannel.inventory.items['jx1dx1_reward']?.used) {
                    userFPoints += fPointReward;
                    showFPointsNotification(fPointReward);
                    
                    // Mark reward as claimed
                    userChannel.inventory.items['jx1dx1_reward'] = {
                        type: 'reward',
                        used: true,
                        timestamp: Date.now()
                    };
                }

                // Update page content
                jx1dx1Page.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <p>welcome.back.friend</p>
                        <p>i.like.apples</p>
                        <p>you.have.earned.${applePoints}.apple.points</p>
                        ${!userChannel.inventory.items['jx1dx1_reward']?.used ? 
                            `<p>and.${fPointReward}.fpoints.for.your.loyalty</p>` : 
                            '<p>come.back.tomorrow.for.more.rewards</p>'}
                        <p style="margin-top: 20px; font-size: 0.8em;">your.total.score: ${userFPoints} FPoints</p>
                    </div>
                `;

                // Add some creepy effects when the theme is active
                const glitchEffect = () => {
                    if (Math.random() < 0.1) { // 10% chance each interval
                        jx1dx1Page.style.transform = `skew(${Math.random() * 2 - 1}deg)`;
                        setTimeout(() => {
                            jx1dx1Page.style.transform = 'none';
                        }, 100);
                    }
                };
                
                // Start glitch effect
                const glitchInterval = setInterval(glitchEffect, 2000);
                
                // Clean up interval when leaving page
                const cleanup = () => {
                    clearInterval(glitchInterval);
                    window.removeEventListener('beforeunload', cleanup);
                };
                window.addEventListener('beforeunload', cleanup);
            } else {
                // Penalty for visiting without the theme
                const fpointsPenalty = 10;
                userFPoints = Math.max(0, userFPoints - fpointsPenalty); // Prevent negative FPoints
                showFPointsNotification(-fpointsPenalty);
                
                jx1dx1Page.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <p>you.are.not.prepared.yet</p>
                        <p>come.back.when.you.have.("the.theme")</p>
                        <p style="color: #ff0000">-${fpointsPenalty} FPoints</p>
                        <p style="font-size: 0.8em; color: #262626;">hint: check.the.shop</p>
                    </div>
                `;
            }
            
            saveAppState();
        }
    }

    if (currentUrl.startsWith('minceraft.com')) {
        const minceraftSearchInput = browserContent.querySelector('#minceraftSearchInput');
        const minceraftSearchButton = browserContent.querySelector('#minceraftSearchButton');

        if (minceraftSearchInput && minceraftSearchButton) {
            const performMinceraftSearch = () => {
                const query = minceraftSearchInput.value.trim();
                if (query) {
                    alert(`Simulated search for "${query}" on Minceraft.`);
                    minceraftSearchInput.value = '';
                }
            };

            minceraftSearchButton.addEventListener('click', performMinceraftSearch);
            minceraftSearchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    performMinceraftSearch();
                }
            });
        }

        const getMinceraftButton = browserContent.querySelector('.minceraft-main-button');
        if (getMinceraftButton) {
            getMinceraftButton.addEventListener('click', () => {
                alert('Welcome to Minceraft! (This is a simulated download)');
            });
        }
    }

    browserContent.querySelectorAll('.app-header-button[data-url]').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const url = event.target.dataset.url;
            if (url) {
                navigate(url);
            }
        });
    });

    const createChannelButton = browserContent.querySelector('#createChannelButton');
    const channelNameInput = browserContent.querySelector('#channelNameInput');
    const channelNameError = browserContent.querySelector('#channelNameError');

    if (createChannelButton && channelNameInput) {
        createChannelButton.addEventListener('click', () => {
            const channelName = channelNameInput.value.trim();
            if (channelName.length < 3) {
                channelNameError.textContent = 'Channel name must be at least 3 characters long.';
                return;
            }
            if (channelName.length > 30) {
                channelNameError.textContent = 'Channel name cannot exceed 30 characters.';
                return;
            }
            if (channelName === '') {
                channelNameError.textContent = 'Channel name cannot be empty.';
                return;
            }

            userChannel.name = channelName;
            userChannel.subscribers = 1000;
            userChannel.uploadedVideoIds = [];
            userChannel.ownedItems = {};
            userChannel.stockOwned = 0;
            userChannel.chatHistory = {};
            saveAppState();
            navigate('mytube.com/my-channel');
        });
    }

    const uploadVideoButton = browserContent.querySelector('#uploadVideoButton');
    if (uploadVideoButton) {
        uploadVideoButton.addEventListener('click', () => {
            const videoPoolIndex = Math.floor(Math.random() * uploadableVideosPool.length);
            const baseVideoData = uploadableVideosPool[videoPoolIndex];

            const newVideoId = `${baseVideoData.id}_${Date.now()}`;
            const newVideo = { ...baseVideoData };
            newVideo.id = newVideoId;
            newVideo.channel = userChannel.name;

            const baseViews = Math.floor(Math.random() * 900000) + 100000;
            newVideo.views = `${(baseViews + Math.floor(Math.random() * 200000)).toLocaleString()} views`;
            newVideo.date = 'just now';

            const baseFPoints = Math.floor(Math.random() * 50) + 20;
            const earnedFPoints = Math.round(baseFPoints * userLuck);
            userFPoints += earnedFPoints;

            const subscriberGain = Math.floor(Math.random() * 1000) + 100;
            userChannel.subscribers += subscriberGain;

            myTubeVideos[newVideo.id] = newVideo;

            userChannel.uploadedVideoIds.push(newVideo.id);
            saveAppState();

            alert(`Video "${newVideo.title}" uploaded! You earned ${earnedFPoints} FPoints and gained ${subscriberGain} subscribers!`);
            navigate('mytube.com/my-channel');
        });
    }

    if (currentUrl === 'fexplorer:financial') {
        const currentFPointsSpan = browserContent.querySelector('#currentFPoints');
        const currentLuckSpan = browserContent.querySelector('#currentLuck');
        const claimDailyBonusButton = browserContent.querySelector('#claimDailyBonusButton');
        const dailyBonusMessage = browserContent.querySelector('#dailyBonusMessage');

        const stockPriceDisplay = browserContent.querySelector('#stockPriceDisplay');
        const userOwnedStockDisplay = browserContent.querySelector('#userOwnedStock');
        const stockBuyInput = browserContent.querySelector('#stockBuyInput');
        const buyStockButton = browserContent.querySelector('#buyStockButton');
        const stockSellInput = browserContent.querySelector('#stockSellInput');
        const sellStockButton = browserContent.querySelector('#sellStockButton');
        const riskWarning = browserContent.querySelector('#riskWarning');
        const riskAllButton = browserContent.querySelector('#riskAllButton');

        riskAllButton.addEventListener('click', () => {
            const totalAffordable = Math.floor(userFPoints / stockPrice);
            if (totalAffordable > 0) {
                const cost = totalAffordable * stockPrice;
                userFPoints -= cost;
                userChannel.stockOwned += totalAffordable;
                fluctuateStockPrice();
                saveAppState();
                alert(`Bought ${totalAffordable} stock for ${cost.toFixed(2)} FPoints. Remaining FPoints: ${userFPoints.toLocaleString()}`);
                updateStockMarketUI();
                showFPointsNotification(-cost);
                // If the user lost all their FPoints, this happens
                if (userFPoints <= 0) {
                    alert('You have lost all your FPoints! How unfortunate. You can continue using FExplorer, but you will not be able to buy anything until you earn more FPoints.');
                    userFPoints = 0;
                }
            } else {
                alert('Not enough FPoints to risk it all!');
            }
        });
        if (riskWarning) {
            alert('Warning: Stock market is risky! Prices can go up or down unpredictably. Invest wisely!');
            riskWarning.style.display = 'block';
            riskAllButton.style.display = 'inline-block';
            riskAllButton.addEventListener('click', () => {
                const totalAffordable = Math.floor(userFPoints / stockPrice);
                if (totalAffordable > 0) {
                    const cost = totalAffordable * stockPrice;
                    userFPoints -= cost;
                    userChannel.stockOwned += totalAffordable;
                    fluctuateStockPrice();
                    saveAppState();
                    alert(`Bought ${totalAffordable} stock for ${cost.toFixed(2)} FPoints. Remaining FPoints: ${userFPoints.toLocaleString()}`);
                    updateStockMarketUI();
                    showFPointsNotification(-cost);
                    if (currentFPointsSpan) currentFPointsSpan.textContent = userFPoints.toLocaleString();
                } else {
                    alert('Not enough FPoints to risk it all!');
                }
            });
        }

        if (currentFPointsSpan) currentFPointsSpan.textContent = userFPoints.toLocaleString();
        if (currentLuckSpan) currentLuckSpan.textContent = userLuck.toFixed(1) + 'x';

        const updateStockMarketUI = () => {
            if (stockPriceDisplay) stockPriceDisplay.textContent = stockPrice.toFixed(2);
            if (userOwnedStockDisplay) userOwnedStockDisplay.textContent = userChannel.stockOwned;
            if (buyStockButton) buyStockButton.disabled = userFPoints < (stockPrice * (parseInt(stockBuyInput?.value, 10) || 1));
            if (sellStockButton) sellStockButton.disabled = userChannel.stockOwned < (parseInt(stockSellInput?.value, 10) || 1);
        };
        updateStockMarketUI();

        const now = Date.now();
        if (claimDailyBonusButton) {
            if (now - lastFinancialVisit < DAILY_BONUS_COOLDOWN) {
                const timeLeft = DAILY_BONUS_COOLDOWN - (now - lastFinancialVisit);
                const minutesLeft = Math.ceil(timeLeft / (60 * 1000));
                claimDailyBonusButton.disabled = true;
                dailyBonusMessage.textContent = `You have already claimed your bonus. Come back in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}!`;
            } else {
                claimDailyBonusButton.disabled = false;
                dailyBonusMessage.textContent = 'Bonus available!';
                claimDailyBonusButton.addEventListener('click', () => {
                    const bonusAmount = Math.round(BASE_DAILY_BONUS * (stockPrice / INITIAL_STOCK_PRICE));
                    userFPoints += bonusAmount;
                    lastFinancialVisit = Date.now();
                    saveAppState();
                    if (currentFPointsSpan) currentFPointsSpan.textContent = userFPoints.toLocaleString();
                    claimDailyBonusButton.disabled = true;
                    dailyBonusMessage.textContent = `You claimed ${bonusAmount} FPoints! Come back in 5 minutes!`;
                    alert(`Claimed ${bonusAmount} FPoints! Total: ${userFPoints.toLocaleString()}`);
                    updateStockMarketUI();
                });
            }
        }

        if (buyStockButton) {
            buyStockButton.addEventListener('click', () => {
                const quantity = parseInt(stockBuyInput.value, 10);
                if (isNaN(quantity) || quantity <= 0) {
                    alert('Please enter a valid quantity to buy.');
                    return;
                }
                const cost = quantity * stockPrice;
                if (userFPoints >= cost) {
                    userFPoints -= cost;
                    userChannel.stockOwned += quantity;
                    fluctuateStockPrice();
                    saveAppState();
                    alert(`Bought ${quantity} stock for ${cost.toFixed(2)} FPoints. Remaining FPoints: ${userFPoints.toLocaleString()}`);
                    stockBuyInput.value = '';
                    updateStockMarketUI();
                    if (currentFPointsSpan) currentFPointsSpan.textContent = userFPoints.toLocaleString();
                } else {
                    alert(`Not enough FPoints! You need ${(cost - userFPoints).toFixed(2)} more FPoints.`);
                }
            });
            stockBuyInput.addEventListener('input', updateStockMarketUI);
        }

        if (sellStockButton) {
            sellStockButton.addEventListener('click', () => {
                const quantity = parseInt(stockSellInput.value, 10);
                if (isNaN(quantity) || quantity <= 0) {
                    alert('Please enter a valid quantity to sell.');
                    return;
                }
                if (userChannel.stockOwned >= quantity) {
                    const earned = quantity * stockPrice;
                    userFPoints += earned;
                    userChannel.stockOwned -= quantity;
                    fluctuateStockPrice();
                    saveAppState();
                    alert(`Sold ${quantity} stock for ${earned.toFixed(2)} FPoints. Total FPoints: ${userFPoints.toLocaleString()}`);
                    stockSellInput.value = '';
                    updateStockMarketUI();
                    if (currentFPointsSpan) currentFPointsSpan.textContent = userFPoints.toLocaleString();
                } else {
                    alert(`You only own ${userChannel.stockOwned} stock.`);
                }
            });
            stockSellInput.addEventListener('input', updateStockMarketUI);
        }
    }

    if (currentUrl === 'fexplorer:settings') {
        const themeSelect = browserContent.querySelector('#themeSelect');
        const binary = new Option('Binary', 'binary');
        binary.disabled = true;
        themeSelect.add(binary);
        if (themeSelect === 'binary_theme') {
            binary.disabled = false;
        };
    };

    // Handle Inventory Page
    if (currentUrl === 'fexplorer:shop.inventory') {
        const inventoryItems = browserContent.querySelector('#inventoryItems');
        const activeThemeDisplay = browserContent.querySelector('#activeThemeDisplay');
        const itemCountDisplay = browserContent.querySelector('#itemCountDisplay');
        
        function renderInventoryItems(tab = 'all') {
            if (!inventoryItems) return;
            
            // Get relevant items based on tab
            let itemsToShow = [];
            
            if (tab === 'themes' || tab === 'all') {
                Object.entries(userChannel.inventory.themes).forEach(([id, theme]) => {
                    itemsToShow.push({
                        id,
                        type: 'theme',
                        data: theme,
                        name: theme.name || id,
                        isActive: userChannel.activeTheme === id
                    });
                });
            }
            
            if (tab === 'cosmetics' || tab === 'all') {
                Object.entries(userChannel.inventory.cosmetics).forEach(([id, cosmetic]) => {
                    itemsToShow.push({
                        id,
                        type: 'cosmetic',
                        data: cosmetic,
                        name: userChannel.ownedItems[id]?.itemData?.name || id,
                        isEquipped: cosmetic.equipped
                    });
                });
            }
            
            if (tab === 'consumables' || tab === 'all') {
                Object.entries(userChannel.inventory.items).forEach(([id, item]) => {
                    if (item.type !== 'cosmetic' && item.type !== 'theme') {
                        itemsToShow.push({
                            id,
                            type: item.type,
                            data: item,
                            name: userChannel.ownedItems[id]?.itemData?.name || id,
                            used: item.used
                        });
                    }
                });
            }

            // Update stats
            if (activeThemeDisplay) {
                const currentTheme = userChannel.activeTheme;
                activeThemeDisplay.textContent = userChannel.inventory.themes[currentTheme]?.name || 'Default';
            }
            if (itemCountDisplay) {
                itemCountDisplay.textContent = Object.keys(userChannel.ownedItems).length;
            }

            // Render items
            inventoryItems.innerHTML = itemsToShow.map(item => `
                <div class="inventory-item ${item.type} ${item.isActive ? 'active' : ''} ${item.isEquipped ? 'equipped' : ''} ${item.used ? 'used' : ''}">
                    <div class="item-icon">
                        <img src="${userChannel.ownedItems[item.id]?.itemData?.icon || 'icons/placeholder.png'}" alt="${item.name}">
                    </div>
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p>${userChannel.ownedItems[item.id]?.itemData?.description || ''}</p>
                        ${item.type === 'theme' ? 
                            `<button class="theme-button" data-theme-id="${item.id}" ${item.isActive ? 'disabled' : ''}>
                                ${item.isActive ? 'Active' : 'Apply Theme'}
                            </button>` :
                         item.type === 'cosmetic' ?
                            `<button class="cosmetic-button" data-cosmetic-id="${item.id}" ${item.isEquipped ? 'disabled' : ''}>
                                ${item.isEquipped ? 'Equipped' : 'Equip'}
                            </button>` :
                            `<button class="use-button" data-item-id="${item.id}" ${item.used ? 'disabled' : ''}>
                                ${item.used ? 'Used' : 'Use Item'}
                            </button>`
                        }
                    </div>
                </div>
            `).join('');

            // Attach event listeners
            browserContent.querySelectorAll('.theme-button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const themeId = e.target.dataset.themeId;
                    if (applyTheme(themeId)) {
                        saveAppState();
                        renderInventoryItems(tab);
                    }
                });
            });

            browserContent.querySelectorAll('.cosmetic-button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const cosmeticId = e.target.dataset.cosmeticId;
                    if (toggleCosmetic(cosmeticId, true)) {
                        saveAppState();
                        renderInventoryItems(tab);
                    }
                });
            });

            browserContent.querySelectorAll('.use-button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const itemId = e.target.dataset.itemId;
                    if (useInventoryItem(itemId)) {
                        saveAppState();
                        renderInventoryItems(tab);
                    }
                });
            });
        }

        // Initial render
        renderInventoryItems('all');

        // Tab switching
        browserContent.querySelectorAll('.inventory-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                browserContent.querySelectorAll('.inventory-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                renderInventoryItems(e.target.dataset.tab);
            });
        });
    }

    // Black market
    if (currentUrl === 'black-market.net') {
        const blackMarketSection = browserContent.querySelector('#blackMarketSection');
        if (blackMarketSection) {
            // Build item element
            const blackMarketItem = document.createElement('div');
            blackMarketItem.className = 'quick-links-section black-market-section';
            blackMarketItem.innerHTML = `
                <h3>LAssistant!</h3>
                <p>Get yourself your very own assistant for a low price!</p>
                <p><i>Price: 150 FPoints</i></p>
                <button id="blackMarketButton" class="home-page-button">BUY!!</button>
            `;

            blackMarketSection.appendChild(blackMarketItem);

            // Wire buy button
            const buyBtn = blackMarketSection.querySelector('#blackMarketButton');
            // Refund button is outside #blackMarketSection in the template, select from page root
            const blackMarketRefundButton = browserContent.querySelector('#blackMarketRefundButton');

            if (buyBtn) {
                buyBtn.addEventListener('click', () => {
                    const price = 150;
                    if (userFPoints >= price) {
                        userFPoints -= price;
                        // Grant the LAssistant item to the userChannel owned items
                        if (!userChannel.ownedItems) userChannel.ownedItems = {};
                        userChannel.ownedItems['lassistant'] = true;
                        saveAppState();
                        updateFPointsDisplay();
                        buyBtn.textContent = 'Purchased';
                        buyBtn.disabled = true;
                        alert('You bought LAssistant for 150 FPoints! Check your inventory.');
                    } else {
                        alert('Not enough FPoints to buy LAssistant.');
                    }
                });

                // Disable if already owned
                if (userChannel.ownedItems && userChannel.ownedItems['lassistant']) {
                    buyBtn.textContent = 'Purchased';
                    buyBtn.disabled = true;
                }
            }

            if (blackMarketRefundButton) {
                blackMarketRefundButton.addEventListener('click', () => {
                    const confirmRefund = window.confirm('Are you sure you want to refund your LAssistant purchase? This cannot be undone!');
                    if (confirmRefund) {
                        if (userChannel.ownedItems && userChannel.ownedItems['lassistant']) {
                            // Refund only if owned
                            userFPoints += 150;
                            userChannel.ownedItems['lassistant'] = false;
                            saveAppState();
                            updateFPointsDisplay();
                            if (buyBtn) {
                                buyBtn.textContent = 'BUY!!';
                                buyBtn.disabled = false;
                            }
                            alert('LAssistant refunded.');
                        } else {
                            alert('You do not own LAssistant to refund.');
                        }
                    }
                });
            }
        }
    }

    // Shop
    if (currentUrl === 'fexplorer:shop') {
        const shopFPointsSpan = browserContent.querySelector('#shopFPoints');
        const shopLuckSpan = browserContent.querySelector('#shopLuck');
        const ownedItemsSpan = browserContent.querySelector('#ownedItems');
        const shopItemsGrid = browserContent.querySelector('#shopItemsGrid');
        const shopSearchInput = browserContent.querySelector('#shopSearchInput');
        const shopSearchButton = browserContent.querySelector('#shopSearchButton');

        if (shopFPointsSpan) shopFPointsSpan.textContent = userFPoints.toLocaleString();
        if (shopLuckSpan) shopLuckSpan.textContent = userLuck.toFixed(1) + 'x';

        if (ownedItemsSpan) {
            const ownedItemsList = Object.keys(userChannel.ownedItems)
                .map(id => shopItems.find(item => item.id === id)?.name || id)
                .join(', ');
            ownedItemsSpan.textContent = ownedItemsList.length > 0 ? ownedItemsList : 'None';
        }

        const renderShopItems = (filterCategory = null, searchQuery = null) => {
            let filteredItems = shopItems;

            if (filterCategory) {
                if (filterCategory === 'boosts') {
                    filteredItems = filteredItems.filter(item => item.effect.luck);
                } else if (filterCategory === 'cosmetics') {
                    filteredItems = filteredItems.filter(item => item.effect.cosmetic);
                } else if (filterCategory === 'mystery') {
                    filteredItems = filteredItems.filter(item => item.effect.mystery);
                }
            }

            if (searchQuery) {
                const lowerQuery = searchQuery.toLowerCase();
                filteredItems = filteredItems.filter(item =>
                    item.name.toLowerCase().includes(lowerQuery) ||
                    item.description.toLowerCase().includes(lowerQuery)
                );
            }

            shopItemsGrid.innerHTML = filteredItems.map(item => `
                <div class="shop-item-card">
                    <div class="shop-item-icon-container">
                        <img src="${item.icon}" alt="${item.name} icon" class="shop-item-icon">
                    </div>
                    <div class="shop-item-info">
                        <h3 class="shop-item-title">${item.name}</h3>
                        <p class="shop-item-description">${item.description}</p>
                        <p class="shop-item-price">${item.cost.toLocaleString()} FPoints</p>
                        <button class="shop-buy-button" data-item-id="${item.id}" ${(!userChannel.ownedItems[item.id] && userFPoints < item.cost) ? 'disabled' : ''}>
                            ${ userChannel.ownedItems[item.id]
                                ? (userChannel.ownedItems[item.id].equipped ? 'Unequip' : (item.effect && item.effect.cosmetic ? 'Equip' : 'Owned'))
                                : 'Buy Now'
                            }
                        </button>
                    </div>
                </div>
            `).join('');

            browserContent.querySelectorAll('.shop-buy-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const itemId = event.currentTarget.dataset.itemId;
                    const item = shopItems.find(i => i.id === itemId);
                    const owned = !!userChannel.ownedItems[itemId];

                    // Purchase flow
                    if (!owned) {
                        if (!item) return;
                        if (userFPoints < item.cost) {
                            alert('Not enough FPoints to buy this item! You need ' + (item.cost - userFPoints) + ' more FPoints.');
                            return;
                        }

                        userFPoints -= item.cost;
                        // Record purchase
                        userChannel.ownedItems[item.id] = {
                            purchaseDate: Date.now(),
                            used: false,
                            equipped: false,
                            itemData: { ...item }
                        };

                        // Keep existing post-purchase behavior
                        if (item.effect && item.effect.luck) {
                            userLuck += item.effect.luck;
                            userChannel.inventory.items[item.id] = {
                                type: 'luck_modifier',
                                value: item.effect.luck,
                                active: true
                            };
                        }

                        if (item.effect && item.effect.mystery) {
                            const mysteryItems = ['A shiny badge!', 'A rare emoji pack!', 'A temporary speed boost!', 'A silly sound effect!', 'A comically placed cheeseburger!'];
                            const randomMystery = mysteryItems[Math.floor(Math.random() * mysteryItems.length)];
                            userChannel.inventory.items[item.id] = {
                                type: 'mystery',
                                reward: randomMystery,
                                used: false
                            };
                            alert(`You bought a Mystery Box! You found: "${randomMystery}"`);
                        }

                        if (item.effect && item.effect.cosmetic) {
                            userChannel.inventory.cosmetics[item.id] = {
                                type: item.effect.cosmetic,
                                equipped: false,
                                settings: {}
                            };

                            if (item.id === 'halloween_theme') {
                                userChannel.inventory.themes[item.id] = {
                                    name: 'Halloween',
                                    active: false,
                                    settings: { baseTheme: 'win8', overlay: 'halloween' }
                                };
                                alert(`You bought the ${item.name}! Happy Halloween!`);
                            } else if (item.id === 'jx1dx1_theme') {
                                userChannel.inventory.themes[item.id] = {
                                    name: 'JX1DX1',
                                    active: false,
                                    settings: { baseTheme: 'win7', overlay: 'jx1dx1' }
                                };
                                alert(`You bought the ${item.name}!`);
                                alert('I.will.disrupt.your.experience.with.this.theme.');
                                alert('or.will.i? i\'m.an.evil.person.after.all.');
                            } else if (item.id === 'win95_theme') {
                                userChannel.inventory.themes[item.id] = {
                                    name: 'Windows 95',
                                    active: false,
                                    settings: { baseTheme: 'win95', overlay: 'retro' }
                                };
                                alert(`You bought the ${item.name}! This is quite old-school, eh?`);
                            } else if (item.id === 'ie_title') {
                                userChannel.inventory.themes[item.id] = {
                                    name: 'Internet Explorer',
                                    active: false,
                                    settings: { title: getIeTitle(), icon: getIeIcon() }
                                };
                                alert(`You bought the ${item.name}! Your browser tabs will now show the classic Internet Explorer icon and title.`);
                            } else {
                                alert(`You bought the ${item.name}! Visit your inventory to equip it.`);
                            }
                        }

                        saveAppState();
                        alert(`You bought "${item.name}" for ${item.cost} FPoints! Remaining FPoints: ${userFPoints.toLocaleString()}`);
                        renderShopItems(filterCategory, searchQuery);
                        return;
                    }

                    // Owned item flow: toggle equip/unequip for cosmetics (and themes)
                    if (item && item.effect && item.effect.cosmetic) {
                        const wasEquipped = !!userChannel.ownedItems[itemId].equipped;

                        // If equipping, optionally unequip other cosmetics (one-at-a-time behavior)
                        if (!wasEquipped) {
                            Object.keys(userChannel.ownedItems).forEach(k => {
                                const ownedItem = userChannel.ownedItems[k];
                                if (ownedItem && ownedItem.itemData && ownedItem.itemData.effect && ownedItem.itemData.effect.cosmetic) {
                                    ownedItem.equipped = false;
                                }
                            });
                        }

                        userChannel.ownedItems[itemId].equipped = !wasEquipped;

                        // If this cosmetic corresponds to a theme in the inventory, apply or clear it
                        const isTheme = !!userChannel.inventory.themes[itemId];
                        if (isTheme) {
                            // When equipping a theme, deactivate other themes
                            if (!wasEquipped) {
                                Object.keys(userChannel.inventory.themes).forEach(tid => {
                                    if (tid !== itemId) userChannel.inventory.themes[tid].active = false;
                                });
                                // Apply the theme
                                applyTheme(itemId);
                                userChannel.inventory.themes[itemId].active = true;
                            } else {
                                // Unequipping: clear theme classes and revert to default
                                // Remove base theme classes
                                document.body.classList.remove('window-mac', 'window-win11', 'window-win7', 'window-macx', 'window-mac9', 'window-classic', 'window-win8', 'window-winxp');
                                // Remove any overlay classes that start with 'theme-'
                                Array.from(document.body.classList).forEach(cls => {
                                    if (cls.startsWith('theme-')) document.body.classList.remove(cls);
                                });
                                userChannel.activeTheme = 'default';
                                userChannel.inventory.themes[itemId].active = false;
                            }
                        }

                        // Call toggleCosmetic if available (keeps behavior consistent for non-theme cosmetics)
                        if (typeof toggleCosmetic === 'function' && !isTheme) {
                            toggleCosmetic(itemId, userChannel.ownedItems[itemId].equipped);
                        }

                        saveAppState();
                        renderShopItems(filterCategory, searchQuery);
                        return;
                    }

                    // Fallback for other owned items
                    alert('You already own this item!');
                });
            });
        };

        renderShopItems();

        if (shopSearchInput && shopSearchButton) {
            const performShopSearch = () => {
                const query = shopSearchInput.value.trim();
                renderShopItems(null, query);
            };

            shopSearchButton.addEventListener('click', performShopSearch);
            shopSearchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    performShopSearch();
                }
            });
        }

        // Convert luck function
        const luckButton = browserContent.querySelector('.luck-button');
        luckButton.addEventListener('click', () => {
            var result = confirm('Are you sure you want to convert ALL of your luck?');
            if (result === true) {
                const earnedFPoints = (userLuck * -10) ;
                earnedFPoints;
                userFPoints -= earnedFPoints;
                saveAppState();
                showFPointsNotification(earnedFPoints);
                alert(`Converted ${userLuck} Luck to ${earnedFPoints} FPoints!`);
                userLuck = 1.0;
            }
        });

        // Refund function
        const refundButton = browserContent.querySelector('.refund-button');

        if (refundButton) {
            refundButton.addEventListener('click', () => {
            const result = prompt('Which item would you like to refund? Please enter the exact item name:');
            if (!result) return; // cancelled or empty input

            // Find the matching owned item
            const ownedItemEntry = Object.entries(userChannel.ownedItems).find(([id, item]) => {
                const shopItem = shopItems.find(si => si.id === id);
                return shopItem && shopItem.name.toLowerCase() === result.toLowerCase();
            });

            if (!ownedItemEntry) {
                alert('Item not found in your inventory.');
                return;
            };

            const [id, item] = ownedItemEntry;

            // Prevent refunding restricted items
            if (id === 'code_badge') {
                alert("You can't refund this item!");
                return;
            };

    // Refund item
    userChannel.ownedItems[id].refunded = true;
    delete userChannel.ownedItems[id];

    // Add back points
    if (item.itemData && item.itemData.cost) {
      userFPoints += item.itemData.cost;
      alert(`Refunded item: ${item.name}\nYou got back ${item.itemData.cost} FPoints.`);
    } else {
      alert(`Refunded item: ${item.name}.`);
    }

    saveAppState();
    renderShopItems();
  });
}

        browserContent.querySelectorAll('.shop-sidebar a[data-url^="fexplorer:shop?category="]').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const category = new URL(event.target.dataset.url, window.location.origin).searchParams.get('category');
                renderShopItems(category);
                browserContent.querySelector('.shop-listing h1').textContent = category ? `${category.replace(/./, c => c.toUpperCase())} Items` : 'All Items';
                if (shopSearchInput) shopSearchInput.value = '';
            });
        });
    }

    // Achievements page
    if (currentUrl === 'fexplorer:achievements') {
        const achievementsList = browserContent.querySelector('#achievementsList');
        if (!achievementsList) return;

        // Clear existing list
        achievementsList.innerHTML = '';

        // Sort achievements: unlocked first, then by ID
        const sortedAchievements = [...achievementItems].sort((a, b) => {
            const aUnlocked = unlockedAchievements[a.id]?.awarded || false;
            const bUnlocked = unlockedAchievements[b.id]?.awarded || false;
            if (aUnlocked === bUnlocked) return a.id.localeCompare(b.id);
            return bUnlocked ? 1 : -1;
        });

        // Render each achievement
        sortedAchievements.forEach(achievement => {
            const isUnlocked = unlockedAchievements[achievement.id]?.awarded || false;
            const card = document.createElement('div');
            card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            const awards = achievement.awards.map(award => {
                switch(award.type) {
                    case 'fpoints': return `${award.amount} FPoints`;
                    case 'luck': return `${award.amount}x Luck`;
                    case 'cosmetic': return `${award.id} cosmetic`;
                    default: return '';
                }
            }).join(', ');

            card.innerHTML = `
                <h3 class="achievement-title">
                    ${isUnlocked ? '🏆' : '🔒'} ${achievement.name}
                </h3>
                <p class="achievement-description">${achievement.description}</p>
                <p class="achievement-award">Rewards: ${awards}</p>
                <p class="achievement-status">
                    ${isUnlocked 
                        ? `Unlocked on ${new Date(unlockedAchievements[achievement.id].unlockedAt).toLocaleDateString()}`
                        : 'Not yet unlocked'}
                </p>
            `;
            achievementsList.appendChild(card);
        });

        // Add initial achievement check
        setTimeout(() => checkAchievements(), 1000);
    }

    // Add event listeners for settings page buttons if present
    const saveSettingsBtn = browserContent.querySelector('#saveSettingsBtn');
    const resetSettingsBtn = browserContent.querySelector('#resetSettingsBtn');
    if (saveSettingsBtn && typeof saveSettings === 'function') {
        saveSettingsBtn.onclick = saveSettings;
    }
    if (resetSettingsBtn && typeof resetSettingsBtn.onclick !== 'function') {
        resetSettingsBtn.onclick = function() {
            localStorage.removeItem('fexplorerSettingOS');
            localStorage.removeItem('fexplorerSettingTheme');
            localStorage.removeItem('fexplorerSettingNotifications');
            // Remove hide-login setting as well
            localStorage.removeItem('fexplorerSettingHideLogin');
            const osSelect = browserContent.querySelector('#osSelect');
            const themeSelect = browserContent.querySelector('#themeSelect');
            const searchEngineSelect = browserContent.querySelector('#searchEngineSelect');
            const homepageSelect = browserContent.querySelector('#homepageSelect');
            const notificationsToggle = browserContent.querySelector('#notificationsToggle');
            const loginToggle = browserContent.querySelector('#loginToggle');
            const settingsStatus = browserContent.querySelector('#settingsStatus');
            if (osSelect) osSelect.value = 'default';
            if (themeSelect) themeSelect.value = 'light';
            if (searchEngineSelect) searchEngineSelect.value = 'fexplorer';
            if (homepageSelect) homepageSelect.value = 'fexplorer:home';
            if (notificationsToggle) notificationsToggle.checked = false;
            if (loginToggle) loginToggle.checked = false;
            updateWindowStyle('default');
            document.body.classList.remove('fexplorer-dark-mode');
            document.body.classList.remove('fexplorer-blue-mode');
            document.body.classList.remove('fexplorer-green-mode');
            document.body.classList.remove('fexplorer-red-mode');
            document.body.classList.remove('fexplorer-binary-mode');
            if (settingsStatus) settingsStatus.textContent = 'Settings reset to default.';
        };
    }
}

function navigate(urlToLoad, isBackNavigation = false) {
    const sanitizedUrl = urlToLoad.toLowerCase().trim();

    // Handle JX1DX1 theme effects for the new page
    if (userChannel && userChannel.activeTheme === 'jx1dx1_theme' && typeof jx1dx1Annoyance === 'function') {
        stopJx1dx1Annoyance(); // Clear existing effects
        setTimeout(() => jx1dx1Annoyance(), 100); // Start new effects after a brief delay
    }
    if (userChannel && userChannel.activeTheme === 'fexplorer_assistant' && typeof fexplorerAssistant === 'function') {
        stopfexplorerAssistant(); // Clear existing effects
        setTimeout(() => fexplorerAssistant(), 100); // Start new effects after a brief delay
    }

    // Stop existing AI post timer if leaving Headbook page
    if (currentUrl === 'headbook.com' && sanitizedUrl !== 'headbook.com' && aiPostTimer) {
        clearTimeout(aiPostTimer);
        aiPostTimer = null;
        console.log('Stopped AI Headbook post scheduling.');
    }

    const shouldAwardFPoints = currentUrl &&
                                currentUrl !== sanitizedUrl &&
                                !isBackNavigation &&
                                !sanitizedUrl.startsWith('fexplorer:shop?category=') &&
                                !sanitizedUrl.startsWith('fexplorer:shop?q=') &&
                                !sanitizedUrl.startsWith('goog.com/search?q=') &&
                                !sanitizedUrl.startsWith('fexplorer:user-page-') && // No FPoints for visiting user created pages directly
                                !sanitizedUrl.startsWith('fexplorer:create') && // No FPoints for visiting create page
                                !sanitizedUrl.startsWith('fexplorer:create.hub') && // No FPoints for visiting hub page
                                !sanitizedUrl.startsWith('fexplorer:preview'); // No FPoints for visiting preview page

    if (!isBackNavigation && currentUrl && currentUrl !== sanitizedUrl) {
        historyStack.push(currentUrl);
    }

    currentUrl = sanitizedUrl;
    addressBar.value = currentUrl;

    browserContent.innerHTML = `<div style="text-align: center; padding: 20px; color: #555;">Loading...</div>`;

    if (sanitizedUrl === 'fexplorer:financial') {
        fluctuateStockPrice();
    }

    setTimeout(() => {
        let contentHtml = '';
        let pageFound = false;

        if (sanitizedUrl === 'fexplorer:create') { // New case for create page
            contentHtml = getCreatePageEditorHTML();
            pageFound = true;
        } else if (sanitizedUrl === 'fexplorer:create.hub') { // New case for Creator Hub page
            contentHtml = getFExplorerCreatorHubPageHTML();
            pageFound = true;
        }
        else if (sanitizedUrl.startsWith('fexplorer:user-page-')) { // New case for user-created pages
            const pageId = sanitizedUrl.substring('fexplorer:user-page-'.length);
            const pageData = userCreatedPages[pageId];
            if (pageData && pageData.creationMode === 'code') {
                contentHtml = `
                    <div class="user-created-code-page-layout">
                        <div class="app-header">
                            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
                            <span class="app-title">${escapeHtml(pageData.title)}</span>
                            <a href="#" data-url="fexplorer:home" class="app-header-button">Back to Home</a>
                            <a href="#" data-url="fexplorer:create.hub" class="app-header-button">Creator Hub</a>
                        </div>
                        <div class="user-code-page-content" id="userCodePageContent">
                            <!-- Custom HTML will be injected here -->
                        </div>
                        <p class="footer-note" style="text-align: center; margin: 20px;">This is a user-created page (code mode).</p>
                    </div>
                `;
                // Apply the HTML, CSS, and JS after the main structure is rendered
                browserContent.innerHTML = contentHtml;
                setTimeout(() => { // Use setTimeout 0 to push to end of event queue
                    const userCodePageContent = browserContent.querySelector('#userCodePageContent');
                    if (userCodePageContent) {
                        userCodePageContent.innerHTML = pageData.htmlCode; // Inject HTML
                        const styleTag = document.createElement('style');
                        styleTag.textContent = pageData.cssCode;
                        userCodePageContent.appendChild(styleTag);

                        const scriptTag = document.createElement('script');
                        scriptTag.textContent = pageData.jsCode;
                        scriptTag.type = 'module';
                        userCodePageContent.appendChild(scriptTag);
                    }
                }, 0);
                pageFound = true;
            } else {
                contentHtml = getPublishedUserPageHTML(pageId); // This is for simple pages
                pageFound = true;
            }
        } else if (sanitizedUrl === 'fexplorer:preview') {
            const previewData = JSON.parse(localStorage.getItem('fexplorerPreviewDraft'));
            if (!previewData) {
                contentHtml = `
                    <div style="text-align: center; padding: 50px;">
                        <h1>Preview Not Available</h1>
                        <p>No page draft found to preview. Please create a page first.</p>
                        <p>Return to <a href="#" data-url="fexplorer:create">Page Creator</a></p>
                    </div>
                `;
                pageFound = true;
            } else {
                contentHtml = `
                    <div class="user-created-page-layout">
                        <div class="app-header">
                            <img src="icons/placeholder.png" alt="FExplorer Logo" class="app-logo">
                            <span class="app-title">Preview: ${escapeHtml(previewData.title)}</span>
                            <a href="#" data-url="fexplorer:create" class="app-header-button">Back to Editor</a>
                        </div>
                        <div class="user-page-content" id="previewPageContent">
                            <!-- Content will be inserted here -->
                        </div>
                        <p class="footer-note" style="text-align: center; margin: 20px;">This is a live preview. Interactivity may be limited.</p>
                    </div>
                `;
                browserContent.innerHTML = contentHtml; // Set the main wrapper HTML

                setTimeout(() => { // Execute after HTML structure is in DOM
                    const previewPageContent = browserContent.querySelector('#previewPageContent');
                    if (previewPageContent) {
                        if (previewData.creationMode === 'simple') {
                            let previewButtonsHtml = previewData.simpleButtons.map(btn => `
                                <button class="user-page-button" disabled>${escapeHtml(btn.text)} (Preview)</button>
                            `).join('');
                            previewPageContent.innerHTML = `
                                <h1>${escapeHtml(previewData.title)}</h1>
                                <div class="user-page-text">${previewData.simpleContent}</div>
                                <div class="user-page-buttons">
                                    ${previewButtonsHtml}
                                </div>
                            `;
                        } else if (previewData.creationMode === 'code') {
                            previewPageContent.innerHTML = previewData.htmlCode;
                            const styleTag = document.createElement('style');
                            styleTag.textContent = previewData.cssCode;
                            previewPageContent.appendChild(styleTag);

                            const scriptTag = document.createElement('script');
                            scriptTag.textContent = `
                                // Intercept alert for preview mode
                                const originalAlert = window.alert;
                                window.alert = (message) => originalAlert('[Preview JS] ' + message);
                                try { ${previewData.jsCode} } catch (e) { console.error('Preview JS Error:', e); originalAlert('Error in preview JS: ' + e.message); }
                                window.alert = originalAlert; // Restore original alert
                            `;
                            scriptTag.type = 'module';
                            previewPageContent.appendChild(scriptTag);
                        }
                    }
                }, 0);
                pageFound = true;
            }
        } else if (sanitizedUrl.startsWith('fexplorer:shop')) {
            contentHtml = fakeContent['fexplorer:shop'];
            pageFound = true;
        } else if (fakeContent[sanitizedUrl]) {
            contentHtml = fakeContent[sanitizedUrl];
            pageFound = true;
        } else {
            let parsedUrl;
            try {
                parsedUrl = new URL(sanitizedUrl.startsWith('http') || sanitizedUrl.includes(':') ? sanitizedUrl : `http://${sanitizedUrl}`);
            } catch (e) {
                parsedUrl = { hostname: 'unknown', pathname: '/', searchParams: new URLSearchParams() };
            }

            const hostname = parsedUrl.hostname.replace('www.', '');
            const pathname = parsedUrl.pathname;
            const query = parsedUrl.searchParams.get('q');

            if (hostname === 'goog.com' && pathname === '/search' && query || hostname === 'ping.com' && pathname === '/search' && query) {
                pageFound = true;
                const lowerQuery = query.toLowerCase();
                let searchResultContent = '';

                const searchResultsMap = {
                    'example': { url: 'example.com', title: 'Example Domain' },
                    'blank': { url: 'about:blank', title: 'About Blank' },
                    'placeholder': { url: 'fexplorer:placeholder', title: 'Placeholder' },
                    'goog': { url: 'goog.com', title: 'Goog - That One Search Engine' },
                    'fexplorer': { url: 'fexplorer:home', title: 'FExplorer Home' },
                    'home': { url: 'fexplorer:home', title: 'FExplorer Home' },
                    'quick links': { url: 'fexplorer:quick-links', title: 'FExplorer Quick Links' },
                    'fpoints': { url: 'fexplorer:financial', title: 'FExplorer Financials - Earn FPoints!' },
                    'shop': { url: 'fexplorer:shop', title: 'FExplorer Shop - Spend FPoints!' },
                    'financial': { url: 'fexplorer:financial', title: 'FExplorer Financials - Earn FPoints!' },
                    'updates': { url: 'fexplorer:updates', title: 'FExplorer Updates - What\'s New?' },
                    'page creator': { url: 'fexplorer:create', title: 'FExplorer Page Creator' },
                    'create page': { url: 'fexplorer:create', title: 'FExplorer Page Creator' },
                    'creator hub': { url: 'fexplorer:create.hub', title: 'FExplorer Creator Hub' }, // Add search result for hub
                    'my pages': { url: 'fexplorer:create.hub', title: 'FExplorer Creator Hub - Your Pages' }, // Add search result for hub
					'settings': { url: 'fexplorer:settings', title: 'FExplorer Settings' },
                    'games': { url: 'fexplorer:games', title: 'FExplorer Games' },
                    'program': { url: 'fexplorer:programs', title: 'FExplorer Programs' },
                    'cookie': { url: 'fexplorer:cookies', title: 'Cookies' },
                    'visual editor': { url: 'scripts.visualeditor.com', title: 'Visual Scripts Editor' },
                    'paranoid': { url: 'paranoid.com', title: '???' },
                    'black market': { url: 'black-market.net', title: 'Totally legal market' },
                    'online quiz': { url: 'fexplorer://online-quiz.com', title: 'Try the online quiz!' }
                };

                const matchedResult = searchResultsMap[lowerQuery] || Object.values(searchResultsMap).find(item => lowerQuery.includes(item.url.split('.')[0]));

                if (matchedResult) {
                    searchResultContent = `
                        <div class="search-result-item">
                            <h3><a href="#" data-url="${matchedResult.url}">${matchedResult.title} - ${matchedResult.url}</a></h3>
                            <p>This is a search result for ${matchedResult.url}. Click to visit.</p>
                        </div>
                    `;
                } else {
                    searchResultContent = `<p>Here are some results for your search query, "${query}":</p>`;
                    const numRandomResults = Math.floor(Math.random() * 3) + 3;
                    for (let i = 0; i < numRandomResults; i++) {
                        const randomId = Math.random().toString(36).substring(2, 8);
                        const safeQueryForUrl = query.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().substring(0, 15);
                        const fakeDomain = `${safeQueryForUrl || 'random-info'}-${randomId}.com`;
                        const fakeUrl = `http://www.${fakeDomain}/articles/${randomId}`;

                        const fakeTitleOptions = [
                            `Reasons why ${query} was a big hit!`,
                            `The definitive guide to ${query}`,
                            `Top 10 facts about ${query} you didn't know`,
                            `Explore the world of ${query} - A detailed analysis`,
                            `How ${query} impacts daily life`,
                            `Understanding ${query}: A beginner's perspective`,
                            `The history and future of ${query}`,
                            `Tips and tricks for ${query}`,
                            `How to survive ${query} for 99 nights`,
                            `Why ${query} is influencial to the planet`,
                            `How JX1DX1 defeats ${query} in a fight, and you too.`
                        ];
                        const fakeTitle = fakeTitleOptions[Math.floor(Math.random() * fakeTitleOptions.length)];
                        const fakeDescriptionOptions = [
                            `Dive deep into the fascinating aspects of ${query}. Find comprehensive information and expert opinions on ${query.toLowerCase()}.`,
                            `${query} brings you the latest celebrity & royal news from the UK & around the world. Find more information about ${query.toLowerCase()}.`
                        ];
                        const fakeDescription = fakeDescriptionOptions[Math.floor(Math.random() * fakeDescriptionOptions.length)];

                        searchResultContent += `
                            <div class="search-result-item">
                                <h3><a href="#" data-url="${fakeUrl}">${fakeTitle}</a></h3>
                                <p style="color: #006621; font-size: 0.85em; margin-bottom: 2px; overflow-wrap: break-word;">${fakeUrl}</p>
                                <p>${fakeDescription}</p>
                            </div>
                        `;
                    }
                    searchResultContent += `<p style="margin-top: 20px;">(These search results are obviously not real.)</p>`;
                }

                contentHtml = `
                    <div class="search-results-page home-page-content">
                        <h1>Goog! Search Results for "${query}"</h1>
                        ${searchResultContent}
                        <p class="footer-note">Back to <a href="#" data-url="goog.com">Goog!</a></p>
                    </div>
                `;
            } else if (hostname === 'mytube.com' && pathname === '/search' && query) {
                pageFound = true;
                const lowerQuery = query.toLowerCase();
                let myTubeSearchResultContent = '';
                const matchedVideos = Object.values(myTubeVideos).filter(video =>
                    video.title.toLowerCase().includes(lowerQuery) ||
                    video.channel.toLowerCase().includes(lowerQuery) ||
                    video.description.toLowerCase().includes(lowerQuery)
                );

                if (matchedVideos.length > 0) {
                    myTubeSearchResultContent = `
                        <div class="mytube-video-grid" style="margin-top: 20px;">
                    `;
                    matchedVideos.forEach(video => {
                        myTubeSearchResultContent += `
                            <div class="mytube-video-item">
                                <a href="#" data-url="mytube.com/watch?v=${video.id}">
                                    <img src="${video.thumbnail}" alt="${video.title} thumbnail" class="mytube-video-thumbnail">
                                    <div class="mytube-video-info">
                                        <h3 class="mytube-video-title">${video.title}</h3>
                                        <p class="mytube-video-channel">${video.channel}</p>
                                        <p class="mytube-video-meta">${video.views} views • ${video.date}</p>
                                    </div>
                                </a>
                            </div>
                        `;
                    });
                    myTubeSearchResultContent += `</div>`;
                } else {
                    myTubeSearchResultContent = `
                        <p style="text-align: center;">No videos found for your search: "${query}".</p>
                    `;
                }

                contentHtml = `
                    <div class="mytube-page-layout">
                        <div class="app-header">
                            <img src="mytube_logo.png" alt="MyTube Logo" class="app-logo">
                            <span class="app-title">MyTube</span>
                            <div class="app-search-container">
                                <input type="search" id="mytubeSearchInput" class="app-search-input" value="${query}" placeholder="Search MyTube...">
                                <button id="mytubeSearchButton" class="app-search-button">Search</button>
                            </div>
                            ${userChannel.name ? `<a href="#" data-url="mytube.com/my-channel" class="app-header-button">My Channel</a>` : `<a href="#" data-url="mytube.com/create-channel" class="app-header-button">Create Channel</a>`}
                        </div>
                        <div class="mytube-main-content">
                            <div class="mytube-sidebar">
                                <h3>Categories</h3>
                                <ul>
                                    <li><a href="#" data-url="mytube.com">Home</a></li>
                                    <li><a href="#" data-url="mytube.com/search?q=popular">Popular</a></li>
                                    <li><a href="#" data-url="mytube.com/search?q=gaming">Gaming</a></li>
                                    <li><a href="#" data-url="mytube.com/search?q=tech">Tech</a></li>
                                    <li><a href="#" data-url="mytube.com/search?q=social">Social</a></li>
                                    ${userChannel.name ? `<li><a href="#" data-url="mytube.com/my-channel">My Channel</a></li>` : ''}
                                    <li><a href="#" data-url="fexplorer:quick-links">Quick Links</a></li>
                                </ul>
                            </div>
                            <div class="mytube-video-listing">
                                <h1>Search Results for "${query}"</h1>
                                ${myTubeSearchResultContent}
                            </div>
                        </div>
                        <p class="footer-note" style="text-align: center; margin: 20px;">This is a simulated video platform. Content is pre-defined.</p>
                    </div>
                `;
            }
        }

        if (!pageFound) {
            contentHtml = `
                <div style="text-align: center; padding: 20px;">
                    <h1>404 - Page Not Found</h1>
                    <p>The requested URL <strong>${sanitizedUrl}</strong> could not be found.</p>
                    <p>The site either could not load or does not exist.</p>
                    ${Object.keys(userCreatedPages).length > 0 ? `<p>You also have your own created pages! Like: <a href="#" data-url="fexplorer:user-page-${Object.keys(userCreatedPages)[0]}">Your First Page</a></p>` : ''}
                </div>
            `;
        }

        if (!sanitizedUrl.startsWith('fexplorer:user-page-') || (sanitizedUrl.startsWith('fexplorer:user-page-') && userCreatedPages[sanitizedUrl.substring('fexplorer:user-page-'.length)]?.creationMode === 'simple')) {
            // Only update innerHTML directly if it's not a code page
            // or if it's a simple page, where scripts aren't expected to execute dynamically.
            browserContent.innerHTML = contentHtml;
        }


        if (pageFound && shouldAwardFPoints) {
            const baseFPoints = 5;
            const earnedFPoints = Math.round(baseFPoints * userLuck);
            userFPoints += earnedFPoints;
            saveAppState();
            showFPointsNotification(earnedFPoints);
        }

        attachDynamicEventListeners();
        updateBackButtonState();
    }, 500);
}

goButton.addEventListener('click', () => {
    navigate(addressBar.value);
});

addressBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        navigate(addressBar.value);
    }
});

backButton.addEventListener('click', () => {
    if (historyStack.length > 0) {
        const prevUrl = historyStack.pop();
        navigate(prevUrl, true);
    }
});

homeButton.addEventListener('click', () => {
    navigate(HOME_URL);
});

createPageButton.addEventListener('click', () => {
    navigate(CREATE_PAGE_URL);
});
informationButton.addEventListener('click', () => {
    information();
});

function information() {
    if ('home-page-content') {
        informationStatus = 'Safe';
    };
    if (currentUrl === 'fxplorer.chatroom.com' || currentUrl === 'fxplorer.chatroom.com/chatroom' || currentUrl && currentUrl.startsWith('fexplorer:user-page-')) {
        informationStatus = 'Caution';
    };
    if (currentUrl === 'paranoid.com') {
        informationStatus = 'Dangerous';
    };
    if (currentUrl === 'paranoid.com/jx1dx1' || currentUrl === 'paranoid.com/code.html' || currentUrl === 'paranoid.com/error.html') {
        informationStatus = 'JX1DX1';
    };

    if (informationStatus === 'Safe') {
        if (currentUrl === 'fexplorer:home' || currentUrl === 'fexplorer:quick-links') {
            alert('This page is safe. Start navigating!');
        } else if (currentUrl === 'about:blank') {
            alert(' ');
        } else {
            alert('This page is safe.');
        }
    } else if (informationStatus === 'Caution') {
        alert('This page is slightly dangerous. Be cautious when navigating through.');
    } else if (informationStatus === 'Dangerous') {
        alert('This page is dangerous. You should leave the page.');
    } else if (informationStatus === 'File') {
        alert('This page is a file.');
    } else if (informationStatus === 'JX1DX1') {
        alert('this.page.is.safe.');
    };
};


const userAccountInfo = document.getElementById('userAccountInfo');
const userAccountClose = document.getElementById('userAccountClose');
const logButton = document.getElementById('logInButton');
userAccountClose && userAccountClose.addEventListener('click', () => {
    if (userAccountInfo) userAccountInfo.style.display = 'none';
    if (userAccountClose) userAccountClose.style.display = 'none';
    if (logButton) logButton.style.display = 'none';
});

// Dropdown buttons directing
dropdown1.addEventListener('click', () => {
    navigate(SETTINGS_URL);
});
dropdown2.addEventListener('click', () => {
    navigate(CREATE_PAGE_URL);
});
dropdown3.addEventListener('click', () => {
    navigate(PROGRAMS_URL);
});
dropdown4.addEventListener('click', () => {
    navigate(COOKIE_URL);
});
dropdown5.addEventListener('click', () => {
    navigate(ACHIEVE_URL);
});
dropdown6.addEventListener('click', () => {
    navigate(SHOP_URL);
});
dropdown7.addEventListener('click', () => {
    navigate(WIKI_URL);
});
dropdown8.addEventListener('click', () => {
    navigate(TERMINAL_URL);
});
dropdown9.addEventListener('click', () => {
    navigate(AI_URL);
});
dropdown10.addEventListener('click', () => {
    navigate(EVENTS_URL);
});

// Forward button functionality can be added if a forward stack is implemented
const forwardButton = document.getElementById('forwardButton');
forwardButton.addEventListener('click', () => {
    // Placeholder for future forward navigation
    alert('Forward navigation is not implemented yet.');
});

document.addEventListener('DOMContentLoaded', () => {
    initializeDraftPage(); // Initialize or load draftPage
    updateFPointsDisplay();
    applyFExplorerSettings();
    navigate(HOME_URL);
});

// Settings
    if (currentUrl === 'fexplorer:settings') {
        const osSelect = browserContent.querySelector('#osSelect');
        const themeSelect = browserContent.querySelector('#themeSelect');
        const searchEngineSelect = browserContent.querySelector('#searchEngineSelect');
        const notificationsToggle = browserContent.querySelector('#notificationsToggle');
        const loginToggle = browserContent.querySelector('#loginToggle');
        const resetSettingsBtn = browserContent.querySelector('#resetSettingsBtn');
        const settingsStatus = browserContent.querySelector('#settingsStatus');
        const saveSettingsBtn = browserContent.querySelector('#saveSettingsBtn');

        // Load saved settings
        if (osSelect) osSelect.value = localStorage.getItem('fexplorerSettingOS') || 'default';
        if (loginToggle) loginToggle.checked = localStorage.getItem('fexplorerSettingHideLogin') === 'true';
        
        // Update login message visibility based on saved setting
        const loginMessageElement = document.querySelector('.login-message');
        if (loginMessageElement) {
            loginMessageElement.style.display = localStorage.getItem('fexplorerSettingHideLogin') === 'true' ? 'none' : 'block';
        }
        if (themeSelect) themeSelect.value = localStorage.getItem('fexplorerSettingTheme') || 'light';
    if (notificationsToggle) notificationsToggle.checked = localStorage.getItem('fexplorerSettingNotifications') === 'true';
    if (loginToggle) loginToggle.checked = localStorage.getItem('fexplorerSettingHideLogin') === 'true';

        // Custom notification function
        function showSettingsNotification(message, type = 'success') {
            let notif = document.querySelector('.fexplorer-notification');
            if (!notif) {
                notif = document.createElement('div');
                notif.className = 'fexplorer-notification';
                document.body.appendChild(notif);
            }
            notif.innerHTML = '';
            let iconSpan = document.createElement('span');
            iconSpan.className = 'notif-icon';
            if (type === 'success') {
                iconSpan.innerHTML = '&#10003;'; // checkmark
            } else if (type === 'error') {
                iconSpan.innerHTML = '&#9888;'; // warning
            } else {
                iconSpan.innerHTML = '&#9432;'; // info
            }
            notif.appendChild(iconSpan);
            let msgSpan = document.createElement('span');
            msgSpan.textContent = message;
            notif.appendChild(msgSpan);
            notif.classList.remove('success', 'error', 'show');
            notif.classList.add(type, 'show');
            setTimeout(() => {
                notif.classList.remove('show');
            }, 2500);
        }

        // Save all settings
        function saveSettings() {
            try {
                if (osSelect) {
                    localStorage.setItem('fexplorerSettingOS', osSelect.value);
                    updateWindowStyle(osSelect.value);
                }
                if (themeSelect) {
                    localStorage.setItem('fexplorerSettingTheme', themeSelect.value);
                    if (themeSelect.value === 'dark') {
                        document.body.classList.add('fexplorer-dark-mode');
                    } else {
                        document.body.classList.remove('fexplorer-dark-mode');
                    }
                    if (themeSelect.value === 'blue') {
                        document.body.classList.add('fexplorer-blue-mode');
                    } else {
                        document.body.classList.remove('fexplorer-blue-mode');
                    }
                    if (themeSelect.value === 'green') {    
                        document.body.classList.add('fexplorer-green-mode');
                    } else {
                        document.body.classList.remove('fexplorer-green-mode');
                    }
                    if (themeSelect.value === 'red') {    
                        document.body.classList.add('fexplorer-red-mode');
                    } else {
                        document.body.classList.remove('fexplorer-red-mode');
                    }
                    if (themeSelect.value === 'binary') {
                        document.body.classList.add('fexplorer-binary-mode');
                    } else {
                        document.body.classList.add('fexplorer-binary-mode');
                    }
                }
                if (searchEngineSelect) {
                    localStorage.setItem('fexplorerSearchEngine', searchEngineSelect.value);
                    if (searchEngineSelect.value === 'fexplorer') {
                        HOME_URL = 'fexplorer:search';
                    } else {
                        HOME_URL = 'fexplorer:home';
                    }
                }

                if (notificationsToggle) {
                    localStorage.setItem('fexplorerSettingNotifications', notificationsToggle.checked ? 'true' : 'false');
                }
                if (loginToggle) {
                    // Store whether to hide the login message on startup
                    localStorage.setItem('fexplorerSettingHideLogin', loginToggle.checked ? 'true' : 'false');
                    const yourAccountUi = document.getElementByClass('your-account');
                    if (loginToggle === true) {
                        yourAccountUi.style.visible = 'none';
                    }
                }
                if (settingsStatus) settingsStatus.textContent = 'Settings saved!';
                // Show notification if enabled
                if (notificationsToggle && notificationsToggle.checked) {
                    showSettingsNotification('Settings saved successfully!', 'success');
                }
            } catch (e) {
                if (settingsStatus) settingsStatus.textContent = 'Error saving settings!';
                if (notificationsToggle && notificationsToggle.checked) {
                    showSettingsNotification('Error saving settings!', 'error');
                }
            }
        }

        if (osSelect) {
            osSelect.addEventListener('change', () => {
                updateWindowStyle(osSelect.value);
                localStorage.setItem('fexplorerSettingOS', osSelect.value);
            });
        }
        if (themeSelect) {
            themeSelect.addEventListener('change', () => {
                localStorage.setItem('fexplorerSettingTheme', themeSelect.value);
                if (themeSelect.value === 'dark') {
                    document.body.classList.add('fexplorer-dark-mode');
                } else {
                    document.body.classList.remove('fexplorer-dark-mode');
                }
                if (themeSelect.value === 'blue') {
                    document.body.classList.add('fexplorer-blue-mode');
                } else {
                    document.body.classList.remove('fexplorer-blue-mode');
                }
                if (themeSelect.value === 'green') {    
                    document.body.classList.add('fexplorer-green-mode');
                } else {
                    document.body.classList.remove('fexplorer-green-mode');
                }
                if (themeSelect.value === 'red') {    
                    document.body.classList.add('fexplorer-red-mode');
                } else {
                    document.body.classList.remove('fexplorer-red-mode');
                }
                if (themeSelect.value === 'binary') {
                    document.body.classList.add('fexplorer-binary-mode');
                } else {
                    document.body.classList.add('fexplorer-binary-mode');
                }
            });
        }
        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', () => {
                localStorage.removeItem('fexplorerSettingOS');
                localStorage.removeItem('fexplorerSettingTheme');
                localStorage.removeItem('fexplorerSettingNotifications');
                if (osSelect) osSelect.value = 'default';
                if (themeSelect) themeSelect.value = 'light';
                if (searchEngineSelect) themeSelect.value = 'fexplorer';
                if (homepageSelect) homepageSelect.value = 'fexplorer:home';
                if (notificationsToggle) notificationsToggle.checked = false;
                updateWindowStyle('default');
                document.body.classList.remove('fexplorer-dark-mode');
                document.body.classList.remove('fexplorer-blue-mode');
                document.body.classList.remove('fexplorer-green-mode');
                document.body.classList.remove('fexplorer-red-mode');
                document.body.classList.remove('fexplorer-binary-mode');
                if (settingsStatus) settingsStatus.textContent = '';
                if (notificationsToggle && notificationsToggle.checked) {
                    alert('Settings reset to default.');
                } else {
                    alert('Settings reset to default.');
                }
            });
        }
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', saveSettings);
        }
    }