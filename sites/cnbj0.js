{
    getArticle: function () {
        return $("body").eq(0)
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        registerHandler("P", function ($dom) {
            var text = $dom.text();
            if (text) {
                return {
                    name: "two_level_p",
                    data: {
                        data: text
                    },
                };
            }
        });
        registerHandler("div.zb-img", function ($dom) {
            if ($dom.find("img").length) { //image
                $dom = $dom.find("img");
                var url = $dom.attr("src");
                return {
                    name: "pic_link_full_default_empty_gap",
                    data: {
                        src: url
                    }
                };
            }
        });
        registerHandler("div.zb-line-title", function ($dom) {
            var text = $dom.text();
            if (text) {
                return {
                    name: "corner_orange_title",
                    data: {
                        data: text
                    },
                };
            }
        });
        registerHandler("div#lead", function ($dom) {
            var text = $dom.text();
            if (text) {
                return {
                    name: "zhaiyao2",
                    data: {
                        data: text
                    },
                };
            }
        });

    }
}
