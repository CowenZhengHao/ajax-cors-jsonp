const { watch } = require('gulp');
const browserSync = require('browser-sync').create();
exports.dev = function (cb) {
    browserSync.init({
        server:{
            baseDir:'./html/'
        },
        notify:false
    })
    const watcher = watch(`./html/*.html`);
    watcher.on('change',()=>{
        browserSync.reload();
    })
    cb();
}