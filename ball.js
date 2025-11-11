// ================================
//  FExplorer Shop System (v2)
// ================================

// Store weapon data
const weapons = {
  sword: {
    name: "Sword",
    ability: "Adds damage every hit.",
    skins: ["Ruby Edge", "Midnight Steel", "Goldflare"]
  },
  dagger: {
    name: "Dagger",
    ability: "Adds spin speed every hit.",
    skins: ["Shadow Tip", "Aqua Sting"]
  },
};

// Cached references
const shopSection = document.getElementById("shopSection");
const shopInfoSection = document.getElementById("shopInfoSection");
const shopButton = document.getElementById("shopButton");

// Opens detailed info for selected weapon
function showWeaponInfo(weaponKey) {
  const weapon = weapons[weaponKey];
  if (!weapon) return;

  // Build skins HTML
  const skinsHTML = weapon.skins?.length
    ? weapon.skins.map(skin => `<li>${skin}</li>`).join("")
    : "<p>No skins yet!</p>";

  // Set info content
  shopInfoSection.innerHTML = `
    <div class="shop-info-content">
      <h3 id="weaponText">${weapon.name}</h3>
      <p id="abilityText">${weapon.ability}</p>
      
      <div id="skinsSection" style="display:none;">
        <ul>${skinsHTML}</ul>
      </div>

      <div class="shop-buttons">
        <button class="button" id="equipButton">Equip</button>
        <button class="button" id="toggleViewButton">View Skins</button>
        <button class="button" id="closeButton">Close</button>
      </div>
    </div>
  `;

  shopInfoSection.style.display = "inline-block";

  // Attach button logic AFTER content is added
  const toggleButton = document.getElementById("toggleViewButton");
  const closeButton = document.getElementById("closeButton");
  const equipButton = document.getElementById("equipButton");
  const abilityText = document.getElementById("abilityText");
  const skinsSection = document.getElementById("skinsSection");

  toggleButton.addEventListener("click", () => {
    const showingSkins = skinsSection.style.display === "block";
    skinsSection.style.display = showingSkins ? "none" : "block";
    abilityText.style.display = showingSkins ? "block" : "none";
    toggleButton.textContent = showingSkins ? "View Skins" : "View Info";
  });

  closeButton.addEventListener("click", () => {
    shopInfoSection.style.display = "none";
  });

  equipButton.addEventListener("click", () => {
    alert(`${weapon.name} equipped!`);
  });
}

// Toggle entire shop open/close
if (shopButton && shopSection && shopInfoSection) {
  shopButton.addEventListener("click", () => {
    const isOpen = shopSection.style.display === "block";
    shopSection.style.display = isOpen ? "none" : "block";
    shopInfoSection.style.display = "none";
    shopButton.textContent = isOpen ? "Shop" : "Close Shop";
  });
}

// Assign info buttons (any number of them)
document.querySelectorAll("[data-weapon]").forEach(btn => {
  btn.addEventListener("click", () => {
    const weaponKey = btn.getAttribute("data-weapon");
    showWeaponInfo(weaponKey);
  });
});
