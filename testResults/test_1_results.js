/**
 * Created by denman on 8/1/2015.
 *
 * NOTE: anything written in this file will get overwritten because this file is just metadata
 *  ...so don't bother writing any notes or anything important in this file - it will be overwritten.
 *
 */


define(
    [
        "testData/one/greetings",
		"testData/one/hello",
		"testData/one/two/hi",
		"testData/one/two/three/four/x"
    ],
    function(){

        return {

            "one/greetings": arguments[0],
			"one/hello": arguments[1],
			"one/two/hi": arguments[2],
			"one/two/three/four/x": arguments[3]
        }
  });