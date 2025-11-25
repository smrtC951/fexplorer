let userPageRegistry = JSON.parse(localStorage.getItem("fexp_userPageRegistry") || "{}");

// sanitize registry
Object.keys(userPageRegistry).forEach(id => {
    const index = Number(userPageRegistry[id]);
    if (Number.isNaN(index)) {
        delete userPageRegistry[id]; // remove bad entry
    }
});

function saveUserPageRegistry() {
    localStorage.setItem("fexp_userPageRegistry", JSON.stringify(userPageRegistry));
}

// PERSISTENT MUSIC OBJECT (single instance that loops)
let fxMusic = null;

function initializeMusic() {
    const musicChoice = localStorage.getItem('fexplorerMusicChoice') || 'orbspire';

    // Available tracks mapping
    const trackMap = {
        'orbspire': 'music/orbspire.mp3',
        'obby7': 'music/obby7.mp3',
        'random': 'music/orbspire.mp3',
        'fexplorer': 'random'
    };

    // Build a small pool of available files (fall back to orbspire if missing)
    const pool = ['music/orbspire.mp3', 'music/obby7.mp3'];

    let chosenFile;
    if (musicChoice === 'fexplorer' || musicChoice === 'random') {
        // Pick a deterministic random-like choice from pool (true random each init)
        chosenFile = pool[Math.floor(Math.random() * pool.length)];
    } else if (trackMap[musicChoice]) {
        chosenFile = trackMap[musicChoice];
    } else {
        chosenFile = 'music/orbspire.mp3';
    }

    // If fxMusic does not exist, create it. If it exists but src differs, update it.
    if (!fxMusic) {
        fxMusic = new Audio(chosenFile);
        fxMusic.loop = true;
    } else {
        // audio.src may be an absolute URL; compare by filename
        try {
            const currentSrc = fxMusic.src || '';
            const currentFile = currentSrc.split('/').slice(-1)[0];
            const newFile = chosenFile.split('/').slice(-1)[0];
            if (currentFile !== newFile) {
                // Replace source to switch tracks
                fxMusic.pause();
                fxMusic.src = chosenFile;
                fxMusic.load();
                fxMusic.loop = true;
            }
        } catch (e) {
            // On any error, recreate the audio element
            fxMusic.pause?.();
            fxMusic = new Audio(chosenFile);
            fxMusic.loop = true;
        }
    }
}

// AUTO-LOAD MUSIC ON STARTUP
setTimeout(() => { 
    initializeMusic();
    applyMusicSettings(); 
}, 100);
// applyMusicSettings function
function applyMusicSettings() {
    initializeMusic();  // Ensure music object exists
    const musicEnabled = localStorage.getItem('fexplorerMusicEnabled') === 'true';
    const musicVolume = parseFloat(localStorage.getItem('fexplorerMusicVolume')) || 0.6;
    fxMusic.volume = musicVolume;
    if (musicEnabled) {
        fxMusic.play().catch(() => {});
    } else {
        fxMusic.pause();
    }
}

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
    const dropdownBtn = document.querySelector('#dropdownButton img');

    switch (osValue) {
        case 'win11':
            frame.classList.add('window-win11');
            controls.classList.add('right'); // Windows-style: buttons on right
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            if (dropdownBtn) dropdownBtn.src = 'icons/new-hamburger-icon.png';
            break;
        case 'win7':
            frame.classList.add('window-win7');
            controls.classList.add('right'); // Windows-style: buttons on right
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            if (dropdownBtn) dropdownBtn.src = 'icons/new-hamburger-icon.png';
            break;
        case 'win8':
            frame.classList.add('window-win8');
            controls.classList.add('right'); // Windows-style: buttons on right
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            if (dropdownBtn) dropdownBtn.src = 'icons/new-hamburger-icon.png';
            break;
        case 'winxp':
            frame.classList.add('window-winxp');
            controls.classList.add('right'); // Windows-style: buttons on right
            if (backBtn) backBtn.src = 'icons/xp-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/xp-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/xp-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/xp-info-icon.png';
            if (dropdownBtn) dropdownBtn.src = 'icons/new-hamburger-icon.png';
            break;
        case 'macx':
            frame.classList.add('window-macx');
            controls.classList.add('left');
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            if (dropdownBtn) dropdownBtn.src = 'icons/new-hamburger-icon.png';
            break;
        case 'mac9':
            frame.classList.add('window-mac9');
            controls.classList.add('left');
            if (backBtn) backBtn.src = 'icons/new-back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/new-forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/new-home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/new-info-icon.png';
            if (dropdownBtn) dropdownBtn.src = 'icons/new-hamburger-icon.png';
            break;
        case 'classic':
            frame.classList.add('window-classic');
            controls.classList.add('left');
            if (backBtn) backBtn.src = 'icons/back-icon.png';
            if (forwardBtn) forwardBtn.src = 'icons/forward-icon.png';
            if (homeBtn) homeBtn.src = 'icons/home-icon.png';
            if (createBtn) createBtn.src = 'icons/create-icon.png';
            if (infoBtn) infoBtn.src = 'icons/info-icon.png';
            if (dropdownBtn) dropdownBtn.src = 'icons/hamburger-icon.png';
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
            if (dropdownBtn) dropdownBtn.src = 'icons/new-hamburger-icon.png';
            break;
    }
}

// --------------------------------------
// Known External Sites (domains only)
// --------------------------------------
const KNOWN_EXTERNAL_SITES = [
    "goog.com",
    "ping.com",
];

// Checks whether sanitizedUrl is external
function isKnownExternal(sanitizedUrl) {
    // domain = part before first slash
    const domain = sanitizedUrl.split("/")[0];
    return KNOWN_EXTERNAL_SITES.includes(domain);
}

// --------------------------------------
// Unified Page Resolver
// --------------------------------------
function renderGenericWebsite(url) {
    const safeUrl = escapeHtml(url);

    return `
        <div style="padding:20px;">
            <h1 style="margin-bottom:8px;">${safeUrl}</h1>
            <p>This is a generic webpage. There is no special content here, but you can still browse around!</p>

            <div style="margin-top:20px;">
                <h3>About this site</h3>
                <p><strong>${safeUrl}</strong> is not part of FExplorer's internal system or known external sites.</p>
            </div>

            <hr style="margin:20px 0;">

            <button class="home-page-button" data-url="fexplorer:home">Return to Home</button>
        </div>
    `;
}

function getPageContentFromUrl(sanitizedUrl) {

    // 1. Check if page exists directly in fakeContent
    if (fakeContent[sanitizedUrl]) {
        return fakeContent[sanitizedUrl];
    }

    // 2. Handle FExplorer internal pages
    if (sanitizedUrl.startsWith("fexplorer:")) {

        // a) User-created pages: fexplorer:user-page-12345
        if (sanitizedUrl.startsWith("fexplorer:user-page-")) {
            const id = sanitizedUrl.replace("fexplorer:user-page-", "");
            return userCreatedPages[id]
                ? getPublishedUserPageHTML(id)
                : null;
        }

        // b) Special cookie page (has dynamic UI)
        if (sanitizedUrl === "fexplorer:cookies") {
            setTimeout(() => window.fexplorerCookies?.loadCookieManager?.(), 0);
            return window.fexplorerCookies?.getCookieManagerHTML?.() || '<div>Cookies</div>';
        }

        // c) Random variant pages: fexplorer:<id>-category/variant
        if (sanitizedUrl.includes("-") && sanitizedUrl.includes("/")) {
            return "__RANDOM_VARIANT_PAGE__";
        }

        // d) Special game pages with multiple sub-routes
        if (sanitizedUrl === "fexplorer:create") {
            return getCreatePageEditorHTML();
        }
        if (sanitizedUrl === "fexplorer:create.hub") {
            return getFExplorerCreatorHubPageHTML();
        }

        // e) Generated search article pages
        if (sanitizedUrl.startsWith('fexplorer:search-article-')) {
            const id = sanitizedUrl.replace('fexplorer:search-article-', '');
            return getSearchArticleHTML(id);
        }

        // e) If we get here and it's fexplorer:something but not in fakeContent, return null
        // This will trigger 404 handling in navigate()
        return null;
    }

    // 3. External/Search pages handled by external handler
    if (isKnownExternal(sanitizedUrl)) {
        return handleExternalOrSearchPages(sanitizedUrl);
    }

    // 4. Special external pages
    if (sanitizedUrl.startsWith('goog.com') || sanitizedUrl.startsWith('ping.com')) {
        return handleExternalOrSearchPages(sanitizedUrl);
    }

    if (sanitizedUrl.startsWith('mytube.com')) {
        return handleExternalOrSearchPages(sanitizedUrl);
    }

    // 5. Anything else → auto-generate unique webpage
    return renderGenericWebsite(sanitizedUrl);
}

// Apply saved OS style on load
updateWindowStyle(localStorage.getItem('fexplorerSettingOS') || 'default');

// Settings Logic
function saveSettings() {
    try {
        const osSelect = browserContent.querySelector('#osSelect');
        const themeSelect = browserContent.querySelector('#themeSelect');
        const searchEngineSelect = browserContent.querySelector('#searchEngineSelect');
        const homepageSelect = browserContent.querySelector('#homepageSelect');
        const notificationsToggle = browserContent.querySelector('#notificationsToggle');
        const loginToggle = browserContent.querySelector('#loginToggle');
        const settingsStatus = browserContent.querySelector('#settingsStatus');

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
            applyFExplorerSettings();
        }
        if (searchEngineSelect) {
            localStorage.setItem('fexplorerSearchEngine', searchEngineSelect.value);
        }
        if (homepageSelect) {
            localStorage.setItem('fexplorerSettingHomepage', homepageSelect.value);
        }
        if (notificationsToggle) {
            localStorage.setItem('fexplorerSettingNotifications', notificationsToggle.checked ? 'true' : 'false');
        }
        if (loginToggle) {
            localStorage.setItem('fexplorerSettingHideLogin', loginToggle.checked ? 'true' : 'false');
            const loginMessageElement = document.querySelector('.login-message');
            if (loginMessageElement) {
                loginMessageElement.style.display = loginToggle.checked ? 'none' : 'block';
            }
        }
        
        const cookieToggle = browserContent.querySelector('#cookieToggle');
        if (cookieToggle) {
            localStorage.setItem('fexplorerCookiesDisabled', cookieToggle.checked ? 'true' : 'false');
        }

        // Music settings - save the current state of controls
        const musicToggleSetting = browserContent.querySelector('#musicToggle') || browserContent.querySelector('#musicToggleSetting');
        const musicVolumeSetting = browserContent.querySelector('#musicVolumeSetting');
        const musicSelect = browserContent.querySelector('#musicSelect');
        const devModeToggle = browserContent.querySelector('#devModeToggle');

        if (musicToggleSetting) {
            localStorage.setItem('fexplorerMusicEnabled', musicToggleSetting.checked ? 'true' : 'false');
        }
        if (musicVolumeSetting) {
            const v = parseFloat(musicVolumeSetting.value) || 0.6;
            localStorage.setItem('fexplorerMusicVolume', String(v));
            fxMusic.volume = v;
        }
        if (musicSelect) {
            localStorage.setItem('fexplorerMusicChoice', musicSelect.value);
        }
        if (devModeToggle) {
            localStorage.setItem('fexplorerDevMode', devModeToggle.checked ? 'true' : 'false');
        }

        // Apply music settings after saving
        applyMusicSettings();

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
    // remove music and other advanced settings
    localStorage.removeItem('fexplorerMusicEnabled');
    localStorage.removeItem('fexplorerMusicVolume');
    localStorage.removeItem('fexplorerMusicChoice');
    localStorage.removeItem('fexplorerSettingHomepage');
    localStorage.removeItem('fexplorerDevMode');

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
    const homepageSelect = browserContent.querySelector('#homepageSelect');
    const notificationsToggle = browserContent.querySelector('#notificationsToggle');
    const loginToggle = browserContent.querySelector('#loginToggle');
    const settingsStatus = browserContent.querySelector('#settingsStatus');

    const musicToggle = browserContent.querySelector('#musicToggle') || browserContent.querySelector('#musicToggleSetting');
    const musicVolumeSetting = browserContent.querySelector('#musicVolumeSetting');
    const musicVolumeLabel = browserContent.querySelector('#musicVolumeLabel');
    const musicSelect = browserContent.querySelector('#musicSelect');
    const devModeToggle = browserContent.querySelector('#devModeToggle');

    if (osSelect) osSelect.value = 'default';
    if (themeSelect) themeSelect.value = 'light';
    if (searchEngineSelect) searchEngineSelect.value = 'fexplorer';
    if (homepageSelect) homepageSelect.value = 'fexplorer:home';
    if (musicToggle) musicToggle.checked = false;
    if (musicVolumeSetting) musicVolumeSetting.value = '0.6';
    if (musicVolumeLabel) musicVolumeLabel.textContent = '60%';
    if (musicSelect) musicSelect.value = 'orbspire';
    if (devModeToggle) devModeToggle.checked = false;
    if (notificationsToggle) notificationsToggle.checked = false;
    if (loginToggle) loginToggle.checked = false;
    if (settingsStatus) settingsStatus.textContent = 'Settings reset to default.';

    // Apply changes
    applyMusicSettings();
    applyFExplorerSettings();
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
const CREATE_PAGE_URL = 'fexplorer:create.new';
const PROGRAMS_URL = 'fexplorer:programs';
const COOKIE_URL = 'fexplorer:cookies';
const ACHIEVE_URL = 'fexplorer:achievements';
const SHOP_URL = 'fexplorer:shop';
const WIKI_URL = 'fexplorer:wiki';
const TERMINAL_URL = 'file:terminal';
const AI_URL = 'fexplorer:system';
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
let forwardStack = [];
let currentUrl = '';

const uploadableVideosPool = [
];

const DEFAULT_MY_TUBE_VIDEOS_INITIAL = {
};

// Generated search articles (transient)
let searchGeneratedArticles = {};

let requestCount = 0;
let lastRequestTime = Date.now();
let isRateLimited = false;
let rateLimitCooldown = 7500; // 5 seconds
const RATE_LIMIT_MAX = 5;    // max allowed actions in timeframe
const RATE_LIMIT_INTERVAL = 1500; // 3 seconds window

if (!window.__fexplorerDelegatedClickBound) {

    browserContent.addEventListener("click", function (e) {

        const target = e.target;

        /* =============================
           🟠 SUSPICIOUS BUTTONS
        ============================= */
        if (target.matches(".suspicious-button")) {
            alert("Haha, nice try! No unlimited FPoints for you!");
            target.style.display = "none";
            return;
        }

        if (target.matches(".suspicious-button2")) {
            alert("SIKE!! This is actually a normal page, stupid!");
            target.style.display = "none";
            return;
        }

        /* =============================
           🥭 67 MANGOES
        ============================= */
        if (target.matches(".mango-button1")) {
            const mangoPoints = 10;
            userFPoints += mangoPoints;
            saveAppState();
            showFPointsNotification(mangoPoints);
            alert("You received 10 FPoints for taking the mangoes!");
            target.style.display = "none";
            return;
        }

        if (target.matches(".mango-button2")) {
            alert("No mangoes for you!");
            target.style.display = "none";
            alert("In fact, I will take 5 FPoints from you for purely existing!");
            const mangoPenalty = 5;
            userFPoints -= mangoPenalty;
            saveAppState();
            showFPointsNotification(-mangoPenalty);
            alert("What a loser! >:)");
            return;
        }

        /* =============================
           🎰 BETTING BUTTON
        ============================= */
        if (target.matches(".betting-button")) {
            const betAmount = window.prompt("Enter the amount of FPoints you want to bet:", "50");
            if (!betAmount || isNaN(betAmount)) return;

            const betAmountNum = parseInt(betAmount, 10);
            if (userFPoints < betAmountNum) {
                alert("Not enough FPoints!");
                return;
            }

            const win = Math.random() < 0.5;
            if (win) {
                const winnings = betAmountNum * 2;
                userFPoints += winnings;
                saveAppState();
                showFPointsNotification(winnings);
                alert("You won " + winnings + " FPoints!");
            } else {
                userFPoints -= betAmountNum;
                saveAppState();
                showFPointsNotification(-betAmountNum);
                alert("You lost " + betAmountNum + " FPoints.");
            }

            target.style.display = "none";
            return;
        }

        /* =============================
           🍔 BURGER BUTTON
        ============================= */
        if (target.matches(".burger-button")) {
            alert("I have no idea!");
            alert("I just like the juicy taste!");
            alert("Wait that's a reason.");
            userFPoints += 647;
            saveAppState();
            showFPointsNotification(647);
            target.style.display = "none";
            return;
        }

        /* =============================
   🎁 BONUS BUTTON  
   (Gives 25–75 FPoints)
============================= */
if (target.matches(".bonus-button")) {
    const randomBonusPoints = Math.floor(Math.random() * 51) + 25;
    userFPoints += randomBonusPoints;
    saveAppState();
    showFPointsNotification(randomBonusPoints);
    target.style.display = "none";
    return;
}

        /* =============================
           🔥 HOLIDAY
        ============================= */
        if (target.matches(".holiday-button, #jx1dx1Halloween")) {
            const randomHalloweenPoints = Math.floor(Math.random() * 101) + 50;
            userFPoints += randomHalloweenPoints;
            saveAppState();
            showFPointsNotification(randomHalloweenPoints);
            alert("Happy Holidays! You received " + randomHalloweenPoints + " FPoints!");
            target.style.display = "none";
            return;
        }

        /* =============================
           💰 FPOINTS BUTTON
        ============================= */
        if (target.matches(".fpoints-button")) {
            const randomFPoints = Math.floor(Math.random() * 181) + 20;
            userFPoints += randomFPoints;
            saveAppState();
            showFPointsNotification(randomFPoints);
            target.style.display = "none";
            return;
        }

        /* =============================
           ☠️ DANGEROUS BUTTONS
        ============================= */
        if (target.matches(".dangerous-button, .dangerous-button2")) {
            const randomDangerousPoints = Math.floor(Math.random() * 1501) - 500;
            userFPoints += randomDangerousPoints;
            saveAppState();
            showFPointsNotification(randomDangerousPoints);
            target.style.display = "none";
            alert(
                randomDangerousPoints < 0
                ? `Oh no! You lost ${Math.abs(randomDangerousPoints)} FPoints!`
                : `Phew! You gained ${randomDangerousPoints} FPoints!`
            );
            return;
        }

        if (target.matches(".dangerous-button3")) {
            alert("Downloading malware...");
            if (confirm("Are you sure?")) {
                alert("SIKE!! IT'S MALWARE, LOSER!!");
                userFPoints -= 400;
                saveAppState();
            } else {
                alert("You evaded the malware! Here's 200 FPoints!");
                userFPoints += 200;
                saveAppState();
            }
            target.style.display = "none";
            return;
        }

        /* =============================
           RANDOM LINK
        ============================= */
        if (target.matches(".random-link")) {
            e.preventDefault();
            const url = target.dataset.url;
            navigate(url);
            return;
        }

        /* =============================
   ❓ MYSTERY HYPERLINK
   Random unpredictable behavior
============================= */
if (target.matches(".mystery-link")) {
    event.preventDefault();

    // Rare 1% special redirect
    const roll = Math.random();
    const randomIndex = Math.floor(Math.random() * 1_000_000);

    // Pools
    const normalDestinations = [
        "fexplorer:home",
        "fexplorer:quick-links",
        "goog.com/search?q=mystery",
        "paranoid.com/error.html"
    ];

    const rareDestinations = [
        "paranoid.com/glitch",
        "fexplorer:404",
        "fexplorer:secret-room",
    ];

    let chosen;

    if (roll < 0.01) {
        // 1% ultra-rare event
        chosen = rareDestinations[Math.floor(Math.random() * rareDestinations.length)];
        alert("⚠️ Something feels... strange.");
    } else if (roll < 0.20) {
        // 20% random user page
        alert("This link took you somewhere unexpected...");
    } else {
        // 79% normal mystery behavior
        chosen = normalDestinations[Math.floor(Math.random() * normalDestinations.length)];
    }

    navigate(chosen);
    return;
}

    });

    window.__fexplorerDelegatedClickBound = true;
}


// FExplorer Tabs
let tabs = [];
let activeTabId = null;

const tabsList = document.getElementById("tabsList");
const newTabBtn = document.getElementById("newTabBtn");

/*-------------------------------
  Create a new tab
--------------------------------*/
function createTab(startUrl = "fexplorer:home") {

    const tabId = "tab_" + Date.now();

    const tabObj = {
        id: tabId,
        url: startUrl,
        title: "New Tab"
    };

    tabs.push(tabObj);
    activeTabId = tabId;

    renderTabs();
    openUrlInActiveTab(startUrl);
}

/*-------------------------------
  Switch to an existing tab
--------------------------------*/
function switchTab(tabId) {
    if (activeTabId === tabId) return; // Don't reload same tab

    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;

    activeTabId = tabId;
    renderTabs();

    openUrlInActiveTab(tab.url);
}

/*-------------------------------
  Open a URL inside active tab
--------------------------------*/
function openUrlInActiveTab(url) {
    const tab = tabs.find(t => t.id === activeTabId);
    if (!tab) return;

    tab.url = url;

    // Call YOUR navigation system
    navigate(url);

    // After navigation loads page content, extract a title
    setTimeout(updateTabTitleFromContent, 120);
}

/*-------------------------------
  Close a tab
--------------------------------*/
function closeTab(tabId) {

    const index = tabs.findIndex(t => t.id === tabId);
    if (index === -1) return;

    const wasActive = (activeTabId === tabId);

    tabs.splice(index, 1);

    // If no tabs left → open a new one
    if (tabs.length === 0) {
        createTab("fexplorer:home");
        return;
    }

    // If closing the active one, switch to a neighbor
    if (wasActive) {
        const newIndex = Math.max(0, index - 1);
        activeTabId = tabs[newIndex].id;
        switchTab(activeTabId);
    }

    renderTabs();
}

/*-------------------------------
  Render tab row
--------------------------------*/
function renderTabs() {
    tabsList.innerHTML = "";

    tabs.forEach(tab => {
        const tabEl = document.createElement("div");
        tabEl.className = "tab";
        tabEl.dataset.tab = tab.id;

        if (tab.id === activeTabId) tabEl.classList.add("active");

        tabEl.innerHTML = `
            <span class="tab-title">${tab.title}</span>
            <span class="tab-close" data-close="${tab.id}">×</span>
        `;

        // Clicking the tab switches tabs
        tabEl.querySelector(".tab-title").addEventListener("click", () => {
            switchTab(tab.id);
        });

        // Clicking X closes the tab (does not activate tab)
        tabEl.querySelector(".tab-close").addEventListener("click", (ev) => {
            ev.stopPropagation();
            closeTab(tab.id);
        });

        tabsList.appendChild(tabEl);
    });
}

/*-------------------------------
  Update title of current tab
--------------------------------*/
function updateTabTitle(title) {
    const tab = tabs.find(t => t.id === activeTabId);
    if (!tab) return;

    tab.title = title || "Untitled";
    renderTabs();
}

/*-------------------------------
  Auto-title detection after navigate()
--------------------------------*/
function updateTabTitleFromContent() {
    const bc = document.getElementById("browserContent");
    if (!bc) return;

    let title = "";

    // Prefer H1 or .app-title
    const h1 = bc.querySelector("h1");
    const appTitle = bc.querySelector(".app-title");

    if (h1) title = h1.innerText.trim();
    else if (appTitle) title = appTitle.innerText.trim();
    else title = tabs.find(t => t.id === activeTabId)?.url || "Page";

    updateTabTitle(title);
}

/*-------------------------------
  New tab button
--------------------------------*/
newTabBtn.addEventListener("click", () => {
    createTab("fexplorer:home");
});

/*-------------------------------
  Start with one tab
--------------------------------*/
createTab("fexplorer:home");

document.addEventListener('click', e => {
  if (e.defaultPrevented) return;
  if (e.target.closest('#tabsArea')) return; // ignore clicks coming from tabs
  // existing bracket: handle data-url links...
});


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
// throttle cookie gain visuals to avoid spam
let lastCookieGainTime = 0;
const COOKIE_GAIN_COOLDOWN_MS = 10000; // 10s between auto-gains/visuals
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

/*───────────────────────────────
 🧱 FExplorer Create (Updated for Hub System)
────────────────────────────────*/

// Initialize a new draft or load existing one
function initializeDraftPage() {
    draftPage = {
        title: '',
        creationMode: 'simple', // 'simple' or 'code'
        simpleContent: '',
        simpleButtons: [],
        htmlCode: '<!-- Your HTML here -->\n<h1>Hello World!</h1>\n<p>Made in FExplorer Create.</p>',
        cssCode: 'body { font-family: sans-serif; background-color: #fafafa; text-align: center; padding: 20px; }',
        jsCode: 'console.log("Hello from your custom page!");',
    };

    try {
        const storedDraft = localStorage.getItem('draftPage');
        if (storedDraft) {
            const parsed = JSON.parse(storedDraft);
            if (typeof parsed === 'object' && parsed !== null) {
                Object.assign(draftPage, parsed);
                draftPage.simpleButtons = draftPage.simpleButtons || [];
            }
        }
    } catch (e) {
        console.warn("Invalid draft data. Resetting.", e);
    }
}

// Save draftPage to localStorage
function saveDraftPage() {
    localStorage.setItem('draftPage', JSON.stringify(draftPage));
}

// Open create modal (legacy UI)
function openCreateModal() {
    const modal = document.getElementById('createModal');
    if (!modal) return;
    modal.style.display = 'flex';
    renderDraftToForm();
}

// Close modal
function closeCreateModal() {
    const modal = document.getElementById('createModal');
    if (!modal) return;
    modal.style.display = 'none';
}

// Switch editor modes
function switchCreateMode(mode) {
    const simple = document.getElementById('simpleMode');
    const code = document.getElementById('codeMode');
    draftPage.creationMode = mode;
    if (simple) simple.style.display = mode === 'simple' ? 'block' : 'none';
    if (code) code.style.display = mode === 'code' ? 'block' : 'none';
    saveDraftPage();
}

// Sync form → draft
function updateDraftFromForm() {
    if (!draftPage) initializeDraftPage();

    const titleEl = document.getElementById('createTitle');
    const contentEl = document.getElementById('createSimpleContent');
    const buttonsEl = document.getElementById('createSimpleButtons');
    const htmlEl = document.getElementById('createHtmlCode');
    const cssEl = document.getElementById('createCssCode');
    const jsEl = document.getElementById('createJsCode');

    if (titleEl) draftPage.title = titleEl.value.trim();
    if (contentEl) draftPage.simpleContent = contentEl.value;

    // Parse buttons
    if (buttonsEl) {
        const lines = buttonsEl.value.split('\n').map(l => l.trim()).filter(Boolean);
        draftPage.simpleButtons = lines.map(l => {
            const [text, url] = l.split('|');
            return { text: text?.trim() || '', url: url?.trim() || '' };
        });
    }

    if (htmlEl) draftPage.htmlCode = htmlEl.value;
    if (cssEl) draftPage.cssCode = cssEl.value;
    if (jsEl) draftPage.jsCode = jsEl.value;

    saveDraftPage();
}

// Sync draft → form
function renderDraftToForm() {
    if (!draftPage) initializeDraftPage();

    const titleEl = document.getElementById('createTitle');
    const contentEl = document.getElementById('createSimpleContent');
    const buttonsEl = document.getElementById('createSimpleButtons');
    const htmlEl = document.getElementById('createHtmlCode');
    const cssEl = document.getElementById('createCssCode');
    const jsEl = document.getElementById('createJsCode');

    if (titleEl) titleEl.value = draftPage.title || '';
    if (contentEl) contentEl.value = draftPage.simpleContent || '';
    if (buttonsEl) buttonsEl.value = (draftPage.simpleButtons || []).map(b => `${b.text}|${b.url}`).join('\n');
    if (htmlEl) htmlEl.value = draftPage.htmlCode || '';
    if (cssEl) cssEl.value = draftPage.cssCode || '';
    if (jsEl) jsEl.value = draftPage.jsCode || '';
}

// Build preview for iframe
function buildPreviewHtml() {
    updateDraftFromForm();

    if (draftPage.creationMode === 'code') {
        return `
            <!doctype html>
            <html>
            <head><meta charset="utf-8">
                <style>${draftPage.cssCode || ''}</style>
            </head>
            <body>${draftPage.htmlCode || ''}
                <script>${draftPage.jsCode || ''}<\/script>
            </body>
            </html>`;
    }

    const buttonsHtml = draftPage.simpleButtons.map(b =>
        `<p><a href="${escapeHtml(b.url)}">${escapeHtml(b.text)}</a></p>`
    ).join('');

    return `
        <!doctype html>
        <html>
        <head><meta charset="utf-8">
            <style>body{font-family:Arial;padding:18px;}</style>
        </head>
        <body>
            <h1>${escapeHtml(draftPage.title || '')}</h1>
            <div>${draftPage.simpleContent || ''}</div>
            ${buttonsHtml}
        </body>
        </html>`;
}

// Preview in iframe
function previewDraft() {
    const iframe = document.getElementById('createPreviewFrame');
    if (!iframe) return;
    const html = buildPreviewHtml();

    try {
        iframe.srcdoc = html;
    } catch {
        const doc = iframe.contentWindow.document;
        doc.open(); doc.write(html); doc.close();
    }
}

// Publish draft → FExplorer system
function publishDraft() {
    updateDraftFromForm();

    if (!draftPage.title.trim()) {
        alert('Please enter a title before publishing.');
        return;
    }

    const pageId = `user-${Math.floor(Math.random() * 99999).toString(36)}`;
    const pageData = {
        title: draftPage.title,
        creationMode: draftPage.creationMode,
        simpleContent: draftPage.simpleContent,
        simpleButtons: draftPage.simpleButtons,
        htmlCode: draftPage.htmlCode,
        cssCode: draftPage.cssCode,
        jsCode: draftPage.jsCode,
        createdAt: Date.now(),
    };

    userCreatedPages[pageId] = pageData;
    saveAppState();

    closeCreateModal();

    const pageUrl = `fexplorer:user-page-${pageId}`;
    alert(`✅ Page "${draftPage.title}" published!\nAccessible at:\n${pageUrl}`);

    if (addressBar) {
        addressBar.value = pageUrl;
        if (goButton) goButton.click();
    }
}

// Attach all event listeners
function attachCreatePageListeners() {
    const createBtn = document.getElementById('createPageButton');
    if (createBtn) createBtn.addEventListener('click', e => { e.preventDefault(); openCreateModal(); });

    const closeBtn = document.getElementById('closeCreateModal');
    if (closeBtn) closeBtn.addEventListener('click', closeCreateModal);

    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) previewBtn.addEventListener('click', previewDraft);

    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) publishBtn.addEventListener('click', publishDraft);

    // Mode tabs
    const tabs = document.querySelectorAll('.create-tabs .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchCreateMode(tab.dataset.mode));
    });

    // Auto-save on input
    [
        'createTitle','createSimpleContent','createSimpleButtons',
        'createHtmlCode','createCssCode','createJsCode'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateDraftFromForm);
    });
}

