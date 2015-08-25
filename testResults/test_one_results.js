/**
 * Created by denman on 8/1/2015.
 *
 * NOTE: anything written in this file will get overwritten because this file is just metadata
 *  ...so don't bother writing any notes or anything important in this file - it will be overwritten.
 *
 */


define(
    [
        "jsx!app/js/views/one/greeting",
		"jsx!app/js/views/one/hell",
		"jsx!app/js/views/one/one/h",
		"jsx!app/js/views/one/one/two/three/data.txt"
    ],
    function(){

        return {

            "greeting": arguments[0],
			"hell": arguments[1],
			"one/h": arguments[2],
			"one/two/three/data.txt": arguments[3]
        }
  });