window.onload = (function() {

  var terms;

  var index0 = 0;
  var index1 = 1;
  var index2 = 2;
  var index3 = 3;
  var index4 = 4;
  var index5 = 5;
  var index6 = 6;
  var index7 = 7;
  var index8 = 8;
  var index9 = 9;


  var colours = ["#F9C00C", "#03A9F4", "#9C56BB", "#FF5722", "#FF4081"]

  var svg = document.getElementById("svg-menu");
  var text1 = svg.getElementById("term-09");
  var text2 = svg.getElementById("term-08");
  var text3 = svg.getElementById("term-07");
  var text4 = svg.getElementById("term-06");
  var text5 = svg.getElementById("term-05");
  var text6 = svg.getElementById("term-04");
  var text7 = svg.getElementById("term-03");
  var text8 = svg.getElementById("term-02");
  var text9 = svg.getElementById("term-01");

  var def1 = svg.getElementById("Definition9");
  var def2 = svg.getElementById("Definition8");
  var def3 = svg.getElementById("Definition7");
  var def4 = svg.getElementById("Definition6");
  var def5 = svg.getElementById("Definition5");
  var def6 = svg.getElementById("Definition4");
  var def7 = svg.getElementById("Definition3");
  var def8 = svg.getElementById("Definition2");
  var def9 = svg.getElementById("Definition1");

  var xlink1 = svg.getElementById("item-9");
  var xlink2 = svg.getElementById("item-8");
  var xlink3 = svg.getElementById("item-7");
  var xlink4 = svg.getElementById("item-6");
  var xlink5 = svg.getElementById("item-5");
  var xlink6 = svg.getElementById("item-4");
  var xlink7 = svg.getElementById("item-3");
  var xlink8 = svg.getElementById("item-2");
  var xlink9 = svg.getElementById("item-1");

  $.ajax({
    url: "/wheel",
    method: "GET",
  }).done(function(response) {
    terms = response;
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
      var id = terms[index]._id;
      return "/show/" + id;
    };

    outputColour = function(index){
      var colour = colours[index % colours.length];
      return colour;
    }

    updateInnerHTML = function(element1, element2, element3, index) {
      element1.textContent = outputTermString(index);
      element1.setAttribute("fill", outputColour(index));
      element2.textContent = outputDefString(index);
      element3.setAttribute("xlink:href", outputShowLink(index));
      if (index < terms.length - 1) {
        index = index + 1;
      }
      else {
        index = 0;
      }
  };

  startLeft = function(){
    updateInnerHTML(text9, def9, xlink9, index0);
    updateInnerHTML(text8, def8, xlink8, index1);
    updateInnerHTML(text7, def7, xlink7, index2);
    updateInnerHTML(text6, def6, xlink6, index3);
    updateInnerHTML(text5, def5, xlink5, index4);
    updateInnerHTML(text4, def4, xlink4, index5);
    updateInnerHTML(text3, def3, xlink3, index6);
    updateInnerHTML(text2, def2, xlink2, index7);
    updateInnerHTML(text1, def1, xlink1, index8);
  };

  startRight = function(){
    updateInnerHTML(text1, def1, xlink1, index0);
    updateInnerHTML(text2, def2, xlink2, index1);
    updateInnerHTML(text3, def3, xlink3, index2);
    updateInnerHTML(text4, def4, xlink4, index3);
    updateInnerHTML(text5, def5, xlink5, index4);
    updateInnerHTML(text6, def6, xlink6, index5);
    updateInnerHTML(text7, def7, xlink7, index6);
    updateInnerHTML(text8, def8, xlink8, index7);
    updateInnerHTML(text9, def9, xlink9, index8);
  };

  startLeft();
  startRight();
  });
});

$(".tag").on('change', 'select', function(event) {
    event.preventDefault();
});

document.body.onkeydown = function(event){
  event = event || window.event;
  var keycode = event.charCode || event.keyCode;
  if(keycode === 37 || keycode === 40 ){
      startLeft();
  } else if(keycode === 39 || keycode === 38){
    startRight();
  }
}
