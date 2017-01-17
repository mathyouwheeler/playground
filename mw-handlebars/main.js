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

$(function() {
  var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];
  //Get the HTML from the template   in the script tag
  var theTemplateScript = $("#shoe-template").html(); 
  //Compile the template
  var theTemplate = Handlebars.compile (theTemplateScript); 
  $(".shoesNav").append (theTemplate(shoesData));
});