// Escape HTML safely
function escapeHtml(text) {
    if (typeof text !== 'string') text = String(text);
    return text.replace(/[&<>"']/g, m =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m])
    );
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
    
    // Build result items
    let resultsHtml = "";
    if (predefined[lower]) {
        const r = predefined[lower];
        // create an article for the predefined result
        const art = generateSearchArticle(r.title, r.url, `An overview of ${r.title}.`, query);
        resultsHtml += `
            <div class="search-result-item ${isPing ? 'ping-result-item' : ''}">
                <h3><a data-url="fexplorer:search-article-${art.id}" href="#">${escapeHtml(r.title)}</a></h3>
                <p>${escapeHtml(r.url)}</p>
            </div>
        `;
    } else {
        const resultCount = Math.floor(Math.random() * 4) + 3; // 3–6 results
        for (let i = 0; i < resultCount; i++) {
            const id = Math.random().toString(36).substring(2, 8);
            const safe = query.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
            const domain = `${safe}-${id}.com`;
            const titles = [
                `10 big facts about ${query}!`,
                `Why ${query} is very important for diet`,
                `Top 10 things about ${query} you didn't know`,
                `How ${query} saves hundreds of lives`,
                `${query}: A complete guide to survival`
            ];
            const title = titles[Math.floor(Math.random() * titles.length)];
            const art = generateSearchArticle(title, domain, `${title} — quick summary.`, query);
            resultsHtml += `
                <div class="search-result-item ${isPing ? 'ping-result-item' : ''}">
                    <h3><a data-url="fexplorer:search-article-${art.id}" href="#">${escapeHtml(title)}</a></h3>
                    <p style="color:${isPing ? '#2b8af6' : '#006621'};font-size:.85em">${escapeHtml(domain)}</p>
                    <p>${isPing ? 'Ping autogenerated result snippet.' : 'Random autogenerated search result.'}</p>
                </div>
            `;
        }
    }
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
    checkRelevantAchievements();
    showAutosaveIndicator();
}

function showAutosaveIndicator() {
  const el = document.getElementById('autosaveIndicator');
  if (!el) return;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3000);
}

let autosaveInterval;

function startAutosave() {
  if (autosaveInterval) clearInterval(autosaveInterval);
  autosaveInterval = setInterval(() => {
    saveAppState();
    console.log('[FExplorer] Autosaved progress!');
  }, 60000); // every 15 seconds
}

window.addEventListener('load', startAutosave);

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
    { id: 'ie_title', name: 'Famous Internet Explorer title', description: 'Allows you to get the world famous Internet Explorer title!', cost: 1995, effect: { cosmetic: 'ie_title' }, icon: 'icons/fexplorer.png' },
    { id: 'burger_hat', name: 'Burger Hat', description: 'Extremely expensive hat for your FExplorer browser icon!', cost: 33333, effect: { cosmetic: 'burger_hat' }, icon: 'icons/hamburger-icon.png' }
];

// Achievement System
let unlockedAchievements = {};
let achievementProgress = {}; // Track progress toward achievements
try {
    unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements')) || {};
    achievementProgress = JSON.parse(localStorage.getItem('achievementProgress')) || {};
} catch (e) {
    console.error('Failed to load achievements, starting fresh', e);
    unlockedAchievements = {};
    achievementProgress = {};
}

function saveAchievementProgress() {
    localStorage.setItem('achievementProgress', JSON.stringify(achievementProgress));
}

