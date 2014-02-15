"use strict";
var unlike = module.exports = function(input,example,key){

    var i, diff;

    if(!example) return false;

    //different value types
    if(typeof(input) !== typeof(example)){
        ret = {
            input:typeof(input),
            example:typeof(example)
        };

        if(typeof(key) === "number") ret["index"] = key;
        else ret["key"] = key;

        return ret;
    } 

    //object and array or vice versa
    else if(typeof(input) === typeof(example) && Array.isArray(input) !== Array.isArray(example)){
        return {
            key:key,
            input:Array.isArray(input) ? "array" : "object",
            example:Array.isArray(example) ? "array" : "object"
        };
    }

    //both objects, check unlike for all keys
    else if(typeof(example) === "object" && !Array.isArray(example)){
        var keys = Object.keys(example);
        for(i=0; i< keys.length; i++){
            var k = keys[i];
            diff = unlike(input[k],example[k],k);
            if(diff) break;
        }
    }

    //both arrays
    else if(Array.isArray(example)){

        if(example.length === 0) return false;
        for(i=0; i< input.length; i++){
            diff = unlike(input[i],example[0],i);
            if(diff) break;
        }
    }

    if(!diff) return false;
    if(typeof(key) === "undefined") return diff;

    var ret = {};
    ret[String(key)] = diff;
    return ret;
};
