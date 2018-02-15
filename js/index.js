
$(document).ready(function(){
  
  $("#search-input").focus(function(){
    
    $("#search-input").animate({width:'250px'}).css('color','#66afe9');
    //$("#search-input").animate({left:'+=100px'});
    $('#search-btn').addClass('btn-focus');
    
  });
  $("#search-input").blur(function(){
    
    if($("#search-input").val().length<15){
      $("#search-input").animate({width:'150px'});
    }
    $('#search-btn').removeClass('btn-focus');
    $("#search-input").css('color','white')
    
  });
  
  $("#search-btn").click(searchHandler);
  $("#search-form").attr("action","javascript:searchHandler()");
  
  
});

function searchHandler(){
  var searchText = $("#search-input").val();
  if(searchText===""){
    return;
  }
  $(".root").css('justifyContent','flex-start');
  
  console.log(searchText);
  getWikiResult(searchText);
}



function getWikiResult(searchText){
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search="+searchText;
  
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      search(this.responseText);
    }
  };
  
  xhr.open("GET", url, true);
  xhr.send();
}

function search(responseText){
  var responseObj = JSON.parse(responseText);
  $("#container").empty();
  
  console.log(responseObj[1]);
  for(i=0;i<responseObj[1].length;i++){
    var article = document.createElement("div");
    var articleLink = document.createElement("a");
    $(article).addClass('article');
    var header = document.createElement("h2");
    var content = document.createElement("p");
    
    $(header).text(responseObj[1][i]);
    $(content).text(responseObj[2][i]);
    $(articleLink).attr("href",responseObj[3][i]);
    $(articleLink).attr("target","_blank");
    $(article).append(header,content);
    $(articleLink).append(article);
    
    $(article).css("opacity", "0");
    $('#container').append(articleLink);
    $(article).fadeTo("slow", 1);
  }
  
  
}