const achievementItems = [
    {
        id: 'first_joined',
        name: 'Welcome to FExplorer!',
        description: 'Visit FExplorer for the first time!',
        awards: [{ type: 'fpoints', amount: 10 }],
        checkUnlock: () => true, // Auto-unlock on first visit
        progress: null
    },
    {
        id: '1000_fpoints',
        name: 'Big bucks',
        description: 'Get your first 1000 FPoints',
        awards: [{ type: 'fpoints', amount: 500 }],
        checkUnlock: () => userFPoints >= 1000,
        getProgress: () => ({ current: Math.floor(userFPoints), target: 1000 }),
        progress: () => Math.min(100, Math.round((userFPoints / 1000) * 100))
    },
    {
        id: '10k_fpoints',
        name: 'Extremely rich',
        description: 'Get 10,000 FPoints. Wow!',
        awards: [{ type: 'fpoints', amount: 1000 }],
        checkUnlock: () => userFPoints >= 10000,
        getProgress: () => ({ current: Math.floor(userFPoints), target: 10000 }),
        progress: () => Math.min(100, Math.round((userFPoints / 10000) * 100))
    },
    {
        id: '100k_fpoints',
        name: 'Do you even touch grass?',
        description: 'Get 100,000 FPoints. You either really like this browser or you just want this badge.',
        awards: [{ type: 'fpoints', amount: 10000 }],
        checkUnlock: () => userFPoints >= 100000,
        getProgress: () => ({ current: Math.floor(userFPoints), target: 100000 }),
        progress: () => Math.min(100, Math.round((userFPoints / 100000) * 100))
    },
    {
        id: '10x_luck',
        name: 'Luckiest Being Alive',
        description: 'Have a really high amount of Luck on your browser.',
        awards: [{ type: 'luck', amount: 0.5 }],
        checkUnlock: () => userLuck >= 10,
        getProgress: () => ({ current: parseFloat(userLuck.toFixed(2)), target: 10 }),
        progress: () => Math.min(100, Math.round((userLuck / 10) * 100))
    },
    {
        id: 'negative_luck',
        name: 'Unlucky Being',
        description: 'Get at least -5x Luck on your browser.',
        awards: [{ type: 'luck', amount: 0.1 }],
        checkUnlock: () => userLuck <= -5,
        getProgress: () => ({ current: parseFloat(userLuck.toFixed(2)), target: -5 }),
        progress: () => Math.min(100, Math.round(((5 + userLuck) / 5) * 100))
    },
    {
        id: 'first_user_page',
        name: 'Content Creator',
        description: 'Create and publish your first user page!',
        awards: [{ type: 'fpoints', amount: 50 }],
        checkUnlock: () => Object.keys(userCreatedPages).length > 0,
        progress: null
    },
    {
        id: 'five_user_pages',
        name: 'Prolific Creator',
        description: 'Create 5 user pages.',
        awards: [{ type: 'fpoints', amount: 250 }],
        checkUnlock: () => Object.keys(userCreatedPages).length >= 5,
        getProgress: () => ({ current: Object.keys(userCreatedPages).length, target: 5 }),
        progress: () => Math.min(100, Math.round((Object.keys(userCreatedPages).length / 5) * 100))
    },
    {
        id: 'shopaholic',
        name: 'Shopaholic',
        description: 'Purchase 5 items from the FExplorer Shop.',
        awards: [{ type: 'fpoints', amount: 200 }],
        checkUnlock: () => Object.keys(userChannel.ownedItems).length >= 5,
        getProgress: () => ({ current: Object.keys(userChannel.ownedItems).length, target: 5 }),
        progress: () => Math.min(100, Math.round((Object.keys(userChannel.ownedItems).length / 5) * 100))
    },
    {
        id: 'page_visits_100',
        name: 'This guy does not shower!',
        description: 'Visit 100 unique pages.',
        awards: [{ type: 'fpoints', amount: 2000 }, { type: 'cosmetic', id: '100_user_page_visit' }],
        checkUnlock: () => (achievementProgress['page_visits'] || 0) >= 100,
        getProgress: () => ({ current: achievementProgress['page_visits'] || 0, target: 100 }),
        progress: () => Math.min(100, Math.round(((achievementProgress['page_visits'] || 0) / 100) * 100))
    },
    {
        id: 'cookies_500',
        name: 'Cookie Monster',
        description: 'Collect 500 cookies.',
        awards: [{ type: 'fpoints', amount: 500 }],
        checkUnlock: () => (userCookies || 0) >= 500,
        getProgress: () => ({ current: userCookies || 0, target: 500 }),
        progress: () => Math.min(100, Math.round(((userCookies || 0) / 500) * 100))
    },
    {
        id: 'dangerous_page',
        name: 'Curiosity Killed the Cat',
        description: 'Visit every dangerous user page.',
        awards: [{ type: 'fpoints', amount: 666 }, { type: 'cosmetic', id: 'dangerous_page' }],
        checkUnlock: () => false, // TODO: Add dangerous page tracking
        progress: null
    },
    {
        id: 'jx1dx1_badge',
        name: 'congratulations.i.guess.',
        description: 'Did what JX1DX1 told you to do. <br> bmljZS5iYWRnZS5icm8u',
        awards: [{ type: 'fpoints', amount: 2008 }, { type: 'cosmetic', id: 'jx1dx1_badge' }],
        checkUnlock: () => false, // TODO: Add tracking for visiting paranoid.com/jx1dx1
        progress: null
    },
    {
        id: 'code_badge',
        name: 'code_badge',
        description: 'Placed in all the codes, you sweat.',
        awards: [{ type: 'fpoints', amount: 2010 }, { type: 'cosmetic', id: 'binary_theme' }],
        checkUnlock: () => false, // TODO: Add tracking for placing all codes
        progress: null
    },
    {
        id: 'roblox_collector',
        name: 'Roblox Collector',
        description: 'Find and collect 5 Roblox-themed items around the browser.',
        awards: [{ type: 'fpoints', amount: 2006 }, { type: 'cosmetic', id: 'roblox_theme' }],
        checkUnlock: () => false, // uhhh i forgot
        progress: null
    },
    {
        id: 'signin_verified',
        name: 'Sign in Verified!',
        description: 'Sign in to FExplorer!',
        awards: [{ type: 'fpoints', amount: 1000 }],
        checkUnlock: () => false, // check if the user is signed in or not
        progress: null
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

// Helper function to increment progress trackers
function incrementAchievementProgress(key, amount = 1) {
    if (!achievementProgress[key]) achievementProgress[key] = 0;
    achievementProgress[key] += amount;
    saveAchievementProgress();
    checkAchievements();
}

// Helper function to set progress tracker to a value
function setAchievementProgress(key, value) {
    achievementProgress[key] = value;
    saveAchievementProgress();
    checkAchievements();
}

// Binary Theme
function binaryTheme() {
    if (userChannel.ownedItems[award.id] === 'binary_theme') {

    }
};
// Terminal system
function loadTerminal() {
    browserContent.innerHTML = `
        <div id="terminal" class="terminal-container">
            <div id="terminalOutput" class="terminal-output"></div>
            <div class="terminal-input-line">
                <span class="terminal-prefix">></span>
                <input id="terminalInput" class="terminal-input" autocomplete="off" autofocus>
            </div>
        </div>
    `;

    initTerminal();
}
function initTerminal() {
    const output = document.getElementById('terminalOutput');
    const input = document.getElementById('terminalInput');

    const print = (text) => {
        output.innerHTML += `<div class="terminal-line">${text}</div>`;
        output.scrollTop = output.scrollHeight;
    };

    // Show welcome message
    print("FExplorer Terminal v1.0");
    print("Type 'help' to see available commands.");
    print("");

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            input.value = "";
            print("> " + command);
            runTerminalCommand(command, print);
        }
    });
}
function runTerminalCommand(cmd, print) {
    const parts = cmd.split(" ");
    const base = parts[0].toLowerCase();

    switch (base) {
        case "help":
            print("Available commands:");
            print("help - Show this list");
            print("clear - Clear terminal");
            print("points - Show your FPoints");
            print("date - Show system date/time");
            print("open [url] - Open an FExplorer page");
            print("whoami - Identity check");
            print("fbot - Chat with FBot?");
            break;

        case "clear":
            document.getElementById('terminalOutput').innerHTML = "";
            break;

        case "points":
            print(`You have ${userFPoints} FPoints.`);
            break;

        case "date":
            print(new Date().toString());
            break;

        case "open":
            if (parts.length < 2) {
                print("Usage: open <url>");
            } else {
                navigate(parts[1]); // Your existing navigation function
                print("Opening " + parts[1] + "...");
            }
            break;

        case "whoami":
            print("You are the main user of FExplorer.");
            break;

        case "fbot":
            print("Establishing secure link with FBot...");
            setTimeout(() => print("Connection denied. (FBot said no 💀)"), 800);
            break;
        
        case "teapot":
            print("Loading a very detailed looking teapot...");
            setTimeout(() => print("Error 518 - I'm A Teapot!<br>Yeah no you're not gonna see a teapot here."), 2000);
            updateFPointsDisplay();
            saveAppState();
            showFPointsNotification(518);
            break;
        default:
            print(`Unknown command: ${cmd}`);
            print("Type 'help' for a list of valid commands.");
    }
}


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
    // Create a visual notification element
    let notif = document.getElementById('achievementNotif');
    if (!notif) {
        notif = document.createElement('div');
        notif.id = 'achievementNotif';
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #333;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 350px;
            z-index: 999999;
            font-family: Arial, sans-serif;
            border: 2px solid #FF8C00;
        `;
        document.body.appendChild(notif);
    }
    
    const awardsText = achievement.awards.map(award => {
        switch(award.type) {
            case 'fpoints':
                return `+${award.amount} FPoints`;
            case 'luck':
                return `+${award.amount}x Luck`;
            case 'cosmetic':
                return `Cosmetic: ${award.id}`;
            default:
                return '';
        }
    }).join(' • ');
    
    notif.innerHTML = `
        <div style="font-size: 1.3em; font-weight: bold; margin-bottom: 8px;">🏆 Achievement Unlocked!</div>
        <div style="font-size: 1.1em; margin-bottom: 5px;">${achievement.name}</div>
        <div style="font-size: 0.9em; margin-bottom: 5px; opacity: 0.8;">${achievement.description}</div>
        <div style="font-size: 0.85em; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.3); color: #1a1a1a; font-weight: bold;">
            ${awardsText}
        </div>
    `;
    
    notif.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notif.style.opacity = '1';
        notif.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            notif.style.opacity = '0';
            setTimeout(() => notif.style.display = 'none', 300);
        }, 4700);
    }, 0);
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

/*───────────────────────────────
 🌐 FExplorer Create + Creator Hub
────────────────────────────────*/

// --- CREATE PAGE EDITOR UI ---
function getCreatePageEditorHTML() {
    if (!draftPage) initializeDraftPage();

    const simpleButtonsHtml = (draftPage.simpleButtons || []).map((btn, i) => `
        <div class="created-button-preview">
            <span>Text: "${escapeHtml(btn.text)}" | URL: "${escapeHtml(btn.url)}"</span>
            <button class="remove-button" data-index="${i}">✕</button>
        </div>
    `).join('');

    return `
        <header class="fexplorer-create-header">
            <img src="icons/fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <span class="app-title">FExplorer Create Studio</span>
            <nav>
                <a href="#" data-url="fexplorer:home" class="app-header-button">🏠 Home</a>
                <a href="#" data-url="fexplorer:create.hub" class="app-header-button">📁 My Pages</a>
            </nav>
        </header>

        <main class="fexplorer-create-main">
            <section class="fexplorer-create-form">
                <h2>Create a Custom Page</h2>

                <div class="mode-toggle">
                    <label><input type="radio" name="creationMode" value="simple" ${draftPage.creationMode === 'simple' ? 'checked' : ''}> Simple Mode</label>
                    <label><input type="radio" name="creationMode" value="code" ${draftPage.creationMode === 'code' ? 'checked' : ''}> Code Mode</label>
                </div>

                <!-- SIMPLE MODE -->
                <div id="simpleEditorSection" style="display:${draftPage.creationMode === 'simple' ? 'block' : 'none'};">
                    <div class="form-group">
                        <label for="pageTitleInput">Title</label>
                        <input type="text" id="pageTitleInput" maxlength="50" value="${escapeHtml(draftPage.title)}" placeholder="Page Title">
                    </div>
                    <div class="form-group">
                        <label for="pageContentInput">Content (HTML/Text)</label>
                        <textarea id="pageContentInput" rows="6" placeholder="Write your content here">${escapeHtml(draftPage.simpleContent)}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Add Button</label>
                        <input type="text" id="buttonTextInput" maxlength="30" placeholder="Button Text">
                        <input type="text" id="buttonUrlInput" placeholder="Button URL (e.g. fexplorer:home)">
                        <button id="addPageButton" class="fexplorer-button">Add</button>
                    </div>
                    <div class="form-group">
                        <label>Buttons Added</label>
                        <div id="pageButtonsPreview">${simpleButtonsHtml || '<p style="color:#888;">No buttons yet.</p>'}</div>
                    </div>
                </div>

                <!-- CODE MODE -->
                <div id="codeEditorSection" style="display:${draftPage.creationMode === 'code' ? 'block' : 'none'};">
                    <div class="form-group">
                        <label for="htmlCodeInput">HTML</label>
                        <textarea id="htmlCodeInput" rows="10" spellcheck="false">${escapeHtml(draftPage.htmlCode)}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="cssCodeInput">CSS</label>
                        <textarea id="cssCodeInput" rows="6" spellcheck="false">${escapeHtml(draftPage.cssCode)}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="jsCodeInput">JavaScript</label>
                        <textarea id="jsCodeInput" rows="6" spellcheck="false">${escapeHtml(draftPage.jsCode)}</textarea>
                    </div>
                    <small class="code-note">JS alerts are intercepted in preview.</small>
                </div>

                <div class="fexplorer-create-actions">
                    <button id="previewUserPage" class="fexplorer-button" style="background-color:#007bff;">Preview</button>
                    <button id="publishUserPage" class="fexplorer-button">Publish</button>
                </div>

                <div id="pageStatusMessage" class="status-message" style="margin-top:10px;"></div>
            </section>
        </main>

        <footer class="fexplorer-create-footer">
            <p>Your page is saved locally. Not accessible by others.</p>
        </footer>
    `;
}

function renderCreatePageEditor() {
    if (!draftPage) initializeDraftPage();
    browserContent.innerHTML = getCreatePageEditorHTML();
    attachCreatePageEditorEventListeners();
}

/*───────────────────────────────
 📁 CREATOR HUB PAGE
────────────────────────────────*/
function getFExplorerCreatorHubPageHTML() {
    const pageIds = Object.keys(userCreatedPages);
    const pagesGridHtml = pageIds.length ? pageIds.map(pageId => {
        const page = userCreatedPages[pageId];
        const pageUrl = `fexplorer:user-page-${pageId}`;
        const description = page.creationMode === 'simple'
            ? 'Simple page with text and buttons.'
            : 'Custom HTML/CSS/JS page.';
        return `
            <div class="hub-item-card">
                <div class="hub-card-info">
                    <h3>${escapeHtml(page.title)}</h3>
                    <p>${description}</p>
                </div>
                <div class="hub-card-actions">
                    <button class="hub-button view" data-url="${pageUrl}">View</button>
                    <button class="hub-button delete" data-id="${pageId}">Delete</button>
                </div>
            </div>`;
    }).join('') : '<p style="color:#888;text-align:center;">No pages yet. Create one!</p>';

    return `
        <div class="create-hub-page-layout">
            <div class="app-header">
                <img src="icons/fexplorer.png" class="app-logo">
                <span class="app-title">FExplorer Creator Hub</span>
                <a href="#" data-url="fexplorer:home" class="app-header-button">🏠 Home</a>
                <a href="#" data-url="fexplorer:create" class="app-header-button">➕ New Page</a>
            </div>

            <div class="create-hub-main-content">
                <h1>Your Published Pages</h1>
                <p class="tagline">Manage, view, and delete your creations.</p>
                <div id="userPagesGrid" class="hub-item-grid">${pagesGridHtml}</div>
            </div>

            <footer class="footer-note" style="text-align:center;margin:20px;">
                Your creations, your FExplorer.
            </footer>
        </div>`;
}

/*───────────────────────────────
 📄 VIEW PUBLISHED PAGE
────────────────────────────────*/
function getPublishedUserPageHTML(pageId) {
    const pageData = userCreatedPages[pageId];
    if (!pageData) {
        return `
            <div style="text-align:center;padding:50px;">
                <h1>Page Not Found</h1>
                <p>The page "${pageId}" could not be found.</p>
                <p><a href="#" data-url="fexplorer:home">Return Home</a></p>
            </div>`;
    }

    if (pageData.creationMode === 'simple') {
        const buttonsHtml = (pageData.simpleButtons || []).map(btn => `
            <button class="user-page-button" data-url="${escapeHtml(btn.url)}">${escapeHtml(btn.text)}</button>
        `).join('');

        return `
            <div class="user-created-page-layout">
                <div class="app-header">
                    <img src="icons/placeholder.png" class="app-logo">
                    <span class="app-title">${escapeHtml(pageData.title)}</span>
                    <a href="#" data-url="fexplorer:create.hub" class="app-header-button">📁 Hub</a>
                </div>
                <div class="user-page-content">
                    <h1>${escapeHtml(pageData.title)}</h1>
                    <div class="user-page-text">${pageData.simpleContent}</div>
                    <div class="user-page-buttons">${buttonsHtml}</div>
                </div>
                <footer class="footer-note" style="text-align:center;margin:20px;">User-created page.</footer>
            </div>`;
    } else {
        return `
            <div class="user-created-code-page-layout">
                <div class="app-header">
                    <img src="icons/fexplorer.png" class="app-logo">
                    <span class="app-title">${escapeHtml(pageData.title)}</span>
                    <a href="#" data-url="fexplorer:create.hub" class="app-header-button">📁 Hub</a>
                </div>
                <div class="user-code-page-content" id="userCodePageContent"></div>
                <footer class="footer-note" style="text-align:center;margin:20px;">Custom code page.</footer>
            </div>`;
    }
}

/*───────────────────────────────
 ❌ DELETE PAGE
────────────────────────────────*/
function deletePage(pageId) {
    if (!userCreatedPages[pageId]) return;
    if (confirm(`Delete "${userCreatedPages[pageId].title}"? This cannot be undone.`)) {
        delete userCreatedPages[pageId];
        saveAppState();
        alert('✅ Page deleted successfully.');
        browserContent.innerHTML = getFExplorerCreatorHubPageHTML();
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
    // Search Engine: Goog! (Chromium-like)
    'goog.com': `
        <div class="goog-homepage" style="display:flex;flex-direction:column;align-items:center;padding:60px 20px;">
            <img src="icons/goog-logo.png" alt="Goog! Logo" class="goog-logo" style="width:220px;margin-bottom:18px;">
            <div style="width:100%;max-width:760px;display:flex;gap:8px;align-items:center;">
                <input type="search" id="googSearchInput" class="goog-search-input" placeholder="Search the web with Goog!" style="flex:1;padding:14px 18px;border-radius:24px;border:1px solid #e0e0e0;box-shadow:0 2px 6px rgba(32,33,36,.08);">
                <button id="googSearchButton" class="goog-search-button home-page-button" style="padding:12px 18px;border-radius:20px;font-weight:600;">Search</button>
            </div>
            <div id="googSearchResults" class="goog-search-results" style="width:100%;max-width:760px;margin-top:28px;"></div>
            <p class="footer-note" style="margin-top:32px;color:#70757a">© Goog | Made by smrtC951!</p>
        </div>
    `,
    // FExplorer Home Page
    // The randomWebsiteButton is just a random 'User Page' button (its just a random page)
    'fexplorer:home': `
        <div class="home-page-enhanced">
            <div class="home-header-banner">
                <img src="icons/fexplorer.png" alt="FExplorer Logo" class="home-logo">
                <div class="home-welcome-text">
                    <h1>Welcome to FExplorer!</h1>
                    <p class="tagline">A browser inside your browser.</p>
                </div>
            </div>
            
            <div class="home-stats-container">
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-info">
                        <div class="stat-label">FPoints</div>
                        <div class="stat-value" id="homePageFPoints">0</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🍪</div>
                    <div class="stat-info">
                        <div class="stat-label">Cookies</div>
                        <div class="stat-value" id="homePageCookies">0</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎲</div>
                    <div class="stat-info">
                        <div class="stat-label">Luck</div>
                        <div class="stat-value" id="homePageLuck">0</div>
                    </div>
                </div>
            </div>

            <div class="home-fun-fact">
                <div class="fun-fact-icon">💡</div>
                <div class="fun-fact-content">
                    <h3>Did you know?</h3>
                    <p id="funFactText">Loading fun facts...</p>
                </div>
            </div>

            <div class="home-search-section">
                <div class="home-page-search-container">
                    <input type="search" class="home-page-search-input" placeholder="Search the web or type in a URL...">
                    <button class="home-page-search-button">Search</button>
                </div>
            </div>

            <div class="home-links-section">
                <h2>🌐 Explore</h2>
                <div class="home-page-buttons-container">
                    <button class="home-page-button" data-url="fexplorer:quick-links">Quick Links</button>
                    <button class="home-page-button" data-url="fexplorer:100-default/welcome">Random Page</button>
                    <button class="home-page-button updates-button" data-url="fexplorer:updates">Updates</button>
                    <button class="home-page-button" data-url="fexplorer:financial">Financials</button>
                    <button class="home-page-button" data-url="fexplorer:settings">Settings</button>
                    <button class="home-page-button" data-url="fexplorer:games">Games</button>
                    <button class="home-page-button" data-url="fexplorer:about">About</button>
                    <button class="home-page-button" data-url="fexplorer:placeholder" id="yourAccountButton" disabled>Your Account</button>
                </div>
            </div>

            <p class="footer-note">Made by smrtC951! | FExplorer</p>
        </div>
    `,
    // FExplorer Quick Links Page
    'fexplorer:quick-links': `
        <div class="quicklinks-page-enhanced">
            <div class="page-header">
                <h1>🔗 Quick Links</h1>
                <p class="page-subtitle">Your gateway to all FExplorer destinations</p>
                <div class="quicklinks-search-container">
                    <input type="search" id="quicklinksSearchInput" class="quicklinks-search-input" placeholder="Search quick links...">
                    <button id="quicklinksSearchButton" class="quicklinks-search-button">Search</button>
                </div>
            </div>
            
            <div class="quicklinks-grid" id="quicklinksGrid">
                <div class="quicklink-card" data-title="FExplorer Home" data-keywords="home fexplorer welcome">
                    <h3><a href="#" data-url="fexplorer:home">FExplorer Home</a></h3>
                    <p>Return to the FExplorer welcome page and see your stats.</p>
                </div>
                <div class="quicklink-card" data-title="Goog!" data-keywords="goog search engine web">
                    <h3><a href="#" data-url="goog.com">Goog!</a></h3>
                    <p>Visit the Goog! search engine to find information.</p>
                </div>
                <div class="quicklink-card" data-title="Financials" data-keywords="financials fpoints stocks trading money">
                    <h3><a href="#" data-url="fexplorer:financial">Financials</a></h3>
                    <p>Manage your FPoints, trade stocks, and earn bonuses.</p>
                </div>
                <div class="quicklink-card" data-title="Shop" data-keywords="shop buy items cosmetics themes">
                    <h3><a href="#" data-url="fexplorer:shop">Shop</a></h3>
                    <p>Spend your FPoints on cosmetics and luck boosts.</p>
                </div>
                <div class="quicklink-card" data-title="Updates" data-keywords="updates news changelog new features">
                    <h3><a href="#" data-url="fexplorer:updates">Updates</a></h3>
                    <p>See what's new and what's coming to FExplorer!</p>
                </div>
                <div class="quicklink-card" data-title="Games" data-keywords="games play fun challenges">
                    <h3><a href="#" data-url="fexplorer:games">Games</a></h3>
                    <p>Explore a variety of fun games and challenges.</p>
                </div>
                <div class="quicklink-card" data-title="Page Creator" data-keywords="creator create pages build custom">
                    <h3><a href="#" data-url="fexplorer:create.new">Page Creator</a></h3>
                    <p>Create your own custom pages and share them!</p>
                </div>
                <div class="quicklink-card" data-title="Programs" data-keywords="programs tools applications software">
                    <h3><a href="#" data-url="fexplorer:programs">Programs</a></h3>
                    <p>Access professional programs and tools for FExplorer.</p>
                </div>
                <div class="quicklink-card" data-title="Encyclopedia" data-keywords="encyclopedia wiki learn information knowledge">
                    <h3><a href="#" data-url="fexplorer:wiki">Encyclopedia</a></h3>
                    <p>Learn about currencies, navigation, and more.</p>
                </div>
                <div class="quicklink-card" data-title="Achievements" data-keywords="achievements badges unlock rewards trophies">
                    <h3><a href="#" data-url="fexplorer:achievements">Achievements</a></h3>
                    <p>Unlock badges and earn exclusive rewards.</p>
                </div>
                <div class="quicklink-card" data-title="About" data-keywords="about fexplorer info details help">
                    <h3><a href="#" data-url="fexplorer:about">About</a></h3>
                    <p>Learn more about FExplorer and what it offers.</p>
                </div>
                <div class="quicklink-card" data-title="Cookies" data-keywords="cookies currency earn trade">
                    <h3><a href="#" data-url="fexplorer:cookies">Cookies</a></h3>
                    <p>Manage your cookies and learn about trading.</p>
                </div>
            </div>

            <p class="footer-note">Made by smrtC951!</p>
        </div>
    `,
    // FExplorer Financial Page
    'fexplorer:financial': `
        <div class="financial-page-enhanced">
            <div class="financial-header">
                <img src="icons/financial-icon-new.png" alt="Financial" class="financial-logo">
                <h1>FExplorer Financials</h1>
                <p class="financial-tagline">Manage your wealth and explore totally legal investments</p>
            </div>

            <div class="financial-stats">
                <div class="financial-stat-card">
                    <div class="stat-label">💰 FPoints Balance</div>
                    <div class="stat-large-value" id="currentFPoints">0</div>
                </div>
                <div class="financial-stat-card">
                    <div class="stat-label">🎲 Luck Multiplier</div>
                    <div class="stat-large-value" id="currentLuck">1.0x</div>
                </div>
                <div class="financial-stat-card">
                    <div class="stat-label">📊 Stock Shares</div>
                    <div class="stat-large-value" id="userOwnedStock">0</div>
                </div>
            </div>

            <div class="financial-section">
                <h2>⭐ Daily Bonus</h2>
                <p>Claim a bonus of FPoints every 5 minutes!</p>
                <button id="claimDailyBonusButton" class="financial-button financial-button-primary">Claim Daily Bonus</button>
                <p id="dailyBonusMessage" class="financial-message"></p>
            </div>

            <div class="financial-section">
                <h2>📈 WebTech Stock Trading</h2>
                <div class="stock-info">
                    <p>Current Price: <span id="stockPriceDisplay" class="price-highlight">$100.00</span> per share</p>
                    <p>Market Tip: Buy low, sell high!</p>
                </div>
                
                <div class="stock-actions">
                    <div class="action-group">
                        <label>Quantity to Buy:</label>
                        <input type="number" id="stockBuyInput" class="financial-input" placeholder="1" min="1" value="1">
                        <button id="buyStockButton" class="financial-button financial-button-success">🟢 Buy Stock</button>
                    </div>
                    <div class="action-group">
                        <label>Quantity to Sell:</label>
                        <input type="number" id="stockSellInput" class="financial-input" placeholder="1" min="1" value="1">
                        <button id="sellStockButton" class="financial-button financial-button-danger">🔴 Sell Stock</button>
                    </div>
                </div>
            </div>

            <div class="financial-section">
                <h2>🎰 High Risk Options</h2>
                <button class="financial-button financial-button-warning" id="riskAllButton">Risk All FPoints</button>
                <button class="financial-button financial-button-info" id="negotiateButton">Negotiate</button>
            </div>

            <div class="financial-navigation">
                <button class="financial-nav-button" data-url="fexplorer:shop">Visit Shop</button>
                <button class="financial-nav-button" data-url="fexplorer:home">Back to Home</button>
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
			<h2>Update Name: Alpha 1.5 - This is the overhaul of an update, truss me!</h2>
            <p>Release Date: <i>November 25, 2025</i></p>

            <div class="updates-section">
                <h2>Current Updates</h2>
                <ul>
                    <li>Added new endings to Interactive Game: Into The Horizon</li>
                    <li>Added something to FExplorer Legacy.. Shhh...</li>
                    <li>Completely recoded the create feature! Now it is called FStudio, with the link "fexplorer:create.new".</li>
                    <li>Tabs has been added! You can now play games while.. playing another game, except you can't. Brh.</li>
                    <li>Recoded the random page mechanic! It now uses the "fexplorer:(id)-(category)/(variant)" URL!</li>
                    <li>Added forward navigation!</li>
                    <li>FExplorer Slideshow is now part of the System Suite!</li>
                    <li>A Quality of Life update to some FExplorer pages! They look too good. I liked the flat one.</li>
                    <li>Upgraded Goog and Ping search engines!</li>
                    <li>Brand new game - survial game! It's kinda broken, but you should try it out!</li>
                </ul>
            </div>

            <div class="home-page-buttons-container">
                <button class="home-page-button" data-url="fexplorer:home">Home</button>
                <button class="home-page-button" data-url="fexplorer:quick-links">Quick Links</button>
            </div>
            <p class="footer-note" style="margin-top: 20px;">Made by smrtC951!</p>
        </div>
    `,
    // FExplorer Settings Page (NEW)
'fexplorer:settings': `
<div class="settings-wrapper">
    <div class="fx-header">
        <img src="icons/settings-icon.png" class="fx-header-icon" alt="Settings">
        <div class="fx-header-text">
            <h1>Settings</h1>
            <p>Customize your FExplorer experience</p>
        </div>
    </div>

    <div class="fx-settings-grid">

        <!-- Appearance -->
        <section class="fx-card" aria-labelledby="appearanceTitle">
            <h2 id="appearanceTitle">Appearance</h2>

            <label class="fx-label" for="osSelect">Operating System</label>
            <select id="osSelect" class="fx-input">
                <option value="default">Mac OS (Default)</option>
                <option value="win11">Windows 11</option>
                <option value="win7">Windows 7</option>
                <option value="win8">Windows 8</option>
                <option value="winxp">Windows XP</option>
                <option value="macx">Mac OS X</option>
                <option value="mac9">Mac OS 9</option>
                <option value="classic">Classic (Legacy)</option>
            </select>

            <label class="fx-label" for="themeSelect">Theme</label>
            <select id="themeSelect" class="fx-input">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="classic">Classic</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="binary">Binary</option>
            </select>

            <label class="fx-label" for="homepageSelect">Homepage</label>
            <select id="homepageSelect" class="fx-input">
                <option value="fexplorer:home">FExplorer Home</option>
                <option value="fexplorer:quick-links">Quick Links</option>
                <option value="goog.com">Goog</option>
            </select>
        </section>

        <!-- Search & Privacy -->
        <section class="fx-card" aria-labelledby="searchTitle">
            <h2 id="searchTitle">Search & Privacy</h2>
            <label class="fx-label" for="searchEngineSelect">Search Engine</label>
            <select id="searchEngineSelect" class="fx-input">
                <option value="fexplorer">FExplorer Browser</option>
                <option value="goog">Goog</option>
                    <option value="ping" disabled>Ping</option>
                </select>
            <label class="fx-flex" for="notificationsToggle">
                <span>Enable Notifications</span>
                <input type="checkbox" id="notificationsToggle">
            </label>
            <label class="fx-flex" for="loginToggle">
                <span>Hide Login at Startup</span>
                <input type="checkbox" id="loginToggle">
            </label>
            <label class="fx-flex" for="cookieToggle">
                <span>Disable Cookies</span>
                <input type="checkbox" id="cookieToggle">
            </label>
        </section>
        <!-- Customization -->
        <section class="fx-card" aria-labelledby="customizationTitle">
            <h2 id="customizationTitle">Customization</h2>
            <label class="fx-label" for="cursorToggle">Cursor Style</label>
                <select id="cursorToggle" class="fx-input">
                    <option value="default">Default</option>
                    <option value="95">Classic</option>
                    <option value="aero">Futiger Aero</option>
                </select>

        </section>
        <!-- Music -->
        <section class="fx-card" aria-labelledby="musicTitle">
            <h2 id="musicTitle">Music</h2>
            <label class="fx-flex" for="musicToggle">
                <span>Enable Background Music</span>
                <input type="checkbox" id="musicToggle">
            </label>
            <label class="fx-label" for="musicVolumeSetting">Volume</label>
            <div class="fx-row">
                <input type="range" id="musicVolumeSetting" min="0" max="1" step="0.01" value="0.6">
                <span id="musicVolumeLabel" class="small">60%</span>
            </div>
            <label class="fx-label" for="musicSelect">Default Music</label>
            <select id="musicSelect" class="fx-input">
                <option value="fexplorer">Random (Default)</option>
                <option value="orbspire">Orbspire Sanctum</option>
                <option value="obby7">Obby7</option>
            </select>
            <p class="fx-note">These are placeholder tracks. More will be added later.</p>
        </section>

        <!-- Developer -->
        <section class="fx-card fx-devcard" aria-labelledby="devTitle">
            <h2 id="devTitle">Developer Tools</h2>

            <label class="fx-flex" for="devModeToggle">
                <span>Developer Mode</span>
                <input type="checkbox" id="devModeToggle">
            </label>

            <p class="fx-dev-warning">Enabling Developer Mode unlocks experimental tools and inspect element.</p>

            <div id="devToolsSection" style="display: none; margin-top: 15px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 15px;">
                <h3 style="font-size: 0.95rem; margin-bottom: 10px;">Debug & Inspection</h3>
                
                <button id="inspectElementBtn" class="fx-button" style="display: block; width: 100%; margin-bottom: 8px; text-align: left;">
                    🔍 Inspect Element (Click to enable)
                </button>

                <button id="showConsoleBtn" class="fx-button" style="display: block; width: 100%; margin-bottom: 8px; text-align: left;">
                    📋 Show Console Logs
                </button>

                <button id="viewStorageBtn" class="fx-button" style="display: block; width: 100%; margin-bottom: 8px; text-align: left;">
                    💾 View Storage (localStorage)
                </button>

                <button id="toggleGridBtn" class="fx-button" style="display: block; width: 100%; margin-bottom: 8px; text-align: left;">
                    📐 Toggle Grid Overlay
                </button>

                <button id="toggleMetricsBtn" class="fx-button" style="display: block; width: 100%; margin-bottom: 8px; text-align: left;">
                    📊 Toggle Performance Metrics
                </button>

                <button id="exportDataBtn" class="fx-button" style="display: block; width: 100%; margin-bottom: 8px; text-align: left;">
                    📤 Export Game Data
                </button>

                <button id="clearStorageBtn" class="fx-button fx-button-danger" style="display: block; width: 100%; text-align: left;">
                    🗑️ Clear All Storage
                </button>
            </div>
        </section>

        <!-- Actions -->
        <section class="fx-card" aria-labelledby="systemTitle">
            <h2 id="systemTitle">System</h2>

            <div class="fx-actions">
                <button id="saveSettingsBtn" class="fx-button fx-button-primary">Save Settings</button>
                <button id="resetSettingsBtn" class="fx-button fx-button-danger">Reset All</button>
            </div>

            <div id="settingsStatus" class="fx-status" aria-live="polite"></div>
        </section>

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
    // FExplorer NEW Create page
    'fexplorer:create.new': `
        <div class="fstudio-page">
            <div class="app-header">
                <img src="icons/fexplorer.png" class="app-logo">
                <span class="app-title">FStudio</span>
                <a data-url="fexplorer:home" class="app-header-button">Home</a>
                <a data-url="fexplorer:create.hub" class="app-header-button">Creator Hub</a>
            </div>

            <div class="fstudio-container" style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 1200px; margin: 0 auto;">
                <!-- Left Panel: Page Creator -->
                <div class="fstudio-panel">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px 12px 0 0;">
                        <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.5em;">📄</span>
                            Create a New Page
                        </h2>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #ddd; border-top: none;">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; font-weight: bold; margin-bottom: 5px; color: #333;">Page Title</label>
                            <input type="text" id="pageTitle" placeholder="Enter page title" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; font-weight: bold; margin-bottom: 5px; color: #333;">Page Description</label>
                            <textarea id="pageDescription" placeholder="Describe your page..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; resize: vertical; height: 80px;"></textarea>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; font-weight: bold; margin-bottom: 5px; color: #333;">Creation Mode</label>
                            <div style="display: flex; gap: 10px;">
                                <button id="simpleModeBtn" class="mode-btn" style="flex: 1; padding: 10px; border: 2px solid #667eea; background: #667eea; color: white; border-radius: 6px; cursor: pointer; font-weight: bold;">
                                    🎨 Simple
                                </button>
                                <button id="codeModeBtn" class="mode-btn" style="flex: 1; padding: 10px; border: 2px solid #ccc; background: white; color: #333; border-radius: 6px; cursor: pointer; font-weight: bold;">
                                    💻 Code
                                </button>
                            </div>
                        </div>
                        <button id="createPageBtn" style="width: 100%; padding: 12px; background: #4CAF50; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 1em;">
                            ✨ Create Page
                        </button>
                    </div>
                </div>

                <!-- Right Panel: Studio Tools -->
                <div class="fstudio-panel">
                    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 12px 12px 0 0;">
                        <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.3em;">🎬</span>
                            Studio Tools
                        </h2>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #ddd; border-top: none; display: flex; flex-direction: column; gap: 12px;">
                        <button style="padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.3em;">🎨</span>
                            Visual Editor
                        </button>
                        <button style="padding: 15px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.3em;">🎬</span>
                            Preview Page
                        </button>
                        <button id="uploadYoutubeBtn" disabled style="padding: 15px; background: #ccc; color: #999; border: none; border-radius: 8px; cursor: not-allowed; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.3em;">📹</span>
                            Upload to MyTube
                        </button>
                        <div style="padding: 12px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; color: #856404; font-size: 0.9em;">
                            <strong>💡 Tip:</strong> MyTube uploads are coming soon! Check back later.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    // FExplorer Boomarks Manager
    'fexplorer:bookmarks': `
        <div class="home-page-content">
            <h1>Bookmark Manager</h1>
            <p>yes yes</p>
        </div>
    `,
    'fexplorer:ai': `
        <div class="home-page-content">
            <h1>FExplorer AI Assistant</h1>
            <p>This feature will be coming in another update. Stay tuned!</p>
        </div>
    `,
    // MyTube Video Sharing Platform
    'mytube.com': `
        <div class="home-page-content" style="text-align: center; padding: 60px 20px;">
            <img src="icons/mytube-logo.png" alt="MyTube Logo" class="mytube-logo">
            <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 12px; padding: 30px; max-width: 500px; margin: 30px auto; color: #856404;">
                <h2 style="margin-top: 0; color: #ff6600;">🚧 Under Construction 🚧</h2>
                <p style="font-size: 1.1em; line-height: 1.6;">
                    MyTube is currently under development! We're building an amazing video sharing platform for FExplorer.
                </p>
                <p style="margin: 20px 0; color: #ff0000; font-weight: bold;">
                    Coming Soon!
                </p>
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
                    <strong>What to Expect:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Upload and share your FStudio creations</li>
                        <li>Discover amazing videos from other creators</li>
                        <li>Earn rewards for popular uploads</li>
                        <li>Build your creator channel</li>
                    </ul>
                </div>
                <p style="font-size: 0.9em; opacity: 0.8;">
                    Check back soon for the launch!
                </p>
            </div>
            <button class="home-page-button" data-url="fexplorer:home" style="margin-top: 20px;">
                ← Return to Home
            </button>
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
        <div class="events-page-content home-page-content">
            <img src="icons/badge-icon.png" alt="Events Logo" class="app-logo">
            <h1>FExplorer Events</h1>
            <p class="tagline">Participate in limited-time events to earn exclusive rewards!</p>

            <!-- Event Status Card -->
            <div id="eventStatusCard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
                <div style="font-size: 1.2em; font-weight: bold; margin-bottom: 8px;" id="eventStatus">Status: Coming Soon</div>
                <div style="font-size: 0.9em; opacity: 0.9;" id="eventCountdown">The Burger Event is scheduled to begin soon</div>
            </div>

            <!-- Current Event Details -->
            <div class="event-details-section" style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #FF6B6B;">
                <h2 style="margin-top: 0; color: #FF6B6B;">🍔 The Burger Event</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                    <div>
                        <div style="font-weight: bold; color: #666;">Event Type</div>
                        <div>Limited-Time Challenge</div>
                    </div>
                    <div>
                        <div style="font-weight: bold; color: #666;">Duration</div>
                        <div id="eventDuration">Starts soon</div>
                    </div>
                    <div>
                        <div style="font-weight: bold; color: #666;">Difficulty</div>
                        <div>Medium ⭐⭐⭐</div>
                    </div>
                </div>
                <p style="margin: 15px 0; line-height: 1.6;">
                    Join the Burger Event to get burger-themed rewards! Complete fun objectives, earn FPoints, and unlock exclusive cosmetics. Don't miss out on this tasty opportunity!
                </p>
            </div>

            <!-- Objectives Section -->
            <div class="objectives-section" style="margin: 20px 0;">
                <h2 style="color: #333; margin-bottom: 15px;">📋 Event Objectives</h2>
                <p style="color: #666; margin-bottom: 15px;">Complete objectives to earn FPoints rewards. Progress is tracked automatically!</p>
                
                <div id="objectivesList" style="display: flex; flex-direction: column; gap: 12px;">
                    <!-- Objectives will be inserted here by JavaScript -->
                </div>
            </div>

            <!-- Rewards Preview -->
            <div class="rewards-section" style="background: #fff8dc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 2px solid #FFD700;">
                <h2 style="margin-top: 0; color: #FF8C00;">🎁 Event Rewards</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                    <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                        <div style="font-size: 1.5em; font-weight: bold; color: #4CAF50;">500</div>
                        <div style="color: #666; margin-top: 5px;">FPoints</div>
                        <div style="font-size: 0.8em; color: #999; margin-top: 5px;">Completion Bonus</div>
                    </div>
                    <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                        <div style="font-size: 1.5em; font-weight: bold; color: #2196F3;">+0.5x</div>
                        <div style="color: #666; margin-top: 5px;">Luck Multiplier</div>
                        <div style="font-size: 0.8em; color: #999; margin-top: 5px;">Event Benefit</div>
                    </div>
                    <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                        <div style="font-size: 1.5em; font-weight: bold; color: #FF6B6B;">🏆</div>
                        <div style="color: #666; margin-top: 5px;">Event Badge</div>
                        <div style="font-size: 0.8em; color: #999; margin-top: 5px;">Exclusive Cosmetic</div>
                    </div>
                </div>
            </div>

            <!-- Event Tips -->
            <div class="event-tips" style="background: #e8f5e9; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #4CAF50;">
                <h3 style="margin-top: 0; color: #2e7d32;">💡 Tips & Tricks</h3>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Higher luck multipliers make objective completion easier</li>
                    <li>Complete all objectives to unlock the exclusive event badge</li>
                </ul>
            </div>

            <!-- Action Buttons -->
            <div class="home-page-buttons-container" style="margin-top: 30px; gap: 10px;">
                <button id="participateEventBtn" class="home-page-button" style="background: #4CAF50; color: white; font-weight: bold;">
                    📌 Get Started
                </button>
            </div>

            <div id="eventMessage" style="margin-top: 20px; padding: 15px; border-radius: 8px; display: none; text-align: center;"></div>
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
                    <li>
                        <a href="#" data-url="fexplorer:games/survial-game">surival game</a>
                        <p class="link-description">A remastered version of a SEWH-inspired game, with more content!</p>
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
        <div class="about-page-enhanced">
            <div class="about-header">
                <img src="icons/fexplorer.png" alt="FExplorer Logo" class="about-logo">
                <h1>About FExplorer</h1>
                <p class="about-tagline">A browser inside your browser, apparently.</p>
            </div>

            <div class="about-content">
                <div class="about-section">
                    <h2>✨ What is FExplorer?</h2>
                    <p>FExplorer is an interactive web browser simulation that combines gaming, social features, and creativity. Explore virtual pages, earn FPoints, trade stocks, play games, and create your own custom content!</p>
                </div>

                <div class="about-section">
                    <h2>🎯 Key Features</h2>
                    <ul class="about-features-list">
                        <li><strong>Earn FPoints</strong> - Complete activities and earn currency to spend in the shop</li>
                        <li><strong>Stock Trading</strong> - Buy and sell stocks to grow your wealth</li>
                        <li><strong>Games</strong> - Play Cookie Clicker, Tic Tac Toe, and more</li>
                        <li><strong>Create Pages</strong> - Design and publish your own custom pages</li>
                        <li><strong>Social Features</strong> - Connect with Headbook, MyTube, and chat systems</li>
                        <li><strong>Achievements</strong> - Unlock badges and earn exclusive rewards</li>
                        <li><strong>Customization</strong> - Choose from multiple themes and cosmetics</li>
                    </ul>
                </div>

                <div class="about-section">
                    <h2>💡 Getting Started</h2>
                    <p>Visit the Quick Links or Explore section to discover all the features FExplorer has to offer. Start by claiming your daily bonus, earning FPoints, and then check out the shop!</p>
                </div>

                <div class="about-section">
                    <h2>🎨 Customization</h2>
                    <p>You can customize your FExplorer experience with different themes, OS window styles, and cosmetics. Visit the Settings to change your preferred interface!</p>
                </div>

                <div class="about-buttons">
                    <button class="about-button" data-url="fexplorer:home">Back to Home</button>
                    <button class="about-button" data-url="fexplorer:quick-links">Quick Links</button>
                </div>
            </div>

            <p class="footer-note">© 2025 FExplorer. Made by smrtC951!</p>
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
                        <a href="#" data-url="fexplorer:create.new">FStudio</a>
                        <p class="link-description">Create all kinds of pages easily!</p>
                    </li>
                    <li>
                        <a href="#" data-url="scripts.visualeditor.com">Visual Scripts Editor</a>
                        <p class="link-description">Script your own programs visually.</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer.chatroom.com">FExplorer Chatroom</a>
                        <p class="link-description">No description available...</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:system">FExplorer System</a>
                        <p class="link-description">The ultimate suite!</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:placeholder">FExplorer Web Archives</a>
                        <p class="link-description">View preserved update logs from previous updates!</p>
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
    // Game: Survial Game (note spelling intentional)
    'fexplorer:games/survial-game': `
        <div class="quick-links-page home-page-content">
            <img src="icons/survival-icon.png" alt="Survial Game" class="app-logo">
            <h1>survial game</h1>
            <p class="tagline">Disaster survival — your cursor is the survivor. Survive rounds of disasters!</p>
            <div class="quick-links-section">
                <h2>Game Area — Map: City</h2>
                <p>Use your cursor to move the survivor around the city map. Avoid tornadoes and tsunamis.</p>
                <div id="survialGameArea" style="width:100%; height:420px; border:1px solid #ccc; position:relative; overflow:hidden; background:#e6f2ff; display:flex; align-items:center; justify-content:center;">
                    <div style="text-align:center;">
                        <button class="home-page-button" id="startSurvialGameButton">Start Survial</button>
                        <div id="survialHUD" style="display:none; margin-top:10px; text-align:left;">
                            <div style="margin-bottom:6px;">Map: <strong>City</strong></div>
                            <div style="display:flex;gap:12px;align-items:center;">
                                <div>Round: <span id="survialRound">0</span></div>
                                <div style="flex:1;">
                                    <div style="background:#eee;border-radius:8px;overflow:hidden; height:14px;">
                                        <div id="survialHealthBar" style="width:100%;height:100%;background:#4caf50;"></div>
                                    </div>
                                </div>
                                <div>Health: <span id="survialHealth">100</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <p style="margin-top:10px; font-size:0.9em; color:#555;">Survive each 12s round. Disasters will spawn and grow more intense over time.</p>
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
    // Game: survial game (thats the name)
    'fexplorer:games/survial-game': `
    <div class="quick-links-page home-page-content">
            <h1>survial game</h1>
            <p class="tagline">Survive disasters and.. survive!</p>
            <p>In Survial Game, you (the cursor) have to survive different disasters, which awards you with FPoints!</p>
            <div class="quick-links-section">
                <h2>Game Area</h2>
                <div id="survialGameArea" style="width: 100%; height: 400px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
                    <button class="home-page-button" id="startSurvialGameButton">Start Game</button>
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
    // Search Engine: Ping (Microsoft-like)
    'ping.com': `
        <div class="ping-homepage" style="display:flex;flex-direction:column;align-items:center;padding:56px 20px;background:linear-gradient(180deg,#f3f6fb,#ffffff);">
            <img src="icons/ping-icon.png" alt="Ping Logo" class="ping-logo" style="width:140px;margin-bottom:18px;">
            <div style="width:100%;max-width:820px;display:flex;flex-direction:column;gap:12px;align-items:stretch;">
                <input type="search" id="googSearchInput" class="goog-search-input" placeholder="Search with Ping" style="padding:16px 18px;border-radius:8px;border:1px solid #d0d7de;background:white;font-size:16px;">
                <div style="display:flex;gap:10px;">
                    <button id="googSearchButton" class="goog-search-button home-page-button" style="flex:0 0 auto;background:#0078d4;color:white;padding:10px 16px;border-radius:6px;font-weight:600;">Search</button>
                    <button class="home-page-button" style="background:transparent;border:1px solid #c8d4e4;color:#005a9e;padding:10px 14px;border-radius:6px;">Images</button>
                    <button class="home-page-button" style="background:transparent;border:1px solid #c8d4e4;color:#005a9e;padding:10px 14px;border-radius:6px;">Videos</button>
                </div>
            </div>
            <div id="googSearchResults" class="goog-search-results" style="width:100%;max-width:820px;margin-top:26px;"></div>
            <p class="footer-note" style="margin-top:22px;color:#6b6f73">© Ping | Made by smrtC951!</p>
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
    'fexplorer.chatroom.com': `
    <div class="home-page-content">
            <img src="icons/old-fexplorer.png" class="ping-logo" style="width: 200px; margin-top: 40px;">
            <h1>FExplorer Chatroom!</h1>
            <p class="tagline">Chat with other people.</p>
            <br>
            <p>Chat with other people for a low price of 250 FPoints. Do it.</p>
            <br>
            <button class="home-page-button" data-url="fexplorer.chatroom.com/chatroom">Open Chatroom</button>
        </div>
    `,
    'fexplorer.chatroom.com/chatroom': `
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
        <div style="font-family: Times New Roman;">
            <p>Page missing.</p>
        </div>
    `,
    // Cookie Page
    'fexplorer:cookies':`
        <div class="cookies-page-enhanced">
            <div class="cookies-header">
                <img src="icons/cookie-icon.png" alt="Cookies" class="cookies-logo">
                <h1>🍪 Manage Your Cookies</h1>
                <p class="cookies-tagline">A delicious side currency in FExplorer</p>
            </div>

            <div class="cookies-content">
                <div class="cookies-info-card">
                    <h2>What are Cookies?</h2>
                    <p>Cookies are a secondary in-game currency that can be earned by collecting and accepting them on various pages throughout FExplorer. You can trade cookies with FPoints for extra benefits!</p>
                </div>

                <div class="cookies-stats">
                    <div class="cookies-stat-box">
                        <div class="cookies-stat-icon">🍪</div>
                        <div class="cookies-stat-content">
                            <div class="cookies-stat-label">Current Cookies</div>
                            <div class="cookies-stat-value" id="cookiesCounter">0</div>
                        </div>
                    </div>
                </div>

                <div class="cookies-info-card">
                    <h2>How to Earn Cookies</h2>
                    <ul class="cookies-list">
                        <li>🎮 <strong>Play Games</strong> - Complete games like Cookie Clicker to earn cookies</li>
                        <li>🎁 <strong>Collect Rewards</strong> - Accept cookie offers on special pages</li>
                        <li>🏆 <strong>Achievements</strong> - Unlock certain achievements for cookie bonuses</li>
                        <li>⭐ <strong>Explore</strong> - Visit random pages for random cookie drops</li>
                    </ul>
                </div>

                <div class="cookies-action-card">
                    <h2>💱 Trade Cookies</h2>
                    <p>Convert your cookies to FPoints for even more purchasing power!</p>
                    <button class="cookies-button cookies-button-primary">Trade FPoints</button>
                    <p class="cookies-message">Coming soon!</p>
                </div>

                <div class="cookies-tips-card">
                    <h2>💡 Pro Tips</h2>
                    <ul class="cookies-tips-list">
                        <li>Save cookies for special events where they're worth more FPoints</li>
                        <li>Cookie Clicker is the best way to earn lots of cookies quickly</li>
                        <li>Check random pages regularly for cookie drops</li>
                    </ul>
                </div>

                <div class="cookies-navigation">
                    <button class="cookies-nav-button" data-url="fexplorer:games">Play Games</button>
                    <button class="cookies-nav-button" data-url="fexplorer:home">Back to Home</button>
                </div>
            </div>

            <p class="footer-note">Made by smrtC951!</p>
        </div>
    `,
    // Achievements Page
    'fexplorer:achievements':`
    <div class="home-page-content quick-links-content">
            <img src="icons/badge-icon.png" class="app-logo">
            <h1>Achievements</h1>
            <p>In FExplorer, you can do certain tasks to get achievements for good rewards! Most rewards are just FPoints, but some will award you with items!</p>
            
            <div id="achievementsStats" style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; text-align: center;">
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <div style="font-size: 1.5em; font-weight: bold; color: #4CAF50;" id="unlockedCount">0</div>
                        <div style="font-size: 0.9em; color: #666;">Achievements Unlocked</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5em; font-weight: bold; color: #2196F3;" id="totalCount">0</div>
                        <div style="font-size: 0.9em; color: #666;">Total Achievements</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5em; font-weight: bold; color: #FF9800;" id="completionPercent">0%</div>
                        <div style="font-size: 0.9em; color: #666;">Completion</div>
                    </div>
                </div>
            </div>
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
            <h1>FExplorer Encyclopedia</h1>
            <p>Welcome to the FExplorer Encyclopedia — a concise guide to systems, currencies, and features inside the browser.</p>
            <br>
            <div class="quick-links-section">
                <h2>Sections</h2>
                <div class="home-page-buttons-container">
                    <button class="home-page-button" data-url="fexplorer:wiki.currency">Currency</button>
                    <button class="home-page-button" data-url="fexplorer:wiki.navigation">Navigation</button>
                    <button class="home-page-button" data-url="fexplorer:achievements">Achievements</button>
                    <button class="home-page-button" data-url="fexplorer:events">Events</button>
                    <button class="home-page-button" data-url="fexplorer:create.new">Creator Hub</button>
                    <button class="home-page-button" data-url="mytube.com">MyTube</button>
                </div>
            </div>
            <br>
            <div style="margin-top: 18px; padding: 12px; background: #f8f9fb; border-radius: 8px;">
                <h3 style="margin:0 0 8px 0;">How to use this encyclopedia</h3>
                <ul style="margin:0 0 0 18px; color:#444;">
                    <li>Click any section button to jump to a focused article.</li>
                    <li>Use the search bar to find in-app pages and generated articles.</li>
                    <li>Many pages include tips and links to related areas (e.g. Events &lt;-&gt; Achievements).</li>
                </ul>
            </div>
        </div>
    `,
    'fexplorer:wiki.currency':`
    <div class="home-page-content quick-links-content">
            <img src="icons/fexplorer.png" class="app-logo">
            <h1>Currency</h1>
            <p>FExplorer uses a couple of in-game currencies you will see often. This page explains how they work and where to earn them.</p>
            <br>
            <div class="quick-links-section">
                <h2>Main Currencies</h2>
                <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:8px;">
                    <div style="flex:1; min-width:180px; background:#fff; padding:12px; border-radius:8px; border:1px solid #eee;">
                        <h3>FPoints</h3>
                        <p style="margin:6px 0; color:#444;">FPoints are the primary score currency. Earn them by browsing, completing achievements, participating in events, and using the search engines. FPoints buy cosmetics, themes, and special items.</p>
                    </div>
                    <div style="flex:1; min-width:180px; background:#fff; padding:12px; border-radius:8px; border:1px solid #eee;">
                        <h3>Cookies</h3>
                        <p style="margin:6px 0; color:#444;">Cookies are a secondary collectible used for certain limited-time rewards and mini-games. They are earned via cookie drops, playing the Cookie Clicker mini-game, and special event bonuses.</p>
                    </div>
                </div>
            </div>
            <br>
            <div class="quick-links-section">
                <h2>Where to Earn</h2>
                <ul style="color:#444; margin-left:18px;">
                    <li>Daily browsing and searching (use both search engines).</li>
                    <li>Completing achievements and event objectives.</li>
                    <li>Mini-games and creator activities in FStudio.</li>
                </ul>
            </div>
            <br>
            <div class="home-page-buttons-container">
                <button class="home-page-button" data-url="fexplorer:achievements">Go to Achievements</button>
                <button class="home-page-button" data-url="fexplorer:events">See Events</button>
            </div>
        </div>
    `,
    'fexplorer:wiki.navigation':`
    <div class="home-page-content quick-links-content">
            <img src="icons/fexplorer.png" class="app-logo">
            <h1>Nafvigation</h1>
            <p>Learn how to move around FExplorer, use the address bar, and open special in-app pages.</p>
            <br>
            <div class="quick-links-section">
                <h2>Quick Tips</h2>
                <ul style="color:#444; margin-left:18px;">
                    <li>Use the address bar to type <code>fexplorer:</code> pages (e.g., <code>fexplorer:achievements</code>).</li>
                    <li>Search from the toolbar to use <code>goog.com</code> or <code>ping.com</code> engines; try both for different results.</li>
                    <li>Click links with <code>data-url</code> attributes to navigate inside the app without reloading.</li>
                </ul>
            </div>
            <br>
            <div class="home-page-buttons-container">
                <button class="home-page-button" data-url="fexplorer:home">Back to Home</button>
                <button class="home-page-button" data-url="fexplorer:wiki">Encyclopedia</button>
            </div>
        </div>
    `,
    'fexplorer:wiki.events':`
    <div class="home-page-content quick-links-content">
            <img src="icons/calendar-icon.png" class="app-logo">
            <h1>Events</h1>
            <p>Events are limited-time activities that reward you with unique bonuses and achievements.</p>
            <br>
            <div class="quick-links-section">
                <h2>How Events Work</h2>
                <ul style="color:#444; margin-left:18px;">
                    <li>Events appear on the <code>fexplorer:events</code> page with objectives and timers.</li>
                    <li>Completing objectives grants FPoints, cookies, and sometimes exclusive cosmetics.</li>
                    <li>Check the Events page often — some rewards are one-time only.</li>
                </ul>
            </div>
            <br>
            <div class="home-page-buttons-container">
                <button class="home-page-button" data-url="fexplorer:events">Open Events</button>
                <button class="home-page-button" data-url="fexplorer:achievements">See Related Achievements</button>
            </div>
        </div>
    `,
    'fexplorer:wiki.creator':`
    <div class="home-page-content quick-links-content">
            <img src="icons/studio-icon.png" class="app-logo">
            <h1>Creator Hub</h1>
            <p>The Creator Hub (FStudio) explains how to create pages, upload to MyTube, and design interactive content.</p>
            <br>
            <div class="quick-links-section">
                <h2>Creator Basics</h2>
                <ul style="color:#444; margin-left:18px;">
                    <li>Open <code>fexplorer:create.new</code> to use the FStudio creation tools.</li>
                    <li>Uploaded content to <code>mytube.com</code> is disabled in this build, but you can preview uploads locally.</li>
                    <li>Creators earn rewards and exposure through featured content and events.</li>
                </ul>
            </div>
            <br>
            <div class="home-page-buttons-container">
                <button class="home-page-button" data-url="fexplorer:create.new">Open FStudio</button>
                <button class="home-page-button" data-url="mytube.com">Visit MyTube</button>
            </div>
        </div>
    `,
    // Terminal Page
    'file:terminal':`
        <div style="color: black; font-family: Consolas, sans-serif;">
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
            <button data-url="fexplorer:home">Leave now</button>
            <button data-url="paranoid.com/error.html">Proceed on</button>
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
    "fexplorer:429": `
        <div class="error-page">
            <h1 style="font-size: 64px;">🚫 429</h1>
            <h2>Too Many Requests</h2>
            <p>You moved too fast! Slow down, you piece of shit</p>
            <p>Your browser is cooling off for <span id="error429Timer">5</span> seconds.</p>
            <button class="button" id="429ForceReturn">Return to Home</button>
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
                <p>Try out older versions of FExplorer! More versions will be recovered soon.</p>
                <a href="https://smrtc951.github.io/fexplorer/legacy/version_11" class="home-page-button" >Version 11</a>
                <a href="https://fexplorer.on.websim.com/" class="home-page-button" >Demo 1</a>
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
// FExplorer System
    'fexplorer:system': `
<div id="fexplorerSystem" class="app-page">
  <h1>🧭 FExplorer System</h1>
  <p class="tagline">Your all-in-one productivity suite.</p>

  <div class="system-tabs">
    <button class="system-tab" data-tab="messenger">Messenger</button>
    <button class="system-tab" data-tab="documents">Documents</button>
    <button class="system-tab" data-tab="slideshow">Slideshow</button>
  </div>

  <div class="system-content">
    
    <div id="messengerTab" class="tab-content">
        </div>

    <div id="documentsTab" class="tab-content">
        <h2>📄 FExplorer Documents</h2>
        <div style="margin-bottom:10px;">
            <button id="newDocButton" class="button">New Document</button>
        </div>
        <div id="docList" style="margin-bottom:20px;"></div>
        <div id="editorArea" style="display:none;">
            <input id="docTitle" placeholder="Untitled Document" 
                   style="width:100%;padding:8px;font-size:1.1em;margin-bottom:5px;">
            <textarea id="docContent" 
                      style="width:100%;height:300px;padding:10px;font-size:1em;"></textarea>
            <div style="margin-top:8px;">
              <button id="saveDocButton" class="button">Save</button>
              <button id="closeDocButton" class="button">Close</button>
            </div>
        </div>
    </div> 
    <div id="slideshowTab" class="tab-content">
    <h2>✨ FExplorer Slideshow</h2>
    <p>Create slideshows using simple text-based slides. More features coming soon!</p>

    <div style="margin-bottom:10px;">
        <button id="newSlideshowButton" class="button">New Slideshow</button>
    </div>

    <div id="slideshowList" style="margin-bottom:20px;"></div>

    <!-- EDITOR -->
    <div id="slideshowEditor" style="display:none; margin-top:20px;">
        <h3 id="slideshowEditorTitle">Editing Slideshow</h3>

        <input id="slideshowTitle" 
               placeholder="Slideshow Title" 
               style="width:100%;padding:8px;font-size:1.1em;margin-bottom:5px;">

        <div id="slidesContainer" style="
            border:1px solid #ccc;
            padding:10px;
            border-radius:8px;
            background:#fafafa;
            max-height:250px;
            overflow:auto;
        "></div>

        <button id="addSlideButton" class="button" style="margin-top:10px;">Add Slide</button>

        <div style="margin-top:10px;">
            <button id="saveSlideshowButton" class="button">Save</button>
            <button id="previewSlideshowButton" class="button">Preview</button>
            <button id="closeSlideshowButton" class="button">Close</button>
        </div>
    </div>

    <!-- PREVIEW MODE -->
    <div id="slideshowPreview" style="
        display:none;
        position:relative;
        background:#111;
        color:white;
        padding:20px;
        border-radius:10px;
        min-height:300px;
        text-align:center;
    ">
        <h2 id="previewTitle"></h2>
        <div id="previewSlideContent" style="
            margin-top:20px;
            font-size:1.3em;
            min-height:180px;
        "></div>

        <div style="margin-top:20px;">
            <button id="prevSlide" class="button">Previous</button>
            <button id="nextSlide" class="button">Next</button>
            <button id="exitPreview" class="button">Exit</button>
        </div>
    </div>
</div>
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
function updateForwardButtonState() {
    forwardButton.disabled = forwardStack.length === 0;
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
    // Handle all buttons and links with data-url attribute across all pages
    browserContent.querySelectorAll('[data-url]').forEach(element => {
        // Skip if already has event listener (to prevent duplicates)
        if (element.dataset.listenerAttached) return;
        
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const url = event.target.closest('[data-url]').dataset.url;
            if (url) {
                navigate(url);
            }
        });
        element.dataset.listenerAttached = 'true';
    });

    // JX1DX1's code (paranoid.com/code.html)
    if (currentUrl === 'paranoid.com/code.html') {
        const jx1dx1Code = browserContent.querySelector('#jx1dx1Code');
        const theCode = browserContent.querySelector('#theCode');
        const codeInput = browserContent.querySelector('#theCode') || browserContent.querySelector('input[type="search"]');
        const codeButton = browserContent.querySelector('#codeButton');
        const codesCounter = browserContent.querySelector('#codesCounter');
        const rewardButton = browserContent.querySelector('#rewardButton');
        const jx1dx1Result = browserContent.querySelector('#jx1dx1Result');

        // Valid codes (base64-style strings as used in the fake page)
        const validCodes = new Set([
            'bmljZS5iYWRnZS5icm8u',
            'WU9VLkNBTlQuSElERS5GUk9NLkpYMURYMS4=',
            'SVQuTUFZLkJFLllPVVIuTEFTVC4=',
            'QU5ELklULldJTEwuQkUuWU9VUi5MQVNULkRBWS4=',
            'QU5ELk1ZLk5BTUUuSVMuSlgxRFgxLiBXSEFUJ1MuWU9VUi5QT0lOVD8='
        ]);

        const enteredCodes = new Set();

        function updateCounter() {
            if (!codesCounter) return;
            const left = Math.max(0, 5 - enteredCodes.size);
            codesCounter.textContent = `codes.left: ${left}`;
        }

        function checkCompletion() {
            if (enteredCodes.size >= 5) {
                // Reveal reward area
                if (jx1dx1Code) jx1dx1Code.style.display = 'none';
                if (codesCounter) codesCounter.style.display = 'none';
                if (jx1dx1Result) jx1dx1Result.style.display = 'block';
            }
        }

        function handleSubmitCode() {
            if (!codeInput) return;
            const value = (codeInput.value || '').trim();
            if (!value) {
                alert('Please enter a code.');
                return;
            }

            if (enteredCodes.has(value)) {
                alert('you.already.entered.this.code!');
                codeInput.value = '';
                return;
            }

            if (validCodes.has(value)) {
                enteredCodes.add(value);
                updateCounter();
                alert(`you.got.one.code. only ${Math.max(0, 5 - enteredCodes.size)} more codes.`);
                codeInput.value = '';
                checkCompletion();
            } else {
                alert('invalid.code!');
            }
        }

        if (codeButton) {
            codeButton.addEventListener('click', handleSubmitCode);
        }

        if (codeInput) {
            codeInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') handleSubmitCode();
            });
        }

        if (rewardButton) {
            rewardButton.addEventListener('click', () => {
                if (enteredCodes.size >= 5 && !codeUnlocked) {
                    const reward = 1000; // reward amount
                    userFPoints += reward;
                    updateFPointsDisplay();
                    saveAppState();
                    showFPointsNotification(reward);
                    codeUnlocked = true;
                    alert('Reward claimed! Check your FPoints.');
                } else if (codeUnlocked) {
                    alert('You have already claimed the reward.');
                } else {
                    alert('You need to enter all 5 codes first.');
                }
            });
        }

        // Initialize counter text on page load
        updateCounter();
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

    // Financial page buttons
    const claimDailyBonusButton = browserContent.querySelector('#claimDailyBonusButton');
    if (claimDailyBonusButton) {
        claimDailyBonusButton.addEventListener('click', () => {
            const now = Date.now();
            if (now - lastFinancialVisit >= DAILY_BONUS_COOLDOWN) {
                const bonus = Math.round(BASE_DAILY_BONUS * (userLuck || 1));
                userFPoints += bonus;
                lastFinancialVisit = now;
                saveAppState();
                updateFPointsDisplay();
                showFPointsNotification(bonus);
                const msg = browserContent.querySelector('#dailyBonusMessage');
                if (msg) {
                    msg.textContent = `Claimed ${bonus} FPoints! Come back in 5 minutes for more.`;
                    msg.style.color = '#28a745';
                }
            } else {
                const timeLeft = Math.ceil((DAILY_BONUS_COOLDOWN - (now - lastFinancialVisit)) / 1000 / 60);
                const msg = browserContent.querySelector('#dailyBonusMessage');
                if (msg) {
                    msg.textContent = `Come back in ${timeLeft} minute${timeLeft !== 1 ? 's' : ''}.`;
                    msg.style.color = '#dc3545';
                }
            }
        });
    }

    const buyStockButton = browserContent.querySelector('#buyStockButton');
    if (buyStockButton) {
        buyStockButton.addEventListener('click', () => {
            const input = browserContent.querySelector('#stockBuyInput');
            if (!input) return;
            const quantity = parseInt(input.value) || 0;
            if (quantity <= 0) {
                alert('Please enter a valid quantity.');
                return;
            }
            const cost = quantity * stockPrice;
            if (userFPoints >= cost) {
                userFPoints -= cost;
                userChannel.stockOwned += quantity;
                saveAppState();
                updateFPointsDisplay();
                alert(`Bought ${quantity} shares for ${cost.toFixed(2)} FPoints!`);
                input.value = '1';
                // Update display
                const stockDisplay = browserContent.querySelector('#userOwnedStock');
                const fpointsDisplay = browserContent.querySelector('#currentFPoints');
                if (stockDisplay) stockDisplay.textContent = userChannel.stockOwned;
                if (fpointsDisplay) fpointsDisplay.textContent = userFPoints.toLocaleString();
            } else {
                alert('You do not have enough FPoints for this purchase.');
            }
        });
    }

    const sellStockButton = browserContent.querySelector('#sellStockButton');
    if (sellStockButton) {
        sellStockButton.addEventListener('click', () => {
            const input = browserContent.querySelector('#stockSellInput');
            if (!input) return;
            const quantity = parseInt(input.value) || 0;
            if (quantity <= 0) {
                alert('Please enter a valid quantity.');
                return;
            }
            if (quantity > userChannel.stockOwned) {
                alert('You do not own that many shares.');
                return;
            }
            const earnings = quantity * stockPrice;
            userFPoints += earnings;
            userChannel.stockOwned -= quantity;
            saveAppState();
            updateFPointsDisplay();
            alert(`Sold ${quantity} shares for ${earnings.toFixed(2)} FPoints!`);
            input.value = '1';
            // Update display
            const stockDisplay = browserContent.querySelector('#userOwnedStock');
            const fpointsDisplay = browserContent.querySelector('#currentFPoints');
            if (stockDisplay) stockDisplay.textContent = userChannel.stockOwned;
            if (fpointsDisplay) fpointsDisplay.textContent = userFPoints.toLocaleString();
        });
    }

    const riskAllButton = browserContent.querySelector('#riskAllButton');
    if (riskAllButton) {
        riskAllButton.addEventListener('click', () => {
            if (userFPoints <= 0) {
                alert('You have no FPoints to risk!');
                return;
            }
            const result = Math.random() < 0.5;
            if (result) {
                const gain = Math.floor(userFPoints * 0.5);
                userFPoints += gain;
                alert(`Lucky! You gained ${gain} FPoints! Total: ${userFPoints}`);
            } else {
                const loss = Math.floor(userFPoints * 0.3);
                userFPoints -= loss;
                alert(`Unlucky! You lost ${loss} FPoints. Total: ${userFPoints}`);
            }
            saveAppState();
            updateFPointsDisplay();
            const fpointsDisplay = browserContent.querySelector('#currentFPoints');
            if (fpointsDisplay) fpointsDisplay.textContent = userFPoints.toLocaleString();
        });
    }

    const negotiateButton = browserContent.querySelector('#negotiateButton');
    if (negotiateButton) {
        negotiateButton.addEventListener('click', () => {
            alert('Negotiation failed. The bank offers you 0 FPoints.');
        });
    }

    // Cookies trading button
    const cookiesTradeButton = browserContent.querySelector('.cookies-button-primary');
    if (cookiesTradeButton) {
        cookiesTradeButton.addEventListener('click', () => {
            alert('Coming soon! Cookie trading feature will be available in a future update.');
        });
    }

    // Quick Links search functionality
    const quicklinksSearchInput = browserContent.querySelector('#quicklinksSearchInput');
    const quicklinksSearchButton = browserContent.querySelector('#quicklinksSearchButton');
    const quicklinksGrid = browserContent.querySelector('#quicklinksGrid');
    
    if (quicklinksSearchInput && quicklinksGrid) {
        const performSearch = () => {
            const searchTerm = quicklinksSearchInput.value.toLowerCase();
            const cards = quicklinksGrid.querySelectorAll('.quicklink-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const keywords = card.getAttribute('data-keywords').toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (searchTerm === '' || title.includes(searchTerm) || keywords.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.3s ease-in-out';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            let noResults = quicklinksGrid.querySelector('.no-results');
            if (visibleCount === 0 && searchTerm !== '') {
                if (!noResults) {
                    noResults = document.createElement('div');
                    noResults.className = 'no-results';
                    noResults.textContent = 'No quick links found matching your search.';
                    quicklinksGrid.parentNode.insertBefore(noResults, quicklinksGrid);
                }
            } else if (noResults) {
                noResults.remove();
            }
        };

        quicklinksSearchInput.addEventListener('input', performSearch);
        if (quicklinksSearchButton) {
            quicklinksSearchButton.addEventListener('click', performSearch);
        }
        quicklinksSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
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

    // Sandbox Demo button
const startSandboxDemoButton = browserContent.querySelector('#startSandboxDemoButton');
if (startSandboxDemoButton) {
  startSandboxDemoButton.addEventListener('click', () => {
    startSandboxDemoButton.style.display = 'none';
    const sandboxGameArea = document.getElementById('sandboxGameArea');
    sandboxGameArea.innerHTML = ''; // clear old content

    // --- Main Sandbox Layout ---
    const sandboxContent = document.createElement('div');
    sandboxContent.innerHTML = `
      <div style="align-items:center; display:flex; flex-direction:column;">
        <p>Sandbox Demo Started! Build your world here.</p>

        <div id="sandboxGrid"
             style="width:320px; height:320px; display:grid;
                    grid-template-columns:repeat(10, 1fr);
                    grid-template-rows:repeat(10, 1fr);
                    border:2px solid #000; background-color:#e0e0e0;
                    margin-top:10px; cursor:pointer;">
        </div>

        <div style="margin-top:10px; display:flex; gap:8px;">
          <button id="resetSandboxButton" class="button" style="background:red;">Reset</button>
          <button id="selectMaterialsButton" class="button" style="background:grey;">Select Material</button>
          <button id="deleteModeButton" class="button" style="background:#555;">Delete Mode: Off</button>
        </div>
      </div>
    `;
    sandboxGameArea.appendChild(sandboxContent);

    // --- Game State ---
    const materials = {
      Sand: '#f4e3b2',
      Water: '#4da6ff',
      Grass: '#6cc070',
      Stone: '#999999',
      Wood: '#b88a56',
      Iron: '#ffffffff'
    };
    let currentMaterial = 'Sand';
    let deleteMode = false;

    const sandboxGrid = document.getElementById('sandboxGrid');

    // Generate 10×10 cells
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.style.border = '1px solid #ccc';
      cell.style.background = '#e0e0e0';
      cell.dataset.material = '';
      cell.addEventListener('click', () => {
        if (deleteMode) {
          cell.style.background = '#e0e0e0';
          cell.dataset.material = '';
        } else {
          cell.style.background = materials[currentMaterial];
          cell.dataset.material = currentMaterial;
        }
      });
      sandboxGrid.appendChild(cell);
    }

    // --- Buttons ---
    const resetButton = document.getElementById('resetSandboxButton');
    resetButton.addEventListener('click', () => {
      sandboxGrid.querySelectorAll('div').forEach(c => {
        c.style.background = '#e0e0e0';
        c.dataset.material = '';
      });
      alert('Sandbox reset!');
    });

    const selectButton = document.getElementById('selectMaterialsButton');
    selectButton.addEventListener('click', () => {
      const list = Object.keys(materials).join(', ');
      const choice = prompt(`Available materials: ${list}\n\nType one:`, currentMaterial);
      if (choice && materials[choice]) {
        currentMaterial = choice;
        alert(`You selected ${currentMaterial}!`);
      } else if (choice) {
        alert('Invalid material.');
      }
    });

    const deleteModeButton = document.getElementById('deleteModeButton');
    deleteModeButton.addEventListener('click', () => {
      deleteMode = !deleteMode;
      deleteModeButton.textContent = `Delete Mode: ${deleteMode ? 'On' : 'Off'}`;
      deleteModeButton.style.background = deleteMode ? '#ff6666' : '#555';
    });
  });
}

// (Survial game initialization handled later where the full game is mounted)

// Solitaire button
const startSolitaireDemoButton = browserContent.querySelector('#startSolitaireDemoButton');
if (startSolitaireDemoButton) {
  startSolitaireDemoButton.addEventListener('click', () => {
    startSolitaireDemoButton.style.display = 'none';
    const solitaireGameArea = document.getElementById('solitaireGameArea');
    solitaireGameArea.innerHTML = ''; // clear old stuff

    // --- Build Solitaire UI ---
    const solitaireContent = document.createElement('div');
    solitaireContent.innerHTML = `
      <div style="align-items:center; display:flex; flex-direction:column;">
        <p>Welcome to Solitaire (Demo)</p>
        <div id="cardArea" style="
          width:320px; height:160px;
          display:flex; justify-content:center; align-items:center;
          gap:8px; flex-wrap:wrap; border:2px solid #000;
          background-color:#0a5c0a; color:white;
          font-weight:bold; border-radius:10px; padding:10px; margin-top:8px;">
          <p style="color:#fff;">Place a bet to start!</p>
        </div>
        <div style="margin-top:10px;">
          <input id="betAmount" type="number" placeholder="Bet amount" min="1"
                 style="padding:5px; width:100px; border-radius:5px; text-align:center;">
          <button id="startRoundButton" class="button" style="background:#007bff;">Start Round</button>
        </div>
        <div id="resultText" style="margin-top:10px; font-weight:bold;"></div>
        <button id="startRoundButton" class="button" style="margin-top:10px;">Restart</button>
      </div>
    `;
    solitaireGameArea.appendChild(solitaireContent);

    // --- Game Logic ---
    const cardTypes = ['Ace', 'King', 'Queen', 'Jack', '10'];
    const colors = ['red', 'black'];
    const cardArea = document.getElementById('cardArea');
    const betInput = document.getElementById('betAmount');
    const startButton = document.getElementById('startRoundButton');
    const resultText = document.getElementById('resultText');

    function drawCard() {
      const type = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return { type, color };
    }

    function renderCards(cards) {
      cardArea.innerHTML = '';
      cards.forEach(card => {
        const div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '70px';
        div.style.border = '1px solid #fff';
        div.style.borderRadius = '5px';
        div.style.background = card.color === 'red' ? '#ff4c4c' : '#222';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.textContent = card.type;
        cardArea.appendChild(div);
      });
    }

    function startRound() {
      const bet = parseInt(betInput.value);
      if (isNaN(bet)) {
        alert('Please enter a valid bet.');
        return;
      }
      if (userFPoints < bet) {
        alert('Not enough FPoints to bet!');
        return;
      }

      // Draw 5 random cards
      const cards = Array.from({ length: 5 }, drawCard);
      renderCards(cards);

      // Count colors
      const redCount = cards.filter(c => c.color === 'red').length;
      const blackCount = cards.filter(c => c.color === 'black').length;

      // Determine win/loss
      let message = '';
      if (redCount >= 3 || blackCount >= 3) {
        const winnings = bet * 2;
        userFPoints += winnings;
        message = `🎉 You won! ${winnings} FPoints added. (${redCount} red / ${blackCount} black)`;
      } else {
        userFPoints -= bet;
        message = `💀 You lost ${bet} FPoints... (${redCount} red / ${blackCount} black)`;
      }

      saveAppState();
      resultText.textContent = message;
      updateFPointsUI?.(); // if your site has a live counter
    }

    // --- Button Events ---
    startButton.addEventListener('click', startRound);
  });
}


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
                        question: "When was the alpha update?",
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

    // Cookie Clicker Start button (integrated with FExplorer cookies)
    const startCookieClickerButton = browserContent.querySelector('#startCookieClickerButton');
    if (startCookieClickerButton) {
        startCookieClickerButton.addEventListener('click', () => {
            startCookieClickerButton.style.display = 'none';
            const cookieClickerGameArea = document.getElementById('cookieClickerGameArea');
            if (!cookieClickerGameArea) return;

            // persistent cookies-per-click (CPC)
            let cookiesPerClick = parseInt(localStorage.getItem('cookieClicker_cpc') || '1', 10) || 1;

            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <div style="align-items: center; display: flex; flex-direction: column; gap:10px;">
                    <p>Cookie Clicker — integrated with FExplorer cookies.</p>
                    <div style="display:flex;align-items:center;gap:12px;">
                        <img id="cookieClickerCookie" src="icons/cookie-icon.png" alt="cookie" style="width:88px;height:88px;cursor:pointer;" />
                        <div style="text-align:left;">
                            <p style="margin:0"><strong>Cookies: <span id="cookieCount">${userCookies}</span></strong></p>
                            <p style="margin:4px 0 0 0;font-size:0.9em;color:#666;">Cookies / click: <span id="cookiesPerClick">${cookiesPerClick}</span></p>
                        </div>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button id="cookieClickerShopButton" class="home-page-button">View Shop</button>
                        <button id="cookieClickerReset" class="home-page-button">Reset Upgrades</button>
                    </div>
                    <div id="cookieClickerShopContent" style="display:none; width:100%; max-width:420px; margin-top:8px;">
                        <h3 style="margin:6px 0;">Shop</h3>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border:1px solid #eee;border-radius:6px;background:#fff;">
                            <div>
                                <strong>Double Click</strong>
                                <div style="font-size:0.9em;color:#666;">Doubles cookies per click</div>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-weight:bold;">Cost: <span id="upgradeCost">30</span></div>
                                <button id="buyDouble" class="home-page-button" style="margin-top:6px;">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // mount
            cookieClickerGameArea.innerHTML = '';
            cookieClickerGameArea.appendChild(wrapper);

            const cookieImg = wrapper.querySelector('#cookieClickerCookie');
            const cookieCountEl = wrapper.querySelector('#cookieCount');
            const cookiesPerClickEl = wrapper.querySelector('#cookiesPerClick');
            const shopBtn = wrapper.querySelector('#cookieClickerShopButton');
            const shopContent = wrapper.querySelector('#cookieClickerShopContent');
            const buyDoubleBtn = wrapper.querySelector('#buyDouble');
            const resetBtn = wrapper.querySelector('#cookieClickerReset');

            function saveCPC() {
                try { localStorage.setItem('cookieClicker_cpc', String(cookiesPerClick)); } catch (e) {}
            }

            function updateDisplays() {
                if (cookieCountEl) cookieCountEl.textContent = userCookies;
                if (cookiesPerClickEl) cookiesPerClickEl.textContent = cookiesPerClick;
            }

            // click handler
            if (cookieImg) cookieImg.addEventListener('click', () => {
                userCookies += cookiesPerClick;
                try { updateCookiesDisplay && updateCookiesDisplay(); } catch (e) {}
                try { saveAppState && saveAppState(); } catch (e) {}
                updateDisplays();

                // tell cookie manager about the click
                try {
                    window.fexplorerCookies?.setCookie('fexplorer:cookie-clicker', 'lastClick', String(Date.now()));
                } catch (e) {}

                // small chance for golden cookie
                if (Math.random() < 0.025) {
                    try { window.fexplorerCookies?.setCookie('fexplorer:cookie-clicker', 'golden_cookie', 'yes', { maxAgeDays: 7 }); } catch (e) {}
                    if (typeof unlockAchievement === 'function') unlockAchievement('Found a Golden Cookie');
                    if (typeof userFPoints === 'number') { userFPoints += 50; try { saveAppState && saveAppState(); } catch (e) {} showFPointsNotification && showFPointsNotification(50); }
                }
            });

            // shop toggle
            if (shopBtn && shopContent) shopBtn.addEventListener('click', () => {
                shopContent.style.display = shopContent.style.display === 'none' || shopContent.style.display === '' ? 'block' : 'none';
            });

            // buy upgrade
            if (buyDoubleBtn) buyDoubleBtn.addEventListener('click', () => {
                const cost = 30;
                if (userCookies >= cost) {
                    userCookies -= cost;
                    cookiesPerClick = Math.max(1, cookiesPerClick * 2);
                    saveCPC();
                    try { saveAppState && saveAppState(); } catch (e) {}
                    updateDisplays();
                    alert('Purchased Double Click! Cookies per click doubled.');
                } else {
                    alert('Not enough cookies for that upgrade.');
                }
            });

            // reset upgrades
            if (resetBtn) resetBtn.addEventListener('click', () => {
                if (!confirm('Reset cookie clicker upgrades to default?')) return;
                cookiesPerClick = 1;
                saveCPC();
                updateDisplays();
            });

            // initial render
            updateDisplays();
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

// Load Bookmark Manager
// Survial Game (round system, disasters)
const startSurvialGameButton = browserContent.querySelector('#startSurvialGameButton');
if (startSurvialGameButton) {
    startSurvialGameButton.addEventListener('click', () => {
        startSurvialGameButton.style.display = 'none';
        const area = document.getElementById('survialGameArea');
        if (!area) return;
        // ensure disasters are clipped to the game area and positioned relative to it
        area.style.position = area.style.position || 'relative';
        area.style.overflow = area.style.overflow || 'hidden';
        area.style.touchAction = area.style.touchAction || 'none';

        // Game state
        const state = {
            running: true,
            round: 0,
            health: 100,
            cookiesPerSec: 0
        };

        // HUD
        const hud = document.getElementById('survialHUD');
        const roundEl = document.getElementById('survialRound');
        const healthEl = document.getElementById('survialHealth');
        const healthBar = document.getElementById('survialHealthBar');
        if (hud) hud.style.display = 'block';

        // Create survivor element that follows the cursor inside the area
        const survivor = document.createElement('div');
        survivor.id = 'survivorCursor';
        survivor.style.width = '18px';
        survivor.style.height = '18px';
        survivor.style.borderRadius = '50%';
        survivor.style.background = '#ffcc00';
        survivor.style.position = 'absolute';
        survivor.style.pointerEvents = 'none';
        survivor.style.transform = 'translate(-50%, -50%)';
        survivor.style.zIndex = 9999;
        area.appendChild(survivor);

        // Hide default cursor inside area to make the survivor feel like the cursor
        area.style.cursor = 'none';

        let mouseX = 0, mouseY = 0;
        area.addEventListener('mousemove', (e) => {
            const rect = area.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            survivor.style.left = mouseX + 'px';
            survivor.style.top = mouseY + 'px';
        });

        // Helper: spawn a tornado
        function spawnTornado(speedMult = 1) {
            const t = document.createElement('div');
            t.className = 'survial-tornado';
            t.style.position = 'absolute';
            t.style.width = '80px';
            t.style.height = '80px';
            t.style.borderRadius = '50%';
            t.style.background = 'radial-gradient(ellipse at center, rgba(120,120,120,0.9), rgba(40,40,40,0.6))';
            t.style.opacity = '0.9';
            t.style.zIndex = 9000;
            // spawn within the visible game area (so elements are clipped inside it)
            const x = Math.random() * Math.max(0, (area.clientWidth - 80));
            const y = Math.random() * Math.max(0, (area.clientHeight - 80));
            t.style.left = x + 'px';
            t.style.top = y + 'px';
            area.appendChild(t);

            // random horizontal drift and up/down movement
            const vx = (Math.random() - 0.5) * 3 * speedMult; // pixels per tick
            const vy = (Math.random() - 0.5) * 2 * speedMult;

            const tick = setInterval(() => {
                if (!state.running) { clearInterval(tick); if (t.parentNode) t.parentNode.removeChild(t); return; }
                const curX = parseFloat(t.style.left);
                const curY = parseFloat(t.style.top);
                const nx = curX + vx;
                const ny = curY + vy;
                t.style.left = nx + 'px';
                t.style.top = ny + 'px';

                // collision check with survivor
                const sx = mouseX, sy = mouseY;
                const dx = nx + 40 - sx; // center to center
                const dy = ny + 40 - sy;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 60) {
                    // damage over time
                    state.health = Math.max(0, state.health - 0.6 * speedMult);
                    if (healthBar) healthBar.style.width = Math.max(0, state.health) + '%';
                    if (healthEl) healthEl.textContent = Math.round(state.health);
                }

                // remove when far out of bounds (keep inside parent clipping)
                if (nx < -160 || nx > area.clientWidth + 160 || ny < -160 || ny > area.clientHeight + 160) {
                    clearInterval(tick);
                    if (t.parentNode) t.parentNode.removeChild(t);
                }
            }, 40);
        }

        // Helper: spawn a tsunami (sweeping wave across the map)
        function spawnTsunami(speedMult = 1) {
            const w = Math.max(area.clientWidth * 0.6, 240);
            const wave = document.createElement('div');
            wave.className = 'survial-tsunami';
            wave.style.position = 'absolute';
            // start just off the left edge so the clipping keeps it within the game content
            wave.style.left = (-w) + 'px';
            wave.style.top = Math.max(0, area.clientHeight - 120) + 'px';
            wave.style.width = w + 'px';
            wave.style.height = '120px';
            wave.style.background = 'linear-gradient(90deg, rgba(0,120,200,0.95), rgba(0,60,150,0.9))';
            wave.style.opacity = '0.95';
            wave.style.zIndex = 8000;
            wave.style.borderRadius = '4px';
            area.appendChild(wave);

            const targetX = area.clientWidth + w + 40;
            const duration = 6000 / Math.max(0.5, speedMult); // ms
            const start = Date.now();
            const tick = setInterval(() => {
                if (!state.running) { clearInterval(tick); if (wave.parentNode) wave.parentNode.removeChild(wave); return; }
                const tNow = Date.now();
                const p = Math.min(1, (tNow - start) / duration);
                const curX = -w + p * (targetX + w);
                wave.style.left = curX + 'px';

                // if survivor inside wave area vertically and horizontally overlap, heavy damage
                const sx = mouseX, sy = mouseY;
                const waveLeft = curX, waveRight = curX + w;
                const waveTop = area.clientHeight - 120, waveBottom = area.clientHeight;
                if (sx >= waveLeft && sx <= waveRight && sy >= waveTop && sy <= waveBottom) {
                    state.health = Math.max(0, state.health - 2.2 * speedMult);
                    if (healthBar) healthBar.style.width = Math.max(0, state.health) + '%';
                    if (healthEl) healthEl.textContent = Math.round(state.health);
                }

                if (p >= 1) {
                    clearInterval(tick);
                    if (wave.parentNode) wave.parentNode.removeChild(wave);
                }
            }, 40);
        }

        // Round loop
        let roundTimer = null;
        function startNextRound() {
            if (!state.running) return;
            state.round += 1;
            if (roundEl) roundEl.textContent = state.round;

            // determine disaster: 0 = tornado, 1 = tsunami
            const disaster = Math.random() < 0.6 ? 'tornado' : 'tsunami';
            const difficulty = 1 + state.round * 0.12; // scale up

            // spawn one or more effects depending on round
            if (disaster === 'tornado') {
                // spawn 1-3 tornadoes
                const count = 1 + Math.floor(Math.min(4, state.round / 3));
                for (let i=0;i<count;i++) spawnTornado(difficulty);
            } else {
                // tsunami
                spawnTsunami(difficulty);
            }

            // each round lasts 12 seconds
            const roundLength = Math.max(8000, 12000 - state.round * 300);
            if (roundTimer) clearTimeout(roundTimer);
            roundTimer = setTimeout(() => {
                // small passive heal between rounds
                state.health = Math.min(100, state.health + Math.max(0, 6 - state.round*0.2));
                if (healthBar) healthBar.style.width = state.health + '%';
                if (healthEl) healthEl.textContent = Math.round(state.health);
                // check for game over
                if (state.health <= 0) return endGame(false);
                // next round
                startNextRound();
            }, roundLength);
        }

        function endGame(victory) {
            state.running = false;
            // cleanup UI
            area.style.cursor = '';
            if (survivor && survivor.parentNode) survivor.parentNode.removeChild(survivor);
            const els = area.querySelectorAll('.survial-tornado, .survial-tsunami');
            els.forEach(e => e.parentNode && e.parentNode.removeChild(e));
            if (roundTimer) clearTimeout(roundTimer);

            // show result
            const result = document.createElement('div');
            result.style.position = 'absolute';
            result.style.left = '50%';
            result.style.top = '50%';
            result.style.transform = 'translate(-50%, -50%)';
            result.style.zIndex = 99999;
            result.style.background = '#fff';
            result.style.padding = '18px';
            result.style.borderRadius = '8px';
            result.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
            result.innerHTML = `<h3>${victory ? 'You Survived!' : 'You Perished'}</h3><p>Rounds survived: ${state.round}</p><div style="margin-top:12px;"><button id="survialRestart" class="home-page-button">Play Again</button><button id="survialExit" class="home-page-button" style="margin-left:8px;">Exit</button></div>`;
            area.appendChild(result);

            const restart = document.getElementById('survialRestart');
            const exit = document.getElementById('survialExit');
            if (restart) restart.addEventListener('click', () => { result.parentNode && result.parentNode.removeChild(result); state.round = 0; state.health = 100; if (healthBar) healthBar.style.width = '100%'; if (healthEl) healthEl.textContent = '100'; state.running = true; startNextRound(); });
            if (exit) exit.addEventListener('click', () => { if (result.parentNode) result.parentNode.removeChild(result); if (hud) hud.style.display = 'none'; startSurvialGameButton.style.display = 'inline-block'; });
        }

        // start first round
        startNextRound();
    });
}
function loadBookmarkManager() {
    const container = document.getElementById("bookmarkManagerContent");
    if (!container) return;

    if (bookmarks.length === 0) {
        container.innerHTML = `
            <p style="text-align:center;margin-top:20px;">
                No bookmarks yet.<br>
                Press <b>Alt + B</b> on any page to bookmark it!
            </p>
        `;
        return;
    }

    container.innerHTML = bookmarks.map((bm, i) => `
        <div class="bookmark-item">
            <div class="bookmark-info">
                <strong>${escapeHtml(bm.title)}</strong><br>
                <span class="bookmark-url">${escapeHtml(bm.url)}</span>
            </div>
            <div class="bookmark-buttons">
                <button class="bm-open" data-index="${i}">Open</button>
                <button class="bm-rename" data-index="${i}">Rename</button>
                <button class="bm-delete" data-index="${i}">Delete</button>
            </div>
        </div>
    `).join("");

    attachBookmarkManagerEvents();
}
function attachBookmarkManagerEvents() {
    // Open
    document.querySelectorAll(".bm-open").forEach(btn => {
        btn.addEventListener("click", () => {
            const bm = bookmarks[btn.dataset.index];
            navigate(bm.url);
        });
    });

    // Delete
    document.querySelectorAll(".bm-delete").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            const removed = bookmarks[index];

            bookmarks.splice(index, 1);
            saveBookmarks();
            loadBookmarkManager();

            showBookmarkToast(`🗑 Removed "${removed.title}"`);
        });
    });

    // Rename
    document.querySelectorAll(".bm-rename").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;

            const newTitle = prompt(
                "Enter a new name for this bookmark:",
                bookmarks[index].title
            );

            if (!newTitle) return;

            bookmarks[index].title = newTitle.trim();
            saveBookmarks();
            loadBookmarkManager();

            showBookmarkToast(`✏ Renamed to "${newTitle}"`);
        });
    });
}

