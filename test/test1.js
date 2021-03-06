/**
 * Created by amills001c on 8/24/15.
 */


//core
var gulp = require('gulp');
var grm = require('../index');
const async = require('async');


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
        inputFolder: './test/test-data',
        appendThisToDependencies: 'append/what/you/need',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: true,
        output: './test/test-results/test_one_results.js'
    }
};


gulp.task('metagen:all', function (done) {
    runAllMetagens(done);
});


