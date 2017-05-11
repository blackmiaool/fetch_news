{
    getArticle: function () {
        return $("#js_content");
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        registerHandler("P", function ($dom) {
            if ($dom.find("img").length) { //image
                $dom = $dom.find("img");
                var url = $dom.data("src");
                output.push({
                    name: "pic_link_full_default_empty_gap",
                    data: {
                        src: url
                    }
                });
            } else {
                if ($dom.find("*").length > 1) {
                    $dom.find("*").css({
                        "font-size": "16px",
                        "line-height": "28.8px"
                    });
                    $dom.css({
                        "font-size": "16px",
                        "line-height": "28.8px"
                    });
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
