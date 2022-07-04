const { src, dest, series, watch } = require('gulp')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlm = require('gulp-htmlmin')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const del = require('del')
const sync = require('browser-sync')
const htmlmin = require('gulp-htmlmin')

function html() {
  return src('src/**.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(scss())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'))
}

function del() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(del, html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(del, scss)).on('change', sync.reload)
}

exports.build = series(del, html, scss)
exports.serve = series(del, html, scss, serve)
exports.del = del
