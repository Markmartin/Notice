var a = {
	name:'GuYue',
	age:28
}

var b = a;
b.name = '666',

console.log('a'+JSON.stringify(a))
console.log('b'+JSON.stringify(b))

Object.keys(b).forEach(function(key){

     console.log(key,b[key]);

});