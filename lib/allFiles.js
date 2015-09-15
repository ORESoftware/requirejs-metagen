/**
 * Created by denman on 8/2/2015.
 */

var fs = require("fs");
var path = require('path');
var _ = require('underscore');


function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var acceptableExtensions = ['.hbs','.ejs','.js','.jsx','.css','.less','.sass','.coffee','.ts'];


var dirs = null;


var getAllFilesFromFolder = function (dir) {

    var results = [];
    var stat = null;

    fs.readdirSync(dir).forEach(function (file) {

        file = dir + '/' + file;

        stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFilesFromFolder(file))
        }
        else {
            var str = String(file);
            if(_.contains(acceptableExtensions,path.extname(str))){
                results.push(str);
            }
        }
    });

    return results;
};

module.exports = function runTheTrap(dir, append1, append2, eliminateSharedFolder) {

    dirs = String(dir).split('/');

    var length = dirs.length - 1;

    var resulz = getAllFilesFromFolder(dir);


    var array1 = resulz.map(function (item) {
        var split = String(item).split('/');
        for (var i = 0; i < length; i++) {
            split.shift();
        }
        item = split.join('/');

        if(endsWith(item,'.js')){
            item = item.substring(0,item.length-3);
        }

        return '"' + append1 + item + '"'; //only need to replace .js if the file ends in .js..
    });


    if (eliminateSharedFolder === true) {
        length++;
    }

    var array2 = resulz.map(function (item, index) {

        var split = String(item).split('/');
        for (var i = 0; i < length; i++) {
            split.shift();
        }
        item = split.join('/');

        if(endsWith(item,'.js')){
            item = item.substring(0,item.length-3);
        }

        var firstPart = '"' + append2 + item + '"'; //only need to replace .js if the file ends in .js..
        var secondPart = ': arguments['.concat(index).concat(']');
        return firstPart + secondPart;
    });


    return array1.join(',\n\t\t').concat(';').concat(array2.join(',\n\t\t\t'));

};

