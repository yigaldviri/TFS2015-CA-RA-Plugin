var gulp = require("gulp");
var del = require("del");
var tsb = require("gulp-tsb");
var tslint = require("gulp-tslint");
var istanbul = require("gulp-istanbul");
var path = require("path");
var shell = require('shelljs')
var gutil = require('gulp-util');
var fs = require('fs');

var buildDirectory = "_build";
var packageDirectory = "_package";
var sourcePaths = {
    typescriptFiles: "src/**/*.ts",
    copyFiles: ["src/*.json", "src/*.md", "src/images/*", "src/Tasks/**/*.json", "src/Tasks/**/*.md", "src/Tasks/**/*.png", "src/Tasks/**/*.svg"],
    tasksPath: "src/Tasks"
};
var testPaths = {
    typescriptFiles: "tests/**/*.ts",
    compiledJSFiles: buildDirectory + "/**/*Tests*.js"
};
var manifestFile = "vss-extension.json";
var tempPath = "_temp";
var tempNodeModules = path.join(tempPath, 'node_modules');

// create and keep compiler
var compilation = tsb.create({
    target: 'es5',
    module: 'commonjs',
    declaration: false,
    verbose: false
});

gulp.task("compile", ["lint"], function () {
    return gulp.src([sourcePaths.typescriptFiles, testPaths.typescriptFiles], { base: "." })
        .pipe(compilation())
        .pipe(gulp.dest(buildDirectory))
        .pipe(istanbul({ includeUntested: true }))
        .pipe(istanbul.hookRequire());
});

gulp.task("build", ["compile"], function() {
    return gulp.src(sourcePaths.copyFiles, { base: "." })
        .pipe(gulp.dest(buildDirectory));
});

gulp.task("lint", ["clean"], function() {
    return gulp.src([sourcePaths.typescriptFiles, testPaths.typescriptFiles])
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
});

gulp.task("clean", function() {
    return del([buildDirectory, packageDirectory, tempPath]);
});

gulp.task("package", ["gettasklib"], function(cb) {
    fs.readdirSync(sourcePaths.tasksPath).filter(function (file) {
        return fs.statSync(path.join(sourcePaths.tasksPath, file)).isDirectory();
    }).forEach(copyTaskLib);
    createPackage(cb);
});

gulp.task('default', ['build'], function() {
    gulp.start('package');
});

gulp.task("gettasklib", function (cb) {
    getLatestTaskLib(cb);
});

var createPackage = function (cb) {
    var srcBuildDirectory = buildDirectory + "/src";
    createVsix(manifestFile, srcBuildDirectory, packageDirectory, cb);
}

var createVsix = function(manifestFile, srcBuildDirectory, packageDirectory, cb) {
    shell.exec("tfx extension create --manifest-globs " + manifestFile + " --root " + srcBuildDirectory + " --output-path " + packageDirectory, {silent:true}, function(code, output) {
        if (code !== 0) {
            cb(createError(output));
        }
        else {
            cb();
        }
    });
}

var getLatestTaskLib = function(cb) {
    gutil.log('Getting latest vsts-task-lib');
    shell.mkdir('-p', path.join(tempPath, 'node_modules'));
    shell.cp("-f", "package.json", tempPath);
    shell.pushd(tempPath);

    var npmPath = shell.which('npm');
    if (!npmPath) {
        cb(createError('npm not found.  ensure npm 3 or greater is installed'));
        return;
    }

    var cmdline = '"' + npmPath + '" install --production';
    shell.exec(cmdline, { silent: true }, function (code, output) {
        shell.popd();
        if (code !== 0) {
            cb(createError('npm failed to install vsts-task-lib. Output : ' + output));
        }
        else {
            cb();
        }
    });
}

var createError = function (err) {
    return new gutil.PluginError({
        plugin: "package",
        message: err
    });
}

var copyTaskLib = function(taskName) {
    var targetPath = path.join(buildDirectory, "src", "Tasks", taskName);
    shell.mkdir('-p', targetPath);
    shell.cp('-rf', path.join(tempPath, 'node_modules'), targetPath); 
}
