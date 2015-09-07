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
var _ = require('underscore');


const PLUGIN_NAME = 'gulp-requirejs-metagen';


function replaceAll(str, target, replacement) {
    return str.split(target).join(replacement);
}

function grm(filepath, toAppend, toAppendR, elmSharedFolder, outputFile, cb) {


    if (typeof filepath === 'object') {
        var options = filepath;
        cb = toAppend;
        if (typeof cb !== 'function') {
            cb = function no_op(){}
        }
        else {
            cb = _.once(cb);
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

        if (typeof cb !== 'function') {
            cb = function no_op(){}
        }
        else {
            cb = _.once(cb);
        }


        fs.createReadStream(templatePath)
            .pipe(
            replaceStream('****', stars)).on('error', function (err) {
                cb(err);
            })
            .pipe(
            replaceStream('$$$$', dollars)).on('error', function (err) {
                cb(err);
            })
            .pipe(
            fse.createOutputStream(fullPathOutput)).on('end', function (msg) {
                cb(null, msg);
            });
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

    console.log('eliminateSharedFolder:', eliminateSharedFolder);
    var str = require('./allFiles')(fullPath, appendThisToDependencies, appendThisToReturnedItems, eliminateSharedFolder);

    var stars = str.split(';')[0];
    var dollars = str.split(';')[1];


    fs.createReadStream(templatePath)
        .pipe(
        replaceStream('****', stars)).on('error', function (err) {
            cb(err);
        })
        .pipe(
        replaceStream('$$$$', dollars)).on('error', function (err) {
            cb(err);
        })
        .pipe(
        fse.createOutputStream(fullPathOutput)).on('end', function (msg) {
            cb(null, msg);
        });

}

// Exporting the plugin main function
module.exports = grm;