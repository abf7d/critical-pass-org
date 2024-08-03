const { src, dest, parallel, series, watch } = require('gulp');
// Gulp Sass
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const minify = require('gulp-minifier');
const fs = require('fs');
const run = require('gulp-run-command').default;

const browserSync = require('browser-sync').create();

// Added browserSnyc so wher yuo run gulp develop it will open the browser and reload the page when you make changes to the files.
// I'm also loading the config file based on the environment. I have two config files, one for development and one for production.
// When you run gulp build it will load the production config file and when you run gulp develop it will load the development config file.

function browserSyncTask(cb) {
    browserSync.init({
        server: {
            baseDir: './docs'
        }
    });
}

let config; 

function loadConfig(environment) {
  const configFile = `./config.${environment}.json`;
  config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
}

const configs = {
    nodeRoot: './',
    vendorRoot: 'src'
};

// COMPILE - HTML FILES
function htmls(cb) {
    src(['html/**', '!html/assets/**', '!html/from/**', '!html/images/**'])
    .pipe(replace('%%BASEURL%%', config.baseUrl))
    .pipe(dest('docs'))
        .on('end', browserSync.reload); 
    cb();
}


// COMPILE - SCSS STYLE
function stylecss(cb) {
    src([`src/scss/*.scss`])
        // .pipe(sourcemaps.init())                 // If you want generate source map.
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))    // If you want non-minify css then remove {outputStyle: 'compressed'} in sass()
        // .pipe(sourcemaps.write('./'))            // If you want generate source map.
        .pipe(dest(`docs/assets/css`))
        .pipe(browserSync.stream()); 
    cb();
}



// COMPILE - JAVASCRIPTS
function jsvendor(cb) {

    src([`src/js/**`, `!src/js/bundle.js`, `!src/js/vendors/**`])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root',
            context: {
                vendorRoot: configs.vendorRoot,
                build: 'docs',
                nodeRoot: configs.nodeRoot
            }
        }))
        .pipe(minify({ minify: true, minifyJS: { sourceMap: false } }))
        .pipe(dest(`docs/assets/js`));

    src([`src/js/bundle.js`])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root',
            context: {
                vendorRoot: configs.vendorRoot,
                build: 'docs',
                nodeRoot: configs.nodeRoot
            }
        }))
        .pipe(minify({ minify: true, minifyJS: { sourceMap: false } }))
        .pipe(dest(`docs/assets/js`));

    cb();
}

// COPYING - ASSETS & IMAGES
function assets(cb) {
    src(`src/assets/fonts/**`).pipe(dest(`docs/assets/fonts`));
    src(`src/assets/images/**`).pipe(dest(`docs/assets/images`));
    src(`html/images/**`).pipe(dest(`docs/images`));
    src(`html/form/**`).pipe(dest(`docs/form`));
    cb();
}


exports.build = series((cb) => {
    loadConfig('production');
    cb();
},
  htmls, jsvendor, stylecss, assets);

exports.develop = function () {
    loadConfig('development');
    browserSyncTask(); 
    watch([`html/*.html`]).on('change', series(htmls))
    watch([`src/js/**`]).on('change', series(jsvendor))
    watch([`src/scss/**`], { ignoreInitial: false }, series(stylecss))
    watch([`src/assets/**`, `html/images/**`, `html/form/**`]).on('change', series(assets))
}

exports.watch = run(['gulp build', 'gulp develop']);
