/**
 * Created by denman on 8/1/2015.
 *
 * NOTE: anything written in this file will get overwritten because this file is just metadata
 *  ...so don't bother writing any notes or anything important in this file - it will be overwritten.
 *
 */


define(
    [
        "dog/bird/cat/testData/one/greetings",
		"dog/bird/cat/testData/one/hello",
		"dog/bird/cat/testData/one/two/hi",
		"dog/bird/cat/testData/one/two/three/four/x"
    ],
    function(){

        return {

            "jet/black/rims/one/greetings": arguments[0],
			"jet/black/rims/one/hello": arguments[1],
			"jet/black/rims/one/two/hi": arguments[2],
			"jet/black/rims/one/two/three/four/x": arguments[3]
        }
  });