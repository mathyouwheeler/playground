// var shoesData = [
//   {
//     name: "Nike",
//     price: 199.00
//   },
//   {
//     name: "Loafers",
//     price: 59.00
//   },
//   {
//     name: "Wing Tip",
//     price: 259.00
//   }  
// ];
// function updateAllShoes(shoes) {
//   var listOfShoesHTML = "";
//   for (var i = 0; i < shoesData.length; i++) {
//     listOfShoesHTML += '<li class="shoes">' + '<a href="/' + shoes[i].name.toLowerCase() + '">' + shoes[i].name + ' -- Price: ' + shoes[i].price + '</a></li>';
//     console.log(i);
//   }
//   return listOfShoesHTML;
// }
// function addListOfShoesToDocument() {
//   var list = document.createElement("ul");
//   list.innerHTML = updateAllShoes(shoesData);
//   document.body.appendChild(list);  
// }
// addListOfShoesToDocument();
$(function  () {
  var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];
   //Get the HTML from the template   in the script tag
    var theTemplateScript = $("#shoe-template").html(); 
   //Compile the template
    var theTemplate = Handlebars.compile (theTemplateScript); 
    $(".shoesNav").append (theTemplate(shoesData));
    //We pass the shoesData object to the compiled handleBars function
    // The function will insert all the values from the objects in their respective places in the HTML and returned HTML as a string. Then we use jQuery to append the resulting HTML string into the page
});
// $(function  () {
  
//   var shoesData = [
//     { 
//       name:"Nike",
//       price:199.00 
//     },
//     {
//       name:"Loafers", 
//       price:59.00
//     },
//     {
//       name:"Wing Tip", 
//       price:259.00 
//     }
//   ];
//   
//   function updateAllShoes(shoes)  {
//     var theHTMLListOfShoes = "";
    
//     shoesData.forEach (function (eachShoe)  {
//      // Note the coupling and mixing of HTML and JavaScript; it is tedious to follow
//       theHTMLListOfShoes += '<li class="shoes">' + '<a href="/' + eachShoe.name.toLowerCase() + '">' + eachShoe.name + ' -- Price: ' + eachShoe.price + '</a></li>';
//     });
  
//     return theHTMLListOfShoes;
//   }
//   $(".shoesNav").append(updateAllShoes(shoesData));
// 
// });

// var shoesData = [
// {
// name: "Nike",
// price: 199.00
// },
// {
// name: "Loafers",
// price: 59.00
// },
// {
// name: "Wing Tip",
// price: 259.00
// } 
// ];

// function updateAllShoes(shoes) {
// var listOfShoesHTML = "";
// for (var i = 0; i < shoesData.length; i++) {
// listOfShoesHTML += '
// ' + '' + shoes[i].name + ' -- Price: ' + shoes[i].price + '
// ';
// console.log(i);
// }
// return listOfShoesHTML;
// }

// function addListOfShoesToDocument() {
// var list = document.createElement("ul");
// list.innerHTML = updateAllShoes(shoesData);
// document.body.appendChild(list); 
// }

// addListOfShoesToDocument();
