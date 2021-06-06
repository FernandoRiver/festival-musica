const { series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const concat = require('gulp-concat');


// Utilidades CSS

const autoprefix = require('autoprefixer');
const postcss =require('gulp-postcss');
const cssnano = require('cssnano');
const soursemaps = require('gulp-sourcemaps');
// Funcion que compila SASS

const path = {
    imagenes: 'src/img/**/*',
    imagenesDest: './build/img',

    scss: 'src/scss/app.scss',
    scssDest: './build/css',

    js: './src/js/**/*.js'
}

function css(){
    return src(path.scss)
    .pipe( soursemaps.init() )
    .pipe( sass({
        outputStyle: 'expanded'
    }))
    .pipe( postcss( autoprefix(), cssnano() ) )
    .pipe( soursemaps.write('.') )
    .pipe( dest(path.scssDest) );
}


function minificar(){
    return src(path.scss)
    .pipe( sass({
        outputStyle: 'compressed'
    }))
    .pipe( dest(path.scssDest) );
}
function versionwebp(){
    return src(path.imagenes)
    .pipe( webp() )
    .pipe( dest(path.imagenesDest) );
}

function imagenes(){
    return src(path.imagenes)
    .pipe( imagemin() )
    .pipe( dest(path.imagenesDest) );
}


function watchSCSS(){
    watch('src/scss/**/*.scss', css);
    watch(path.js, javascript);
}

function javascript(){
    return src(path.js)
    .pipe( concat('bundle.js') )
    .pipe( dest('./build/js') );
}

exports.css = css;
exports.minificar = minificar;
exports.imagenes = imagenes;
exports.watchSCSS = watchSCSS;

exports.default = series(css, minificar, imagenes, versionwebp, javascript);