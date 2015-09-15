/**
 * Created by amills001c on 9/14/15.
 */

//core
var gulp = require('gulp');
var async = require('async');

//this lib
var grm = require('./index');


function runAllMetagens(done) {
    var taskNames = Object.keys(metagens);
    var funcs = [];

    taskNames.forEach(function (name) {
        funcs.push(function (cb) {
            grm(metagens[name], function (err) {
                cb(err);
            });
        });
    });

    async.parallel(funcs, function (err) {
        done(err);
    });
}


var metagens = {
    "example_1": {
        inputFolder: './testData',
        appendThisToDependencies: '',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: true,
        output: './testResults/test_1_results.js'
    },
    "example_2": {
        inputFolder: './testData',
        appendThisToDependencies: 'dog/bird/cat/',
        appendThisToReturnedItems: 'jet/black/rims/',
        eliminateSharedFolder: true,
        output: './testResults/test_2_results.js'
    },
    "example_3": {
        inputFolder: './testData',
        appendThisToDependencies: 'jsx!',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: true,
        output: './testResults/test_3_results.js'
    },
    "example_4": {
        inputFolder: './testData',
        appendThisToDependencies: 'text!',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: true,
        output: './testResults/test_4_results.js'
    }
};


gulp.task('metagen:all', function (done) {
    runAllMetagens(done);
});


