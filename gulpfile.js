const gulp = require('gulp');
const path = require('path');
const concat = require("gulp-concat");
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const banner = require('gulp-banner');
const headerfooter = require("gulp-header-footer");
const fs = require("fs");
const treeify = require('file-tree-sync');
const sites = treeify(path.join(__dirname, 'sites'), ['.*']);

fs.readFileAsync = function (filename) {
    return new Promise(function (resolve, reject) {
        fs
            .readFile(filename, function (err, data) {
                if (err) 
                    reject(err);
                else 
                    resolve(data);
                }
            );
    });
};

const comment = `// ==UserScript==
// @name         Fetch News
// @namespace    http://tampermonkey.net/
// @version      <%= version %>
// @description  try to take over the world!
// @author       You
// @include      http://www.ifanr.com/*
// @include      https://www.ifanr.com/*
// @include      http://bbs.xiaomi.cn/*
// @include      https://bbs.xiaomi.cn/*
// @include      http://www.igao7.com/news/*
// @include      https://mp.weixin.qq.com/*
// @include      http://mp.weixin.qq.com/*
// @include      http://www.miui.com/*
// @include      https://www.miui.com/*
// @include      http://www.leiphone.com/*
// @include      https://www.leiphone.com/*
// @include      http://cdn.cnbj0.fds.api.mi-img.com/*
// @include      https://cdn.cnbj0.fds.api.mi-img.com/*
// @include      https://www.dgtle.com/*
// @include      http://www.dgtle.com/*
// @include      https://bbs.dgtle.com/*
// @include      http://bbs.dgtle.com/*
// @include      http://www.zaeke.com/*
// @include      https://www.zaeke.com/*
// @include      http://www.leikeji.com/*
// @include      https://www.leikeji.com/*
// @include      http://www.toutiao.com/*
// @include      https://www.toutiao.com/*
// @include      http://www.techmiao.com/*
// @include      http://s1.mi.com/*
// @include      https://s1.mi.com/*
// @include      http://share.xk.miui.com/*
// @include      https://share.xk.miui.com/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==
\n\n`;

gulp.task('default', function () {
    const filesQueue = [];
    console.log("default");
    const version = fs
        .readFileSync("index.js")
        .toString()
        .match(/version\s+(\d+)/)[1];
    console.log('version', version);
    setTimeout(function () {

        sites
            .forEach(function (v) {
                filesQueue.push(fs.readFileAsync(v.fullpath));
            });
        let fullCode = `var sites={`;
        Promise
            .all(filesQueue)
            .then(function (result) {

                result = result.forEach(function (v, i) {
                    const code = v.toString();
                    const name = sites[i]
                        .name
                        .match(/^\w+(?=\.)/)[0];

                    fullCode += `'${name}':${code},`;
                });
                fullCode += `};\n`;
                console.log('f', fullCode.length)
                gulp
                    .src(['zepto.js', 'main.js'])
                    .pipe(concat("index.js"))
                    .pipe(headerfooter({
                        header: "!(function(){" + fullCode,
                        footer: "})();",
                        filter: function () {
                            return true;
                        }
                    }))
                    .pipe(banner(comment, {
                        version: version * 1 + 1
                    }))
                    .pipe(gulp.dest('./'))
                //            .pipe(livereload())
            });
    }, 500);

});

gulp.task('reload', function () {
    gulp
        .src("")
        .pipe(livereload());
});
livereload.listen();
gulp.watch([
    "sites/*", './*.js', '!./index.js'
], ['default']);
