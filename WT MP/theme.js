// Applies the saved theme and handles the theme button on each page.
(function () {
    const savedTheme = localStorage.getItem("pennyWiseTheme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const themeButton = document.getElementById("themeToggle");

    function updateButtonText() {
        if (!themeButton) return;
        const currentTheme = document.documentElement.getAttribute("data-theme");
        themeButton.textContent = currentTheme === "dark" ? "Light mode" : "Dark mode";
    }

    updateButtonText();

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("pennyWiseTheme", newTheme);
            updateButtonText();
        });
    }
})();
