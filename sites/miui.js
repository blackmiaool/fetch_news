{
    getArticle: function () {
        const $article = $(".pct .t_f").eq(0);
        $article.find(".aimg_tip").remove();
        $article.html($article.html().replace(/<br>/g, "<p>"));
        return $article;
    },
    handle: function ({
        registerHandler,
        output,
        commonOutput
    }) {
        registerHandler("BR", function ($dom) {});
        registerHandler("P", handler);
        registerHandler("DIV", handler);
        registerHandler("FONT", handler);

        function handler($dom) {
            if ($dom.find("img").length) { //image
                console.log($dom);
                $dom = $dom.find("img");
                var urlRaw = $dom.attr("zoomfile");
                var url = urlRaw
                if (!url.match(/thumb/)) {
                    url += ".thumb.";
                    if (urlRaw.match(/\.(\w+)$/)) {
                        url += urlRaw.match(/\.(\w+)$/)[1];
                    } else {
                        url += "jpg";
                    }
                    console.log(url)
                }
                output.push({
                    name: "pic_link_full_default_empty_gap",
                    data: {
                        src: url
                    }
                });
            } else {
                if ($dom.find("*").length > 1) {
                    if (!$dom.text()) {
                        return;
                    }
                    if (!$dom.height()) {
                        return;
                    }
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
                    if (text.trim()) {
                        output.push({
                            name: "two_level_p",
                            data: {
                                data: text
                            },
                        });
                    }
                }



            }
        }
    }
}
