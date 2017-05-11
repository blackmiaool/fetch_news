{
    getArticle: function () {
        const $article = $(".article-content");
        const children = $article.children();
        if (children.length === 1) {
            return children.eq(0);
        }
        return $article;


    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        registerHandler("blockquote", function ($dom) {
            return {
                name: 'zhaiyao2',
                data: {
                    data: $dom.text()
                }
            }
        });
    }
}