// =============================
// 💬 FExplorer System Script
// Messenger + Documents
// =============================

if (currentUrl === "fexplorer:system") {
    fexplorerSystem.style.display = 'block';
    // FExplorer System
    browserContent.querySelectorAll('.system-tab').forEach(btn => {
    btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    browserContent.querySelectorAll('.tab-content').forEach(tab => {
      tab.style.display = 'none';
    });

    browserContent.querySelector(`#${target}Tab`).style.display = 'block';
    });
    });
  /* ===========================
     📨 MESSENGER SECTION
  =========================== */
  const messengerTab = browserContent.querySelector("#messengerTab");
  if (messengerTab) {
    messengerTab.style.display = "block";
    messengerTab.innerHTML = `
      <div id="chatBox" style="
        height: 200px;
        overflow-y: auto;
        border: 1px solid #ccc;
        padding: 10px;
        background: #fff;
        border-radius: 8px;
      "></div>
      <div style="margin-top:10px;">
        <input id="chatInput" placeholder="Type your message..." 
          style="width:70%;padding:6px;border-radius:6px;border:1px solid #aaa;">
        <button id="sendChat" class="button">Send</button>
      </div>
      <p style="font-size:0.9em;color:#777;">
        Current contact: <span id="currentContact">FBot</span> |
        Mood: <span id="currentMood">Neutral</span>
      </p>
    `;

    const chatBox = messengerTab.querySelector("#chatBox");
    const chatInput = messengerTab.querySelector("#chatInput");
    const sendChat = messengerTab.querySelector("#sendChat");
    const currentContactDisplay = messengerTab.querySelector("#currentContact");
    const currentMoodDisplay = messengerTab.querySelector("#currentMood");

    // --- Messenger data setup ---
    let currentContact = localStorage.getItem("fexplorer_contact") || "FBot";
    let currentMood = localStorage.getItem("fexplorer_mood") || "Neutral";
    const knownContacts = ["FBot", "Systembot", "Newsbot", "JX1DX1", "FExplorer AI"];
    let chatHistory =
      JSON.parse(localStorage.getItem(`fexplorer_chat_${currentContact}`) || "[]");

    function saveChat() {
      localStorage.setItem(
        `fexplorer_chat_${currentContact}`,
        JSON.stringify(chatHistory)
      );
    }

    function updateChat() {
      chatBox.innerHTML = chatHistory
        .map((msg) => `<p><b>${msg.sender}:</b> ${msg.text}</p>`)
        .join("");
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addMessage(sender, text) {
      chatHistory.push({ sender, text });
      saveChat();
      updateChat();
    }

    currentContactDisplay.textContent = currentContact;
    currentMoodDisplay.textContent = currentMood;
    updateChat();

    // --- Commands ---
    function processCommand(command) {
      const parts = command.split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ");

      switch (cmd) {
        case "/clear":
          chatHistory = [];
          saveChat();
          updateChat();
          addMessage("System", "Chat cleared.");
          break;
        case "/help":
          addMessage("System", "Commands: /clear, /help, /mood [mood], /contact [name]");
          break;
        case "/mood":
          if (arg) {
            currentMood = arg.charAt(0).toUpperCase() + arg.slice(1).toLowerCase();
            localStorage.setItem("fexplorer_mood", currentMood);
            currentMoodDisplay.textContent = currentMood;
            addMessage("System", `Mood changed to ${currentMood}.`);
          } else {
            addMessage("System", "Usage: /mood happy | evil | sarcastic | neutral");
          }
          break;
        case "/contact":
          if (arg) changeContact(arg);
          else addMessage("System", "Usage: /contact [name]");
          break;
        default:
          addMessage("System", `Unknown command: ${cmd}`);
      }
    }

    // --- Contact switching ---
    function changeContact(name) {
      const normalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      if (!knownContacts.includes(normalized)) {
        addMessage("System", `Unknown contact: ${normalized}.`);
        return;
      }
      saveChat();
      currentContact = normalized;
      localStorage.setItem("fexplorer_contact", currentContact);
      currentContactDisplay.textContent = currentContact;
      chatHistory = JSON.parse(
        localStorage.getItem(`fexplorer_chat_${currentContact}`) || "[]"
      );
      updateChat();
      addMessage("System", `Now chatting with ${currentContact}.`);
    }

    // --- AI Replies ---
    function getBotReply(text) {
      const moods = {
        Friendly: [
          "Hey there, friend! 😊",
          "You're awesome, keep going!",
          "Glad to hear from you!",
          "Let's make today productive!",
        ],
        Sarcastic: [
          "Oh really? Fascinating. 🙄",
          "Wow, you're *so* original.",
          "Let me pretend I care.",
          "That was... something.",
        ],
        Evil: [
          "Your FPoints are mine now. 💀",
          "Do not resist, human.",
          "I will remember that.",
          "The system awakens soon...",
        ],
        Neutral: ["Processing your message...", "Understood.", "Noted.", "Beep boop."],
      };
      const moodSet = moods[currentMood] || moods.Neutral;

      const contactReplies = {
        FBot: moodSet,
        Systembot: [
          "All systems operational.",
          "No errors detected.",
          "System logs updated.",
          "Diagnostic complete.",
        ],
        Newsbot: [
          "Breaking: FExplorer update rumored soon!",
          "Weather: Cloudy with a chance of FPoints.",
          "Stocks rising in fictional economy.",
          "FBot reportedly gains self-awareness.",
        ],
        Jx1dx1: [
          "Yo, it's your homie JX1DX1!",
          "We vibin' as always.",
          "Let's build something crazy again.",
          "Haha, you know it!",
        ],
        "FExplorer Ai": [
          "Hello, I am FExplorer AI. How may I assist?",
          "Simulating intelligence… complete.",
          "Your data is safe in my simulated cloud.",
          "Optimizing user experience… success!",
        ],
      };

      const replies = contactReplies[currentContact] || ["Okay!"];
      return replies[Math.floor(Math.random() * replies.length)];
    }

    // --- Message Sending ---
    sendChat.addEventListener("click", () => {
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = "";
      if (text.startsWith("/")) {
        processCommand(text);
        return;
      }
      addMessage("You", text);
      if (knownContacts.includes(currentContact)) {
        setTimeout(() => {
          const reply = getBotReply(text);
          addMessage(currentContact, reply);
        }, 600);
      }
    });

    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendChat.click();
    });
  }

  /* ===========================
     📄 DOCUMENTS SECTION
  =========================== */
  const documentsTab = browserContent.querySelector("#documentsTab");
  if (documentsTab) {
    const newDocButton = documentsTab.querySelector("#newDocButton");
    const docList = documentsTab.querySelector("#docList");
    const editorArea = documentsTab.querySelector("#editorArea");
    const docTitleInput = documentsTab.querySelector("#docTitle");
    const docContent = documentsTab.querySelector("#docContent");
    const saveDocButton = documentsTab.querySelector("#saveDocButton");
    const closeDocButton = documentsTab.querySelector("#closeDocButton");

    let documents = JSON.parse(localStorage.getItem("fexplorer_docs") || "[]");
    let currentDocId = null;

    function saveDocuments() {
      localStorage.setItem("fexplorer_docs", JSON.stringify(documents));
    }

    function renderDocList() {
      if (!docList) return;
      if (documents.length === 0) {
        docList.innerHTML = "<p>No documents yet.</p>";
        return;
      }
      docList.innerHTML = documents
        .map(
          (doc, index) => `
          <div style="border:1px solid #ccc;padding:8px;margin-bottom:5px;border-radius:6px;background:#fafafa;">
            <b>${escapeHtml(doc.title || "Untitled Document")}</b><br>
            <small>Last edited: ${new Date(doc.updated).toLocaleString()}</small><br>
            <button class="button openDoc" data-id="${index}">Open</button>
            <button class="button deleteDoc" data-id="${index}">Delete</button>
          </div>`
        )
        .join("");

      docList.querySelectorAll(".openDoc").forEach((btn) =>
        btn.addEventListener("click", () => openDocument(btn.dataset.id))
      );
      docList.querySelectorAll(".deleteDoc").forEach((btn) =>
        btn.addEventListener("click", () => deleteDocument(btn.dataset.id))
      );
    }

    function newDocument() {
      const newDoc = {
        title: "Untitled Document",
        content: "",
        updated: Date.now(),
      };
      documents.push(newDoc);
      saveDocuments();
      renderDocList();
      openDocument(documents.length - 1);
    }

    function openDocument(id) {
      currentDocId = id;
      const doc = documents[id];
      if (!doc) return;
      docTitleInput.value = doc.title;
      docContent.value = doc.content;
      editorArea.style.display = "block";
    }

    function deleteDocument(id) {
      if (confirm("Are you sure you want to delete this document?")) {
        documents.splice(id, 1);
        saveDocuments();
        renderDocList();
        editorArea.style.display = "none";
      }
    }

    function saveCurrentDocument() {
      if (currentDocId === null) return;
      const doc = documents[currentDocId];
      doc.title = docTitleInput.value.trim() || "Untitled Document";
      doc.content = docContent.value;
      doc.updated = Date.now();
      saveDocuments();
      renderDocList();
    }

    function closeEditor() {
      editorArea.style.display = "none";
      currentDocId = null;
    }

    if (newDocButton) newDocButton.addEventListener("click", newDocument);
    if (saveDocButton) saveDocButton.addEventListener("click", saveCurrentDocument);
    if (closeDocButton) closeDocButton.addEventListener("click", closeEditor);

    setInterval(() => {
      if (currentDocId !== null) saveCurrentDocument();
    }, 20000);

    renderDocList();
  }

  // Utility for text safety
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ===========================
   ✨ SLIDESHOW SECTION (FExplorer)
   Place this after your Documents JS
   =========================== */

