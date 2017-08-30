var channelArray = ["ESL_SC2", "OgamingSC2", "arconyx", "thebaker__", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

$(document).ready(function() {

  var myClientId = "?client_id=5yuh2gfrszsh8lut40zif7hd8qkyg6w";
  var i = 0;

  channelArray.forEach(function(element) {
    $.ajax({
      url: testUrl + element + myClientId,
      type: "GET",
      async: false,
      dataType: "json",
      success: function(data, status, jqXHR) {
         // console.log(data);

        //console.log(data);
        if (data.bio === null) {
          $('#c' + i).append("<a class='parent container' href='https://www.twitch.tv/" + element + "' target='_blank'><img src='" + data.logo + "' class='thumb'><span class='name'>" + data.display_name + "</span>  </a>"); 
        }else{
          $('#c' + i).append("<a class='parent container' href='https://www.twitch.tv/" + element + "' target='_blank'><img src='" + data.logo + "' class='thumb'><span class='name' >" + data.display_name + "</span>" + data.bio + "' </a>")}
        i++;
      },
         error: function(data, status, jqXHR) {
      // console.log("fixer")
     $("#c" + i).append("<span class='name'>**"+ element +"**  Closed Account </span><img class='smallish' src='https://s-media-cache-ak0.pinimg.com/236x/21/24/ff/2124ffebc93d8c6bb2fe8a7a49b40012.jpg'> ");
      //  $("#c" + i).addClass("offline");
       i++
     }
    })
  });
});;

var testUrl = "https://api.twitch.tv/kraken/users/";

//handler for checking if the channel is currently streaming
var streamCheckUrl = " https://api.twitch.tv/kraken/streams/";
var backside = "?client_id=5yuh2gfrszsh8lut40zif7hd8qkyg6w";

i = 0;
channelArray.forEach(function(element) {
 
   $.ajax({
    url: streamCheckUrl + element + backside,
    type: "GET",
    async: false,
    dataType: "json",
   
    success: function(data, status, jqXHR) {
      
        if (data.stream === null) {
        $("#c" + i).addClass("offline");
        i++;
      } else {
       console.log(data.stream.channel.name);
        $("#c" + i).addClass("online");
        $("#c" + i).append("<a class='livePreview' target='_blank' href= 'https://www.twitch.tv/" + data.stream.channel.name + "' ><p id=" + data._links.self + ">Watch Live " + data.stream.game + "</p> <img alt='livePreview' src=" + data.stream.preview.small + "></a>");
        i++;
         }},
  
      }
     
    
     
  );

 
  $("#online").click(function() {
   // $(".offline").hide();
    $(".online").show();
    $(".offline").hide();

  });
  $("#offline").click(function() {
    $(".online").hide();
    $(".offline").show();
  });
  $("#all").click(function() {
    $(".offline").show();
    $(".online").show();
  }); 
  
});