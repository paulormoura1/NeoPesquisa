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

    switcher_horizontal_position: "inline",
    switcher_vertical_position: "",

    switcher_open_direction: "bottom",

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
/* Deixa o seletor compacto: PT / EN / ES */

script.addEventListener("load", function () {

    const wrapper = document.querySelector(".gtranslate_wrapper");

    if (!wrapper) return;

    function atualizarIdiomaCompacto() {

        const selecionado = wrapper.querySelector(".gt_selected a");

        if (!selecionado) return;

        const texto = selecionado.textContent
            .trim()
            .toLowerCase();

        let codigo = "PT";

        if (texto.includes("english")) {
            codigo = "EN";
        }

        if (
            texto.includes("spanish") ||
            texto.includes("español")
        ) {
            codigo = "ES";
        }

        selecionado.setAttribute("data-lang", codigo);
    }

    atualizarIdiomaCompacto();

    const observer = new MutationObserver(
        atualizarIdiomaCompacto
    );

    observer.observe(wrapper, {
        childList:true,
        subtree:true,
        characterData:true
    });

});
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            iniciarTradutor
        );

    } else {

        iniciarTradutor();

    }

})();
