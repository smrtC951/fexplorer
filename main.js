const addressBar = document.getElementById('addressBar');
const goButton = document.getElementById('goButton');
const browserContent = document.getElementById('browserContent');
const backButton = document.getElementById('backButton');
const homeButton = document.getElementById('homeButton');
const fpointsCounter = document.getElementById('fpointsCounter');

const HOME_URL = 'fexplorer:home';
const GOOG_COOLDOWN = 10000;
const DAILY_BONUS_COOLDOWN = 5 * 60 * 1000;
const BASE_DAILY_BONUS = 70;
const STOCK_UPDATE_INTERVAL = 10 * 1000;
const INITIAL_STOCK_PRICE = 100;

let historyStack = [];
let currentUrl = '';

const uploadableVideosPool = [
];

const DEFAULT_MY_TUBE_VIDEOS_INITIAL = {
};

let myTubeVideos;
try {
    myTubeVideos = JSON.parse(localStorage.getItem('myTubeVideos')) || {};
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
userChannel.stockOwned = userChannel.stockOwned || 0;
userChannel.chatHistory = userChannel.chatHistory || {};

let userFPoints = parseInt(localStorage.getItem('userFPoints') || '0', 10);
let userLuck = parseFloat(localStorage.getItem('userLuck') || '1.0');
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
    { id: 'luck_boost_1', name: 'Minor Luck Charm', description: 'Slightly increases FPoint earnings from MyTube and Goog!', cost: 500, effect: { luck: 0.1 }, icon: 'fexplorer_logo.png' },
    { id: 'luck_boost_2', name: 'Major Luck Amulet', description: 'Significantly increases FPoint earnings from MyTube and Goog!', cost: 2000, effect: { luck: 0.3 }, icon: 'fexplorer_logo.png' },
    { id: 'mystery_box', name: 'Mystery Box', description: 'Contains a random cool simulated item!', cost: 1000, effect: { mystery: true }, icon: 'fexplorer_logo.png' },
    { id: 'golden_hat', name: 'Golden Browser Hat', description: 'A stylish cosmetic hat for your FExplorer browser icon.', cost: 5000, effect: { cosmetic: 'golden_hat' }, icon: 'fexplorer_logo.png' },
    { id: 'speed_boost', name: 'Simulated Speed Boost', description: 'Makes browsing feel snappier (purely cosmetic).', cost: 750, effect: { cosmetic: 'speed_boost' }, icon: 'fexplorer_logo.png' },
    { id: 'extra_storage', name: 'Cloud Storage (1TB)', description: 'Simulated cloud storage for your virtual files. (No actual storage)', cost: 1500, effect: { cosmetic: 'storage' }, icon: 'fexplorer_logo.png' },
];