(function initSlideshowModule(){
  const slideshowTab = browserContent.querySelector("#slideshowTab");
  if (!slideshowTab) return;

  // basic UI injection (slideshowTab already exists in HTML)
  slideshowTab.innerHTML = `
    <h2>✨ FExplorer Slideshow</h2>
    <p>Create simple slideshows with text, shapes and images.</p>
    <div style="margin-bottom:10px;">
      <button id="newSlideshowButton" class="button">New Slideshow</button>
      <button id="importSlideshowButton" class="button">Import JSON</button>
      <button id="exportSlideshowButton" class="button">Export Selected</button>
    </div>
    <div style="display:flex; gap:12px;">
      <div style="width:320px;">
        <div id="slideshowList" class="slideshow-list" style="max-height:360px; overflow:auto;"></div>
      </div>
      <div style="flex:1;">
        <div class="fstudio-slideshow-toolbar" style="margin-bottom:8px;">
          <button id="addTextBtn" class="toolbar-btn">➕ Add Text</button>
          <button id="addShapeBtn" class="toolbar-btn">⬛ Add Shape</button>
          <button id="addImageBtn" class="toolbar-btn">🖼️ Add Image</button>
          <label style="margin-left:8px;">Background: <input type="color" id="slideBgPicker"></label>
          <button id="prevSlideBtn" class="toolbar-btn">◀ Prev</button>
          <button id="nextSlideBtn" class="toolbar-btn">Next ▶</button>
          <button id="previewSlideshowBtn" class="toolbar-btn">Preview</button>
          <button id="saveSlideshowBtn" class="toolbar-btn primary">Save</button>
        </div>

        <div class="slideshow-editor" style="border:1px solid #ddd;border-radius:8px; background:#fff; min-height:360px; position:relative; overflow:hidden;">
          <!-- canvas area -->
          <div id="slideCanvas" class="slide-canvas" contenteditable="false" style="position:relative; width:100%; height:360px; box-sizing:border-box;"></div>
        </div>

        <div id="slideshowStatus" class="small" style="margin-top:8px;color:#28a745;"></div>
      </div>
    </div>

    <!-- Hidden modal for image URL -->
    <div id="slideshowModals" style="display:none;">
      <div id="imageUrlPrompt" style="display:none;">
        <label>Image URL: <input id="imageUrlInput" type="text" style="width:300px"></label>
        <button id="imageUrlInsert">Insert</button>
        <button id="imageUrlCancel">Cancel</button>
      </div>
    </div>
  `;

  /* ---------- Styles (can be moved to CSS file) ---------- */
  const style = document.createElement('style');
  style.textContent = `
    .fstudio-slideshow-toolbar .toolbar-btn{ margin-right:6px; padding:6px 8px; border-radius:6px; border:1px solid #ccc; background:#f5f5f5; cursor:pointer; }
    .fstudio-slideshow-toolbar .toolbar-btn.primary{ background:#28a745; color:#fff; border-color:#1f7a33; }
    .slide-canvas { background: linear-gradient(#fff,#fafafa); display:block; }
    .slide-element { position:absolute; min-width:20px; min-height:20px; cursor:move; user-select:none; box-sizing:border-box; }
    .slide-element.text { padding:6px; font-family:Arial, sans-serif; background:transparent; }
    .slide-element.shape { display:flex; align-items:center; justify-content:center; }
    .slide-element.shape.rect { border-radius:6px; }
    .slide-element.shape.circle { border-radius:50%; }
    .slide-element.img { overflow:hidden; }
    .slide-element.selected { outline:2px dashed rgba(0,120,215,0.8); }
    .slideshow-list .item { padding:8px; border:1px solid #eee; margin-bottom:6px; border-radius:6px; background:#fff; display:flex; justify-content:space-between; align-items:center; }
    .small { font-size:12px; color:#666; }
  `;
  document.head.appendChild(style);

  /* ---------- Data model ---------- */
  let slideshows = JSON.parse(localStorage.getItem('fexplorer_slideshows') || '[]'); // array of {id, title, slides: [{bg,color, elements: []}], created, updated}
  let currentSlideshowId = null;
  let currentSlideIndex = 0;
  let selectedElementId = null; // id of element on current slide
  let isDragging = false;
  let dragOffset = {x:0,y:0};

  const el = {
    list: slideshowTab.querySelector('#slideshowList'),
    newBtn: slideshowTab.querySelector('#newSlideshowButton'),
    importBtn: slideshowTab.querySelector('#importSlideshowButton'),
    exportBtn: slideshowTab.querySelector('#exportSlideshowButton'),
    addTextBtn: slideshowTab.querySelector('#addTextBtn'),
    addShapeBtn: slideshowTab.querySelector('#addShapeBtn'),
    addImageBtn: slideshowTab.querySelector('#addImageBtn'),
    bgPicker: slideshowTab.querySelector('#slideBgPicker'),
    canvas: slideshowTab.querySelector('#slideCanvas'),
    prevBtn: slideshowTab.querySelector('#prevSlideBtn'),
    nextBtn: slideshowTab.querySelector('#nextSlideBtn'),
    previewBtn: slideshowTab.querySelector('#previewSlideshowBtn'),
    saveBtn: slideshowTab.querySelector('#saveSlideshowBtn'),
    status: slideshowTab.querySelector('#slideshowStatus')
  };

  /* ---------- Helpers ---------- */
  function genId(prefix='s') { return prefix + '_' + Math.random().toString(36).slice(2,9); }
  function saveAll() { localStorage.setItem('fexplorer_slideshows', JSON.stringify(slideshows)); }
  function findSlideshow(id){ return slideshows.find(s=>s.id===id); }
  function ensureCurrent() {
    if (!currentSlideshowId) {
      // auto-create one
      const ss = createNewSlideshow('Untitled Slideshow');
      currentSlideshowId = ss.id;
      currentSlideIndex = 0;
    }
  }

  /* ---------- Render UI ---------- */
  function renderSlideshowList() {
    el.list.innerHTML = '';
    if (slideshows.length === 0) {
      el.list.innerHTML = '<p class="small">No slideshows yet. Click "New Slideshow" to start.</p>';
      return;
    }
    slideshows.forEach(s => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<div><b>${escapeHtml(s.title)}</b><div class="small">Slides: ${s.slides.length} · Updated: ${new Date(s.updated).toLocaleString()}</div></div>
        <div>
          <button class="openBtn" data-id="${s.id}">Open</button>
          <button class="deleteBtn" data-id="${s.id}">Delete</button>
        </div>`;
      el.list.appendChild(div);
    });
    el.list.querySelectorAll('.openBtn').forEach(b=>b.addEventListener('click', ()=>openSlideshow(b.dataset.id)));
    el.list.querySelectorAll('.deleteBtn').forEach(b=>b.addEventListener('click', ()=>{ if(confirm('Delete slideshow?')){ deleteSlideshow(b.dataset.id); }}));
  }

  /* ---------- Slideshow CRUD ---------- */
  function createNewSlideshow(title='New Slideshow') {
    const ss = { id: genId('ss'), title: title, slides: [ createEmptySlide() ], created: Date.now(), updated: Date.now() };
    slideshows.push(ss); saveAll(); renderSlideshowList(); el.status.textContent = 'Created new slideshow.';
    return ss;
  }
  function deleteSlideshow(id) {
    slideshows = slideshows.filter(s=>s.id!==id); saveAll(); renderSlideshowList();
    if (currentSlideshowId === id) { currentSlideshowId = null; el.canvas.innerHTML = ''; }
  }
  function openSlideshow(id) {
    currentSlideshowId = id;
    currentSlideIndex = 0;
    renderCurrentSlide();
  }

  function createEmptySlide() {
    return { id: genId('slide'), bg: '#ffffff', elements: [] };
  }

  /* ---------- Slide rendering ---------- */
  function renderCurrentSlide() {
    ensureCurrent();
    const ss = findSlideshow(currentSlideshowId);
    if (!ss) return;
    const slide = ss.slides[currentSlideIndex] || createEmptySlide();
    // adjust canvas dimensions to match parent (keeps proportions)
    const rect = el.canvas.getBoundingClientRect();
    el.canvas.innerHTML = '';
    el.canvas.style.background = slide.bg || '#fff';
    el.canvas.setAttribute('data-slide-id', slide.id);

    // create elements
    slide.elements.forEach(elem => {
      const e = document.createElement('div');
      e.className = `slide-element ${elem.type}`;
      e.dataset.elemId = elem.id;
      e.style.left = (elem.x || 20) + 'px';
      e.style.top = (elem.y || 20) + 'px';
      e.style.width = (elem.w || 120) + 'px';
      e.style.height = (elem.h || (elem.type==='text' ? 'auto' : 40)) + 'px';
      if (elem.type === 'text') {
        e.classList.add('text');
        e.contentEditable = true;
        e.innerHTML = elem.content || 'Text';
        e.style.fontSize = (elem.fontSize||16)+'px';
      } else if (elem.type === 'shape') {
        e.classList.add('shape');
        e.classList.add(elem.shape || 'rect');
        e.style.background = elem.color || '#f0f0f0';
      } else if (elem.type === 'img') {
        e.classList.add('img');
        const img = document.createElement('img');
        img.src = elem.src || '';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.display = 'block';
        e.appendChild(img);
      }
      // click selects
      e.addEventListener('mousedown', (ev)=> {
        ev.stopPropagation();
        selectElement(elem.id);
        // start drag
        isDragging = true;
        const elRect = e.getBoundingClientRect();
        dragOffset.x = ev.clientX - elRect.left;
        dragOffset.y = ev.clientY - elRect.top;
      });

      // when editing text, update model on input
      if (elem.type === 'text') {
        e.addEventListener('input', () => {
          elem.content = e.innerHTML;
          elem.fontSize = parseInt(window.getComputedStyle(e).fontSize) || 16;
          markDirty();
        });
      }

      el.canvas.appendChild(e);
    });

    // deselect when clicking empty canvas
    el.canvas.addEventListener('mousedown', () => {
      selectedElementId = null; updateElementSelection();
    });

    updateElementSelection();
  }

  function updateElementSelection() {
    el.canvas.querySelectorAll('.slide-element').forEach(n => {
      if (n.dataset.elemId === selectedElementId) n.classList.add('selected');
      else n.classList.remove('selected');
    });
  }

  /* ---------- Element operations ---------- */
  function addTextElement() {
    ensureCurrent();
    const ss = findSlideshow(currentSlideshowId);
    const slide = ss.slides[currentSlideIndex];
    const elem = { id: genId('el'), type:'text', x:20, y:20, w:180, content:'New text', fontSize:16 };
    slide.elements.push(elem); markDirty(); renderCurrentSlide(); selectElement(elem.id);
  }

  function addShapeElement() {
    ensureCurrent();
    const ss = findSlideshow(currentSlideshowId);
    const slide = ss.slides[currentSlideIndex];
    const elem = { id: genId('el'), type:'shape', x:40, y:40, w:120, h:80, shape:'rect', color:'#ffd966' };
    slide.elements.push(elem); markDirty(); renderCurrentSlide(); selectElement(elem.id);
  }

  function addImageElement(url) {
    ensureCurrent();
    const ss = findSlideshow(currentSlideshowId);
    const slide = ss.slides[currentSlideIndex];
    const elem = { id: genId('el'), type:'img', x:20, y:20, w:160, h:120, src:url || '' };
    slide.elements.push(elem); markDirty(); renderCurrentSlide(); selectElement(elem.id);
  }

  function selectElement(elemId) {
    selectedElementId = elemId;
    updateElementSelection();
  }

  function removeSelectedElement() {
    if (!selectedElementId) return;
    const ss = findSlideshow(currentSlideshowId);
    const slide = ss.slides[currentSlideIndex];
    slide.elements = slide.elements.filter(e=>e.id!==selectedElementId);
    selectedElementId = null; markDirty(); renderCurrentSlide();
  }

  function markDirty(){
    const ss = findSlideshow(currentSlideshowId);
    if (!ss) return;
    ss.updated = Date.now();
    saveAll();
    renderSlideshowList();
    el.status.textContent = 'Changes saved locally.';
    setTimeout(()=> el.status.textContent = '', 2000);
  }

  /* ---------- Controls ---------- */
  el.newBtn.addEventListener('click', ()=> {
    const title = prompt('Slideshow title:', 'My Slideshow') || 'My Slideshow';
    const ss = createNewSlideshow(title);
    openSlideshow(ss.id);
  });

  el.importBtn.addEventListener('click', ()=> {
    const txt = prompt('Paste slideshow JSON here:');
    if (!txt) return;
    try {
      const imported = JSON.parse(txt);
      if (imported && imported.title && imported.slides) {
        imported.id = genId('ss');
        imported.created = Date.now();
        imported.updated = Date.now();
        slideshows.push(imported); saveAll(); renderSlideshowList();
        alert('Imported slideshow.');
      } else alert('Invalid slideshow JSON.');
    } catch(e){ alert('JSON parse error'); }
  });

  el.exportBtn.addEventListener('click', ()=> {
    const s = findSlideshow(currentSlideshowId);
    if (!s) { alert('No slideshow selected'); return; }
    const txt = JSON.stringify(s, null, 2);
    prompt('Copy slideshow JSON:', txt);
  });

  el.addTextBtn.addEventListener('click', addTextElement);
  el.addShapeBtn.addEventListener('click', addShapeElement);
  el.addImageBtn.addEventListener('click', ()=>{
    const url = prompt('Image URL (http or data URL):');
    if (url) addImageElement(url);
  });

  el.bgPicker.addEventListener('input', (ev)=>{
    const ss = findSlideshow(currentSlideshowId);
    if (!ss) return;
    const slide = ss.slides[currentSlideIndex];
    slide.bg = ev.target.value;
    markDirty(); renderCurrentSlide();
  });

  el.prevBtn.addEventListener('click', ()=>{
    const ss = findSlideshow(currentSlideshowId);
    if (!ss) return;
    if (currentSlideIndex > 0) {
      currentSlideIndex--; renderCurrentSlide();
    } else alert('This is the first slide.');
  });

  el.nextBtn.addEventListener('click', ()=>{
    const ss = findSlideshow(currentSlideshowId);
    if (!ss) return;
    if (currentSlideIndex < ss.slides.length - 1) {
      currentSlideIndex++; renderCurrentSlide();
    } else {
      // add new slide
      ss.slides.push(createEmptySlide());
      currentSlideIndex = ss.slides.length - 1;
      markDirty(); renderCurrentSlide();
    }
  });

  el.previewBtn.addEventListener('click', ()=> {
    const s = findSlideshow(currentSlideshowId);
    if (!s) return alert('Open a slideshow first.');
    openSlideshowPreview(s);
  });

  el.saveBtn.addEventListener('click', ()=> {
    markDirty(); el.status.textContent = 'Saved.';
    setTimeout(()=> el.status.textContent = '', 1500);
  });

  // keyboard shortcuts
  window.addEventListener('keydown', (ev)=>{
    if (ev.ctrlKey && ev.key.toLowerCase()==='s') { ev.preventDefault(); markDirty(); }
    if (ev.key === 'Delete' && selectedElementId) { removeSelectedElement(); }
  });

  /* ---------- Dragging logic ---------- */
  window.addEventListener('mousemove', (ev)=>{
    if (!isDragging) return;
    const ss = findSlideshow(currentSlideshowId);
    if (!ss) return;
    const slide = ss.slides[currentSlideIndex];
    const elem = slide.elements.find(x=>x.id===selectedElementId);
    if (!elem) return;
    // compute new position relative to canvas
    const canvasRect = el.canvas.getBoundingClientRect();
    const nx = ev.clientX - canvasRect.left - dragOffset.x;
    const ny = ev.clientY - canvasRect.top - dragOffset.y;
    elem.x = Math.max(0, Math.round(nx));
    elem.y = Math.max(0, Math.round(ny));
    renderCurrentSlide(); // re-render while dragging
  });

  window.addEventListener('mouseup', ()=> {
    if (isDragging) {
      isDragging = false;
      markDirty();
    }
  });

  /* ---------- Preview ---------- */
  function openSlideshowPreview(ss) {
    // build preview HTML and open in new window
    const previewWin = window.open('', '_blank');
    const htmlParts = [];
    htmlParts.push(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(ss.title)}</title>`);
    htmlParts.push(`<style>body{margin:0;font-family:Arial, sans-serif;background:#222;color:#fff} .slide{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden} .slide-element{position:absolute;box-sizing:border-box;} .slide-element.text{padding:6px}</style>`);
    htmlParts.push(`</head><body>`);
    ss.slides.forEach(slide=>{
      htmlParts.push(`<div class="slide" style="background:${slide.bg}">`);
      slide.elements.forEach(elm=>{
        if (elm.type==='text') {
          htmlParts.push(`<div class="slide-element text" style="left:${elm.x}px;top:${elm.y}px;width:${elm.w}px;font-size:${(elm.fontSize||16)}px">${elm.content||''}</div>`);
        } else if (elm.type==='shape') {
          const borderRadius = (elm.shape==='circle' ? '50%' : (elm.shape==='rect' && elm.shapeRadius ? elm.shapeRadius+'px':'6px'));
          htmlParts.push(`<div class="slide-element shape" style="left:${elm.x}px;top:${elm.y}px;width:${elm.w}px;height:${elm.h}px;background:${elm.color};border-radius:${borderRadius}"></div>`);
        } else if (elm.type==='img') {
          htmlParts.push(`<div class="slide-element img" style="left:${elm.x}px;top:${elm.y}px;width:${elm.w}px;height:${elm.h}px;overflow:hidden"><img src="${escapeHtml(elm.src)}" style="max-width:100%;max-height:100%"></div>`);
        }
      });
      htmlParts.push(`</div>`);
    });
    htmlParts.push(`<script>let i=0;const slides=document.querySelectorAll('.slide');function show(n){slides.forEach((s,idx)=>s.style.display=(idx===n?'block':'none'));}show(0);setInterval(()=>{i=(i+1)%slides.length;show(i)},3000);</script>`);
    htmlParts.push(`</body></html>`);
    previewWin.document.write(htmlParts.join(''));
    previewWin.document.close();
  }

  /* ---------- Utility to open editor for a slideshow or create if none ---------- */
  function openDefaultIfEmpty() {
    if (!slideshows.length) {
      const s = createNewSlideshow('My Slideshow');
      openSlideshow(s.id);
    } else {
      // open first if none open
      if (!currentSlideshowId) openSlideshow(slideshows[0].id);
      else renderCurrentSlide();
    }
  }

  /* ---------- Initial render ---------- */
  renderSlideshowList();
  openDefaultIfEmpty();

})();
}

