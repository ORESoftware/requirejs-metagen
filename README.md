# gulp-requirejs-metagen
use gulp to generate requirejs dependency files containing dynamic paths for your controllers, views, etc


# how to use



//we might have something like this on our front-end, most likely in a router:


   controllerRoute: function (controllerName, actionName, id) {
              
         require(["app/js/controllers/all/" + controllerName], function (cntr) {
                  
                    if (typeof cntr[actionName] === 'function') {
                        cntr[actionName](id);
                    }
                    else {
                        cntr['default'](id);
                    }
                });
       }


//so in order to require all those controllers, especially for use with r.js (the optimizer), we do:

var grm = require('gulp-requirejs-metagen');

var controllerOpts =  {
        inputFolder: './public/static/app/js/controllers/all',
        appendThisToDependencies: 'app/js/controllers/',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: true,     //will drop 'all' from the front of all return items
        output: './public/static/app/js/meta/allControllers.js' //puts all controllers into one RequireJS file/module
    };
    
    
grm(controllerOpts, function (err) {
     //handle any unlikely errors your way
  });
  
  
---->  output looks like this module below:


//app/js/meta//allControllers.js

define(
    [
        "app/js/controllers/all/jobs",
		"app/js/controllers/all/more/cars",
		"app/js/controllers/all/more/evenMore/spaceships",
		"app/js/controllers/all/users"
    ],
    function(){

        return {

            "jobs": arguments[0],
			"more/cars": arguments[1],
			"more/evenMore/spaceships": arguments[2],
			"users": arguments[3]
        }
  });
  
  
  in your front-end program I recommend doing this:
  
  
  requirejs.config({
 
   paths: {
   
      "#allControllers":"app/js/meta/allControllers"
   
      }
  });
  
  then you can do:
  
  require(['#allControllers'],function(allControllers){
  
      var carController = allControllers['more/cars'];
  
  });



//testing

install gulp globally "npm install -g gulp"

run the tests with:

gulp --gulpfile test/test1.js 

