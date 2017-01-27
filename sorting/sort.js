// 
// lexicographically - dictionary order
// 
var letters = [ 'a', 'z', 'g', 'l', 'r'];
letters.sort();
console.log(letters);

// 
// argument to sort is a comparison function
// -two args (a, b)
// --represent two value being compared in each operation
// ---if function returns less than 0, A before B
// ---if function returns greater than 0, B before A
// ---if function returns 0, A and B remain unchanged with respect to each other
// 
var numbers = [ 8, 5 ];
numbers.sort(function(a, b) {
	return a - b;
});
console.log(numbers);

// 
// multi dimensional sorting - if a & b are passed in as arrays, compare inner values
// 
var shapes = [
	[ 5, 'pentagon' ],
	[ 3, 'triangle' ],
	[ 8, 'octagon' ],
	[ 4, 'rectangle' ]
];

shapes.sort(function(a, b) {
	return a[0] - b[0];
});
console.log(shapes);

// 
// multi criteria sorting
// 
var schapes = [
  [4, "Trapezium"],
  [5, "Pentagon"],
  [3, "Triangle"],
  [4, "Rectangle"],
  [4, "Square"]
];

schapes.sort(function(a, b) {
	if (a[0] === b[0]) {
		var x = a[1].toLowerCase(), y = b[1].toLowerCase();
		return x < y ?  -1 : x > y ? 1 : 0;
	}
});
console.log(`\n \n \n schapes = ${schapes}`);

























