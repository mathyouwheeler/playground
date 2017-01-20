// var require = function (path) {
// 	return module.exports;
// }

var greetings = require('./greetings.js');
var eng = greetings.sayHelloInEnglish();
var spn = greetings.sayHelloInSpanish();

console.log(eng);
console.log(spn);

// ^ equivalent to v
// var greetings = {
// 	sayHelloInEnglish: function () {
// 		return 'Hello';
// 	},
// 	sayHelloInSpanish: function () {
// 		return 'Hola';
// 	}	
// }