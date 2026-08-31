(function () {

    function iniciarTradutor() {

        const header = document.querySelector("header .container");

        if (!header) return;

        const nav = header.querySelector("nav");
        const menuToggle = header.querySelector(".menu-toggle");

        /* Cria o seletor de idiomas */

        const tradutor = document.createElement("div");

        tradutor.className = "gtranslate_wrapper";

        /* Posiciona conforme desktop ou celular */

        function posicionarTradutor() {

            if (window.innerWidth <= 768 && menuToggle) {

                header.insertBefore(tradutor, menuToggle);

            } else if (nav) {

                nav.insertAdjacentElement("afterend", tradutor);

            } else {

                header.appendChild(tradutor);

            }

        }

        posicionarTradutor();

        window.addEventListener("resize", posicionarTradutor);

        /* Configuração global do GTranslate */

        window.gtranslateSettings = {
            default_language: "pt",
            languages: ["pt", "es", "en"],
            wrapper_selector: ".gtranslate_wrapper",
            switcher_open_direction: "top",
            alt_flags: {
                en: "usa",
                pt: "brazil"
            }
        };

        /* Carrega o GTranslate */

        const script = document.createElement("script");

        script.src =
            "https://cdn.gtranslate.net/widgets/latest/dwf.js";

        script.defer = true;

        document.body.appendChild(script);

    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            iniciarTradutor
        );

    } else {

        iniciarTradutor();

    }

})();
