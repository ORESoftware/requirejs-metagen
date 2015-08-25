/**
 * Created by denman on 8/9/2015.
 */

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;


var gulp = require('gulp');
var path = require('path');
var replaceStream = require('replacestream');
var fs = require('fs');
var fse = require('fs-extra');


const PLUGIN_NAME = 'gulp-requirejs-metagen';

//function prefixStream(prefixText) {
//    var stream = through();
//    stream.write(prefixText);
//    return stream;
//}
//
//// Plugin level function(dealing with files)
//function gulpPrefixer(prefixText) {
//
//    if (!prefixText) {
//        throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
//    }
//    prefixText = new Buffer(prefixText); // allocate ahead of time
//
//    // Creating a stream through which each file will pass
//    return through.obj(function(file, enc, cb) {
//        if (file.isNull()) {
//            // return empty file
//            return cb(null, file);
//        }
//        if (file.isBuffer()) {
//            file.contents = Buffer.concat([prefixText, file.contents]);
//        }
//        if (file.isStream()) {
//            file.contents = file.contents.pipe(prefixStream(prefixText));
//        }
//
//        cb(null, file);
//
//    });
//
//}

function replaceAll(str, target, replacement) {
    return str.split(target).join(replacement);
}

function grm(filepath, toAppend, toAppendR, elmSharedFolder, outputFile, cb) {

    if (typeof filepath === 'object') {
        var options = filepath;
        cb = toAppend;
        if (typeof cb !== 'function') {
            throw new Error('wrong args');
        }
        optionsPath(options, cb);
    }
    else {
        var fullPath = replaceAll(path.normalize(String(path.resolve(filepath))), '\\', '/');
        var fullPathOutput = replaceAll(path.normalize(String(path.resolve(outputFile))), '\\', '/');

        var templatePath = path.resolve(__dirname, 'requirejsTemplate.txt');

        var str = require('./allFiles')(fullPath, toAppend, toAppendR, elmSharedFolder);

        var stars = str.split(';')[0];
        var dollars = str.split(';')[1];


        fs.createReadStream(templatePath)
            .pipe(
            replaceStream('****', stars))
            .pipe(
            replaceStream('$$$$', dollars))
            .pipe(
            fse.createOutputStream(fullPathOutput));

        cb();
    }
}


function optionsPath(opts, cb) {


    var inputFolder = opts.inputFolder;
    var appendThisToDependencies = opts.appendThisToDependencies || '';
    var appendThisToReturnedItems = opts.appendThisToReturnedItems || '';
    var eliminateSharedFolder = opts.eliminateSharedFolder || false;
    var output = opts.output;

    var fullPath = replaceAll(path.normalize(String(path.resolve(inputFolder))), '\\', '/');
    var fullPathOutput = replaceAll(path.normalize(String(path.resolve(output))), '\\', '/');

    var templatePath = path.resolve(__dirname, 'requirejsTemplate.txt');

    console.log('eliminateSharedFolder:',eliminateSharedFolder);
    var str = require('./allFiles')(fullPath, appendThisToDependencies, appendThisToReturnedItems, eliminateSharedFolder);

    var stars = str.split(';')[0];
    var dollars = str.split(';')[1];


    fs.createReadStream(templatePath)
        .pipe(
        replaceStream('****', stars))
        .pipe(
        replaceStream('$$$$', dollars))
        .pipe(
        fse.createOutputStream(fullPathOutput));

    cb();

}

// Exporting the plugin main function
module.exports = grm;