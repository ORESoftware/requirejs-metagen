/**
 * Created by amills001c on 8/24/15.
 */




//core
var gulp = require('gulp');

//this lib to test!
var grm = require('../index');


gulp.task('bbb1', function (cb) {
    grm('../testData/one',
        'jsx!app/js/views/',
        '',
        true,
        '../testResults/test_one_results.js',
        function () {
            cb();
        })
});

var opts = {
    inputFolder: '../testData/one',
    appendThisToDependencies: 'jsx!app/js/views/',
    appendThisToReturnedItems: 'dude-',
    eliminateSharedFolder: true,
    output: '../testResults/test_one_results.js'
};

//gulp.task('bbb1', function (cb) {
//    grm(opts, function () {
//        cb();
//    });
//});


//gulp.task('bbb2',function(cb){
//    grm('./public/static/app/js/controllers', 'app/js/','./public/static/app/js/meta/allControllers.js', function(){
//        cb();
//    })
//});
//
//gulp.task('bbb3',function(cb){
//    grm('./public/static/cssx', 'text!','./public/static/app/js/meta/allCSS.js', function(){
//        cb();
//    })
//});
//
//gulp.task('bbb4',function(cb){
//    grm('./public/static/app/js/flux/dispatchers', 'app/js/flux/','./public/static/app/js/meta/allDispatchers.js', function(){
//        cb();
//    })
//});


gulp.task('default', function () {

    gulp.run('bbb1', function () {
        console.log('done with bbb1 task');
    });

    //gulp.run('bbb2', function(){
    //    console.log('done with bbb2 task');
    //});
    //
    //gulp.run('bbb3', function(){
    //    console.log('done with bbb3 task');
    //});
    //
    //gulp.run('bbb4', function(){
    //    console.log('done with bbb4 task');
    //});

});

