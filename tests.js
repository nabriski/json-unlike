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
    test.done();
};
//-----------------------------------------
