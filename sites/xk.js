{
    getArticle: function () {
        const $article=$(".plyr__video-wrapper");
        $article.find("*:not(video)").remove();
        return $article;
    },
    handle: function ({registerHandler, output, commonOutput}) {

    }
}