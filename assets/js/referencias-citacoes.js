document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".writing-tab");
    const panels = document.querySelectorAll(".writing-tab-panel");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            panels.forEach(panel => {
                panel.classList.remove("active");
                panel.hidden = true;
            });

            tab.classList.add("active");

            const activePanel = document.getElementById(target);

            if (activePanel) {
                activePanel.hidden = false;
                activePanel.classList.add("active");
            }

        });

    });

});
