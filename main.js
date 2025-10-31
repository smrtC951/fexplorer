// =============================
// OS Window Style Switching
// =============================
function updateWindowStyle(osValue) {
    const frame = document.querySelector('.browser-frame');
    const controls = frame.querySelector('.browser-buttons');
    if (!frame || !controls) return;

    frame.classList.remove('window-mac', 'window-win11', 'window-win7', 'window-macx');
    controls.classList.remove('left', 'right');

    switch (osValue) {
        case 'win11':
        case 'win7':
            frame.classList.add('window-win11');
            controls.classList.add('right'); // Windows-style: buttons on right
            break;
        case 'macx':
        case 'default':
        default:
            frame.classList.add('window-mac');
            controls.classList.add('left'); // macOS-style: buttons on left
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
        const notificationsToggle = browserContent.querySelector('#notificationsToggle');
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
        if (notificationsToggle) {
            localStorage.setItem('fexplorerSettingNotifications', notificationsToggle.checked ? 'true' : 'false');
        }

        if (settingsStatus) settingsStatus.textContent = 'Settings saved!';
    } catch (e) {
        console.error("Error saving settings", e);
    }
}

function resetSettings() {
    localStorage.removeItem('fexplorerSettingOS');
    localStorage.removeItem('fexplorerSettingTheme');
    localStorage.removeItem('fexplorerSettingNotifications');

    updateWindowStyle('default');
    document.body.classList.remove('dark-mode');

    const osSelect = browserContent.querySelector('#osSelect');
    const themeSelect = browserContent.querySelector('#themeSelect');
    const notificationsToggle = browserContent.querySelector('#notificationsToggle');
    const settingsStatus = browserContent.querySelector('#settingsStatus');

    if (osSelect) osSelect.value = 'default';
    if (themeSelect) themeSelect.value = 'Light';
    if (notificationsToggle) notificationsToggle.checked = false;
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
        frame.classList.remove('window-mac', 'window-win11', 'window-win7', 'window-macx');
        switch (osValue) {
            case 'win11':
                frame.classList.add('window-win11');
                break;
            case 'win7':
                frame.classList.add('window-win7');
                break;
            case 'macx':
                frame.classList.add('window-macx');
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
    stockOwned: 0,
    chatHistory: {}
    };
}
userChannel.ownedItems = userChannel.ownedItems || {};

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

function saveAppState() {
    localStorage.setItem('userFPoints', userFPoints.toString());
    localStorage.setItem('userCookies', userCookies.toString());
    localStorage.setItem('userLuck', userLuck.toString());
    localStorage.setItem('lastFinancialVisit', lastFinancialVisit.toString());
    localStorage.setItem('lastGoogSearchTime', lastGoogSearchTime.toString());
    localStorage.setItem('stockPrice', stockPrice.toFixed(2));
    localStorage.setItem('lastStockUpdate', lastStockUpdate.toString());
    localStorage.setItem('userCreatedPages', JSON.stringify(userCreatedPages)); // Save user created pages
    saveDraftPage(); // Save the current draft page state
    updateFPointsDisplay();
}

