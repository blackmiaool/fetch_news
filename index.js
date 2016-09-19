// ==UserScript==
// @name         Fetch News
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http://www.ifanr.com/*
// @include      http://bbs.xiaomi.cn/*
// @include      http://www.igao7.com/news/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function () {
    'use strict';
    var site = new String(location.hostname.match(/\w+\.(\w*)/)[1]);
    site[site] = 1;
    unsafeWindow.homeTheft = function () {
        var output = [];
        if (site.ifanr && $("#article-header")) {
            output.push({
                name: "article_page_header",
                data: {
                    src: $("#article-header").css("background-image").match(/"([^\"]*)"/)[1],
                    content: $("#article-header").find(".c-single-normal__title").text()
                }
            });
        }
        var $article;
        switch (site.toString()) {
        case "ifanr":
            $article = $("article");
            break;
        case "xiaomi":
            $article = $(".invitation_content")
            break;
        case "igao7":
            $article = $(".content");
            break;
        }
        $article.find("script,link,style").remove();

        function commonOutput($dom) {
            var html = $dom[0].outerHTML;
            if (html) {
                output.push({
                    name: "common",
                    data: {
                        data: html
                    },
                });
            }
        }

        var handlers = {};

        function registerHandler(tagName, cb) {
            handlers[tagName] = cb;
        }
        registerHandler("H2", function ($dom) {
            var text = $dom.text();
            if (text) {
                output.push({
                    name: "one_level_p",
                    data: {
                        data: text
                    },
                });
            }
        });
        if (site.ifanr) {
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
                    if ($dom.attr("style")) {
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

        } else if (site.xiaomi) {
            registerHandler("P", function ($dom) {
                if ($dom.find("[dateline]").length) { //image
                    $dom = $dom.find("[dateline]");
                    var url = $dom.data("original");
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
        } else if (site.igao7) {
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


        }
        $article.children().each(function(){
            var $dom=$(this);
            
            if(handlers[$dom.prop("tagName")]){
                handlers[$dom.prop("tagName")]($dom);
            }else{
                commonOutput($dom);
            }
            
        })

        $(".theft-output").remove();
        var $output = $("<textarea style='position:fixed;left:0;top:0;height:300px;width:200px;' class='theft-output' />");
        $output.val(JSON.stringify(output));
        $(document.body).append($output);

    };

    //add trigger btn
    var initStyle = ".theft-btn{display:block;padding:10px;border: 1px solid #e6e6e6;text-align:center;cursor:pointer;";
    var $btn = $("<a class='theft-btn' onclick='homeTheft()'>盗图</a>");
    switch (site.toString()) {
    case "ifanr":
        initStyle += "background-color:white;}";
        $(".c-related-articles").after($btn);
        break;
    case "xiaomi":
        initStyle += "}";
        $(".sidebar").append($btn);
        break;
    case "igao7":
        initStyle += "position:absolute;left:0;right:0;}";
        $(".gotoBar").append($btn);
        break;
    }
    GM_addStyle(initStyle);
    // Your code here...
})();