const randomWebsiteUrls = [
    'example.com',
    'goog.com',
    'fexplorer:financial',
    'fexplorer:shop',
    'fexplorer:updates',
    'fexplorer:create.hub' // Add the new hub to random URLs
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

async function generateAIInstantGramsCommentOrLike(postId, isUserPost) {
    const post = instantgramsPosts.find(p => p.id === postId);
    if (!post) return;

    const action = Math.random() < 0.7 ? 'like' : 'comment'; // More likely to like

    if (action === 'like') {
        post.likes = (post.likes || 0) + 1;
        saveAppState();
        if (currentUrl === 'instantgrams.com') {
             navigate('instantgrams.com'); // Re-render to show updated likes
        }
    } else {
        // AI comments are not implemented yet for InstantGrams
        // For now, let's just make them like or perhaps generate another AI post instead
        generateAIInstantGramsPost(); // Instead of commenting, another AI might post
    }
}

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
        <div class="create-page-layout">
            <div class="app-header">
                <img src="fexplorer_logo.png" alt="FExplorer Logo" class="app-logo">
                <span class="app-title">FExplorer Page Creator</span>
                <a href="#" data-url="fexplorer:home" class="app-header-button">Back to Home</a>
                <a href="#" data-url="fexplorer:create.hub" class="app-header-button">My Pages Hub</a>
            </div>
            <div class="create-page-main-content">
                <div class="create-page-form">
                    <h2>Create Your Own Page</h2>
                    <p class="form-description">Design a simple page with text and interactive buttons, or dive into code!</p>

                    <div class="create-page-mode-selector">
                        <label><input type="radio" name="creationMode" value="simple" ${draftPage.creationMode === 'simple' ? 'checked' : ''}> Simple Editor</label>
                        <label><input type="radio" name="creationMode" value="code" ${draftPage.creationMode === 'code' ? 'checked' : ''}> Code Editor</label>
                    </div>

                    <div id="simpleEditorSection" class="simple-editor-section" style="display: ${draftPage.creationMode === 'simple' ? 'block' : 'none'};">
                        <div class="form-section">
                            <h3>Page Details</h3>
                            <label for="pageTitleInput">Page Title:</label>
                            <input type="text" id="pageTitleInput" placeholder="My Awesome Page" value="${escapeHtml(draftPage.title)}" maxlength="50">
                            <label for="pageContentInput">Page Content (HTML/Text):</label>
                            <textarea id="pageContentInput" placeholder="Write your page content here. Basic HTML is supported (e.g., &lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;, &lt;img src='path/to/image.png'&gt;)." rows="8">${escapeHtml(draftPage.simpleContent)}</textarea>
                        </div>

                        <div class="form-section">
                            <h3>Add Buttons (Optional)</h3>
                            <label for="buttonTextInput">Button Text:</label>
                            <input type="text" id="buttonTextInput" placeholder="Click Me!" maxlength="30">
                            <label for="buttonUrlInput">Button URL (e.g., example.com, fexplorer:shop, fexplorer:user-page-yourid):</label>
                            <input type="text" id="buttonUrlInput" placeholder="example.com">
                            <button id="addPageButton" class="mytube-button">Add Button to Page</button>
                        </div>

                        <div class="form-section">
                            <h3>Added Buttons:</h3>
                            <div id="pageButtonsPreview">${simpleButtonsHtml}</div>
                            <p id="noButtonsMessage" style="${draftPage.simpleButtons.length > 0 ? 'display:none;' : ''}color:#888;">No buttons added yet.</p>
                        </div>
                    </div>

                    <div id="codeEditorSection" class="code-editor-section" style="display: ${draftPage.creationMode === 'code' ? 'block' : 'none'};">
                        <div class="form-section">
                            <h3>HTML Code</h3>
                            <textarea id="htmlCodeInput" class="code-editor-textarea" rows="15" spellcheck="false">${escapeHtml(draftPage.htmlCode)}</textarea>
                        </div>
                        <div class="form-section">
                            <h3>CSS Code (Optional)</h3>
                            <textarea id="cssCodeInput" class="code-editor-textarea" rows="10" spellcheck="false">${escapeHtml(draftPage.cssCode)}</textarea>
                        </div>
                        <div class="form-section">
                            <h3>JavaScript Code (Optional)</h3>
                            <textarea id="jsCodeInput" class="code-editor-textarea" rows="10" spellcheck="false">${escapeHtml(draftPage.jsCode)}</textarea>
                        </div>
                        <p class="code-note">
                            Note: For JS in preview, alert() calls will be intercepted.
                            Images can be linked with paths like 'mytube_logo.png'.
                        </p>
                    </div>

                    <div class="create-page-actions">
                        <button id="previewUserPage" class="mytube-button" style="background-color: #007bff;">Preview Page</button>
                        <button id="publishUserPage" class="mytube-button">Publish Page</button>
                    </div>
                    <div id="pageStatusMessage" class="status-message" style="margin-top: 10px;"></div>
                </div>
            </div>
            <p class="footer-note" style="text-align: center; margin: 20px;">Your page will be saved locally. Not accessible by others.</p>
        </div>
    `;
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
                <img src="fexplorer_logo.png" alt="FExplorer Logo" class="app-logo">
                <span class="app-title">FExplorer Creator Hub</span>
                <a href="#" data-url="fexplorer:home" class="app-header-button">Back to Home</a>
                <a href="#" data-url="fexplorer:create" class="app-header-button">Create New Page</a>
            </div>
            <div class="create-hub-main-content">
                <h1>Your Published Pages</h1>
                <p class="tagline">Manage and share your custom creations. Click on a page to view it!</p>
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
                    <img src="fexplorer_logo.png" alt="FExplorer Logo" class="app-logo">
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
                <p class="footer-note" style="text-align: center; margin: 20px;">This is a user-created simulated page.</p>
            </div>
        `;
    } else if (pageData.creationMode === 'code') {
         // The actual content injection for code pages happens in navigate function
        return `
            <div class="user-created-code-page-layout">
                <div class="app-header">
                    <img src="fexplorer_logo.png" alt="FExplorer Logo" class="app-logo">
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
    'example.com': `
        <h1>Example Domain</h1>
        <p>This domain is for use in illustrative examples in documents. You may use this
        domain in examples without prior coordination or asking for permission.</p>
        <p><a href="#" data-url="https://www.iana.org/domains/example">More information...</a></p>
        <hr>
        <p>This is a page for <strong>example.com</strong>.</p>
    `,
    'about:blank': `
    `,
    'fexplorer:home': `
        <div class="home-page-content">
            <img src="fexplorer.png" alt="FExplorer Logo" class="app-logo">
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
                    <button id="randomWebsiteButton" class="home-page-button">Random Website</button>
                    <button class="home-page-button" data-url="fexplorer:updates">Updates</button>
                </div>
            </div>
            <p class="footer-note">Made by smrtC951!</p>
        </div>
    `,
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
                        <a href="#" data-url="unknown.site">Unknown Site</a>
                        <p class="link-description">Haha funny 404 error</p>
                    </li>
                </ul>
            </div>
            <p class="footer-note">Back to <a href="#" data-url="fexplorer:home">FExplorer Home</a></p>
        </div>
    `,
    'fexplorer:financial': `
        <div class="home-page-content">
            <img src="fexplorer_logo.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Financials</h1>
            <p class="tagline">Manage your FPoints and explore simulated investments.</p>
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
                <h2>Simulated WebTech Stock</h2>
                <p style="font-size: 1.1em;">Current Price: <span id="stockPriceDisplay" style="font-weight: bold; color: #007bff;">${stockPrice.toFixed(2)}</span> FPoints per share</p>
                <p style="font-size: 0.9em;">Shares Owned: <span id="userOwnedStock" style="font-weight: bold;">${userChannel.stockOwned}</span></p>

                <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 150px;">
                        <input type="number" id="stockBuyInput" class="mytube-input" placeholder="Quantity to Buy" min="1" value="1" style="width: calc(100% - 20px); margin-bottom: 5px;">
                        <button id="buyStockButton" class="mytube-button" style="background-color: #28a745; width: 100%;">Buy Stock</button>
                    </div>
                    <div style="flex: 1; min-width: 150px;">
                        <input type="number" id="stockSellInput" class="mytube-input" placeholder="Quantity to Sell" min="1" value="1" style="width: calc(100% - 20px); margin-bottom: 5px;">
                        <button id="sellStockButton" class="mytube-button" style="background-color: #dc3545; width: 100%;">Sell Stock</button>
                    </div>
                </div>
                <p style="font-size: 0.8em; color: #666; margin-top: 15px;">Stock price fluctuates over time. Buy low, sell high!</p>
            </div>

            <div class="quick-links-section" style="margin-top: 30px;">
                <h2>Explore FPoint Opportunities</h2>
                <div class="home-page-buttons-container">
                    <button class="home-page-button" data-url="fexplorer:shop">Visit the FPoints Shop</button>
                    <button class="home-page-button" data-url="fexplorer:home">Back to Home</button>
                </div>
            </div>
            <p class="footer-note">Made by smrtC951!</p>
        </div>
    `,
    'fexplorer:shop': `
        <div class="shop-page-layout">
            <div class="app-header">
                <img src="fexplorer_logo.png" alt="FExplorer Logo" class="app-logo">
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
    'fexplorer:updates': `
        <div class="updates-page-content">
            <img src="fexplorer.png" alt="FExplorer Logo" class="app-logo">
            <h1>FExplorer Updates</h1>
            <p class="tagline">Stay informed about the latest features and upcoming changes!</p>
			<h2>Update Name: Demo 1.1</h2>

            <div class="updates-section">
                <h2>Current Updates</h2>
                <ul>
                    <li>Removed a ton of other sites, because I'm revamping them!</li>
					<li></li>
                </ul>
            </div>

            <div class="updates-section">
                <h2>Upcoming Updates</h2>
                <ul>
                    <li>A new search engine and some easter eggs soon</li>
                    <li>New features such as Cookies and a FPoints rework!</li>
                    <li>New sites are on the way for you!</li>
					<li>Creator Hub rework soon!</li>
                </ul>
            </div>

            <div class="home-page-buttons-container">
                <button class="home-page-button" data-url="fexplorer:home">Home</button>
                <button class="home-page-button" data-url="fexplorer:quick-links">Quick Links</button>
            </div>
            <p class="footer-note" style="margin-top: 20px;">Made by smrtC951!</p>
        </div>
    `,
};

function updateBackButtonState() {
    backButton.disabled = historyStack.length === 0;
}

function attachDynamicEventListeners() {
    browserContent.querySelectorAll('.quick-links a[data-url], .search-results-page a[data-url], .mytube-sidebar a[data-url], .mytube-video-item a[data-url], .mytube-suggested-item a[data-url], .shop-sidebar a[data-url], .headbook-sidebar a[data-url], .user-page-buttons button[data-url], .hub-item-card a[data-url], .hub-item-card button[data-url]').forEach(link => {
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

    const randomWebsiteButton = browserContent.querySelector('#randomWebsiteButton');
    if (randomWebsiteButton) {
        randomWebsiteButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * randomWebsiteUrls.length);
            const randomUrl = randomWebsiteUrls[randomIndex];
            navigate(randomUrl);
        });
    }

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

    if (currentUrl.startsWith('mytube.com')) {
        const mytubeSearchInput = browserContent.querySelector('#mytubeSearchInput');
        const mytubeSearchButton = browserContent.querySelector('#mytubeSearchButton');

        if (mytubeSearchInput && mytubeSearchButton) {
            const performMyTubeSearch = () => {
                const query = mytubeSearchInput.value.trim();
                if (query) {
                    navigate(`mytube.com/search?q=${encodeURIComponent(query)}`);
                }
            };

            mytubeSearchButton.addEventListener('click', performMyTubeSearch);
            mytubeSearchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    performMyTubeSearch();
                }
            });
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
                            const mysteryItems = ['A shiny badge!', 'A rare emoji pack!', 'A temporary speed boost!', 'A silly sound effect!'];
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

    if (currentUrl === 'headbook.com') {
        const addHeadbookPostButton = browserContent.querySelector('#addHeadbookPostButton');
        if (addHeadbookPostButton) {
            addHeadbookPostButton.addEventListener('click', handleAddHeadbookPost);
        }

        browserContent.querySelectorAll('.headbook-post .comment-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const postElement = event.target.closest('.headbook-post');
                const addCommentArea = postElement.querySelector('.add-comment-area');
                if (addCommentArea) {
                    addCommentArea.style.display = addCommentArea.style.display === 'none' ? 'flex' : 'none';
                    if (addCommentArea.style.display === 'flex') {
                        addCommentArea.querySelector('.comment-input').focus();
                    }
                }
            });
        });

        browserContent.querySelectorAll('.headbook-post .submit-reply-button').forEach(button => {
            button.addEventListener('click', handleAddHeadbookComment);
        });

        browserContent.querySelectorAll('.headbook-post .comment-input').forEach(input => {
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleAddHeadbookComment({ target: event.target.nextElementSibling });
                }
            });
        });

        browserContent.querySelectorAll('.headbook-post button[data-action="like-post"]').forEach(button => {
            button.addEventListener('click', (event) => {
                const postId = event.target.dataset.postId;
                const post = headbookPosts.find(p => p.id === postId);
                if (post) {
                    post.likes = (post.likes || 0) + 1;
                    userFPoints += Math.round(FPOINTS_PER_LIKE * userLuck);
                    showFPointsNotification(Math.round(FPOINTS_PER_LIKE * userLuck));
                    saveAppState();

                    const likeCountSpan = button.querySelector('.like-count');
                    if (likeCountSpan) {
                        likeCountSpan.textContent = post.likes;
                    }

                    const originalText = button.innerHTML;
                    button.innerHTML = `Liked! (${post.likes})`;
                    button.classList.add('liked');

                    setTimeout(() => {
                        if (button && likeCountSpan) {
                             button.innerHTML = originalText;
                             button.classList.remove('liked');
                        }
                    }, 1500);
                }
            });
        });

        browserContent.querySelectorAll('.headbook-post .share-button').forEach(button => {
            button.addEventListener('click', (event) => {
                if (!button.classList.contains('shared')) {
                    const initialText = button.textContent;
                    button.textContent = 'Shared!';
                    button.classList.add('shared');
                    button.style.backgroundColor = '#17a2b8';
                    button.style.color = 'white';
                    setTimeout(() => {
                        button.textContent = initialText;
                        button.classList.remove('shared');
                        button.style.backgroundColor = '';
                        button.style.color = '';
                    }, 2000);
                }
            });
        });
    }

    if (currentUrl.startsWith('headbook.com/messages')) {
        browserContent.querySelectorAll('.chat-contact-item').forEach(item => {
            item.addEventListener('click', (event) => {
                const contactName = event.currentTarget.dataset.contactName;
                if (contactName) {
                    navigate(`headbook.com/messages?contact=${encodeURIComponent(contactName)}`);
                }
            });
        });

        const chatInput = browserContent.querySelector('#chatInput');
        const chatSendButton = browserContent.querySelector('#chatSendButton');

        if (chatInput && chatSendButton) {
            const contactName = chatSendButton.dataset.contactName;

            chatSendButton.addEventListener('click', () => {
                handleSendMessage(contactName, chatInput);
            });

            chatInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleSendMessage(contactName, chatInput);
                }
            });
            scrollChatToBottom();
        }
    }

    if (currentUrl === 'instantgrams.com') {
        const addInstantgramsPostButton = browserContent.querySelector('#addInstantgramsPostButton');
        if (addInstantgramsPostButton) {
            addInstantgramsPostButton.addEventListener('click', handleAddInstantGramsPost);
        }

        browserContent.querySelectorAll('.instantgrams-post-card button[data-action="like-instantgrams-post"]').forEach(button => {
            button.addEventListener('click', handleLikeInstantGramsPost);
        });

        const instantgramsSearchInput = browserContent.querySelector('#instantgramsSearchInput');
        const instantgramsSearchButton = browserContent.querySelector('#instantgramsSearchButton');
        if (instantgramsSearchInput && instantgramsSearchButton) {
             instantgramsSearchButton.addEventListener('click', () => {
                alert('Simulated search function. No actual search implemented yet!');
                instantgramsSearchInput.value = '';
            });
            instantgramsSearchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    alert('Simulated search function. No actual search implemented yet!');
                    instantgramsSearchInput.value = '';
                }
            });
        }
    }

    // Add event listener for the new create page button
    const createPageButton = document.getElementById('createPageButton');
    if (createPageButton) {
        createPageButton.addEventListener('click', () => {
            navigate('fexplorer:create');
        });
    }

    // Handle actions specific to fexplorer:create page
    if (currentUrl === 'fexplorer:create') {
        initializeDraftPage(); // Ensure draftPage is ready when editor is loaded

        const modeRadios = browserContent.querySelectorAll('input[name="creationMode"]');
        const simpleEditorSection = browserContent.querySelector('#simpleEditorSection');
        const codeEditorSection = browserContent.querySelector('#codeEditorSection');

        const pageTitleInput = browserContent.querySelector('#pageTitleInput');
        const pageContentInput = browserContent.querySelector('#pageContentInput'); // Simple mode content
        const buttonTextInput = browserContent.querySelector('#buttonTextInput');
        const buttonUrlInput = browserContent.querySelector('#buttonUrlInput');
        const addPageButton = browserContent.querySelector('#addPageButton');
        const pageButtonsPreview = browserContent.querySelector('#pageButtonsPreview');
        const noButtonsMessage = browserContent.querySelector('#noButtonsMessage');

        const htmlCodeInput = browserContent.querySelector('#htmlCodeInput');
        const cssCodeInput = browserContent.querySelector('#cssCodeInput');
        const jsCodeInput = browserContent.querySelector('#jsCodeInput');

        const previewUserPageButton = browserContent.querySelector('#previewUserPage');
        const publishUserPageButton = browserContent.querySelector('#publishUserPage');
        const pageStatusMessage = browserContent.querySelector('#pageStatusMessage');

        const updateDraftPage = () => {
            draftPage.title = pageTitleInput.value;
            draftPage.simpleContent = pageContentInput.value;
            draftPage.htmlCode = htmlCodeInput.value;
            draftPage.cssCode = cssCodeInput.value;
            draftPage.jsCode = jsCodeInput.value;
            saveDraftPage();
        };

        // Event listeners for inputs in both modes
        pageTitleInput.addEventListener('input', updateDraftPage);
        pageContentInput.addEventListener('input', updateDraftPage);
        htmlCodeInput.addEventListener('input', updateDraftPage);
        cssCodeInput.addEventListener('input', updateDraftPage);
        jsCodeInput.addEventListener('input', updateDraftPage);

        modeRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                draftPage.creationMode = event.target.value;
                if (draftPage.creationMode === 'simple') {
                    simpleEditorSection.style.display = 'block';
                    codeEditorSection.style.display = 'none';
                } else {
                    simpleEditorSection.style.display = 'none';
                    codeEditorSection.style.display = 'block';
                }
                saveDraftPage();
            });
        });

        const renderButtonsPreview = () => {
            pageButtonsPreview.innerHTML = draftPage.simpleButtons.map((btn, index) => `
                <div class="created-button-preview">
                    <span>Text: "${escapeHtml(btn.text)}" | URL: "${escapeHtml(btn.url)}"</span>
                    <button class="remove-button" data-index="${index}">X</button>
                </div>
            `).join('');
            noButtonsMessage.style.display = draftPage.simpleButtons.length > 0 ? 'none' : 'block';

            browserContent.querySelectorAll('.remove-button').forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const indexToRemove = parseInt(event.target.dataset.index, 10);
                    draftPage.simpleButtons.splice(indexToRemove, 1);
                    updateDraftPage();
                    renderButtonsPreview();
                });
            });
        };
        renderButtonsPreview(); // Initial render of buttons

        if (addPageButton) {
            addPageButton.addEventListener('click', () => {
                const buttonText = buttonTextInput.value.trim();
                const buttonUrl = buttonUrlInput.value.trim();

                if (!buttonText || !buttonUrl) {
                    pageStatusMessage.textContent = 'Button text and URL cannot be empty.';
                    pageStatusMessage.style.color = '#e74c3c';
                    return;
                }

                draftPage.simpleButtons.push({ text: buttonText, url: buttonUrl });
                updateDraftPage();
                renderButtonsPreview();
                buttonTextInput.value = '';
                buttonUrlInput.value = '';
                pageStatusMessage.textContent = 'Button added!';
                pageStatusMessage.style.color = '#28a745';
            });
        }

        if (previewUserPageButton) {
            previewUserPageButton.addEventListener('click', () => {
                if (!pageTitleInput.value.trim() && draftPage.creationMode === 'simple') {
                    pageStatusMessage.textContent = 'Please enter a page title before previewing.';
                    pageStatusMessage.style.color = '#e74c3c';
                    return;
                }
                if (!htmlCodeInput.value.trim() && draftPage.creationMode === 'code') {
                    pageStatusMessage.textContent = 'Please enter HTML code before previewing.';
                    pageStatusMessage.style.color = '#e74c3c';
                    return;
                }

                // Save draft data to localStorage for retrieval by the preview page
                localStorage.setItem('fexplorerPreviewDraft', JSON.stringify(draftPage));
                navigate('fexplorer:preview');
            });
        }

        if (publishUserPageButton) {
            publishUserPageButton.addEventListener('click', () => {
                const title = pageTitleInput.value.trim(); // Title is used for both modes

                if (!title) {
                    pageStatusMessage.textContent = 'Page title is required to publish.';
                    pageStatusMessage.style.color = '#e74c3c';
                    return;
                }

                if (draftPage.creationMode === 'code' && !htmlCodeInput.value.trim()) {
                    pageStatusMessage.textContent = 'HTML code is required to publish a code page.';
                    pageStatusMessage.style.color = '#e74c3c';
                    return;
                }

                pageStatusMessage.textContent = 'Publishing page...';
                pageStatusMessage.style.color = '#666';
                publishUserPageButton.disabled = true;

                const newPageId = `user_page_${Date.now()}`;
                let baseFPoints = 0;

                if (draftPage.creationMode === 'simple') {
                    userCreatedPages[newPageId] = {
                        title: title,
                        creationMode: 'simple',
                        content: draftPage.simpleContent,
                        buttons: draftPage.simpleButtons
                    };
                    baseFPoints = 100 + (draftPage.simpleButtons.length * 10);
                } else if (draftPage.creationMode === 'code') {
                    userCreatedPages[newPageId] = {
                        title: title,
                        creationMode: 'code',
                        htmlCode: draftPage.htmlCode,
                        cssCode: draftPage.cssCode,
                        jsCode: draftPage.jsCode
                    };
                    baseFPoints = 250; // Higher fixed FPoints for code pages
                }

                const newPageUrl = `fexplorer:user-page-${newPageId}`;
                if (!randomWebsiteUrls.includes(newPageUrl)) {
                    randomWebsiteUrls.push(newPageUrl);
                }

                // Award FPoints for publishing a page
                const earnedFPoints = Math.round(baseFPoints * userLuck);
                userFPoints += earnedFPoints;

                // Clear draft page after publishing
                initializeDraftPage(); // Reset draftPage to empty state
                saveAppState(); // Save everything

                alert(`Your page "${title}" has been published! You earned ${earnedFPoints} FPoints! You can visit it at fexplorer:user-page-${newPageId}`);
                navigate(newPageUrl);
            });
        }
    } else if (currentUrl.startsWith('fexplorer:user-page-')) {
        // This block handles visiting a user-created page
        // No specific event listeners needed here beyond the generic attachDynamicEventListeners
        // which already handles `data-url` buttons.
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

        if (sanitizedUrl === 'mytube.com') {
            contentHtml = getMyTubeHomePageHTML();
            pageFound = true;
        } else if (sanitizedUrl.startsWith('mytube.com/watch?v=')) {
            const videoId = sanitizedUrl.split('v=')[1];
            contentHtml = getMyTubeWatchPageHTML(videoId);
            pageFound = true;
        } else if (sanitizedUrl === 'mytube.com/create-channel') {
            contentHtml = getMyTubeCreateChannelPageHTML();
            pageFound = true;
        } else if (sanitizedUrl === 'mytube.com/my-channel') {
            contentHtml = getMyTubeMyChannelPageHTML();
            pageFound = true;
        } else if (sanitizedUrl === 'headbook.com') {
            contentHtml = getHeadbookPageHTML();
            pageFound = true;
            scheduleNextAIHeadbookPost(); // Start scheduling AI posts
        } else if (sanitizedUrl.startsWith('headbook.com/messages')) {
            const urlObj = new URL(`http://${sanitizedUrl}`);
            const contactParam = urlObj.searchParams.get('contact');
            contentHtml = getHeadbookMessagesPageHTML(contactParam);
            pageFound = true;
        } else if (sanitizedUrl === 'instantgrams.com') {
            contentHtml = getInstantGramsPageHTML();
            pageFound = true;
            generateAIInstantGramsPost(); // Attempt to generate a new AI post when visiting Instant Grams
        } else if (sanitizedUrl === 'fexplorer:create') { // New case for create page
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
                            <img src="fexplorer_logo.png" alt="FExplorer Logo" class="app-logo">
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
                            <img src="fexplorer_logo.png" alt="FExplorer Logo" class="app-logo">
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
                };

                const matchedResult = searchResultsMap[lowerQuery] || Object.values(searchResultsMap).find(item => lowerQuery.includes(item.url.split('.')[0]));

                if (matchedResult) {
                    searchResultContent = `
                        <div class="search-result-item">
                            <h3><a href="#" data-url="${matchedResult.url}">${matchedResult.title} - ${matchedResult.url}</a></h3>
                            <p>This is a simulated search result for ${matchedResult.url}. Click to visit.</p>
                        </div>
                    `;
                } else {
                    searchResultContent = `<p>Here are some simulated results for your search query, "${query}":</p>`;
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
                            `The history and future of ${query}`
                        ];
                        const fakeTitle = fakeTitleOptions[Math.floor(Math.random() * fakeTitleOptions.length)];
                        const fakeDescription = `Dive deep into the fascinating aspects of ${query}. Find comprehensive information and expert opinions on ${query.toLowerCase()}. This is a simulated link.`;

                        searchResultContent += `
                            <div class="search-result-item">
                                <h3><a href="#" data-url="${fakeUrl}">${fakeTitle}</a></h3>
                                <p style="color: #006621; font-size: 0.85em; margin-bottom: 2px; overflow-wrap: break-word;">${fakeUrl}</p>
                                <p>${fakeDescription}</p>
                            </div>
                        `;
                    }
                    searchResultContent += `<p style="margin-top: 20px;">(All search results are simulated and do not lead to real external websites.)</p>`;
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
                    <p>This is a fake browser, so only pre-defined URLs work.</p>
                    <p>Try <code>example.com</code>, <code>about:blank</code>, <code>fexplorer:home</code>, <code>fexplorer:quick-links</code>, <code>goog.com</code>, <code>headbook.com</code>, <code>instantgrams.com</code>, <code>mytube.com</code>, <code>minceraft.com</code>, <code>fexplorer:financial</code>, <code>fexplorer:shop</code>, <code>fexplorer:updates</code>, <code>fexplorer:create</code>, or <code>fexplorer:create.hub</code></p>
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

document.addEventListener('DOMContentLoaded', () => {
    initializeDraftPage(); // Initialize or load draftPage
    updateFPointsDisplay();
    navigate(HOME_URL);
});