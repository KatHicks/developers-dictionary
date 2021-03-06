function DropDown(el) {
 this.dd = el;
 this.initEvents();
}

DropDown.prototype = {
 initEvents : function() {
   var obj = this;

   obj.dd.on('click', function(event){
     $(this).toggleClass('active');
     event.stopPropagation();
   });
 }
};

$(function() {
 var dd = new DropDown( $('#dd') );
 $(document).click(function() {
   $('.wrapper-dropdown').removeClass('active');
 });
});

var colours = ["#F9C00C", "#03A9F4", "#9C56BB", "#FF5722", "#FF4081"];

var dom = [];
var index = [];

var declareVariables = function(item) {
  var arr = [];
  for (var j = 0; j < 9; j++) {
    arr[j] = document.getElementById(item + "-0" + (10-(j+1)) );
  }
  dom.push(arr);
};

declareVariables("term");
declareVariables("summary");
declareVariables("link");

for (var i = 0; i < 9; i++) {
  var indexName = "index" + i;
  indexName = i;
  index.push(indexName);
}

var terms;

$(".dropdown").on('click', '.elem', function(event){

  event.preventDefault();

  var value = this.name;

  var data = {"tag": value};

  $(".filter-placeholder").text(value);

  $.ajax({
    url: "/tags/search",
    method: "POST",
    data: data
  }).done(function(response){

    terms = response;

    var letterArr = [];
    terms.forEach(function(term){
      letterArr.push(term.term.charAt(0).toLowerCase());
    });
    paginationArr = $('.paginationLinks').text().split('');
    paginationArr.forEach(function(letter){
      if(!letterArr.includes(letter)){
        $('#'+letter).addClass("disabled");
      }
    });

  }).then(function() {

    outputTermString = function(index){
      var string = terms[index].term;
      return string;
    };
    outputDefString = function(index){
      var string = terms[index].summary.split('').slice(0, 40).join("") + '...';
      return string;
    };
    outputShowLink = function(index){
      var term = terms[index].term;
      return "/definitions/" + term;
    };
    outputColour = function(index){
      var colour = colours[index % colours.length];
      return colour;
    };

    changeIndexLeft = function(passedIndex){
      if (passedIndex < terms.length - 1) {
        return passedIndex + 1;
      }
      else {
        passedIndex = 0;
        return passedIndex;
      }
    };

    changeIndexRight = function(passedIndex){
      if (passedIndex === 0) {
        passedIndex = terms.length - 1;
        return passedIndex;
      }
      else {
        passedIndex = passedIndex - 1;
        return passedIndex;
      }
    };

    changeContent = function(index, term, summ, link) {
      term.textContent = outputTermString(index);
      term.setAttribute("fill", outputColour(index));
      summ.textContent = outputDefString(index);
      link.setAttribute("xlink:href", outputShowLink(index));
    };

    updateInsides = function(i) {
      changeContent(index[i], dom[0][i], dom[1][i], dom[2][i]);
    };

    startRight = function(){
      index = index.map(function(index){
        return changeIndexLeft(index);
      });
      for (var i = 0; i < 9; i++) {
        updateInsides(i);
      }
    };

    startLeft = function(){
      index = index.map(function(index){
        return changeIndexRight(index);
      });
      for (var i = 0; i < 9; i++) {
        updateInsides(i);
      }
    };

  startRight();
  startLeft();
  });
});
