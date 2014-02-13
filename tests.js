var unlike = require('./index.js');

//-----------------------------------------
exports.testBasic = function(test){
    test.ok(!unlike(5,7));
    test.ok(!unlike("a$","bcf1"));
    test.ok(!unlike(null,null));
    test.ok(!unlike({},{}));
    test.ok(!unlike([],[]));
    var diff = unlike([],{});
    test.equals(JSON.stringify(diff),JSON.stringify({ key: undefined, input: 'array', example: 'object' })); 
    test.done();
};
//-----------------------------------------
exports.testArray = function(test){
    test.ok(!unlike(["a",1,"d"],[]));
    test.ok(!unlike(["a","c","d"],["koko"]));
    
    var diff = unlike(["a",3,"d"],["koko"]);
    test.equals(JSON.stringify(diff),JSON.stringify({ input: 'number', example: 'string', index: 1 })); 
    test.done();
};