const shopItems = [
    { id: 'luck_boost_1', name: 'Minor Luck Charm', description: 'Slightly increases FPoint earnings from Goog!', cost: 500, effect: { luck: 0.1 }, icon: 'icons/goog-logo.png' },
    { id: 'luck_boost_2', name: 'Major Luck Amulet', description: 'Significantly increases FPoint earnings from Goog!', cost: 750, effect: { luck: 0.3 }, icon: 'icons/goog-logo.png' },
    { id: 'mystery_box', name: 'Mystery Box', description: 'Contains a random cool item!', cost: 1000, effect: { mystery: true }, icon: 'icons/placeholder.png' },
    { id: 'golden_hat', name: 'Golden Browser Hat', description: 'A stylish cosmetic hat for your FExplorer browser icon.', cost: 5000, effect: { cosmetic: 'golden_hat' }, icon: 'icons/sandbox-icon.png' },
    { id: 'speed_boost', name: 'Simulated Speed Boost', description: 'Makes browsing feel snappier (purely cosmetic).', cost: 750, effect: { cosmetic: 'speed_boost' }, icon: 'icons/placeholder.png' },
    { id: 'unluck_boost_1', name: 'Unlucky Charm', description: 'Decreases your luck slightly!', cost: 500, effect: { luck: -0.1 }, icon: 'icons/goog-logo.png' },
    { id: 'extra_storage', name: 'Cloud Storage (1TB)', description: 'Simulated cloud storage for your virtual files. (No actual storage)', cost: 1500, effect: { cosmetic: 'storage' }, icon: 'icons/placeholder.png' },
    { id: 'more_user_luck', name: 'More User Luck', description: 'Decreases chance of dangerous user pages!', cost: 3000, effect: { luck: 0.75 }, icon: 'icons/fexplorer.png' },
];

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
    notificationSpan.textContent = `+${amount}`;
    notificationSpan.classList.add('fpoints-notification');

    fpointsCounter.appendChild(notificationSpan);

    notificationSpan.addEventListener('animationend', () => {
        notificationSpan.remove();
    });
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
            <button id="googSearchButton" class="goog-search-button">Search!</button>
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
            <img src="icons/financial-icon.png" alt="FExplorer Logo" class="app-logo">
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

            <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
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
    // FExplorer Updates Page
    'fexplorer:updates': `
        <div class="updates-page-content">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Updates</h1>
            <p class="tagline">Stay informed about the latest features and upcoming changes!</p>
			<h2>Update Name: Demo 1.3 - The Major Update!</h2>
            <p>Release Date: October 31, 2025</p>

            <div class="updates-section">
                <h2>Current Updates</h2>
                <ul>
                    <li>Added more customization!</li>
                    <li>New main page!</li>
                    <li>New user page variants!</li>
                    <li>Upcoming game called WoBlocks!</li>
                    <li>New halloween user page variant!</li>
                </ul>
            </div>

            <div class="updates-section">
                <h2>Upcoming Updates</h2>
                <ul>
                    <li>Functionality on the search engines and Cookies</li>
					<li>Creator Hub rework soon!</li>
                    <li>More games coming soon!</li>
                    <li>More pages coming to you soon!</li>
                    <li>More bug fixes, probably</li>
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
                    <p style="color: red;">Warning: Some settings may not be functional yet!</p>
                    <p style="color: #ff6600ff;">Note: For the Operating System options, you have to reload the website to see the changes!</p>
                    <ul>
                        <li>
                            <label for="osSelect">Operating System</label>
                            <select id="osSelect">
                                <option value="default">Mac OS (Default)</option>
                                <option value="win11">Windows 11</option>
                                <option value="win7">Windows 7</option>
                                <option value="macx">Mac OS X</option>
                            </select>
                        </li>
                        <li>
                            <label for="themeSelect">Theme</label>
                            <select id="themeSelect">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="classic">Classic</option>
                            </select>
                        </li>
                        <li>
                            <label for="searchEngineSelect">Search Engine</label>
                            <select id="searchEngineSelect">
                                <option value="google">FExplorer Browser</option>
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
                            </select>
                        </li>
                        <li>
                            <label for="notificationsToggle">Enable Notifications</label>
                            <input type="checkbox" id="notificationsToggle">
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
                    <div class="app-header">
                        <img src="icons/fexplorer.png" class="app-logo" style="height: 50px; width: 50px;">
                        <p class="app-title">FExplorer Demo 1.3</p>
                    </div>
                </div>
                <div id="settingsStatus" style="margin-top:10px;color:#28a745;"></div>
            </div>
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
            <p>Our mission is to make browsing the internet more enjoyable and rewarding.</p>
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
                        <a href="#" data-url="fexplorer:placeholder">Visual Scripts Editor</a>
                        <p class="link-description">Script your own programs visually.</p>
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
                <p>Sandbox Building game would be here.</p>
                <div id="sandboxGameArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                <p>Game under development, stay tuned!</p>
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
                    <p>Game under development. Stay tuned!</p>
                </div>
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
        <div class="fexplorer-search-page">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Search</h1>
            <p>This is the default search engine for FExplorer.</p>
            <p>Use the search bar on the homepage to search the web!</p>
            <input type="search" class="home-page-search-input" placeholder="Search the web or type in a URL...">
            <button class="home-page-search-button">Search</button>
            <p class="footer-note">© FExplorer | Made by smrtC951!</p>
        </div>
    `,
    // Search Engine: Ping
    'ping.com': `
        <div class="goog-homepage ping-homepage">
            <img src="icons/ping-icon.png" alt="Ping Logo" class="ping-logo" style="width: 200px; margin-top: 40px;">
            <input type="search" id="googSearchInput" class="goog-search-input" placeholder="Search the web with Ping!">
            <button id="googSearchButton" class="goog-search-button">Search!</button>
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
            <p>Under construction. Stay tuned!</p>
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
            <p  id="cookieCounter" style="color: #cc7e0a">0 Cookies</p>
            <br>
            <button id="cookie-button" class="home-page-button">Trade FPoints for Cookies!</button>
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
                <ul class="quick-links">
                        <li>
                            <img src="icons/fexplorer.png" style="width: 50px; height=50px;">
                            <a>Welcome to FExplorer!</a>
                            <p class="link-description">Visit FExplorer for the first time!</p>
                        </li>
                        <li>
                            <img src="icons/financial-icon.png" style="width: 50px; height=50px;">
                            <a>Big Bucks</a>
                            <p class="link-description">Get your first 1000 FPoints</p>
                        </li>
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
            <p>Under construction. Stay tuned!</p>
            <br>
            <button class="bonus-button home-page-button">Bonus</button>
            </div>
        </div>
    `,
    // Terminal Page
    'file:terminal':`
        <div style="background-color: black; color: green; font-family: Consolas, sans-serif;">
            <p>hi</p>
        </div>
    `,
    // Corporate Pages
    // WoBlocks page
    'woblocks.com':`
        <div div class="home-page-content quick-links-content">
            <h1>WoBlocks</h1>
            <p class="tagline">The game.</p>
            <br>
            <p>Under construction!</p>
            <br>
            <button class="bonus-button">Bonus</button>
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
            <h2>Burger</h2>
            <p>Dogs are cool.</p>
            <br>
            <br>
            <br>
            <button class="bonus-button">Bonus</button>
        </div>
    `,
    'paranoid.com':`
        <div style="height: 450px; background-color: #4f0b0bff; color: #fff; font-family: Times New Roman;">
            <p>Does this website even exist?</p>
            <p>Mabye you're being paranoid.</p>
            <p>Mabye I am the one who is making you paranoid.</p>
        </div>
    `,
    'fexplorer:legacy':`
        <div class="home-page-content">
            <img src="icons/old-fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>Welcome to the FExplorer Legacy page!</h1>
            <p class="tagline">Your window to the simulated web.</p>
            <div class="quick-links-section">
                <h2>Visit the legacy version here!</h2>
                <div class="home-page-buttons-container">
                    <a href="https://smrtc951.github.io/fexplorer/legacy" class="home-page-button" >Visit!</a>
                </div>
            </div>
        </div>
    `,
};

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
    if (themeValue === 'custom') {
        document.body.classList.add('fexplorer-custom-mode');
    } else {
        document.body.classList.remove('fexplorer-custom-mode');
    }
    // Notifications (if you want to use this for future features)
    const notificationsEnabled = localStorage.getItem('fexplorerSettingNotifications') === 'true';
    // ...add notification logic here if needed...
}

