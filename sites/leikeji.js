{
    getArticle: function () {
        return $(".article-content");
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        registerHandler("H3", function ($dom) {
            var text = $dom.text();
            if (text) {
                return {
                    name: "big_orange_title",
                    data: {
                        data: text
                    },
                };
            }
        });
    }
}
