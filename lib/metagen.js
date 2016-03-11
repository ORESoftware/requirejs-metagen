/**
 * Created by denman on 8/9/2015.
 */


var path = require('path');
var replaceStream = require('replacestream');
var fs = require('fs');
var fse = require('fs-extra');
var _ = require('lodash');


function replaceAll(str, target, replacement) {
    return str.split(target).join(replacement);
}

function grm(filepath, toAppend, toAppendR, elmSharedFolder, outputFile, cb) {

    var fullPath, fullPathOutput, templatePath, str, stars, dollars;

    if (typeof filepath === 'object') {
        var opts = filepath;
        cb = toAppend;

        var inputFolder = opts.inputFolder;
        var appendThisToDependencies = opts.appendThisToDependencies || '';
        var appendThisToReturnedItems = opts.appendThisToReturnedItems || '';
        var eliminateSharedFolder = opts.eliminateSharedFolder || false;
        var output = opts.output;

        fullPath = replaceAll(path.normalize(String(path.resolve(inputFolder))), '\\', '/');
        fullPathOutput = replaceAll(path.normalize(String(path.resolve(output))), '\\', '/');

        str = require('./all-files')(fullPath, appendThisToDependencies, appendThisToReturnedItems, eliminateSharedFolder);
    }
    else {

        fullPath = replaceAll(path.normalize(String(path.resolve(filepath))), '\\', '/');
        fullPathOutput = replaceAll(path.normalize(String(path.resolve(outputFile))), '\\', '/');
        str = require('./all-files')(fullPath, toAppend, toAppendR, elmSharedFolder);
    }

    stars = str.split(';')[0];
    dollars = str.split(';')[1];

    if (typeof cb !== 'function') {
        cb = function no_op() {
        }
    }
    else {
        cb = _.once(cb);
    }

    templatePath = path.resolve(__dirname, 'requirejs-template.txt');

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
            fse.createOutputStream(fullPathOutput)).on('error', function (err) {
        cb(err);
    }).on('close', function (msg) {
        cb(null, msg);
    });

}


module.exports = grm;