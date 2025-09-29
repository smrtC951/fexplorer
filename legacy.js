const addressBar = document.getElementById('addressBar');
const goButton = document.getElementById('goButton');
const browserContent = document.getElementById('browserContent');
const backButton = document.getElementById('backButton');
const homeButton = document.getElementById('homeButton');

const HOME_URL = 'fexplorer:home';

let historyStack = []; // Stores URLs visited *before* the current one
let currentUrl = ''; // The URL currently displayed

// List of URLs for the "Random Website" button
const randomWebsiteUrls = [
    'example.com',
    'goog.com',
    'headbook.com',
    'instantgrams.com',
    'mytube.com',
    'minceraft.com'
];

const fakeContent = {
    'example.com': `
        <h1>Example Domain</h1>
        <p>This domain is for use in illustrative examples in documents. You may use this
        domain in examples without prior coordination or asking for permission.</p>
        <p><a href="#" data-url="https://www.iana.org/domains/example">More information...</a></p>
        <hr>
        <p>This is a simulated page for <strong>example.com</strong>.</p>
        <p>Try typing "about:blank" or "${HOME_URL}"</p>
    `,
    'about:blank': `
        <h1>About Blank</h1>
        <p>This is a blank page, often used as a placeholder.</p>
        <p>In a real browser, this page is usually completely empty.</p>
        <p>Here, we just show this text to demonstrate the "about:blank" functionality.</p>
        <p>Try typing "example.com" or "${HOME_URL}"</p>
    `,
    'fexplorer:home': `
        <div class="home-page-content">
            <img src="fexplorer_logo.png" alt="FExplorer Logo" class="home-page-logo">
            <h1>Welcome to FExplorer!</h1>
            <p class="tagline">Your window to the simulated web.</p>
            <div class="home-page-search-container">
                <input type="search" class="home-page-search-input" placeholder="Search the simulated web or type a URL...">
                <button class="home-page-search-button">Search</button>
            </div>
            <div class="quick-links-section">
                <h2>Explore</h2>
                <div class="home-page-buttons-container">
                    <button class="home-page-button" data-url="fexplorer:quick-links">Quick Links</button>
                    <button id="randomWebsiteButton" class="home-page-button">Random Website</button>
                </div>
            </div>
            <p class="footer-note">This is a simulated browser. Only pre-defined URLs are available.</p>
        </div>
    `,
    'fexplorer:quick-links': `
        <div class="quick-links-page home-page-content">
            <h1>FExplorer Quick Links</h1>
            <p class="tagline">Easily jump to common simulated sites.</p>
            <div class="quick-links-section">
                <h2>Available Links</h2>
                <ul class="quick-links">
                    <li>
                        <a href="#" data-url="example.com">Example Site</a>
                        <p class="link-description">A generic example domain page.</p>
                    </li>
                    <li>
                        <a href="#" data-url="about:blank">Blank Page</a>
                        <p class="link-description">A placeholder for an empty page.</p>
                    </li>
                    <li>
                        <a href="#" data-url="fexplorer:home">FExplorer Home</a>
                        <p class="link-description">Return to the FExplorer welcome page.</p>
                    </li>
                    <li>
                        <a href="#" data-url="goog.com">Goog!</a>
                        <p class="link-description">Visit the simulated Goog! search engine.</p>
                    </li>
                    <li>
                        <a href="#" data-url="headbook.com">Headbook</a>
                        <p class="link-description">Connect with friends on this social network.</p>
                    </li>
                    <li>
                        <a href="#" data-url="instantgrams.com">Instant Grams</a>
                        <p class="link-description">Share photos and videos instantly.</p>
                    </li>
                    <li>
                        <a href="#" data-url="mytube.com">MyTube</a>
                        <p class="link-description">Watch and share videos.</p>
                    </li>
                    <li>
                        <a href="#" data-url="minceraft.com">Minceraft</a>
                        <p class="link-description">Explore a blocky world of adventure.</p>
                    </li>
                    <li>
                        <a href="#" data-url="unknown.site">Unknown Site</a>
                        <p class="link-description">A page demonstrating a 'not found' error.</p>
                    </li>
                </ul>
            </div>
            <p class="footer-note">Back to <a href="#" data-url="fexplorer:home">FExplorer Home</a></p>
        </div>
    `,
    'goog.com': `
        <div class="home-page-content">
            <img src="goog_logo.png" alt="Goog! Logo" class="home-page-logo" style="width: 100px;">
            <h1>Goog!</h1>
            <p class="tagline">Search the simulated web.</p>
            <div class="home-page-search-container">
                <input type="search" id="googSearchInput" class="home-page-search-input" placeholder="Search Goog!...">
                <button id="googSearchButton" class="home-page-search-button">Goog! Search</button>
            </div>
            <div class="quick-links-section">
                <h2>Popular Searches</h2>
                <ul class="quick-links">
                    <li><a href="#" data-url="goog.com/search?q=example">Example Website</a></li>
                    <li><a href="#" data-url="goog.com/search?q=blank">Blank Page Info</a></li>
                    <li><a href="#" data-url="goog.com/search?q=fexplorer">About FExplorer</a></li>
                    <li><a href="#" data-url="goog.com/search?q=quick+links">FExplorer Quick Links</a></li>
                    <li><a href="#" data-url="goog.com/search?q=headbook">Headbook Social</a></li>
                    <li><a href="#" data-url="goog.com/search?q=instantgrams">Instant Grams Pics</a></li>
                    <li><a href="#" data-url="goog.com/search?q=mytube">MyTube Videos</a></li>
                    <li><a href="#" data-url="goog.com/search?q=minceraft">Minceraft Game</a></li>
                </ul>
            </div>
            <p class="footer-note">This is a simulated search engine. Results are pre-defined.</p>
        </div>
    `,
    'headbook.com': `
        <div class="home-page-content">
            <img src="fakebook_logo.png" alt="Headbook Logo" class="home-page-logo" style="width: 80px;">
            <h1>Welcome to Headbook!</h1>
            <p class="tagline">Connect with friends and the world around you.</p>
            <div style="max-width: 400px; width: 100%; text-align: left; background-color: #f2f2f2; padding: 20px; border-radius: 8px;">
                <p><strong>John Doe</strong> posted a new update: "Enjoying the simulated web on FExplorer! #fakebrowser #webdev"</p>
                <hr>
                <p><strong>Jane Smith</strong> liked your post.</p>
                <p><strong>Admin</strong>: This is a placeholder for your social feed. In a real browser, this would be dynamic.</p>
            </div>
            <p class="footer-note">Your simulated social network.</p>
        </div>
    `,
    'instantgrams.com': `
        <div class="home-page-content">
            <img src="instantgrams_logo.png" alt="Instant Grams Logo" class="home-page-logo" style="width: 80px;">
            <h1>Instant Grams</h1>
            <p class="tagline">Capture and Share the World's Moments.</p>
            <div style="max-width: 500px; width: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-top: 20px;">
                <div style="background-color: #eee; height: 120px; display: flex; align-items: center; justify-content: center; font-size: 0.9em; color: #555; border-radius: 5px;">Image 1</div>
                <div style="background-color: #eee; height: 120px; display: flex; align-items: center; justify-content: center; font-size: 0.9em; color: #555; border-radius: 5px;">Image 2</div>
                <div style="background-color: #eee; height: 120px; display: flex; align-items: center; justify-content: center; font-size: 0.9em; color: #555; border-radius: 5px;">Image 3</div>
                <div style="background-color: #eee; height: 120px; display: flex; align-items: center; justify-content: center; font-size: 0.9em; color: #555; border-radius: 5px;">Image 4</div>
            </div>
            <p style="margin-top: 20px;">Browse photos from friends and discover new accounts.</p>
            <p class="footer-note">Simulated photo sharing.</p>
        </div>
    `,
    'mytube.com': `
        <div class="home-page-content">
            <img src="mytube_logo.png" alt="MyTube Logo" class="home-page-logo" style="width: 100px;">
            <h1>MyTube</h1>
            <p class="tagline">Watch. Share. Discover.</p>
            <div style="max-width: 560px; width: 100%; background-color: #000; height: 315px; margin-top: 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2em;">
                [Simulated Video Player]
                <br>
                <br>
                "Welcome to MyTube"
            </div>
            <p style="margin-top: 20px;">This is a simulated video platform. Imagine endless videos!</p>
            <p class="footer-note">Simulated video streaming.</p>
        </div>
    `,
    'minceraft.com': `
        <div class="home-page-content">
            <img src="minceraft_logo.png" alt="Minceraft Logo" class="home-page-logo" style="width: 100px;">
            <h1>Minceraft</h1>
            <p class="tagline">Explore, Build, Survive!</p>
            <div style="max-width: 500px; width: 100%; text-align: center; background-color: #d4edda; border: 1px solid #28a745; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p style="font-weight: bold; color: #28a745;">"Welcome to your blocky adventure!"</p>
                <p>Gather resources, craft tools, and build anything you can imagine in this infinite simulated world.</p>
                <p style="font-style: italic; color: #6c757d;">(This is a simulated game page. No actual gameplay.)</p>
            </div>
            <p class="footer-note">Simulated block-building game.</p>
        </div>
    `
};