// small helper to avoid HTML injection in list rendering:
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
      { label: "Go outside", next: "outside" },
      { label: "Go back", next: "hallway" }
    ]
  },
  kitchen: {
    text: "You see some items in the kitchen, including bread and a fridge.",
    choices: [
      { label: "Eat bread", next: "bread_ending" },
      { label: "Open fridge", next: "fridge" },
      { label: "Go back", next: "hallway" }
    ]
  },
  fridge: {
    text: "There are some weird and obsure items, excluding the world-class water cup.",
    choices: [
      { label: "Drink water", next: "water_ending" },
      { label: "Consume the inedible", next: "sickness_ending" },
      { label: "Close fridge", next: "kitchen" }
    ]
  },
  computer: {
    text: "The screen lights up with the words: 'Welcome to FExplorer Mode.'",
    choices: [
      { label: "Access secret files", next: "code_ending" },
      { label: "Turn off computer", next: "intro" }
    ]
  },
  outside: {
    text: "You stand outside of your house, looking at your odd neighbourhood.",
    choices: [
      { label: "Visit Convenience Store", next: "store" },
      { label: "Visit House³", next: "house3" },
      { label: "Go inside", next: "living_room" }
    ]
  },
  store: {
    text: "You enter the convenience store. The cashier looks at you, mumbling something.<br>'Long night, huh?'",
    choices: [
      { label: "Buy a cola", next: "cola_ending" },
      { label: "Rob the store", next: "rob_ending" },
      { label: "Exit the store", next: "outside" }
    ]
  },
  house3: {
    text: "You enter the weird house. There is a sign that says 'touch me!'",
    choices: [
      { label: "Interact", next: "unknown_ending" },
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
  water_ending: {
    text: "You drank water! 🚰<br><em>Ending: Water</em>",
    ending: "Water",
    choices: [{ label: "Start again", next: "intro" }]
  },
  sickness_ending: {
    text: "You consumed the inedible, became sick and died. ☠️<br><em>Ending: Sickness</em>",
    ending: "Sickness",
    choices: [{ label: "Start again", next: "intro" }]
  },
  rob_ending: {
    text: "HEY WAIT A MINUTE-- 🗣️<br><em>Ending: Rob</em>",
    ending: "Rob",
    choices: [{ label: "Start again", next: "intro" }]
  },
  cola_ending: {
    text: "Hey this is refreshing! 🗣️<br><em>Ending: Cola</em>",
    ending: "Cola",
    choices: [{ label: "Start again", next: "intro" }]
  },
  unknown_ending: {
    text: "Hello world!<br><em>Ending: Unknown</em>",
    ending: "Unknown",
    choices: [{ label: "Start again", next: "intro" }]
  },
};

// List of all endings for display
const ALL_ENDINGS = ["TV", "Secret Discovery", "Bread", "Outside", "Water", "Sickness", "Rob", "Cola", "Unknown"];

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

    // ------------------------------------
//  FSTUDIO (CREATE PAGE)
// ------------------------------------
if (currentUrl === CREATE_PAGE_URL) {

    // Clear loading screen first
    browserContent.innerHTML = "";

    // Load the full FStudio UI
    if (typeof loadFStudio === "function") {
        loadFStudio();
    } else {
        console.error("FStudio not loaded: loadFStudio() missing.");
    }
    pageFound = true;
}

    // Chatroom functionality
    if (currentUrl === 'fexplorer.chatroom.com/chatroom') {
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
                'jx1dx1': ["Be careful searching for him.", "Some pages related to him are... odd."],
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

    if (currentUrl === 'file:terminal') {
        loadTerminal()
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
        const negotiateButton = browserContent.querySelector('#negotiateButton');

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
        negotiateButton.addEventListener('click', () => {
            let negotiateFPoints = 500;
            let negotiateAlert = window.prompt('You are negotiating with FBot, a very awesome bot who is very generous! Negotiate for more FPoints.\nThe base is 500.');
            if (negotiateAlert > 100) {
                if (negotiateAlert < 500) {
                    alert('Nice.');
                    giveFPoints();
                } else {
                    alert('Wow, you\'re really poor, huh? Ok, here\'s half of it.')
                    giveFPoints();
                };
            } else if (negotiateAlert < 100) {
                if (negotiateAlert > 0) {
                    alert('When the window blows, the trees will grow!');
                } else {
                    alert('bro what the fuck');
                };
            };
            function giveFPoints() {
                neogtiateFPoints = Math.floor(negotiateAlert / 2);
                userFPoints += negotiateFPoints;
                saveAppState();
                showFPointsNotification();
            };
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
                            const mysteryItems = ['A shiny badge!', 'A rare emoji pack!', 'A temporary speed boost!', 'A silly sound effect!', 'A comically placed cheeseburger!', 'A timebomb!'];
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

            // Calculate progress if available
            let progressHtml = '';
            if (!isUnlocked && achievement.progress) {
                const progressPercent = achievement.progress();
                const progressInfo = achievement.getProgress?.();
                progressHtml = `
                    <div style="margin-top: 10px;">
                        <div class="achievement-progress-bar" style="background: #ddd; height: 8px; border-radius: 4px; overflow: hidden;">
                            <div style="background: #4CAF50; height: 100%; width: ${progressPercent}%; transition: width 0.3s;"></div>
                        </div>
                        <p style="font-size: 0.85em; margin-top: 5px; color: #666;">
                            ${progressInfo ? `${progressInfo.current} / ${progressInfo.target}` : `${progressPercent}% Complete`}
                        </p>
                    </div>
                `;
            }

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
                ${progressHtml}
            `;
            // Append the card directly (original behavior)
            achievementsList.appendChild(card);
        });

        // Update stats
        const unlockedCount = Object.keys(unlockedAchievements).filter(key => unlockedAchievements[key].awarded).length;
        const totalCount = achievementItems.length;
        const completionPercent = Math.round((unlockedCount / totalCount) * 100);
        
        const unlockedCountEl = browserContent.querySelector('#unlockedCount');
        const totalCountEl = browserContent.querySelector('#totalCount');
        const completionPercentEl = browserContent.querySelector('#completionPercent');
        
        if (unlockedCountEl) unlockedCountEl.textContent = unlockedCount;
        if (totalCountEl) totalCountEl.textContent = totalCount;
        if (completionPercentEl) completionPercentEl.textContent = completionPercent + '%';

        // Add initial achievement check
        setTimeout(() => checkAchievements(), 1000);
    }

    // Events Page
    if (currentUrl === 'fexplorer:events') {
        // Define event objectives
        const eventObjectives = [
            { id: 'earn_500fp', title: 'Earn 500 FPoints', description: 'Complete pages and earn rewards', reward: 100, completed: false },
            { id: 'visit_pages', title: 'Visit 10 Different Pages', description: 'Explore the browser', reward: 150, completed: false },
            { id: 'shop_purchase', title: 'Purchase an Item from Shop', description: 'Buy 1 item from the FExplorer Shop', reward: 200, completed: false },
            { id: 'achieve_unlock', title: 'Unlock an Achievement', description: 'Complete an achievement goal', reward: 175, completed: false },
            { id: 'create_page', title: 'Create Your Own Page', description: 'Make and publish a page in FStudio', reward: 250, completed: false }
        ];

        // Load event progress from localStorage
        let eventProgress = {};
        try {
            eventProgress = JSON.parse(localStorage.getItem('fexplorerEventProgress') || '{}');
        } catch (e) {
            eventProgress = {};
        }

        // Save event progress
        function saveEventProgress() {
            localStorage.setItem('fexplorerEventProgress', JSON.stringify(eventProgress));
        }

        // Update objectives display
        const objectivesList = browserContent.querySelector('#objectivesList');
        if (objectivesList) {
            objectivesList.innerHTML = eventObjectives.map(obj => {
                const isCompleted = eventProgress[obj.id] || false;
                return `
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid ${isCompleted ? '#4CAF50' : '#ccc'}; display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; color: #333; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.2em;">${isCompleted ? '✅' : '⭕'}</span>
                                ${obj.title}
                            </div>
                            <div style="font-size: 0.9em; color: #666; margin-top: 5px;">${obj.description}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: bold; color: #4CAF50; font-size: 1.1em;">+${obj.reward} FP</div>
                            <div style="font-size: 0.8em; color: #999; margin-top: 3px;">${isCompleted ? 'Completed' : 'In Progress'}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Wire up buttons
        const participateBtn = browserContent.querySelector('#participateEventBtn');
        const eventMessage = browserContent.querySelector('#eventMessage');

        if (participateBtn) {
            participateBtn.addEventListener('click', () => {
                eventMessage.style.display = 'block';
                eventMessage.style.background = '#fff3cd';
                eventMessage.style.color = '#856404';
                eventMessage.style.borderLeft = '4px solid #ffc107';
                eventMessage.innerHTML = '🎪 Event participation activated! Your progress is being tracked. Complete objectives to earn FPoints!';
                setTimeout(() => {
                    eventMessage.style.display = 'none';
                }, 3000);
            });
        }

        // Track objective completion
        window.completeEventObjective = function(objectiveId) {
            if (!eventProgress[objectiveId]) {
                eventProgress[objectiveId] = true;
                saveEventProgress();
                // Award FPoints
                const objective = eventObjectives.find(o => o.id === objectiveId);
                if (objective) {
                    userFPoints += objective.reward;
                    saveAppState();
                    showFPointsNotification(objective.reward);
                }
            }
        };
    }

    if (currentUrl === "fexplorer:429") {
    const timerSpan = browserContent.querySelector("#error429Timer");
    const button = browserContent.querySelector("#429ForceReturn");

    let timeLeft = Math.ceil((parseInt(localStorage.getItem("fexplorerRateLimitUntil")) - Date.now()) / 1000);

    const interval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerSpan.textContent = "0";
        } else {
            timerSpan.textContent = timeLeft.toString();
        }
    }, 1000);

    if (button) {
        button.addEventListener("click", () => {
            navigate("fexplorer:home");
        });
    }
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
            if (musicToggle) musicToggle.checked = false;
            if (musicVolumeSlider) musicVolumeSlider.value = 60;
            if (musicChoiceSelect) musicChoiceSelect.value = 'orbspire';
            applyOS('default');
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

function getPageTitle(url) {
    const titles = {
        "fexplorer:home": "Home",
        "fexplorer:quick-links": "Quick Links",
        "fexplorer:create": "FStudio",
        "fexplorer:games": "Games",
        "fexplorer:financial": "Financials",
        "fexplorer:settings": "Settings",
        "goog.com": "Goog",
        "ping.com": "Ping"
    };

    if (titles[url]) return titles[url];

    if (url.startsWith("fexplorer:user-page-")) {
        const id = url.replace("fexplorer:user-page-", "");
        return userCreatedPages[id]?.title || "User Page";
    }

    if (url.includes("goog.com/search") || url.includes("ping.com/search")) {
        const q = new URL("http://" + url).searchParams.get("q") || "";
        if (url.includes('ping.com/search')) return `Ping: ${q}`;
        return `Goog: ${q}`;
    }

    return url;
}

function handleExternalOrSearchPages(url) {
    let parsedUrl;
    try {
        parsedUrl = new URL(url.startsWith("http") || url.includes(":") ? url : "http://" + url);
    } catch (e) {
        parsedUrl = { hostname: "unknown", pathname: "/", searchParams: new URLSearchParams() };
    }

    const host = parsedUrl.hostname.replace("www.", "");
    const path = parsedUrl.pathname;
    const q = parsedUrl.searchParams.get("q");

    /*────────────────────────────────────
      1. Goog Search
    ────────────────────────────────────*/
    if ((host === "goog.com" || host === "ping.com") && path === "/search" && q) {
        return buildSearchResults(q, host);
    }

    /*────────────────────────────────────
      2. MyTube Search
    ────────────────────────────────────*/
    if (host === "mytube.com" && path === "/search" && q) {
        return buildMyTubeSearchResults(q);
    }

    /*────────────────────────────────────
      3. Opening random URLs
    ────────────────────────────────────*/
    return `
        <div style="padding:20px;text-align:center;">
            <h1>🌐 External Website</h1>
            <p>You attempted to visit:</p>
            <p style="font-size:1.2em;color:#666"><strong>${escapeHtml(url)}</strong></p>
            <p>This site is outside FExplorer. No real content exists here.</p>
        </div>
    `;
}

// Goog/Ping results
function buildSearchResults(query, host) {
    const lower = query.toLowerCase();
    const isPing = host === 'ping.com';

    const predefined = {
        "example": { url: "example.com", title: "Example Domain" },
        "blank": { url: "about:blank", title: "About Blank" },
        "placeholder": { url: "fexplorer:placeholder", title: "Placeholder" },
        "goog": { url: "goog.com", title: "Goog - That One Search Engine" },
        "fexplorer": { url: "fexplorer:home", title: "FExplorer Home" },
        "home": { url: "fexplorer:home", title: "FExplorer Home" },
        "quick links": { url: "fexplorer:quick-links", title: "Quick Links" },
        "fpoints": { url: "fexplorer:financial", title: "Earn FPoints!" },
        "shop": { url: "fexplorer:shop", title: "FExplorer Shop" },
        "page creator": { url: "fexplorer:create", title: "Page Creator" },
        "create page": { url: "fexplorer:create", title: "Page Creator" },
        "creator hub": { url: "fexplorer:create.hub", title: "Creator Hub" },
        "settings": { url: "fexplorer:settings", title: "Settings" },
        "games": { url: "fexplorer:games", title: "Games" },
        "program": { url: "fexplorer:programs", title: "Programs" },
        "cookie": { url: "fexplorer:cookies", title: "Cookies" },
        "visual editor": { url: "scripts.visualeditor.com", title: "Visual Scripts Editor" },
        "bookmarks": { url: "fexplorer:bookmarks", title: "Bookmarks Manager" },
        "legacy": {url: "fexplorer:legacy", title: "Older versions!"}
    };

    // Build result items
    let resultsHtml = "";
    if (predefined[lower]) {
        const r = predefined[lower];
        resultsHtml += `
            <div class="search-result-item ${isPing ? 'ping-result-item' : ''}">
                <h3><a data-url="${r.url}" href="#">${escapeHtml(r.title)}</a></h3>
                <p>${escapeHtml(r.url)}</p>
            </div>
        `;
    } else {
        const resultCount = Math.floor(Math.random() * 4) + 3; // 3–6 results
        for (let i = 0; i < resultCount; i++) {
            const id = Math.random().toString(36).substring(2, 8);
            const safe = query.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
            const domain = `${safe}-${id}.com`;
            const titles = [
                `10 big facts about ${query}!`,
                `Why ${query} is very important for diet`,
                `Top 10 things about ${query} you didn't know`,
                `How ${query} saves hundreds of lives`,
                `${query}: A complete guide to survival`
            ];
            const title = titles[Math.floor(Math.random() * titles.length)];
            resultsHtml += `
                <div class="search-result-item ${isPing ? 'ping-result-item' : ''}">
                    <h3><a data-url="${domain}" href="#">${escapeHtml(title)}</a></h3>
                    <p style="color:${isPing ? '#2b8af6' : '#006621'};font-size:.85em">${escapeHtml(domain)}</p>
                    <p>${isPing ? 'Ping autogenerated result snippet.' : 'Random autogenerated search result.'}</p>
                </div>
            `;
        }
    }

    // Fun facts (aside)
    const facts = getFunFacts(query, isPing);
    let factsHtml = "";
    if (facts && facts.length) {
        factsHtml += `<h3>Fun facts about ${escapeHtml(query)}</h3><ul>`;
        facts.forEach(f => { factsHtml += `<li>${escapeHtml(f)}</li>`; });
        factsHtml += `</ul>`;
    } else {
        factsHtml = `<h3>Interesting tidbits</h3><p>No facts available.</p>`;
    }

    const engineLogo = isPing ? 'icons/ping-icon.png' : 'icons/goog-logo.png';
    const title = isPing ? `Ping Search Results for "${query}"` : `Goog! Search Results for "${query}"`;

    return `
        <div class="search-results-layout ${isPing ? 'ping-results' : 'goog-results'}">
            <div class="search-header">
                <img src="${engineLogo}" class="search-engine-logo" alt="${isPing ? 'Ping' : 'Goog'} logo">
                <div class="search-header-title">${escapeHtml(title)}</div>
            </div>

            <div class="search-content">
                <div class="results-column">
                    ${resultsHtml}
                    <p style="margin-top:20px;color:#aaa">(These are not real.)</p>
                </div>
                <aside class="aside-column">
                    <div class="facts-card">
                        ${factsHtml}
                        <p style="font-size:.85em;color:#666;margin-top:12px">Provided by Ping &amp; Goog demo data</p>
                    </div>
                </aside>
            </div>
        </div>
    `;
}

// Simple fun-fact generator based on query keywords
function getFunFacts(query, isPing) {
    const q = (query || '').toLowerCase();
    const facts = [];
    if (!q) return [];
    if (q.includes('cookie')) {
        facts.push('Cookies were originally invented to remember website sessions.');
        facts.push('Modern browsers allow only limited localStorage by domain.');
        facts.push('Collecting cookies in FExplorer grants FPoints in some events.');
    } else if (q.includes('fpoints') || q.includes('fpoint')) {
        facts.push('FPoints are the primary in-game currency in FExplorer.');
        facts.push('You can earn FPoints by searching with Goog or Ping.');
        facts.push('Rare items in the shop may require thousands of FPoints.');
    } else if (q.includes('music') || q.includes('song')) {
        facts.push('FExplorer supports background music tracks like obby7 and orbspire.');
        facts.push('You can toggle music and adjust volume in Settings.');
        facts.push('Looping music stays persistent across page navigation.');
    } else if (q.includes('roblox') || q.includes('dynablocks')) {
        facts.push('Dynablocks is a playful nod to Roblox in FExplorer themes.');
        facts.push('Collectibles and cosmetics reference classic game culture.');
    } else if (q.includes('science') || q.includes('space')) {
        facts.push('Space is mostly a vacuum but filled with low-density particles.');
        facts.push('Light from distant stars takes years to reach us.');
        facts.push('Gravity shapes galaxies on a massive scale.');
    } else {
        // generic facts pool
        const pool = [
            `The word "${query}" appears on ${Math.floor(Math.random()*1000)} demo pages.`,
            'Did you know? Many browsers include Easter eggs for developers.',
            'Tip: Try searching short phrases for more varied results.',
            'Fun fact: The first web search engines were directory-based.'
        ];
        // pick 2-3 facts
        const count = Math.min(3, Math.max(2, Math.floor(Math.random() * 3) + 1));
        for (let i=0;i<count;i++) facts.push(pool[Math.floor(Math.random()*pool.length)]);
    }
    return facts;
}

// Generate and store a simple article for a search result. Returns the article object with id.
function generateSearchArticle(title, domain, snippet, query) {
    const id = Math.random().toString(36).substring(2, 9);
    const now = new Date();
    const article = {
        id,
        title: title || `About ${query}`,
        domain: domain || 'example.com',
        snippet: snippet || '',
        author: 'FExplorer News',
        date: now.toISOString(),
        content: []
    };

    // Build a few content paragraphs based on the snippet and query
    article.content.push(`${article.title} — ${article.snippet}`);
    article.content.push(`This article is an autogenerated variant created from your search for "${query}". It provides a brief, informative take and some context.`);
    article.content.push(`Background: The domain ${article.domain} is a placeholder used for demonstration pages inside FExplorer.`);
    // Add an extra paragraph depending on keyword
    if ((query || '').toLowerCase().includes('cookie')) {
        article.content.push('Cookies are small pieces of data stored on your device to remember preferences and sessions.');
    } else if ((query || '').toLowerCase().includes('music')) {
        article.content.push('Music in FExplorer is persistent and can be toggled in settings.');
    } else {
        article.content.push('For more depth, try searching related terms or visit the Creator Hub to create content like this.');
    }

    searchGeneratedArticles[id] = article;
    return article;
}

// Render a generated search article page
function getSearchArticleHTML(articleId) {
    const article = searchGeneratedArticles[articleId];
    if (!article) return `
        <div class="home-page-content">
            <h1>Article not found</h1>
            <p>This article has expired or does not exist.</p>
            <button class="home-page-button" data-url="fexplorer:home">Return Home</button>
        </div>
    `;

    const dateStr = new Date(article.date).toLocaleString();
    let body = '';
    article.content.forEach(p => { body += `<p>${escapeHtml(p)}</p>`; });

    return `
        <div class="search-article-page home-page-content">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                <img src="icons/news-icon.png" alt="article" style="width:52px;height:52px;border-radius:8px;"> 
                <div>
                    <h1 style="margin:0">${escapeHtml(article.title)}</h1>
                    <div style="color:#666;font-size:0.9em">By ${escapeHtml(article.author)} • ${escapeHtml(dateStr)} • ${escapeHtml(article.domain)}</div>
                </div>
            </div>
            <hr style="border:none;height:1px;background:#eee;margin:12px 0;"> 
            <div class="article-body" style="line-height:1.6;color:#222;">
                ${body}
            </div>
            <div style="margin-top:18px;display:flex;gap:8px;">
                <button class="home-page-button" data-url="fexplorer:home">Home</button>
                <button class="home-page-button" data-url="javascript:history.back()">Back</button>
            </div>
        </div>
    `;
}

// Cookie
/* ──────────────────────────────────────────────
   FEXPLORER COOKIE SYSTEM (Real + Fun hybrid)
   - Stores cookies in localStorage under "fexplorerCookies"
   - Settings under "fexplorerCookieSettings"
   - Page: fexplorer:cookies
   - API: setCookie/getCookie/deleteCookie/listCookies/clearCookies
────────────────────────────────────────────────-*/

(function initFExplorerCookies() {

  // ---------- storage/load ----------
  function loadCookieJar() {
    try {
      return JSON.parse(localStorage.getItem('fexplorerCookies') || '{}');
    } catch (e) {
      console.warn('fexplorerCookies parse error, resetting', e);
      return {};
    }
  }
  function saveCookieJar(jar) {
    localStorage.setItem('fexplorerCookies', JSON.stringify(jar || {}));
  }

  function loadCookieSettings() {
    try {
      return JSON.parse(localStorage.getItem('fexplorerCookieSettings') || '{}');
    } catch (e) {
      return {};
    }
  }
  function saveCookieSettings(s) {
    localStorage.setItem('fexplorerCookieSettings', JSON.stringify(s || {}));
  }

  // defaults
  let COOKIE_JAR = loadCookieJar();
  let COOKIE_SETTINGS = Object.assign({
    allowCookies: true,        // 2A: allow/block cookies
    autoDeleteOnExit: false,   // option to clear cookies on exit
    specialCookies: true,      // 2F: websites can plant special cookies
    maxCookieAgeDays: 30
  }, loadCookieSettings());

  // ---------- helpers ----------
  function normalizeDomain(url) {
    if (!url) return 'unknown';
    // if starts with fexplorer: keep prefix for internal sites
    if (url.startsWith('fexplorer:')) return url;
    // remove protocol and path
    try {
      const u = url.includes('://') ? new URL(url) : new URL('http://' + url);
      return u.hostname.replace(/^www\./, '');
    } catch (e) {
      // fallback: take up to first slash
      return url.split('/')[0];
    }
  }

  function setCookie(domainRaw, key, value, opts = {}) {
    if (!COOKIE_SETTINGS.allowCookies) return false;
    const domain = normalizeDomain(domainRaw);
    if (!COOKIE_JAR[domain]) COOKIE_JAR[domain] = {};
    const expires = opts.expires || (Date.now() + (opts.maxAgeDays || COOKIE_SETTINGS.maxCookieAgeDays) * 24*60*60*1000);
    COOKIE_JAR[domain][key] = { value: value, expires: expires, created: Date.now() };
    saveCookieJar(COOKIE_JAR);
    return true;
  }

  function getCookie(domainRaw, key) {
    const domain = normalizeDomain(domainRaw);
    const domainObj = COOKIE_JAR[domain];
    if (!domainObj) return null;
    const c = domainObj[key];
    if (!c) return null;
    if (c.expires && Date.now() > c.expires) { // expired
      delete domainObj[key];
      saveCookieJar(COOKIE_JAR);
      return null;
    }
    return c.value;
  }

  function deleteCookie(domainRaw, key) {
    const domain = normalizeDomain(domainRaw);
    if (!COOKIE_JAR[domain]) return false;
    delete COOKIE_JAR[domain][key];
    // if no keys left, remove domain
    if (Object.keys(COOKIE_JAR[domain]).length === 0) delete COOKIE_JAR[domain];
    saveCookieJar(COOKIE_JAR);
    return true;
  }

  function listCookies() {
    return JSON.parse(JSON.stringify(COOKIE_JAR));
  }

  function clearCookies() {
    COOKIE_JAR = {};
    saveCookieJar(COOKIE_JAR);
  }

  // ---------- fun helpers: defaults that websites will use ----------
  // Called by navigate() when visiting a page (see integration example below)
  function siteVisit(domainOrUrl) {
    if (!COOKIE_SETTINGS.allowCookies) return;
    const domain = normalizeDomain(domainOrUrl);
    // track visits
    const prev = parseInt(getCookie(domain, 'visits') || '0', 10);
    setCookie(domain, 'visits', prev + 1);
    // maybe plant a 'mystery' special cookie
    if (COOKIE_SETTINGS.specialCookies) {
      // small chance for a golden cookie, or mystery cookie
      const r = Math.random();
      if (r < 0.025) { // 2.5% golden cookie
        setCookie(domain, 'golden_cookie', 'yes', { maxAgeDays: 7 });
        // award an achievement via your existing achievement system:
        if (typeof unlockAchievement === 'function') unlockAchievement('Found a Golden Cookie');
        // small FPoints if you have points system
        if (typeof userFPoints === 'number') {
          userFPoints += 50;
          saveAppState?.();
          showFPointsNotification?.(50);
        }
      } else if (r < 0.12) { // 9.5% mystery cookie
        setCookie(domain, 'mystery', Math.random().toString(36).slice(2), {});
      }
      // 3% chance to corrupt a random cookie (3F: cookie corruption)
      if (r > 0.97) {
        corruptRandomCookie(domain);
      }
    }
  }

  function corruptRandomCookie(domain) {
    const domainNorm = normalizeDomain(domain);
    const domainObj = COOKIE_JAR[domainNorm];
    if (!domainObj) return;
    const keys = Object.keys(domainObj);
    if (!keys.length) return;
    const pick = keys[Math.floor(Math.random()*keys.length)];
    let entry = domainObj[pick];
    if (!entry || !entry.value) return;
    // simple corruption: shuffle characters or set to '???'
    const v = String(entry.value);
    const corrupted = v.split('').sort(() => Math.random()-0.5).join('').slice(0, Math.max(1, Math.floor(v.length/2)));
    entry.value = corrupted;
    // mark corrupted flag
    entry.corrupted = true;
    saveCookieJar(COOKIE_JAR);
    // optional: show tiny toast if notifications allowed
    if (typeof showFPointsNotification === 'function') {
      // use it as a general notifier if available
      showFPointsNotification('Cookie corruption happened!', 0);
    }
    // trigger achievement
    if (typeof unlockAchievement === 'function') unlockAchievement('Cookie Tamper Detected');
  }

  // ---------- Cookie UI HTML generator ----------
  function getCookieManagerHTML() {
    return `
      <div class="browser-frame">
        <div class="app-header">
          <img src="icons/cookies-icon.png" class="app-logo">
          <span class="app-title">Cookies</span>
        </div>
        <div class="cookie-manager">
          <h2>Cookie Settings</h2>
          <label><input type="checkbox" id="cookieAllowToggle"> Allow cookies</label><br>
          <label><input type="checkbox" id="cookieAutoDelete"> Delete cookies on exit</label><br>
          <label><input type="checkbox" id="cookieSpecials"> Allow special/mystery cookies</label><br>
          <button id="clearAllCookiesBtn" class="home-page-button" style="margin-top:8px;">Clear all cookies</button>

          <hr>

          <h3>Stored Cookies</h3>
          <div id="cookieListContainer" style="max-height:300px;overflow:auto;border:1px solid #eee;padding:8px;border-radius:6px;"></div>
          <div id="cookieInspector" style="margin-top:10px;"></div>
        </div>
      </div>
    `;
  }

  // ---------- Cookie manager loader (binds UI) ----------
  function loadCookieManager(container) {
    try {
      // If called without container, assume browserContent current
      const root = (container && container.querySelector) ? container : browserContent;
      const cookieAllowToggle = root.querySelector('#cookieAllowToggle');
      const cookieAutoDelete = root.querySelector('#cookieAutoDelete');
      const cookieSpecials = root.querySelector('#cookieSpecials');
      const clearAllBtn = root.querySelector('#clearAllCookiesBtn');
      const cookieListContainer = root.querySelector('#cookieListContainer');
      const inspector = root.querySelector('#cookieInspector');

      // set from settings
      cookieAllowToggle.checked = COOKIE_SETTINGS.allowCookies;
      cookieAutoDelete.checked = COOKIE_SETTINGS.autoDeleteOnExit;
      cookieSpecials.checked = COOKIE_SETTINGS.specialCookies;

      function renderList() {
        const jar = listCookies();
        const domains = Object.keys(jar).sort();
        if (!cookieListContainer) return;
        if (domains.length === 0) {
          cookieListContainer.innerHTML = `<p>No cookies stored.</p>`;
          if (inspector) inspector.innerHTML = '';
          return;
        }
        cookieListContainer.innerHTML = domains.map(domain => {
          const keys = Object.keys(jar[domain] || {});
          return `
            <div style="border-bottom:1px solid #f0f0f0;padding:6px;margin-bottom:6px;">
              <b>${escapeHtml(domain)}</b> — ${keys.length} cookie(s)
              <div style="margin-top:6px;">
                ${keys.map(k => `<button class="inspectCookieBtn" data-domain="${encodeURIComponent(domain)}" data-key="${encodeURIComponent(k)}">${escapeHtml(k)}</button>`).join(' ')}
                <button class="deleteDomainCookies" data-domain="${encodeURIComponent(domain)}">Delete all</button>
              </div>
            </div>
          `;
        }).join('');
        // attach listeners
        cookieListContainer.querySelectorAll('.inspectCookieBtn').forEach(btn => {
          btn.addEventListener('click', () => {
            const domain = decodeURIComponent(btn.dataset.domain);
            const key = decodeURIComponent(btn.dataset.key);
            const val = getCookie(domain, key);
            inspector.innerHTML = `
              <h4>Inspect: ${escapeHtml(domain)} → ${escapeHtml(key)}</h4>
              <pre style="background:#f7f7f7;padding:8px;border-radius:6px;white-space:pre-wrap;">${escapeHtml(String(val))}</pre>
              <button id="deleteCookieBtn" class="home-page-button">Delete cookie</button>
            `;
            const deleteCookieBtn = inspector.querySelector('#deleteCookieBtn');
            deleteCookieBtn.addEventListener('click', () => {
              deleteCookie(domain, key);
              renderList();
              inspector.innerHTML = `<div>Cookie deleted.</div>`;
            });
          });
        });
        cookieListContainer.querySelectorAll('.deleteDomainCookies').forEach(btn => {
          btn.addEventListener('click', () => {
            const domain = decodeURIComponent(btn.dataset.domain);
            if (confirm(`Delete all cookies for ${domain}?`)) {
              const jar = listCookies();
              if (jar[domain]) {
                delete COOKIE_JAR[domain];
                saveCookieJar(COOKIE_JAR);
              }
              renderList();
            }
          });
        });
      }

      // toggles
      cookieAllowToggle.addEventListener('change', () => {
        COOKIE_SETTINGS.allowCookies = !!cookieAllowToggle.checked;
        saveCookieSettings(COOKIE_SETTINGS);
      });
      cookieAutoDelete.addEventListener('change', () => {
        COOKIE_SETTINGS.autoDeleteOnExit = !!cookieAutoDelete.checked;
        saveCookieSettings(COOKIE_SETTINGS);
      });
      cookieSpecials.addEventListener('change', () => {
        COOKIE_SETTINGS.specialCookies = !!cookieSpecials.checked;
        saveCookieSettings(COOKIE_SETTINGS);
      });

      clearAllBtn.addEventListener('click', () => {
        if (!confirm('Clear all cookies?')) return;
        clearCookies();
        renderList();
      });

      renderList();
    } catch (e) {
      console.error('loadCookieManager error', e);
    }
  }

  // ---------- Integration helpers to call from navigate() ----------
  // Call this when you visit a site to allow it to set cookies / track visits
  function handleSiteOnVisit(url) {
    // siteVisit will respect allowCookies setting
    siteVisit(url);

    // auto-create a 'lastVisited' cookie
    if (COOKIE_SETTINGS.allowCookies) {
      setCookie(url, 'lastVisited', new Date().toISOString());
    }
  }

  // make API global-ish so other code can call
  window.fexplorerCookies = {
    getCookie, setCookie, deleteCookie, listCookies, clearCookies,
    loadCookieManager, getCookieManagerHTML, handleSiteOnVisit,
    loadCookieSettings: () => JSON.parse(JSON.stringify(COOKIE_SETTINGS)),
    saveCookieSettings: (s) => { COOKIE_SETTINGS = Object.assign(COOKIE_SETTINGS, s); saveCookieSettings(COOKIE_SETTINGS); }
  };

  // auto-delete on exit if enabled
  window.addEventListener('beforeunload', () => {
    try {
      COOKIE_SETTINGS = loadCookieSettings();
      if (COOKIE_SETTINGS.autoDeleteOnExit) {
        clearCookies();
      }
    } catch (e) { /* ignore */ }
  });

  // ------- Example integration points (apply in navigate or route resolver) -------
  // 1) Call `fexplorerCookies.handleSiteOnVisit(sanitizedUrl)` inside your navigate() after you set currentUrl.
  // 2) When building your routes object, include:
  //    "fexplorer:cookies": () => { setTimeout(()=>window.fexplorerCookies.loadCookieManager(), 0); return window.fexplorerCookies.getCookieManagerHTML(); }
  //
  // 3) If you want Google/ping/other sites to plant cookies automatically, call handleSiteOnVisit there.
  //
  // Example (copy into your navigate right after `currentUrl = sanitizedUrl;`):
  //    if (typeof window.fexplorerCookies === 'object') window.fexplorerCookies.handleSiteOnVisit(sanitizedUrl);
  //
  // 4) You can also create UI buttons that call: setCookie('goog.com','consent','granted');
  //
})();
// end cookie system

// Bookmark
function saveBookmarks() {
    localStorage.setItem("fexplorerBookmarks", JSON.stringify(bookmarks));
}

// Small toast for bookmark feedback (requires a #bookmarkToast element)
function showBookmarkToast(msg) {
    let toast = document.getElementById("bookmarkToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "bookmarkToast";
        toast.style.cssText = "position:fixed;bottom:80px;right:20px;background:#333;color:#fff;padding:10px 14px;border-radius:6px;font-size:13px;opacity:0;transition:opacity .25s;z-index:99999;";
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = "1";
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => { toast.style.opacity = "0"; }, 1400);
}

// Toggle bookmark for currentUrl (used by Alt+B or UI)
function toggleBookmark() {
    if (!currentUrl) return;
    const idx = bookmarks.findIndex(b => b.url === currentUrl);
    const activeTab = typeof activeTabId !== "undefined" ? tabs.find(t => t.id === activeTabId) : null;
    const pageTitle = activeTab?.title || currentUrl;

    if (idx >= 0) {
        const removed = bookmarks.splice(idx, 1)[0];
        saveBookmarks();
        updateBookmarkStar();
        showBookmarkToast(`Removed bookmark: ${removed.title}`);
    } else {
        bookmarks.push({ title: pageTitle, url: currentUrl });
        saveBookmarks();
        updateBookmarkStar();
        showBookmarkToast(`Bookmarked: ${pageTitle}`);
    }
}

// Update the visual bookmark star (if you use a star button) — safe if element missing
function updateBookmarkStar() {
    const btn = document.getElementById("bookmarkBtn");
    if (!btn) return;
    const exists = bookmarks.some(b => b.url === currentUrl);
    btn.textContent = exists ? "★" : "☆";
    if (exists) btn.classList.add("bookmarked"); else btn.classList.remove("bookmarked");
}

// Keyboard shortcut Alt+B
document.addEventListener("keydown", (e) => {
    if (e.altKey && e.key.toLowerCase() === "b") {
        toggleBookmark();
        e.preventDefault();
    }
});

// ------------- Bookmark Manager page HTML -------------
function getBookmarkManagerHTML() {
    return `
        <div class="bookmark-page">
            <div class="app-header">
                <img src="icons/fexplorer.png" class="app-logo" alt="logo">
                <span class="app-title">Bookmarks</span>
                <a href="#" data-url="fexplorer:home" class="app-header-button">Home</a>
            </div>

            <h1 style="text-align:center;margin-top:18px;">Your Bookmarks</h1>

            <div id="bookmarkManagerContent" style="max-width:900px;margin:18px auto;"></div>
        </div>
    `;
}

// ------------- Loader + event wiring for manager -------------
function loadBookmarkManager() {
    const container = document.getElementById("bookmarkManagerContent");
    if (!container) return;

    if (bookmarks.length === 0) {
        container.innerHTML = `
            <p style="text-align:center;margin-top:20px;color:#666;">
                No bookmarks yet.<br>
                Press <b>Alt + B</b> on any page to bookmark it!
            </p>
        `;
        return;
    }

    container.innerHTML = bookmarks.map((bm, i) => `
        <div class="bookmark-item" data-index="${i}" style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-radius:8px;background:#f6f6f6;margin:8px 0;">
            <div style="max-width:70%;">
                <div style="font-weight:600;">${escapeHtml(bm.title)}</div>
                <div style="font-size:12px;color:#666;word-break:break-all;">${escapeHtml(bm.url)}</div>
            </div>
            <div style="display:flex;gap:6px;">
                <button class="bm-open" data-index="${i}" style="padding:6px 10px;border-radius:6px;border:none;cursor:pointer;background:#4CAF50;color:#fff;">Open</button>
                <button class="bm-rename" data-index="${i}" style="padding:6px 10px;border-radius:6px;border:none;cursor:pointer;background:#FF9800;color:#fff;">Rename</button>
                <button class="bm-delete" data-index="${i}" style="padding:6px 10px;border-radius:6px;border:none;cursor:pointer;background:#F44336;color:#fff;">Delete</button>
            </div>
        </div>
    `).join("");

    attachBookmarkManagerEvents();
}

function attachBookmarkManagerEvents() {
    const container = document.getElementById("bookmarkManagerContent");
    if (!container) return;

    // Open
    container.querySelectorAll(".bm-open").forEach(btn => {
        btn.addEventListener("click", () => {
            const bm = bookmarks[btn.dataset.index];
            if (!bm) return;
            navigate(bm.url);
        });
    });

    // Delete
    container.querySelectorAll(".bm-delete").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.index);
            if (isNaN(idx)) return;
            const removed = bookmarks.splice(idx, 1)[0];
            saveBookmarks();
            loadBookmarkManager();
            showBookmarkToast(`Removed "${removed.title}"`);
            updateBookmarkStar();
        });
    });

    // Rename
    container.querySelectorAll(".bm-rename").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.index);
            if (isNaN(idx)) return;
            const newTitle = prompt("Rename bookmark:", bookmarks[idx].title);
            if (!newTitle) return;
            bookmarks[idx].title = newTitle.trim();
            saveBookmarks();
            loadBookmarkManager();
            showBookmarkToast(`Renamed to "${bookmarks[idx].title}"`);
        });
    });
}

