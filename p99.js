const UI = [
    // Progressbar99 UI
    `<div class="progressbar99-ui" style="background-color: #ffffffff;">
        <p>hi</p>
    </div>`,
]

const Menubutton = document.getElementById("menuButton")
Menubutton.addEventListener('click', event => {
    alert("Hello!");
    UI.style.display = 'flex';
});

