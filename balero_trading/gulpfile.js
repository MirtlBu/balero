'use strict';

const series = require('gulp'),
    parallel = require('gulp'),
    gulp = require('gulp'),
    del = require("del"),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
    imageminPngquant = require('imagemin-pngquant'),
    include = require('gulp-html-tag-include'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'), path = require('path'),
    less = require('gulp-less'),
    sass = require('gulp-sass');

//изменяет рабочую папку на "static"
process.chdir('static');

const paths = {
    css: 'css/',
    preprocessors: 'preprocessors/',
    js: 'js/',
    img: 'img/',
    html: {
        templates_eng: 'templates-eng/',
        templates_rus: 'templates-rus/',
        index: ''
    },
    fonts: 'fonts/',
    vendors: 'vendors/',
    build: '../build/',
    favicons: 'favicons/'
}

function server() {
    connect.server({
        root: paths.build,
        livereload: false,
        name: 'Huinitum server',
        port: '8000'
    });
}

function clean() {
  return (async () => {
        const deletedPaths = await del([paths.build], {force: true});
        console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
    })();
}

function sassy() {
    return gulp.src(paths.preprocessors + '*.scss')
        .pipe(concat('style.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('preprocessors.css'))
        .pipe(gulp.dest(paths.css));
}

function lessy() {
    return gulp.src(paths.preprocessors + '*.less')
        .pipe(concat('style.less'))
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(concat('preprocessors.css'))
        .pipe(gulp.dest(paths.css));
}

function css() {
    return gulp.src(['../node_modules/reset-css/reset.css', paths.css + '**/*.css'])
        .pipe(plumber())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.build));
}

function js() {
    return gulp.src(paths.js + '*.js')
        .pipe(plumber())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(paths.build));
}

function vendors() {
    return gulp.src(paths.vendors + '*.js')
        .pipe(gulp.dest(paths.build + 'vendors/'));
}

function fonts() {
    return gulp.src([paths.fonts + '*.otf', paths.fonts + '*.ttf', paths.fonts + '*.woff'])
        .pipe(gulp.dest(paths.build + 'fonts/'));
}

function img() {
    return (async () => {
        const files = await imagemin([paths.img], {
            destination: paths.build + '/img'
        });
    })();
}

function html_rus() {
    return gulp.src(paths.html.templates_rus + '*.html')
        .pipe(plumber())
        .pipe(include())
        .pipe(gulp.dest(paths.build));
}

function html_eng() {
    return gulp.src(paths.html.templates_eng + '*.html')
        .pipe(plumber())
        .pipe(include())
        .pipe(gulp.dest(paths.build));
}

function favicons() {
    return gulp.src(paths.favicons + '*.*')
        .pipe(gulp.dest(paths.build));
}

function css_minifier() {
    return gulp.src(paths.build + 'style.css')
        .pipe(cssmin())
        .pipe(gulp.dest(paths.build));
}

function js_uglifier() {
    return gulp.src(paths.build + 'script.js')
        .pipe(uglify())
        .pipe(gulp.dest(paths.build));
}

function watcher() {
    gulp.watch('**/*.scss', sassy);
    gulp.watch('**/*.less', lessy);
    gulp.watch('**/*.css', css);
    gulp.watch('**/*.js', js);
    gulp.watch('**/*.html', html_vers);
    gulp.watch(['**/*.jpg','**/*.png','**/*.svg', '**/*.gif'], img);
    gulp.watch(['**/*.ttf', '**/*.otf', '**/*.woff'], fonts);
}

const html_vers = gulp.parallel(html_rus, html_eng);
const build = gulp.series(clean, gulp.parallel(css, js, html_vers, img, fonts, vendors, favicons));
const start = gulp.series(build, gulp.parallel(server, watcher));
const prod = gulp.series(clean, gulp.parallel(css, js, html_vers, img, fonts, vendors, favicons), gulp.parallel(css_minifier, js_uglifier));

exports.prod = prod;
exports.start = start;
exports.default = start;
