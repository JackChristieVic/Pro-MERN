"use strict";

var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var helloContinets = Array.from(continents, function (c) {
  return "Hello ".concat(c, "!");
});
var message = helloContinets.join(' ');
var element = React.createElement("div", {
  title: "Outer div"
}, React.createElement("h1", {
  className: "H1_Header"
}, message));
ReactDOM.render(element, document.getElementById('contents'));