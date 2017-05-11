{
    getArticle: function () {
        let $article = $(".article-left").eq(0);
        if ($article.children().length < 3) {
            $article = $article.children()[0];
        }
        return $article;
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
        });
        registerHandler("H2", function ($dom) {
            var html = $dom.html();
            if (html) {
                output.push({
                    name: "common",
                    data: {
                        data: html
                    },
                });
            }
        });
        registerHandler("BLOCKQUOTE", function ($dom) {
            var html = $dom[0].outerHTML;
            if (html) {
                output.push({
                    name: "common",
                    data: {
                        data: html
                    },
                });
            }
        });
    }
}