function updateBackButtonState() {
    backButton.disabled = historyStack.length === 0;
}

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

    // Random Page button (its just a random page)
    const randomWebsiteButton = browserContent.querySelector('#randomWebsiteButton');
    if (randomWebsiteButton) {
        randomWebsiteButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * randomWebsiteUrls.length);
            const randomUrl = randomWebsiteUrls[randomIndex];
            navigate(randomUrl);
        });
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
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Mystery page
            `<div class="random-user-page">
                <h2>Mystery Page</h2>
                <p>What secrets does this page hold? No one knows.</p>
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
            // Suspicious page
            `<div class="random-user-page" style="background-color: #f2ff00ff; color: black;">
                <h2>TOTALLY NORMAL PAGE!</h2>
                <p>Why hello there, fellow user!</p>
                <p>Why don't you click here to get unlimited FPoints?</p>
                <button class="suspicious-button">Click me!</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link">Random hyperlink</a>
            </div>`,
            // Dangerous page!!
            `<div class="random-user-page" style="background-color: #ff0000ff; color: white;">
                <h2>DANGEROUS PAGE!!</h2>
                <p>This page is dangerous! Click the button below to proceed at your own risk!</p>
                <button class="dangerous-button">Proceed</button>
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
            // FPoints filled page
            `<div class="random-user-page">
                <h2>FPoints Galore!</h2>
                <p>This page is filled with FPoints! Click the button below to claim some!</p>
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
            // Halloween Page
            `<div class="random-user-page" style="background-color: #000000; color: #ff7518;">
                <h2>Happy Halloween!</h2>
                <p>Trick or Treat! Click the button below for a spooky surprise!</p>
                <button class="bonus-button halloween-button" style="background-color: #ff7518; color: #000000;">Spooky Surprise!</button>
                <br>
                <a href="#" data-url="fexplorer:random-user-page-" class="random-link" style="color: #ff7518;">Random hyperlink</a>
            </div>`,
        ];
        const randomIndex = Math.floor(Math.random() * randomTemplates.length);
        let contentHtml = randomTemplates[randomIndex];
        browserContent.innerHTML = contentHtml;
    }

    // Suspicious button (button be invisible afterwards lol)
    const suspiciousButton = browserContent.querySelector('.suspicious-button');
    if (suspiciousButton) {
        suspiciousButton.addEventListener('click', () => {
            alert('Haha, nice try! No unlimited FPoints for you!');
            suspiciousButton.style.display = 'none';
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

    // Halloween button
    const halloweenButton = browserContent.querySelector('.halloween-button');
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
                const specialMessage = luckyFPoints === 50 ? ' (GOD DAMN!!)' : luckyFPoints === 20 ? ' (Jackpot!)' : luckyFPoints >= 15 ? ' (Awesome!)' : luckyFPoints >= 10 ? ' (Nice!)' :  luckyFPoints >= 5 ? ' (Good!)' :  luckyFPoints >= 1 ? ' (You can\'t even afford anything with this.)' : '';
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
            const specialMessage = luckyFPoints === 50 ? ' (GOD DAMN!!)' : luckyFPoints === 20 ? ' (Jackpot!)' : luckyFPoints >= 15 ? ' (Awesome!)' : luckyFPoints >= 10 ? ' (Nice!)' :  luckyFPoints >= 5 ? ' (Good!)' :  luckyFPoints >= 1 ? ' (You can\'t even afford anything with this.)' : '';
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

    // Random user page appearance
    const userPageButtons = browserContent.querySelectorAll('.user-page-button');
    userPageButtons.forEach(button => {
        const randomIndex = Math.floor(Math.random() * userPageAppearances.length);
        button.style.backgroundImage = `url(${userPageAppearances[randomIndex]})`;
    });

    if (currentUrl.startsWith('goog.com')) {
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

    // ...existing code...

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
                        <button class="shop-buy-button" data-item-id="${item.id}" ${userFPoints < item.cost || userChannel.ownedItems[item.id] ? 'disabled' : ''}>
                            ${userChannel.ownedItems[item.id] ? 'Owned' : 'Buy Now'}
                        </button>
                    </div>
                </div>
            `).join('');

            browserContent.querySelectorAll('.shop-buy-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const itemId = event.target.dataset.itemId;
                    const item = shopItems.find(i => i.id === itemId);

                    if (item && userFPoints >= item.cost && !userChannel.ownedItems[item.id]) {
                        userFPoints -= item.cost;
                        userChannel.ownedItems[item.id] = true;

                        if (item.effect.luck) {
                            userLuck += item.effect.luck;
                        }
                        if (item.effect.mystery) {
                            const mysteryItems = ['A shiny badge!', 'A rare emoji pack!', 'A temporary speed boost!', 'A silly sound effect!', 'A comically placed cheeseburger!'];
                            const randomMystery = mysteryItems[Math.floor(Math.random() * mysteryItems.length)];
                            alert(`You bought a Mystery Box! You found: "${randomMystery}"`);
                        }
                        if (item.effect.cosmetic) {
                            alert(`You bought the ${item.name}! It's now applied to your simulated browser! (No visual change yet)`);
                        }

                        saveAppState();
                        alert(`You bought "${item.name}" for ${item.cost} FPoints! Remaining FPoints: ${userFPoints.toLocaleString()}`);
                        renderShopItems(filterCategory, searchQuery);
                    } else if (userChannel.ownedItems[item.id]) {
                        alert('You already own this item!');
                    } else {
                        alert('Not enough FPoints to buy this item! You need ' + (item.cost - userFPoints) + ' more FPoints.');
                    }
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
            const osSelect = browserContent.querySelector('#osSelect');
            const themeSelect = browserContent.querySelector('#themeSelect');
            const searchEngineSelect = browserContent.querySelector('#searchEngineSelect');
            const homepageSelect = browserContent.querySelector('#homepageSelect');
            const notificationsToggle = browserContent.querySelector('#notificationsToggle');
            const settingsStatus = browserContent.querySelector('#settingsStatus');
            if (osSelect) osSelect.value = 'default';
            if (themeSelect) themeSelect.value = 'light';
            if (searchEngineSelect) searchEngineSelect.value = 'goog';
            if (homepageSelect) homepageSelect.value = 'fexplorer:home';
            if (notificationsToggle) notificationsToggle.checked = false;
            updateWindowStyle('default');
            document.body.classList.remove('fexplorer-dark-mode');
            if (settingsStatus) settingsStatus.textContent = 'Settings reset to default.';
        };
    }
}

