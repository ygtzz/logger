module.exports = function (gulp, plugin, config) {
    var sBase = config.sDest;
    gulp.task('manifest', function () {
        return gulp.src(sBase + '/*.html')
            //根目录 sBase + '/manifest.js'
            //所有子目录 sBase + '/**/manifest.*.js'
            .pipe(plugin.inject(gulp.src(sBase + '/**/manifest.*.js'), {
                starttag: '<!-- inject:manifest -->',
                transform: function (filePath, file) {
                    console.log(file);
                    return '<script>' + file.contents.toString('utf8') + '</script>';
                }
            }))
            .pipe(gulp.dest(sBase));
    });
}
