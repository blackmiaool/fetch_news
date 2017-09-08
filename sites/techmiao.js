{
    getArticle: function () {
        const $article = $("#zengarticlecontent");
        $article.find("p").each(function(){
            const $dom=$(this);
            if($dom.attr("style")){
                $dom.attr("style",$dom.attr("style").replace(/background[^;]+;/,""));
            }
        });
        $article.find(`[style="text-align: center;height: 30px;"]`).remove();
        return $article;
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        // registerHandler(function ($dom) {
        //     const ret = $dom.attr("align") === "left" && $dom.text().length && !$dom.find("img").length;
        //     return ret;
        // }, function ($dom) {
        //     return {
        //         name: "two_level_p",
        //         data: {
        //             data: $dom.text()
        //         },
        //     }
        // })
    }
}
