{
    getArticle: function () {
        const $article = $("#view_content");
        let ret;
        $article
            .find("div")
            .each(function () {
                if ($(this).children().length) {
                    $(this).replaceWith($(this).children());
                }
            });
        if (!$("#view_content").length) {
            ret = $(".group_viewbox_body .pcb");
        } else {
            ret = $("#view_content");
        }

        let found = true;

        ret
            .find("div")
            .each(function () {
                if ($(this).html().length < 5) {
                    $(this).remove();
                }
            });
        console.log("c");

        while (found) {
            found = false;
            ret
                .find("*")
                .each(function () {
                    const $dom = $(this);
                    if ($dom.children().length === 1 && $dom.html().length < $dom.children()[0].outerHTML.length + 5) {
                        $dom[0].outerHTML = $dom[0].innerHTML;
                        found = true;
                    }
                });
        }
        ret
            .find("td")
            .each(function () {
                const $dom = $(this);
                console.log("b");
                console.log($dom.closest("table").length)
                if (!$dom.closest("table").length) {
                    $dom.outerHTML = $dom.innerHTML;
                }
            });
        return ret;
    },
    handle: function ({registerHandler, output, commonOutput}) {
        registerHandler("A", function ($dom) {
            if ($dom.find("img").length) { //image
                $dom = $dom.find("img");
                var url = $dom.attr("src");
                return {
                    name: "pic_link_full_default_empty_gap",
                    data: {
                        src: url
                    }
                };
            } else {
                commonOutput($dom);
            }
        });
        registerHandler("STRONG", function ($dom) {
            return {
                name: "one_level_p",
                data: {
                    data: $dom.html()
                }
            }
        });
    }
}