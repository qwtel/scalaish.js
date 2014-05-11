var gulp = require('gulp');
var es6ModuleTranspiler = require("gulp-es6-module-transpiler");

function transpile(to) {
  return gulp.src("./src/**/*.js")
    .pipe(es6ModuleTranspiler({
      type: to
    }))
    .pipe(gulp.dest("./dist/" + to));

}

gulp.task('amd', function () {
  return transpile('amd')
});

gulp.task('cjs', function () {
  return transpile('cjs')
});

gulp.task('transpile', ['amd', 'cjs']);

gulp.task('compile', ['transpile']);

gulp.task('watch', ['compile'], function() {
  gulp.watch('./src/**/*.js', ['transpile']);
});

gulp.task('development', ['watch']);

gulp.task('default', ['development']);
