{
    getArticle: function () {
        return $("article");
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        registerHandler("P", function ($dom) {
            if ($dom.find("img").length) { //image
                $dom = $dom.find("img");
                var url = $dom.attr("src");
                output.push({
                    name: "pic_link_full_default_empty_gap",
                    data: {
                        src: url
                    }
                });
            } else {
                if ($dom.attr("style")) {
                    commonOutput($dom);
                } else {
                    var text = $dom.text();
                    if (text) {
                        output.push({
                            name: "two_level_p",
                            data: {
                                data: text
                            },
                        });
                    }
                }


            }
        });
    }
}