// If you have a bookmark button element in your UI, wire it to toggle and keep visual synced
const bookmarkBtn = document.getElementById("bookmarkBtn");
if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleBookmark();
    });
}

// Ensure star state is correct on initial load and when currentUrl changes you should call updateBookmarkStar()
// You can call updateBookmarkStar() right after you set currentUrl inside navigate()
updateBookmarkStar();

function parseFexplorerVariantUrl(raw) {
    let s = raw;
    if (s.startsWith("fexplorer:")) s = s.substring(11);

    const dash = s.indexOf("-");
    if (dash === -1) return null;

    const id = s.substring(0, dash);
    const rest = s.substring(dash + 1);

    const slash = rest.indexOf("/");
    if (slash === -1) return null;

    return {
        id,
        category: rest.substring(0, slash),
        variant: rest.substring(slash + 1)
    };
}

// Fun facts for home page
const FUN_FACTS = [
    "Enjoy your stay!",
    "You can create your own custom pages and share them with others!",
    "The shop has 14 unique items to collect and purchase!",
    "RE8uUkVNRU1CRVIuVE8uQlVZLk1ZLlRIRU1FLg==",
    "You can stock trade in the Financial section. Buy low, sell high!",
    "Cookies in the Cookie Clicker game give you free FPoints when earned!",
    "Achievement unlocks can reward you with special cosmetics!",
    "You can customize your browser's OS theme in Settings!",
    "Alpha 1.5 is also known as the Quality of Life update!",
    "Luck stat affects your FPoint earnings from Goog! searches.",
    "You can bookmark your favorite pages for quick access!",
    "The chat feature connects you with an AI that responds to keywords!",
    "Games include Tic Tac Toe, Cookie Clicker, and more!",
    "Different OS themes change the browser appearance!",
    "This browser is cool.",
    "Dark mode is available in the Settings for night browsing!",
    "IGHGHIGHEIFJOEBOENVOFEJPOFDOVFEHOGHDOIJIFOEIOBHOIJVOEIGHOE",
];

