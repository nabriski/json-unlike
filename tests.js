var unlike = require('./index.js');

//-----------------------------------------
exports.testBasic = function(test){
    test.ok(!unlike(5,7));
    test.ok(!unlike("a$","bcf1"));
    test.ok(!unlike(null,null));
    test.ok(!unlike({},{}));
    test.ok(!unlike([],[]));
    var diff = unlike([],{});
    test.deepEqual(diff,{ key: undefined, input: 'array', example: 'object' }); 

    test.done();
};
//-----------------------------------------
exports.testArray = function(test){
    test.ok(!unlike(["a",1,"d"],[]));
    test.ok(!unlike(["a","c","d"],["koko"]));
    
    var diff = unlike(["a",3,"d"],["koko"]);
    test.deepEqual(diff,{ input: 'number', example: 'string', index: 1 }); 
    test.done();
};
//-----------------------------------------
exports.testArrayNested = function(test){

    var diff = unlike([{current_value: null}],[{current_value:2.0}]);
    test.deepEqual(diff,{"0" :{"input":"object","example":"number","key":"current_value"}}); 

    test.done();
};
//-----------------------------------------
exports.testObject = function(test){

    var diff = unlike({current_value: null},{current_value:2.0});
    test.deepEqual(diff,{"input":"object","example":"number","key":"current_value"}); 
    test.ok(!unlike(null,{current_value:2.0}));
    test.ok(!unlike({current_value: null},null));
    test.ok(!unlike({a:null},{a:{b:1}}));
    test.ok(!unlike({a:{c:5}},{a:null}));
    test.done();
};
//-----------------------------------------
exports.testNullAllowed = function(test){

    test.ok(!unlike(null,7,{nullAllowed:true}));
    test.ok(!unlike({current_value: null},{current_value:2.0},{nullAllowed:true}));
    test.done();
};
//-----------------------------------------
exports.testUndefinedLikeEmptyArray = function(test){

    var dummy = {};
    test.ok(!unlike(dummy.a,[],{undefinedLikeEmptyArray:true}));
    test.ok(!unlike(dummy.b,[1,2,3],{undefinedLikeEmptyArray:true}));
    test.ok(!unlike({},{a:[]},{undefinedLikeEmptyArray:true}));
    test.ok(!unlike({},{a:[1,2]},{undefinedLikeEmptyArray:true}));
    test.done();
};
//-----------------------------------------
