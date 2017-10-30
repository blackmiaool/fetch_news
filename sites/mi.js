{
    getArticle: function () {
        const $article = $(".w-e-text").eq(0);
        $article.find('.preview-image').each((i, dom) => {
            const $dom = $(dom);
            $dom.replaceWith($dom.find('img'));
        });
        $article.find("*").each((i, dom) => {
            const $dom = $(dom);
            const size=$dom.css('font-size');
            if(size.includes('rem')){
                $dom.css('font-size','');
            }
        });
        return $article;
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        registerHandler(function ($dom) {
            let ret;
            if ($dom.prop('tagName') !== 'P') {
                ret = false;
            }
            if ($dom.children().prop('tagName') === 'SPAN' && !$dom.children().children().length) {
                ret = $dom.text().length > 3;
            }
            console.log($dom.text(),ret);
            return ret;

        }, function ($dom) {
            return {
                name: "two_level_p",
                data: {
                    data: $dom
                        .text()
                        .replace(/<br>/g, "")
                }
            };
        })

    }
}
