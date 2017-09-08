var $ = Zepto;
var site = new String(location.hostname.match(/\w+\.(\w*)/)[1]);
site[site] = 1;
const source = site;
const sourceConfig = sites[source];
if (typeof unsafeWindow === 'undefined') {
    window.unsafeWindow = window;
}
unsafeWindow.homeTheft = function () {
    var output = [];
    if (site.ifanr && $("#article-header")) {
        output.push({
            name: "article_page_header",
            data: {
                src: $("#article-header,.c-article-header")
                    .css("background-image")
                    .match(/"([^\"]*)"/)[1],
                content: $("#article-header")
                    .find(".c-single-normal__title")
                    .text()
            }
        });
    }
    var $article;
    $article = sourceConfig.getArticle();
    if (!$article.length) {
        alert("找不到文章， 请联系维护者");
        return;
    }

    const blackList = ['width', 'height', 'id', 'aid'];

    function attrFilter(name) {
        if (name.match(/^on/)) {
            return true;
        }

        if (blackList.indexOf(name) > -1) {
            return true;
        }
    }
    $article
        .find("*")
        .each(function () {
            const $dom = $(this);
            const attributes = this.attributes;
            const queue = [];
            for (const i in attributes) {
                if (attributes[i] && attributes[i].name && attrFilter(attributes[i].name)) {
                    queue.push(attributes[i].name);
                }
            }
            queue
                .forEach(function (name) {
                    $dom.removeAttr(name);
                });
        });

    $article
        .find("script,link,style")
        .remove();

    function commonOutput($dom) {
        var html = $dom[0].outerHTML;
        if (html) {
            output.push({
                name: "common",
                data: {
                    data: html
                }
            });
        }
    }

    var handlers = [];

    function registerHandler(selector, handler) {
        handlers.push({selector, handler});
    }
    registerHandler("H2", function ($dom) {
        var text = $dom.text();
        if (text) {
            output.push({
                name: "one_level_p",
                data: {
                    data: text
                }
            });
        }
    });

    registerHandler(function ($dom) {
        if (!$dom.is("p")) {
            return;
        }
        const children = Array
            .prototype
            .slice
            .call($dom[0].childNodes);
        return children.some(function (child) {
            return child.nodeType === 3;
        });
    }, function ($dom) {
        return {
            name: "two_level_p",
            data: {
                data: $dom
                    .html()
                    .replace(/<br>/g, "")
            }
        };
    });

    registerHandler("text", function (text) {
        if (text) {
            output.push({
                name: "two_level_p",
                data: {
                    data: text
                }
            });
        }
    });

    if (sourceConfig.handle) {
        sourceConfig.handle({registerHandler, output, commonOutput});
    }

    let children = Array
        .prototype
        .slice
        .call($article[0].childNodes);

    children = children.filter(function (v) {
        const $dom = $(v);
        if (v.tagName === "BR") {
            return false;
        }
        //        console.log(v, v.nodeValue, v.nodeType);
        if (v.nodeType === 3 && !v.nodeValue.replace(/\s|\n/g, "")) {
            return false;
        }

        if ($dom.is("textarea,.theft-btn")) {
            return false;
        }

        if (v.nodeType === 1) {
            const $dom = $(v);
            const text = $dom
                .text()
                .replace(/\s|\n/g, "");
            if (!$dom.find("img").length && !text.length && $dom.height() < 100) {
                return false;
            }
        }
        return true;
    });

    children = children.map(function (child) {
        if (child.nodeType === 1) {
            const $dom = $(child);
            if ($dom.find("img").length === 1 && singleSonUntil($dom.find("img"), $dom)) {
                return $dom.find("img")[0]
            }
        }
        return child;

        function singleSonUntil($dom, $target) {
            const $parent = $dom.parent();
            if (!$parent.length) {
                return false;
            }
            if ($target[0] === $parent[0]) {
                return true;
            }
            if ($parent.children().length > 1) {
                return false;
            } else {
                return singleSonUntil($parent, $target);
            }
        };
    });
    registerHandler("img", function ($dom) {
        let src= $dom.data("original") || $dom.attr("src") || $dom.data("src");
        if(!src){
            return ;
        }
        if(src.startsWith("/")){
            src=location.origin+src;
        }
        return {
            name: "pic_link_full_default_empty_gap",
            data: {
                src
            }
        }
    });

    children.forEach(function (v) {

        var $dom = $(v);
        let handled = false;
        handlers.some(function ({selector, handler}) {
            let ret;
            if (selector === 'text' && v.nodeType === 3) {
                ret = handler(v.nodeValue.replace(/^\n/, "").replace(/\n$/, ""));

            } else if (typeof selector === 'function') {
                if (selector($dom)) {
                    ret = handler($dom);

                }
            } else if (typeof selector === 'string') {
                if ($dom.is(selector)) {
                    ret = handler($dom);
                }
            }
            if (ret) {
                handled = true;
                output.push(ret);
                return true;
            }

        });

        if (!handled) {
            commonOutput($dom);
        }
        //
        //        var handler = handlers[$dom.prop("tagName")];        for (var i in
        // handlers) {            try {                if ($dom.is(i)) {
        //    handler = handlers[i];                }            } catch (e) {
        //      //nothing;            }        }        if (handler) {            const
        // ret = handler($dom);            if (ret) {                output.push(ret);
        //          }
        //
        //        } else {            commonOutput($dom);        }

    });
    output.forEach(function (v) {
        v.random = Math.random();
    });

    $(".theft-output").remove();
    var $output = $("<textarea style='position:fixed;left:0;top:0;height:300px;width:200px;z-index:10" +
            "0000;' class='theft-output' />");
    $output.val(JSON.stringify(output));
    $(document.body).append($output);

};
console.log(1323)
//add trigger btn
const initStyle = `.theft-btn{
    display: block;
    padding: 10px;
    border: 1px solid #e6e6e6;
    text-align: center;
    cursor: pointer;
    color: black;
    height: 26px;
    width: 60px;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    margin: auto;
    box-sizing:content-box;
    line-height: 26px;
font-size:16px;
}`;
var $btn = $("<a class='theft-btn'>移植</a>");
$btn.on('click',homeTheft);
$(document.body).append($btn);

GM_addStyle(initStyle);