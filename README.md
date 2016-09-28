
Note:
This project has been superceded by the following project which is more generic:
https://github.com/smartprocure/directory-metagen

You can read about this effort by reading this issue:
https://github.com/ORESoftware/requirejs-metagen/issues/1


# requirejs-metagen

Generate requirejs modules that represent dependencies in entire directories, useful for grouping controllers, views, etc.
Please note that the paradigm espoused by this system goes against bundling for production. So using this methodology is not highly recommended. IMO the ideal way to build production-grade apps with RequireJS is create separate bundles for separate parent views. You load all the shared code on first page load. Then you load new code in the browser on demand for each new parent view, as the user switches views in the app.

You can read about that methodology here:



# how to use


We might have something like this on our front-end, most likely in a router module:

```js
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
```

//so in order to require all those controllers, especially for use with r.js (the optimizer), we can do:

```js
var grm = require('requirejs-metagen'); 

var controllerOpts =  {
        inputFolder: './public/static/app/js/controllers/all',
        appendThisToDependencies: 'app/js/controllers/',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: true,     //will drop 'all' from the front of all return items
        output: './public/static/app/js/meta/allControllers.js' //puts all controllers in a directory its subdirectories into one RequireJS file/module
    };
    
    
grm(controllerOpts, function (err) {
     //handle any unlikely errors your way
  });
```
  
---->  output looks like this module below:


```js
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
  ```
  
  in your front-end program I recommend doing this:
  
```js
  requirejs.config({
 
   paths: {
   
      "#allControllers":"app/js/meta/allControllers"
   
      }
  });
```
  
  then you can do:
  
```js
  require(['#allControllers'],function(allControllers){
  
      var carController = allControllers['more/cars'];
  
  });
```

or better yet, since those dependences are already loaded, you can use synchronous syntax easily


```js
var allControllers = require('#allControllers');
var carController = allControllers['more/cars'];
```

## usage with Gulp.js:

to use this library with Gulp, you can do it like so:

```js
var metagens = {

    "controllers": {
        inputFolder: './public/static/app/js/controllers/all',
        appendThisToDependencies: 'app/js/controllers/',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: true,
        output: './public/static/app/js/meta/allControllers.js'
    },
    "templates": {
        inputFolder: './public/static/app/templates',
        appendThisToDependencies: 'text!app/',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: false,
        output: './public/static/app/js/meta/allTemplates.js'
    },
    "css": {
        inputFolder: './public/static/cssx',
        appendThisToDependencies: 'text!',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: false,
        output: './public/static/app/js/meta/allCSS.js'
    },
    "flux-constants": {
        inputFolder: './public/static/app/js/flux/constants',
        appendThisToDependencies: 'app/js/flux/',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: false,
        output: './public/static/app/js/meta/allFluxConstants.js'
    },
    "flux-actions": {
        inputFolder: './public/static/app/js/flux/actions',
        appendThisToDependencies: 'app/js/flux/',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: false,
        output: './public/static/app/js/meta/allFluxActions.js'
    },
    "all-views": {
        inputFolder: './public/static/app/js/jsx',
        appendThisToDependencies: 'app/js/',
        appendThisToReturnedItems: '',
        eliminateSharedFolder: true,
        output: './public/static/app/js/meta/allViews.js'
    }
 }


gulp.task('metagen:all', ['transpile-jsx'], function (done) { // we may need to transpile JSX or whatnot before running the metagen

    var taskNames = Object.keys(metagens);
    var funcs = [];

    taskNames.forEach(function (name, index) {
        funcs.push(function (cb) {
            grm(metagens[name], function (err) {
                cb(err);
            });
        });
    });

    async.parallel(funcs, function (err) {
        done(err);
    });
});
```

any questions you can open an issue on Github or email me at alex@oresoftware.com, thanks

