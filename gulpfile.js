let gulp = require('gulp')
let sass = require('gulp-sass')
let autoPrefix = require('gulp-autoprefixer')

gulp.task('sass' , () => 
   gulp.src('./src/sass/**/*.scss')
      .pipe(sass())
      .pipe(autoPrefix())
      .pipe(gulp.dest('./public/css'))
)

gulp.task('watch' , () => {
   gulp.watch('./src/sass/**/*.scss' , ['sass'])
})

gulp.task('default' , ['watch'])