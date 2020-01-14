const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const csso = require("gulp-csso");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglifyes");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const htmlNano = require("gulp-htmlmin");
const del = require("del");

gulp.task("development", function() {
  browserSync.init({
    server: {
      baseDir: "./src"
    },
    notify: false
  });
  gulp.watch("./src/sass/**/*.sass", gulp.parallel("sass"));
  gulp.watch("./src/css/**/*.css").on("change", browserSync.reload);
  gulp.watch("./src/js/**/*.js").on("change", browserSync.reload);
  gulp.watch("./src/*.html").on("change", browserSync.reload);
});

gulp.task("sass", () => {
  return gulp
    .src(["./src/sass/style.sass"])
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(gulp.dest("./src/css"));
});

gulp.task("cssBuild", () => {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(concat("all.min.css"))
    .pipe(autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"]))
    .pipe(csso())
    .pipe(gulp.dest("./build/css"));
});

gulp.task("jsBuild", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(concat("all.min.js"))
    .pipe(
      uglify({
        toplevel: true
      })
    )
    .pipe(gulp.dest("./build/js"));
});

gulp.task("imgBuild", () => {
  return gulp
    .src("./src/img/**/*")
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()]
      })
    )
    .pipe(gulp.dest("./build/img"));
});

gulp.task("htmlBuild", () => {
  return gulp
    .src("./src/*.html")
    .pipe(htmlNano({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build/"));
});

gulp.task("fontsBuild", () => {
  return gulp.src("./src/fonts").pipe(gulp.dest("./build/"));
});

gulp.task("delete", async () => {
  del.sync("build");
});

gulp.task(
  "build",
  gulp.parallel(
    "sass",
    "delete",
    "fontsBuild",
    "htmlBuild",
    "imgBuild",
    "jsBuild",
    "cssBuild"
  )
);
