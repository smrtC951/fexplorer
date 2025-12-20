/* ============================================================
   RANDOM USER PAGES — CATEGORY + VARIANT STRUCTURE (Option A)
   URL format: fexplorer:<id>-<category>/<variant>
   Example:   fexplorer:81234-fun/one_more_game
   Works with main.js navigation — clean & modular.
============================================================ */

/* ------------------------------------------------------------
   RANDOM PAGE DATABASE
   Structure:
   RANDOM_USER_VARIANTS[category][variant] = {
       id: "category.variant",
       html: "HTML content"
   }
------------------------------------------------------------ */

const RANDOM_USER_VARIANTS = {

  /* ====================== DEFAULT ====================== */
  default: {
    apple: {
      id: "default.apple",
      html: `
        <div class="random-user-page">
          <h2>I like apples!</h2>
          <p>I hope you do too!</p>
          <button class="bonus-button">Bonus</button>
        </div>
      `
    },
    welcome: {
      id: "default.welcome",
      html: `
        <div class="random-user-page">
          <h2>Welcome!</h2>
          <p>Welcome to my page! Enjoy your stay!</p>
        </div>
      `
    },
    burger: {
      id: "default.burger",
      html: `
        <div class="random-user-page">
          <h2>I like burgers!</h2>
          <p>Click this cool button to find out why!</p>
          <button class="burger-button">Burger</button>
          <button class="bonus-button">Bonus</button>
        </div>
      `
    },
    thoughts: {
      id: "default.thoughts",
      html: `
        <div class="random-user-page">
          <h2>Here's a thought:</h2>
          <p>Actually, I don't.</p>
          <button class="bonus-button">Bonus</button>
        </div>
      `
    },
    basic: {
      id: "default.basic",
      html: `
        <div class="random-user-page">
          <h2>Default Page</h2>
          <p>This is a default random user page.</p>
        </div>
      `
    },
  },

  /* ====================== MYSTERY ====================== */
  mystery: {
    basic: {
      id: "mystery.basic",
      html: `
        <div class="random-user-page">
          <h2>Mystery Page</h2>
          <p>What secrets does this page hold? No one knows.</p>
        </div>
      `
    },
    nav: {
      id: "mystery.nav",
      html: `
        <div class="random-user-page">
          <h2>Mystery Page</h2>
          <p>This page can send you to other parts of the browser.</p>
          <a href="#" class="mystery-link">Mystery hyperlink</a>
        </div>
      `
    }
  },

  /* ====================== FUN ====================== */
  fun: {
    one_more_game: {
      id: "fun.one_more_game",
      html: `
        <div class="random-user-page">
          <img src="icons/ONEMOREGAME!.jpg" style="max-width:240px;">
          <h2>ONE MORE GAME!</h2>
          <p>ONE MORE GAME!</p>
          <button class="bonus-button">ONE MORE GAME!</button>
        </div>
      `
    },
    "67-mangoes": {
      id: "fun.67-mangoes",
      html: `
        <div class="random-user-page">
          <h2>67 MANGOES!!</h2>
          <p>I HAVE 67 MANGOES!! WANT SOME??</p>
          <button class="mango-button1">GIVE ME MANGOES!!</button>
          <button class="mango-button2">No thanks..</button>
        </div>
      `
    },
    joke_bananas: {
      id: "fun.joke_bananas",
      html: `
        <div class="random-user-page">
          <h2>Here's a message!</h2>
          <p>Nerf FPoints. *gets hit by bananas*</p>
        </div>
      `
    },
    winter_is_coming: {
      id: "fun.winter_is_coming",
      html: `
      <div class="random-user-page">
          <h2>Hey, I have a question.</h2>
          <p>Is it me, or is winter approaching rapidly?</p>
        </div>
      `
    }
  },

  /* ====================== ERROR ====================== */
  error: {
    basic404: {
      id: "error.404",
      html: `
        <div class="random-user-page">
          <h2>404?</h2>
          <p>This page doesn't exist... or does it?</p>
        </div>
      `
    },
    quitload: {
      id: "error.quitload",
      html: `
        <div class="random-user-page">
          <h2>404 - Page quit loading</h2>
          <p>The page has quitted loading.</p>
        </div>
      `
    },
    bsod: {
      id: "error.bsod",
      html: `
        <div class="random-user-page" style="background:#0077D6;color:white;font-family:'Segoe UI Light'">
          <h1>:(</h1>
          <p>The page ran into a problem and needs to reload.</p>
          <h5>0% complete</h5>
        </div>
      `
    }
  },

  /* ====================== AWESOME ====================== */
  awesome: {
    basic: {
      id: "awesome.basic",
      html: `
        <div class="random-user-page">
          <h2>Awesome Page</h2>
          <p>YOU ARE AWESOME!!!</p>
          <button class="bonus-button">Bonus</button>
        </div>
      `
    },
    mango_meme: {
      id: "awesome.mango_meme",
      html: `
        <div class="random-user-page">
          <h2>67 MANGOES!!</h2>
          <p>I HAVE 67 MANGOES!! WANT SOME??</p>
          <button class="mango-button1">GIVE ME MANGOES!!</button>
        </div>
      `
    },
    funny: {
      id: "awesome.funny",
      html: `
        <div class="random-user-page">
          <h2>SHOW ME YOUR MEME!! :DDD</h2>
          <p>I, MR MEME MAN, CREATE THIS PAGE FOR YOU TO SHOW ME YOUR MEME!!</p>
          <button class="meme-button1">GIVE MEME</button>
          <button class="meme-button2">NO MEME</button>
        </div>
      `
    }
  },

  /* ====================== SUSPICIOUS ====================== */
  suspicious: {
    yellow: {
      id: "suspicious.yellow",
      html: `
        <div class="random-user-page dangerous-page" style="background:#f2ff00;">
          <h2>TOTALLY NORMAL PAGE!</h2>
          <p>This page is dangerous! Click the button below to proceed at your own risk!</p>
          <button class="suspicious-button">Click me!</button>
        </div>
      `
    },
    purple: {
      id: "suspicious.purple",
      html: `
        <div class="random-user-page dangerous-page" style="background:#7700ff;">
          <h2>THIS IS NOT A NORMAL PAGE!!</h2>
          <p>Hey you, yes you!</p>
          <p>This is NOT a normal page. Click here to escape!</p>
          <button class="suspicious-button2">Click me!</button>
        </div>
      `
    }
  },

  /* ====================== DANGER ====================== */
  danger: {
    red: {
      id: "danger.red",
      html: `
        <div class="random-user-page dangerous-page" style="background:#ff0000;color:white">
          <h2>DANGEROUS PAGE!!</h2>
          <p>This page is dangerous! Click the button below to proceed at your own risk!</p>
          <button class="dangerous-button">Proceed</button>
        </div>
      `
    },
    totally_real: {
      id: "danger.fakegreen",
      html: `
        <div class="random-user-page dangerous-page" style="background:#22ff00;">
          <h2>TOTALLY SAFE PAGE!!</h2>
          <p>This page is totally safe! Click the button below to get your reward!</p>
          <button class="dangerous-button2">Get reward</button>
        </div>
      `
    },
    virus: {
      id: "danger.virus",
      html: `
        <div class="random-user-page dangerous-page" style="background:#000;color:white">
          <h2>TOTALLY SAFE DOWNLOAD!!!!!!!!!!!!!!!!!!!!!!!!!</h2>
          <p>This download is totally safe! Click to donwload and get 2147129498174917941 FPointd!111113131242121</p>
          <button class="dangerous-button3">DOWNLOAD</button>
        </div>
      `
    },
    pet: {
      id: "danger.pet",
      html: `
        <div class="random-user-page dangerous-page" style="background:#f7869a;color:white">
          <h2>Download Kinito PET now!</h2>
          <p>Kinito PET is the best assistant ever!! Try it now!!</p>
          <button class="dangerous-button4">DOWNLOAD KINITO PET</button>
        </div>
      `
    }
  },

  /* ====================== BROKEN ====================== */
  broken: {
    b1: {
      id: "broken.b1",
      html: `
        <div class="random-user-page">
          <h2>Broken Page</h2>
          <p>Oops! This page seems to be broken. Try refreshing or going back.</p>
          <button class="broken-button">NILL</button>
        </div>
      `
    },
    b2: {
      id: "broken.b2",
      html: `
        <div class="random-user-page">
          <h2>This page is broken!</h2>
          <p>Someone broke the damn page! Who did this?!</p>
          <button class="broken-button">I don't know!</button>
        </div>
      `
    }
  },

  /* ====================== FPOINTS ====================== */
  fpoints: {
    f1: {
      id: "fpoints.f1",
      html: `
        <div class="random-user-page">
          <h2>FPoints Galore!</h2>
          <p>This page is filled with FPoints! Click the button below to claim some!</p>
          <p>However, it will disappear afterwards!</p>
          <button class="fpoints-button">Claim FPoints</button>
        </div>
      `
    },
    f2: {
      id: "fpoints.f2",
      html: `
        <div class="random-user-page">
          <h2>FPoints-filled Page!</h2>
          <p>This button has a ton of FPoints on it! Go and collect it!</p>
          <p>However, it will disappear afterwards!</p>
          <button class="fpoints-button">Claim FPoints</button>
        </div>
      `
    }
  },

  /* ====================== IMAGES ====================== */
  images: {
    solitaire: {
      id: "images.solitaire",
      html: `
        <div class="random-user-page">
          <h2>My cool images</h2>
          <img src="icons/solitaire-icon.png" style="max-width:200px;">
        </div>
      `
    },
    sandbox: {
      id: "images.sandbox",
      html: `
        <div class="random-user-page">
          <img src="icons/sandbox-icon.png" style="max-width:200px;">
        </div>
      `
    },
    popup: {
      id: "images.popup",
      html: `
        <div class="random-user-page">
          <img src="icons/pop-up-icon.png" style="max-width:200px;">
        </div>
      `
    },
    legacy: {
      id: "images.legacy",
      html: `
        <div class="random-user-page">
          <img src="icons/old-fexplorer.png" style="max-width:200px;">
        </div>
      `
    },
    jx1dx1: {
      id: "images.jx1dx1",
      html: `
        <div class="random-user-page" style="background:#1a1a1a;color:#ff0000;padding:18px;">
          <img src="icons/jx1dx1.jpg" style="max-width:200px;">
        </div>
      `
    }
  },

  /* ====================== DRINK ====================== */
  drink: {
    water: {
      id: "drink.water",
      html: `
        <div class="random-user-page" style="background:#0651d2;color:#fff;">
          <h2>Water</h2>
          <p>Stay hydrated!</p>
          <button class="bonus-button">Get hydrated!</button>
        </div>
      `
    },
    vending: {
      id: "drink.vending",
      html: `
        <div class="random-user-page" style="font-family: 'Times New Roman', monospace; color: #000;">
          <h2>Welcome to the vending machine...</h2>
          <p>Which of these consumptions determine your fate?</p>
          <button class="drink-button">Bloxy Cola</button>
          <button class="drink-button">Bloxaide</button>
          <button class="drink-button">Uranium Cola</button>
          <button class="drink-button">H2O</button>
        </div>
      `
    }
  },

  /* ====================== HOLIDAY ====================== */
  holiday: {
    halloween: {
      id: "holiday.halloween",
      html: `
        <div class="random-user-page" style="background:black;color:#ff7518;">
          <h2>Happy Halloween!</h2>
          <p>Trick or Treat?</p>
          <button class="holiday-button">Trick!</button>
          <button class="holiday-button">Treat!</button>
        </div>
      `
    },
    jx1dx1_halloween: {
      id: "holiday.jx1dx1",
      html: `
        <div class="random-user-page" style="background:#1a1a1a;color:#ff0000;">
          <h2>THE.CLOCK.IS.TICKING.</h2>
          <button class="bonus-button">("CLICK.ME.")</button>
        </div>
      `
    },
    thanksgiving: {
      id: "holiday.thanksgiving",
      html: `
        <div class="random-user-page" style="background:black;color:#ff7518;">
          <h2>Happy Thanksgiving!</h2>
          <button class="holiday-button">Get turkey</button>
        </div>
      `
    },
    christmas: {
      id: "holiday.chirstmas",
      html: `
        <div class="random-user-page" style="background:black;color:#c2f0d0;">
          <h2>Merry Christmas!</h2>
          <button class="holiday-button">Get presents</button>
        </div>
      `
    },
    happynewyear: {
      id: "holiday.newyear",
      html: `
      <div class="random-user-page" style="background:black;color:#c2f0d0;">
          <h2>Happy 2026!</h2>
          <p>Hey, you're early. Wonderful day, isn't it?</p>
          <p>Make sure to celebrate 2026 soon!</p>
          <button class="holiday-button" disabled>Celebrate</button>
        </div>
      `
    }
  },

  /* ====================== PARANOIA ====================== */
  paranoia: {
    basic: {
      id: "paranoia.basic",
      html: `
        <div class="random-user-page">
          <h2>Paranoia Page</h2>
          <p>They are watching you...</p>
        </div>
      `
    },
    definition: {
      id: "paranoia.definition",
      html: `
        <div class="random-user-page" style="background:#222;color:#eee;">
          <p>To be seen, to be lost</p>
          <p>Are you sure it's there?</p>
        </div>
      `
    },
    alert: {
      id: "paranoia.alert",
      html: `
        <div class="random-user-page">
          <h2>ALERT!</h2>
          <p>Hey, user. Quick question. Are you being watched?</p>
          <button class="paranoia-button1">Yes</button>
          <button class="paranoia-button2">No</button>
        </div>
      `
    },
    house: {
      id: "paranoia.house",
      html: `
      <div class="random-user-page" style="font-family: Times New Roman;">
          <img src="icons/house.png" style="max-width:200px;">
          <h2>What is a house?</h2>
          <p>
            A house is a physical building or structure designed for human habitation. It primarily serves as a dwelling providing shelter, privacy, and security for one or more individuals or a family unit.
          </p>
        </div>
      `
    },
  },
  /* ====================== TASK ====================== */
  task: {
    basic: {
      id: "task.basic",
      html: `
        <div class="random-user-page">
          <h2>Task Page</h2>
          <p>Complete the task to get a reward!</p>
          <button class="task-button">Complete Task</button>
        </div>
      `
    },
    oh_no: {
      id: "task.oh_no",
      html: `
        <div class="random-user-page">
          <h2>Help, user!</h2>
          <p>Oh no! My microwave has just exploded. Don't ask how, or why.</p>
          <p>Can you help me fix it?</p>
          <button class="task-button">Fix</button>
        </div>
      `
    },
    code: {
      id: "task.code",
      html: `
        <div class="random-user-page">
          <h2>Code Task</h2>
          <p>Complete this Javascript code for me! It's VERY impossible, I tell you.</p>
          <button class="task-button">View Code</button>
        </div>
      `
    },
    freddy: {
      id: "task.freddy",
      html: `
        <div class="random-user-page">
          <h2>Your Task at Freddy's</h2>
          <p>Try to survive at Freddy's</p>
          <button class="task-button">Survive.</button>
        </div>
      `
    },
    createpage: {
      id: "task.createpage",
      html: `
      <div class="random-user-page">
          <h2>Totally legal page creator!</h2>
          <p>Hey, do you wanna create a page? C'mon, I know you wanna do it!</p>
          <button class="task-button">Create page</button>
          <div class="crate-page" style="display: none;">
            <h3>Create Page</h3>
            <p>Enter the URL of the page you want to create:</p>
            <input type="text" id="pageUrl" placeholder="fexplorer:home">
            <button>Create</button>
          </div>
        </div>
      `
    },
  },

  /* ====================== MISC ====================== */
  misc: {
    betting: {
      id: "misc.betting",
      html: `
        <div class="random-user-page">
          <h2>Betting Page</h2>
          <p>Place your bets!</p>
          <button class="betting-button">Place Bet</button>
        </div>
      `
    },
    error777: {
      id: "misc.error777",
      html: `
        <div class="random-user-page">
          <h2>Error 777 Page</h2>
          <p>This page has encountered Error 777. Please contact support.</p>
          <button class="error777-button">Contact Support</button>
        </div>
      `
    },
    datasell: {
      id: "misc.datasell",
      html: `
        <div class="random-user-page">
          <h2>Data Selling Page</h2>
          <p>We need your data for.. very important purposes.</p>
          <button class="data-selling-button">Sell Data</button>
        </div>
      `
    },
    policies: {
      id: "misc.policies",
      html: `
        <div class="random-user-page">
          <h2>Policies Page</h2>
          <ul>
            <li>Blah blah blah blah blah</li>
            <li>Blah blah blah blah blah</li>
            <li>Blah blah blah blah blah</li>
            <li>Blah blah blah blah blah</li>
            <li>Blah blah blah blah blah</li>
          </ul>
          <p>If you fail to follow the rules, we will contact the authorities.</p>
        </div>
      `
    },
    chiikawa: {
      id: "misc.chiikawa",
      html: `
        <div class="random-user-page">
          <h2>Chiikawa</h2>
          <p>Something small and cute.</p>
        </div>
      `
    },
  }

}; // END RANDOM_USER_VARIANTS



