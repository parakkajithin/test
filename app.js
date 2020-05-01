var spreadsheetID = "1G6pPn4LC8OgBBBgJepzL0B6eLVLg_evYJeEldAy-2z8";
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json"; 
$.getJSON(url, function(data) {
  var entry = data.feed.entry;
  //console.log(entry);
  $("#newsHere").html('')
  $(entry).each(function() {
    $("#newsHere").append('\
  <div class="col-12 ">\
  <div class="card my-2">\
    <img src="'+this.gsx$image.$t+'" class="card-img-top" alt="Image">\
    <div class="card-body">\
      <h5 class="card-title">'+this.gsx$title.$t+'</h5>\
      <p class="card-text text-justify">'+this.gsx$description.$t+'</p>\
    </div>\
    <div class="card-footer text-muted">\
      #Source: '+this.gsx$source.$t+'\
    </div>\
  </div>\
 </div>\
  ')
  })  
});
//Registering service worker
if('serviceWorker' in navigator){
  try{
    navigator.serviceWorker.register('sw.js');
    console.log('Service worker registered');
  }
  catch(error){
    console.log('Service worker not registered');
  }
}
//When refresh button on top nav clicked reload the page
$("#rFresh").click(function(){
  location.reload();
})