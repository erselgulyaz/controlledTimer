const { src , dest , watch , series , parallel } = require("gulp");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const glob = require("glob");
const browserSync = require('browser-sync').create();

const options = {
  srcPath: './src',
  distPath: './dist'
}

function reload() {
  browserSync.reload();
}

function styles() {
  return src(`${options.srcPath}/styles/*.scss`)
      .pipe(sass({outputStyle: "compressed"}))
      .pipe(postcss([autoprefixer()]))
      .pipe(dest(`${options.distPath}/styles`))
      .pipe(browserSync.stream());
}

/*  */

/*  */

function scripts(done) {
  glob(`${options.srcPath}/scripts/*.js`, (err,items) => {
    if (err) done(err);
    items.map(item => {
      console.log(item);
      return browserify({
        entries: item
      })
      .transform(babelify.configure({
        presets : ["@babel/preset-env"]
      }))
      .bundle()
      .pipe(source(item.match(/\/([^\/]+)\/?$/)[1]))
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(dest(`${options.distPath}/scripts`))
      .pipe(browserSync.stream());
    })
    done();
  })
}

function watchTask() {

    browserSync.init({
      server: {
          baseDir: "./"
      }
    });

    watch('./src/styles/*.scss', styles),
    watch('./src/scripts/*.js', scripts);
    watch('./src/scripts/**/*.js', scripts);
    watch("./*.html").on('change', reload);
    parallel(styles, scripts);
  }
  
  exports.default = series(
    parallel(styles, scripts),
    watchTask
  );