function updateBackButtonState() {
    backButton.disabled = historyStack.length === 0;
}

// Helper function to attach event listeners to dynamically loaded content
function attachDynamicEventListeners() {
    // Quick links on FExplorer quick links page, Goog! search results, and other internal links
    browserContent.querySelectorAll('.quick-links a[data-url], .search-results-page a[data-url]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const url = event.target.dataset.url;
            if (url) {
                navigate(url);
            }
        });
    });

    // Handle the "Explore Quick Links" button on the fexplorer:home page
    browserContent.querySelectorAll('.home-page-button[data-url]').forEach(button => {
        button.addEventListener('click', (event) => {
            const url = event.target.dataset.url;
            if (url) {
                navigate(url);
            }
        });
    });

    // Handle "Random Website" button on the fexplorer:home page
    const randomWebsiteButton = browserContent.querySelector('#randomWebsiteButton');
    if (randomWebsiteButton) {
        randomWebsiteButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * randomWebsiteUrls.length);
            const randomUrl = randomWebsiteUrls[randomIndex];
            navigate(randomUrl);
        });
    }

    // Goog! search functionality for the main Goog! page
    if (currentUrl === 'goog.com') {
        const googSearchInput = browserContent.querySelector('#googSearchInput');
        const googSearchButton = browserContent.querySelector('#googSearchButton');

        if (googSearchInput && googSearchButton) {
            const performGoogSearch = () => {
                const query = googSearchInput.value.trim();
                if (query) {
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

    // FExplorer home page search functionality
    if (currentUrl === HOME_URL) {
        const fexplorerSearchInput = browserContent.querySelector('.home-page-search-input');
        const fexplorerSearchButton = browserContent.querySelector('.home-page-search-button');

        if (fexplorerSearchInput && fexplorerSearchButton) {
            const performFExplorerSearch = () => {
                const query = fexplorerSearchInput.value.trim();
                if (query) {
                    navigate(`goog.com/search?q=${encodeURIComponent(query)}`); // FExplorer search goes to Goog!
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
}

function navigate(urlToLoad, isBackNavigation = false) {
    const sanitizedUrl = urlToLoad.toLowerCase().trim();

    // If we're not going back, and we have a current URL, push it to history
    if (!isBackNavigation && currentUrl && currentUrl !== sanitizedUrl) { // Don't push if navigating to the same URL
        historyStack.push(currentUrl);
    }

    currentUrl = sanitizedUrl; // Update currentUrl to the requested URL
    addressBar.value = currentUrl; // Update address bar to current URL

    browserContent.innerHTML = `<div style="text-align: center; padding: 20px; color: #555;">Loading...</div>`;

    setTimeout(() => { // Simulate network delay
        let contentHtml = '';
        let pageFound = false;

        // 1. Try to find a direct match in fakeContent (e.g., 'fexplorer:home', 'goog.com', 'example.com')
        if (fakeContent[sanitizedUrl]) {
            contentHtml = fakeContent[sanitizedUrl];
            pageFound = true;
        } else {
            // 2. If no direct match, try to parse as a standard URL, mainly for search queries
            let parsedUrl;
            try {
                // Prepend a protocol if missing, so URL object can parse relative paths.
                // This allows parsing of 'goog.com/search?q=...'
                parsedUrl = new URL(sanitizedUrl.startsWith('http') || sanitizedUrl.includes(':') ? sanitizedUrl : `http://${sanitizedUrl}`);
            } catch (e) {
                // Fallback for malformed URLs, treat as unknown
                parsedUrl = { hostname: 'unknown', pathname: '/', searchParams: new URLSearchParams() };
            }

            const hostname = parsedUrl.hostname.replace('www.', ''); // Normalize hostname
            const pathname = parsedUrl.pathname;
            const query = parsedUrl.searchParams.get('q'); // Get 'q' parameter for search queries

            if (hostname === 'goog.com' && pathname === '/search' && query) {
                // Handle Goog! search results
                pageFound = true;
                const lowerQuery = query.toLowerCase();
                let searchResultContent = '';

                // Define search results for new sites
                const searchResultsMap = {
                    'example': { url: 'example.com', title: 'Example Domain' },
                    'blank': { url: 'about:blank', title: 'About Blank' },
                    'fexplorer': { url: 'fexplorer:home', title: 'FExplorer Home' },
                    'home': { url: 'fexplorer:home', title: 'FExplorer Home' },
                    'fakebrowser': { url: 'fexplorer:home', title: 'FExplorer Home' }, // Aliases
                    'quick links': { url: 'fexplorer:quick-links', title: 'FExplorer Quick Links' },
                    'headbook': { url: 'headbook.com', title: 'Headbook - Social Network' },
                    'instantgrams': { url: 'instantgrams.com', title: 'Instant Grams - Photo Sharing' },
                    'mytube': { url: 'mytube.com', title: 'MyTube - Video Platform' },
                    'minceraft': { url: 'minceraft.com', title: 'Minceraft - Blocky Game' },
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
                    searchResultContent = `
                        <p>No results found for your query. Try "example", "blank", "fexplorer", "quick links", "headbook", "instantgrams", "mytube", or "minceraft".</p>
                    `;
                }

                contentHtml = `
                    <div class="search-results-page home-page-content">
                        <h1>Goog! Search Results for "${query}"</h1>
                        ${searchResultContent}
                        <p class="footer-note">Back to <a href="#" data-url="goog.com">Goog!</a></p>
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
                    <p>Try <code>example.com</code>, <code>about:blank</code>, <code>fexplorer:home</code>, <code>fexplorer:quick-links</code>, <code>goog.com</code>, <code>headbook.com</code>, <code>instantgrams.com</code>, <code>mytube.com</code>, or <code>minceraft.com</code></p>
                </div>
            `;
        }

        browserContent.innerHTML = contentHtml;
        
        attachDynamicEventListeners(); // Re-attach event listeners after content is loaded
        updateBackButtonState(); // Update button state after navigation completes
    }, 500); // 0.5 second delay
}

// Event Listeners
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
        navigate(prevUrl, true); // Indicate this is a back navigation
    }
});

homeButton.addEventListener('click', () => {
    navigate(HOME_URL);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    // Navigate to the home URL when the page loads
    navigate(HOME_URL);
});