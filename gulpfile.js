const gulp = require('gulp')

function copyScss() {
    return gulp.src('./src/**/*.scss')
        .pipe(gulp.dest('./es/'));
}

function copyImg() {
    return gulp.src('./src/**/*.{png,jpg,svg,gif,ico}')
        .pipe(gulp.dest('./es/'));
}

function copyTs() {
    return gulp.src('./src/**/*.d.ts')
        .pipe(gulp.dest('./es/'));
}

const build = gulp.series(gulp.parallel(copyScss, copyImg, copyTs));

exports.build = build;

exports.default = build;