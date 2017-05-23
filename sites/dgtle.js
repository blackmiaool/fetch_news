{
    getArticle: function () {
        const $article = $("#view_content");
        $article.find("div").each(function () {
            if($(this).children().length){
                $(this).replaceWith($(this).children());    
            }            
        });
        return $("#view_content");
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
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