function navigate(urlToLoad, isBackNavigation = false) {
    const sanitizedUrl = urlToLoad.toLowerCase().trim();

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

            if (hostname === 'goog.com' && pathname === '/search' && query) {
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
                            `Aow ${query} impacts simulated daily life`,
                            `Understanding ${query}: A beginner's perspective`,
                            `The history and future of ${query}`,
                            `Tips and tricks for ${query}`
                        ];
                        const fakeTitle = fakeTitleOptions[Math.floor(Math.random() * fakeTitleOptions.length)];
                        const fakeDescription = `Dive deep into the fascinating aspects of ${query}. Find comprehensive information and expert opinions on ${query.toLowerCase()}. This is a fake link.`;

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
        const notificationsToggle = browserContent.querySelector('#notificationsToggle');
        const resetSettingsBtn = browserContent.querySelector('#resetSettingsBtn');
        const settingsStatus = browserContent.querySelector('#settingsStatus');
        const saveSettingsBtn = browserContent.querySelector('#saveSettingsBtn');

        // Load saved settings
        if (osSelect) osSelect.value = localStorage.getItem('fexplorerSettingOS') || 'default';
        if (themeSelect) themeSelect.value = localStorage.getItem('fexplorerSettingTheme') || 'light';
        if (notificationsToggle) notificationsToggle.checked = localStorage.getItem('fexplorerSettingNotifications') === 'true';

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
                }
                if (notificationsToggle) {
                    localStorage.setItem('fexplorerSettingNotifications', notificationsToggle.checked ? 'true' : 'false');
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
            });
        }
        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', () => {
                localStorage.removeItem('fexplorerSettingOS');
                localStorage.removeItem('fexplorerSettingTheme');
                localStorage.removeItem('fexplorerSettingNotifications');
                if (osSelect) osSelect.value = 'default';
                if (themeSelect) themeSelect.value = 'light';
                if (searchEngineSelect) themeSelect.value = 'goog';
                if (homepageSelect) homepageSelect.value = 'fexplorer:home';
                if (notificationsToggle) notificationsToggle.checked = false;
                updateWindowStyle('default');
                document.body.classList.remove('fexplorer-dark-mode');
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