/* ============================================================
   RANDOM PAGE HELPERS
============================================================ */

function genRandomId() {
  return Math.floor(Math.random() * 90000) + 10000;
}

function createRandomUserPageUrl(category, variant) {
  if (!category || !variant) {
    const cats = Object.keys(RANDOM_USER_VARIANTS);
    category = cats[Math.floor(Math.random() * cats.length)];

    const vars = Object.keys(RANDOM_USER_VARIANTS[category]);
    variant = vars[Math.floor(Math.random() * vars.length)];
  }
  return `fexplorer:${genRandomId()}-${category}/${variant}`;
}

function parseFexplorerVariantUrl(raw) {
  if (!raw) return null;

  let s = raw;
  if (s.startsWith("fexplorer:")) s = s.slice("fexplorer:".length);

  const dash = s.indexOf("-");
  const slash = s.indexOf("/");

  if (dash === -1 || slash === -1) return null;

  return {
    id: s.substring(0, dash),
    category: s.substring(dash + 1, slash),
    variant: s.substring(slash + 1)
  };
}



/* ============================================================
   RANDOM PAGE RENDERER
============================================================ */

function renderRandomUserPage(url) {
  const parsed = parseFexplorerVariantUrl(url);

  if (!parsed) {
    browserContent.innerHTML = `<h2>Invalid random page URL</h2>`;
    return;
  }

  const { category, variant, id } = parsed;

  if (!RANDOM_USER_VARIANTS[category] ||
      !RANDOM_USER_VARIANTS[category][variant]) {

    browserContent.innerHTML = `
      <div style="text-align:center;padding:30px;">
        <h1>Variant not found: ${category}/${variant}</h1>
      </div>
    `;
    return;
  }

  const obj = RANDOM_USER_VARIANTS[category][variant];

  // set tab title
  if (typeof updateTabTitle === "function") {
    updateTabTitle(`${obj.id} — ${id}`);
  }

  // insert HTML
  browserContent.innerHTML = obj.html;

  // attach extra buttons
  const footer = document.createElement("div");
  footer.innerHTML = `
    <button id="surpriseAgainBtn" style="cursor: pointer;">Surprise again</button>
    <button id="surpriseRandomBtn" style="cursor: pointer;">Random page</button>
  `;
  browserContent.appendChild(footer);

  document.getElementById("surpriseAgainBtn").onclick = () => {
    navigate(`fexplorer:${genRandomId()}-${category}/${variant}`);
  };
  document.getElementById("surpriseRandomBtn").onclick = () => {
    navigate(createRandomUserPageUrl());
  };

  if (typeof attachDynamicEventListeners === "function") {
    attachDynamicEventListeners();
  }
}



/* ============================================================
   RANDOM BUTTON WIRING (CALL THIS AFTER HOME PAGE LOAD)
============================================================ */

function wireRandomWebsiteButton(container) {
  const btn = (container || document).querySelector("#randomWebsiteButton");
  if (!btn) return;

  btn.onclick = () => {
    navigate(createRandomUserPageUrl());
  };
}