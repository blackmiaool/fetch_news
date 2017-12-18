{
    getArticle: function () {
        const $article = $(".article_detail");
        return $article;
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        registerHandler(function ($dom) {
            const ret = $dom.attr("align") === "left" && $dom.text().length && !$dom.find("img").length;
            return ret;
        }, function ($dom) {
            return {
                name: "two_level_p",
                data: {
                    data: $dom.text()
                },
            }
        })
    }
}