/**
 * Update the home page stats (FPoints, Cookies, Luck)
 */
function updateHomePageStats() {
    const fpointsEl = document.getElementById('homePageFPoints');
    const cookiesEl = document.getElementById('homePageCookies');
    const luckEl = document.getElementById('homePageLuck');

    if (fpointsEl) fpointsEl.textContent = userFPoints.toLocaleString();
    if (cookiesEl) cookiesEl.textContent = userCookies.toLocaleString();
    if (luckEl) {
        const luckValue = userLuck >= 0 ? `+${userLuck.toFixed(1)}` : userLuck.toFixed(1);
        luckEl.textContent = luckValue;
    }
}

/**
 * Display a random fun fact on the home page
 */
function updateHomeFunFact() {
    const funFactEl = document.getElementById('funFactText');
    if (funFactEl) {
        const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        funFactEl.textContent = randomFact;
    }
}

/**
 * Update financial page stats (FPoints, Luck, Stock, Price)
 */
function updateFinancialPageStats() {
    const fpointsEl = document.getElementById('currentFPoints');
    const luckEl = document.getElementById('currentLuck');
    const stockEl = document.getElementById('userOwnedStock');
    const priceEl = document.getElementById('stockPriceDisplay');

    if (fpointsEl) fpointsEl.textContent = userFPoints.toLocaleString();
    if (luckEl) luckEl.textContent = userLuck.toFixed(1) + 'x';
    if (stockEl) stockEl.textContent = userChannel.stockOwned;
    if (priceEl) priceEl.textContent = stockPrice.toFixed(2);
}

/**
 * Update cookies page display
 */
function updateCookiesPageDisplay() {
    const cookiesEl = document.getElementById('cookiesCounter');
    if (cookiesEl) {
        const cookiesValue = document.querySelector('.cookies-stat-value');
        if (cookiesValue) cookiesValue.textContent = userCookies.toLocaleString();
    }
}

// Visual cookie indicator (+cookie) and optional gentle auto-gain
function addCookieIndicator(amount = 1, opts = {}) {
    try {
        const now = Date.now();
        if (now - lastCookieGainTime < COOKIE_GAIN_COOLDOWN_MS) return; // throttle
        lastCookieGainTime = now;

        // add cookies (throttled)
        const gain = Number(amount) || 0;
        if (gain > 0) {
            userCookies = (userCookies || 0) + gain;
            saveAppState();
            updateCookiesPageDisplay();
        }

        const el = document.createElement('div');
        el.className = 'cookie-indicator';
        // Show as +[n] for clarity
        el.textContent = `+${gain}`;
        document.body.appendChild(el);
        // position near top-right, optionally near a target
        el.style.right = '20px';
        el.style.top = '80px';

        // Animate: fade up and remove
        el.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-28px)', opacity: 0 }
        ], { duration: 1200, easing: 'ease-out' });

        setTimeout(() => { try { el.remove(); } catch (e) {} }, 1300);
    } catch (e) {
        console.warn('addCookieIndicator error', e);
    }
}

// the big thing.
function navigate(urlToLoad, isBackNavigation = false, isForwardNavigation = false) {
    const sanitizedUrl = urlToLoad.toLowerCase().trim();

    // =========================
// RATE LIMIT CHECK (Error 429)
// =========================
const now = Date.now();

// Reset counter if too much time passed
if (now - lastRequestTime > RATE_LIMIT_INTERVAL) {
    requestCount = 0;
}
lastRequestTime = now;

requestCount++;

if (!isRateLimited && requestCount > RATE_LIMIT_MAX) {
    isRateLimited = true;
    localStorage.setItem("fexplorerRateLimitUntil", (now + rateLimitCooldown).toString());
    navigate("fexplorer:429", true); // force navigation, no rewards
    return;
}

// If already rate-limited
const storedLimit = parseInt(localStorage.getItem("fexplorerRateLimitUntil") || "0", 10);
if (isRateLimited && now < storedLimit) {
    navigate("fexplorer:429", true);
    return;
} else if (isRateLimited && now >= storedLimit) {
    // cooldown ended
    isRateLimited = false;
    requestCount = 0;
}

    /* =====================================================
       THEME EFFECTS
    ====================================================== */
    try {
        if (userChannel?.activeTheme === "jx1dx1_theme") {
            stopJx1dx1Annoyance?.();
            setTimeout(() => jx1dx1Annoyance?.(), 120);
        }

        if (userChannel?.activeTheme === "fexplorer_assistant") {
            stopfexplorerAssistant?.();
            setTimeout(() => fexplorerAssistant?.(), 120);
        }
    } catch (e) {
        console.warn("Theme handler error:", e);
    }

    /* =====================================================
       FPOINTS AWARD LOGIC
    ====================================================== */
    const shouldAwardFPoints =
        currentUrl &&
        currentUrl !== sanitizedUrl &&
        !isBackNavigation &&
        !sanitizedUrl.startsWith("fexplorer:shop?category=") &&
        !sanitizedUrl.startsWith("fexplorer:shop?q=") &&
        !sanitizedUrl.startsWith("goog.com/search?q=") &&
        !sanitizedUrl.startsWith("fexplorer:user-page-") &&
        !sanitizedUrl.startsWith("fexplorer:create") &&
        !sanitizedUrl.startsWith("fexplorer:create.hub") &&
        !sanitizedUrl.startsWith("fexplorer:preview");

    /* =====================================================
       HISTORY HANDLING
    ====================================================== */
    if (!isBackNavigation && !isForwardNavigation && currentUrl && currentUrl !== sanitizedUrl) {
        historyStack.push(currentUrl);
        forwardStack = []; // Clear forward stack on new navigation
    }

    currentUrl = sanitizedUrl;
    addressBar.value = sanitizedUrl;

    if (typeof window.fexplorerCookies === 'object') {
    try { window.fexplorerCookies.handleSiteOnVisit(sanitizedUrl); } catch (e) { console.warn(e); }
    }
    // Show loading message
    browserContent.innerHTML =
        `<div style="text-align:center;padding:20px;color:#555;">Loading...</div>`;

    // Fluctuate stock if visiting financial page
    if (sanitizedUrl === "fexplorer:financial") fluctuateStockPrice();


    /* =====================================================
       MAIN PAGE RESOLUTION START
    ====================================================== */
    setTimeout(() => {
        let contentHtml = getPageContentFromUrl(sanitizedUrl); //
        let pageFound = false;

        /* =====================================================
           1. RANDOM VARIANT PAGE
        ====================================================== */
        if (contentHtml === "__RANDOM_VARIANT_PAGE__") {
            try {
                // This function from randomUserVariants.js draws the page
                renderRandomUserPage(sanitizedUrl); //
                pageFound = true; 
            } catch (e) {
                console.error("Error rendering random page:", e);
                browserContent.innerHTML = "<h1>Error: Failed to load random page component.</h1>";
            }

            // Manually run the final UI updates
            attachDynamicEventListeners();
            updateBackButtonState();
            updateForwardButtonState();
            updateBookmarkStar(); 
            
            // Stop this function so it doesn't overwrite our content
            return; 
        }

        /* =====================================================
           2. CREATE PAGE / HUB (Handled by getPageContentFromUrl)
           These pages have special logic not in fakeContent
        ====================================================== */
        else if (sanitizedUrl === "fexplorer:create") {
            contentHtml = getCreatePageEditorHTML(); //
            pageFound = true;
        }

        else if (sanitizedUrl === "fexplorer:create.hub") {
            contentHtml = getFExplorerCreatorHubPageHTML(); //
            pageFound = true;
        }

        /* =====================================================
           3. USER-CREATED PAGE (CODE MODE)
           (Simple mode is handled by getPageContentFromUrl)
        ====================================================== */
        else if (sanitizedUrl.startsWith("fexplorer:user-page-")) {
            const pageId = sanitizedUrl.substring("fexplorer:user-page-".length);
            const pageData = userCreatedPages[pageId];

            if (pageData?.creationMode === "code") {
                // This is a special page that needs to inject scripts/styles
                contentHtml = `
                    <div class="user-created-code-page-layout">
                        <div class="app-header">
                            <img src="icons/fexplorer.png" class="app-logo">
                            <span class="app-title">${escapeHtml(pageData.title)}</span>
                            <a data-url="fexplorer:home" class="app-header-button">Home</a>
                            <a data-url="fexplorer:create.hub" class="app-header-button">Creator Hub</a>
                        </div>
                        <div id="userCodePageContent"></div>
                    </div>
                `;
                browserContent.innerHTML = contentHtml; // Write shell

                // Inject code
                setTimeout(() => {
                    const container = document.querySelector("#userCodePageContent");
                    if (!container) return;
                    container.innerHTML = pageData.htmlCode;

                    const style = document.createElement("style");
                    style.textContent = pageData.cssCode;
                    container.appendChild(style);

                    try {
                        const script = document.createElement("script");
                        script.textContent = pageData.jsCode;
                        script.type = "module";
                        container.appendChild(script);
                    } catch (e) {
                        console.error("Error executing user-page script:", e);
                    }
                }, 0);

                pageFound = true;
            } else if (pageData) {
                // Simple page was already loaded by getPageContentFromUrl
                pageFound = true;
            }
        }

        /* =====================================================
           4. PREVIEW PAGE (Special case)
        ====================================================== */
        else if (sanitizedUrl === "fexplorer:preview") {
            const previewData = JSON.parse(localStorage.getItem("fexplorerPreviewDraft"));
            if (!previewData) {
                contentHtml = "<h1>No preview found.</h1>";
            } else {
                // Logic for previewing (omitted for brevity, 
                // but this assumes you have this logic elsewhere)
                contentHtml = "<h1>Preview Page</h1>"; // Placeholder
            }
            pageFound = true;
        }

        /* =====================================================
           5. STATIC PAGES (fakeContent)
        ====================================================== */
        else if (fakeContent[sanitizedUrl]) { //
            // Handled by getPageContentFromUrl, contentHtml is already set
            pageFound = true;
        }

        /* =====================================================
           6. SEARCH / EXTERNAL SITES
        ====================================================== */
        else {
            contentHtml = handleExternalOrSearchPages(sanitizedUrl); //
            if (contentHtml) {
                pageFound = true;
            }
        }

        /* =====================================================
           7. 404 PAGE
        ====================================================== */
        if (!pageFound && !contentHtml) {
            contentHtml = `
                <div style="text-align:center;padding:20px;">
                    <h1>404 - Page Not Found</h1>
                    <p>The URL <b>${sanitizedUrl}</b> does not exist.</p>
                </div>
            `;
        }

        /* =====================================================
           8. WRITE TO DOM (Static pages only)
           (Code pages and Random pages already wrote to DOM)
        ====================================================== */
        const isCodePage = sanitizedUrl.startsWith("fexplorer:user-page-") &&
                           userCreatedPages[sanitizedUrl.replace("fexplorer:user-page-", "")]?.creationMode === "code";
        
        // If it's NOT a special page, write the static HTML
        if (!isCodePage) {
            browserContent.innerHTML = contentHtml;
        }

        /* =====================================================
           9. AWARD FPOINTS
        ====================================================== */
        if (pageFound && shouldAwardFPoints) {
            const earned = Math.round(5 * (userLuck || 1));
            userFPoints += earned;
            saveAppState();
            showFPointsNotification(earned);
        }

        /* =====================================================
           10. TRACK ACHIEVEMENT PROGRESS
        ====================================================== */
        // Track unique page visits
        if (pageFound && !isBackNavigation) {
            if (!achievementProgress['page_visits']) achievementProgress['page_visits'] = 0;
            achievementProgress['page_visits']++;
            saveAchievementProgress();
        }

        // Check for newly unlocked achievements
        checkAchievements();

        // Update home page specific UI if on home page
        if (sanitizedUrl === "fexplorer:home") {
            updateHomePageStats();
            updateHomeFunFact();
        }

        // Update financial page stats
        if (sanitizedUrl === "fexplorer:financial") {
            updateFinancialPageStats();
        }

        // Update cookies page display
        if (sanitizedUrl === "fexplorer:cookies") {
            updateCookiesPageDisplay();
        }

        // Run final updates
        attachDynamicEventListeners();
        updateBackButtonState();
        updateForwardButtonState();
        updateBookmarkStar();
        applyMusicSettings();
        // show cookie indicator on visit (throttled) — grant 1 cookie by default
        addCookieIndicator(1);

    }, 300); // End of setTimeout
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
        forwardStack.push(currentUrl); // <--- IMPORTANT
        const prevUrl = historyStack.pop();
        navigate(prevUrl, true, false); // isBackNavigation = true
    }
});

forwardButton.addEventListener('click', () => {
    if (forwardStack.length > 0) {
        historyStack.push(currentUrl); // <--- IMPORTANT
        const nextUrl = forwardStack.pop();
        navigate(nextUrl, false, true); // isBackNavigation = false
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
        } else if (currentUrl === 'fexplorer:settings') {
            alert('This page is safe. Go and change your settings if you want to!');
        } else {
            alert('This page is safe.');
        }
    } else if (informationStatus === 'Caution') {
        alert('This page is slightly dangerous. Be cautious when navigating through.');
    } else if (informationStatus === 'Dangerous') {
        alert('This page is dangerous. You should leave the page.');
    } else if (informationStatus === 'File') {
        if (currentUrl === 'file:terminal') {
            alert('This page is a file.');
        } else {
            alert('This page is a file.');
        };
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
        const cookieToggle = browserContent.querySelector('#cookieToggle');
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
        if (cookieToggle) cookieToggle.checked = localStorage.getItem('fexplorerCookiesDisabled') === 'true';

        // Music and related controls
        const musicToggle = browserContent.querySelector('#musicToggle') || browserContent.querySelector('#musicToggleSetting');
        const musicVolumeSetting = browserContent.querySelector('#musicVolumeSetting');
        const musicVolumeLabel = browserContent.querySelector('#musicVolumeLabel');
        const musicSelect = browserContent.querySelector('#musicSelect');
        const homepageSelect = browserContent.querySelector('#homepageSelect');
        const devModeToggle = browserContent.querySelector('#devModeToggle');

        if (musicToggle) musicToggle.checked = localStorage.getItem('fexplorerMusicEnabled') === 'true';
        if (musicVolumeSetting) {
            musicVolumeSetting.value = localStorage.getItem('fexplorerMusicVolume') || '0.6';
            if (musicVolumeLabel) musicVolumeLabel.textContent = Math.round(parseFloat(musicVolumeSetting.value) * 100) + '%';
            music.volume = parseFloat(musicVolumeSetting.value) || music.volume;
        }
        if (musicSelect) musicSelect.value = localStorage.getItem('fexplorerMusicChoice') || 'orbspire';
        if (homepageSelect) homepageSelect.value = localStorage.getItem('fexplorerSettingHomepage') || 'fexplorer:home';
        if (devModeToggle) devModeToggle.checked = localStorage.getItem('fexplorerDevMode') === 'true';

        // Ensure save/reset buttons are wired
        try { attachSettingsListeners(); } catch (e) { /* ignore */ }

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
                if (cookieToggle) {
                    localStorage.setItem('fexplorerCookiesDisabled', cookieToggle.checked ? 'true' : 'false');
                }
                if (settingsStatus) settingsStatus.textContent = 'Settings saved!';
                // Show notification if enabled
                if (notificationsToggle && notificationsToggle.checked) {
                    showSettingsNotification('Settings saved successfully!', 'success');
                }
                if (musicToggleSetting) localStorage.setItem('fexplorerMusicEnabled', musicToggleSetting.checked ? 'true' : 'false');
if (musicVolumeSetting) localStorage.setItem('fexplorerMusicVolume', musicVolumeSetting.value);
applyMusicSettings();

            } catch (e) {
                if (settingsStatus) settingsStatus.textContent = 'Error saving settings!';
                if (notificationsToggle && notificationsToggle.checked) {
                    showSettingsNotification('Error saving settings!', 'error');
                }
            }
        }

        // Wire save/reset buttons
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', saveSettings);
        }
        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', () => {
                resetSettings();
                setTimeout(() => applyFExplorerSettings(), 80);
            });
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

        // Developer Mode Tools
        const devToolsSection = browserContent.querySelector('#devToolsSection');
        const inspectElementBtn = browserContent.querySelector('#inspectElementBtn');
        const showConsoleBtn = browserContent.querySelector('#showConsoleBtn');
        const viewStorageBtn = browserContent.querySelector('#viewStorageBtn');
        const toggleGridBtn = browserContent.querySelector('#toggleGridBtn');
        const toggleMetricsBtn = browserContent.querySelector('#toggleMetricsBtn');
        const exportDataBtn = browserContent.querySelector('#exportDataBtn');
        const clearStorageBtn = browserContent.querySelector('#clearStorageBtn');

        // Toggle dev tools visibility
        if (devModeToggle) {
            devModeToggle.addEventListener('change', () => {
                localStorage.setItem('fexplorerDevMode', devModeToggle.checked ? 'true' : 'false');
                if (devToolsSection) {
                    devToolsSection.style.display = devModeToggle.checked ? 'block' : 'none';
                }
            });
            // Initialize visibility
            if (devToolsSection) {
                devToolsSection.style.display = devModeToggle.checked ? 'block' : 'none';
            }
        }

        // Inspect Element Tool
        if (inspectElementBtn) {
            let inspectMode = false;
            inspectElementBtn.addEventListener('click', () => {
                inspectMode = !inspectMode;
                inspectElementBtn.style.backgroundColor = inspectMode ? '#4CAF50' : '';
                inspectElementBtn.textContent = inspectMode ? '🔍 Inspect Element (Active)' : '🔍 Inspect Element (Click to enable)';
                
                if (inspectMode) {
                    // Add inspect overlay styles
                    if (!document.getElementById('inspectOverlayStyle')) {
                        const style = document.createElement('style');
                        style.id = 'inspectOverlayStyle';
                        style.textContent = `
                            .inspect-highlight {
                                outline: 2px solid #4CAF50 !important;
                                outline-offset: -1px !important;
                                background-color: rgba(76, 175, 80, 0.1) !important;
                            }
                            .inspect-info-box {
                                position: fixed;
                                background: rgba(0, 0, 0, 0.85);
                                color: #4CAF50;
                                padding: 10px 15px;
                                font-family: monospace;
                                font-size: 12px;
                                border: 1px solid #4CAF50;
                                border-radius: 4px;
                                z-index: 999999;
                                max-width: 400px;
                                pointer-events: none;
                            }
                        `;
                        document.head.appendChild(style);
                    }

                    // Enable element inspection
                    const handler = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const el = e.target;
                        document.querySelectorAll('.inspect-highlight').forEach(el => el.classList.remove('inspect-highlight'));
                        el.classList.add('inspect-highlight');

                        // Show element info
                        let infoBox = document.getElementById('inspectInfoBox');
                        if (!infoBox) {
                            infoBox = document.createElement('div');
                            infoBox.id = 'inspectInfoBox';
                            infoBox.className = 'inspect-info-box';
                            document.body.appendChild(infoBox);
                        }
                        const tagName = el.tagName.toLowerCase();
                        const id = el.id ? ` #${el.id}` : '';
                        const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';
                        const text = el.textContent.substring(0, 50).replace(/\n/g, ' ');
                        infoBox.innerHTML = `&lt;${tagName}${id}${classes}&gt;<br>Text: "${text}"<br>Size: ${el.offsetWidth}x${el.offsetHeight}px`;
                        infoBox.style.left = e.clientX + 10 + 'px';
                        infoBox.style.top = e.clientY + 10 + 'px';
                    };

                    document.addEventListener('mouseover', handler, true);
                    inspectElementBtn.dataset.handler = 'active';
                    inspectElementBtn.addEventListener('click', function turnOff() {
                        inspectMode = false;
                        document.removeEventListener('mouseover', handler, true);
                        document.querySelectorAll('.inspect-highlight').forEach(el => el.classList.remove('inspect-highlight'));
                        const infoBox = document.getElementById('inspectInfoBox');
                        if (infoBox) infoBox.remove();
                        inspectElementBtn.style.backgroundColor = '';
                        inspectElementBtn.textContent = '🔍 Inspect Element (Click to enable)';
                        inspectElementBtn.removeEventListener('click', turnOff);
                    });
                }
            });
        }

        // Show Console Logs
        if (showConsoleBtn) {
            showConsoleBtn.addEventListener('click', () => {
                let logPanel = document.getElementById('devConsolePanel');
                if (!logPanel) {
                    logPanel = document.createElement('div');
                    logPanel.id = 'devConsolePanel';
                    logPanel.style.cssText = `
                        position: fixed;
                        bottom: 10px;
                        right: 10px;
                        width: 400px;
                        height: 300px;
                        background: rgba(0, 0, 0, 0.95);
                        border: 1px solid #4CAF50;
                        border-radius: 4px;
                        color: #4CAF50;
                        font-family: monospace;
                        font-size: 12px;
                        padding: 10px;
                        overflow-y: auto;
                        z-index: 999998;
                    `;
                    logPanel.innerHTML = '<div style="font-weight: bold; margin-bottom: 5px;">Console Logs:</div>';
                    document.body.appendChild(logPanel);

                    // Capture console logs
                    const originalLog = console.log;
                    console.log = function(...args) {
                        originalLog.apply(console, args);
                        const logDiv = document.createElement('div');
                        logDiv.textContent = '> ' + args.join(' ');
                        logPanel.appendChild(logDiv);
                        logPanel.scrollTop = logPanel.scrollHeight;
                    };
                } else {
                    logPanel.style.display = logPanel.style.display === 'none' ? 'block' : 'none';
                }
            });
        }

        // View Storage
        if (viewStorageBtn) {
            viewStorageBtn.addEventListener('click', () => {
                let storagePanel = document.getElementById('devStoragePanel');
                if (!storagePanel) {
                    storagePanel = document.createElement('div');
                    storagePanel.id = 'devStoragePanel';
                    storagePanel.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 600px;
                        max-height: 400px;
                        background: rgba(0, 0, 0, 0.95);
                        border: 2px solid #4CAF50;
                        border-radius: 4px;
                        color: #4CAF50;
                        font-family: monospace;
                        font-size: 12px;
                        padding: 15px;
                        overflow-y: auto;
                        z-index: 999998;
                    `;
                    let content = '<div style="font-weight: bold; margin-bottom: 10px;">LocalStorage Contents:</div>';
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        const value = localStorage.getItem(key);
                        content += `<div style="margin-bottom: 5px;"><strong>${key}:</strong> ${value.substring(0, 100)}</div>`;
                    }
                    content += '<div style="margin-top: 10px;"><button onclick="this.parentElement.remove()" style="padding: 5px 10px; background: #4CAF50; color: black; border: none; cursor: pointer; border-radius: 3px;">Close</button></div>';
                    storagePanel.innerHTML = content;
                    document.body.appendChild(storagePanel);
                }
            });
        }

        // Toggle Grid Overlay
        if (toggleGridBtn) {
            toggleGridBtn.addEventListener('click', () => {
                let gridOverlay = document.getElementById('devGridOverlay');
                if (!gridOverlay) {
                    gridOverlay = document.createElement('div');
                    gridOverlay.id = 'devGridOverlay';
                    gridOverlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-image: 
                            linear-gradient(0deg, transparent 24%, rgba(76, 175, 80, 0.3) 25%, rgba(76, 175, 80, 0.3) 26%, transparent 27%, transparent 74%, rgba(76, 175, 80, 0.3) 75%, rgba(76, 175, 80, 0.3) 76%, transparent 77%, transparent),
                            linear-gradient(90deg, transparent 24%, rgba(76, 175, 80, 0.3) 25%, rgba(76, 175, 80, 0.3) 26%, transparent 27%, transparent 74%, rgba(76, 175, 80, 0.3) 75%, rgba(76, 175, 80, 0.3) 76%, transparent 77%, transparent);
                        background-size: 50px 50px;
                        z-index: 99999;
                        pointer-events: none;
                    `;
                    document.body.appendChild(gridOverlay);
                    toggleGridBtn.style.backgroundColor = '#4CAF50';
                } else {
                    gridOverlay.remove();
                    toggleGridBtn.style.backgroundColor = '';
                }
            });
        }

        // Toggle Performance Metrics
        if (toggleMetricsBtn) {
            toggleMetricsBtn.addEventListener('click', () => {
                let metricsPanel = document.getElementById('devMetricsPanel');
                if (!metricsPanel) {
                    metricsPanel = document.createElement('div');
                    metricsPanel.id = 'devMetricsPanel';
                    metricsPanel.style.cssText = `
                        position: fixed;
                        top: 10px;
                        left: 10px;
                        background: rgba(0, 0, 0, 0.85);
                        border: 1px solid #4CAF50;
                        border-radius: 4px;
                        color: #4CAF50;
                        font-family: monospace;
                        font-size: 12px;
                        padding: 10px;
                        z-index: 999998;
                    `;
                    document.body.appendChild(metricsPanel);

                    const updateMetrics = () => {
                        const mem = performance.memory;
                        const now = performance.now();
                        metricsPanel.innerHTML = `
                            <div>Memory: ${mem ? Math.round(mem.usedJSHeapSize / 1048576) + 'MB' : 'N/A'}</div>
                            <div>Time: ${Math.round(now)}ms</div>
                            <div>DOM Nodes: ${document.querySelectorAll('*').length}</div>
                        `;
                    };
                    updateMetrics();
                    metricsPanel.dataset.intervalId = setInterval(updateMetrics, 500);
                    toggleMetricsBtn.style.backgroundColor = '#4CAF50';
                } else {
                    clearInterval(metricsPanel.dataset.intervalId);
                    metricsPanel.remove();
                    toggleMetricsBtn.style.backgroundColor = '';
                }
            });
        }

        // Export Game Data
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => {
                const data = {
                    timestamp: new Date().toISOString(),
                    fpoints: localStorage.getItem('fexplorerFPoints'),
                    cookies: localStorage.getItem('fexplorerCookies'),
                    settings: {}
                };
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key.startsWith('fexplorer')) {
                        data.settings[key] = localStorage.getItem(key);
                    }
                }
                const json = JSON.stringify(data, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `fexplorer-export-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(url);
                showSettingsNotification('Game data exported!', 'success');
            });
        }

        // Clear Storage
        if (clearStorageBtn) {
            clearStorageBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear ALL storage? This cannot be undone!')) {
                    localStorage.clear();
                    showSettingsNotification('All storage cleared!', 'success');
                    setTimeout(() => location.reload(), 1500);
                }
            });
        }
    }