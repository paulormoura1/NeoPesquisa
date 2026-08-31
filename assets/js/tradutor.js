(function () {
    /* =====================================================
       REDUZ O FLASH DO IDIOMA ORIGINAL
    ===================================================== */

    function idiomaTraduzidoAtivo() {

        const cookie = document.cookie.match(
            /(?:^|;\s*)googtrans=([^;]+)/
        );

        if (!cookie) return false;

        const valor = decodeURIComponent(cookie[1]);

        return valor.endsWith("/en") ||
               valor.endsWith("/es");
    }

    let timerLiberacao = null;

    function liberarPagina() {

        document.documentElement.classList.remove(
            "gt-aguardando-traducao"
        );

        if (timerLiberacao) {
            clearTimeout(timerLiberacao);
        }
    }

    if (idiomaTraduzidoAtivo()) {

        const estilo = document.createElement("style");

        estilo.textContent = `
            html.gt-aguardando-traducao body{
                opacity:0;
            }

            body{
                transition:opacity .12s ease;
            }
        `;

        document.head.appendChild(estilo);

        document.documentElement.classList.add(
            "gt-aguardando-traducao"
        );

        /* Segurança: nunca deixa a página oculta */

        timerLiberacao = setTimeout(
            liberarPagina,
            1200
        );
    }
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
/* Nome compacto do idioma: PT / EN / ES */

script.addEventListener("load", function () {

    const wrapper = document.querySelector(".gtranslate_wrapper");
    
    setTimeout(liberarPagina, 300);
    
    if (!wrapper) return;

    function compactarIdioma() {

        const selecionado = wrapper.querySelector(".gt_selected a");

        if (!selecionado) return;

        const texto = selecionado.textContent
            .trim()
            .toLowerCase();

        let codigo = "PT";

        if (texto.includes("english") || texto === "en") {
            codigo = "EN";
        }

        if (
            texto.includes("spanish") ||
            texto.includes("español") ||
            texto === "es"
        ) {
            codigo = "ES";
        }

        const textoOriginal = Array
            .from(selecionado.childNodes)
            .find(function (node) {
                return node.nodeType === 3 &&
                       node.textContent.trim() !== "";
            });

        if (
            textoOriginal &&
            textoOriginal.textContent.trim() !== codigo
        ) {
            textoOriginal.textContent = " " + codigo;
        }
    }

    compactarIdioma();

    const observer = new MutationObserver(compactarIdioma);

    observer.observe(wrapper, {
        childList: true,
        subtree: true,
        characterData: true
    });

});
        script.addEventListener("error", liberarPagina);
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
