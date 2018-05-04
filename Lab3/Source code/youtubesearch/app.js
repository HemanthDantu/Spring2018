
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$(function () {
    $("form").on("submit",function(e) {
        e.preventDefault();
        var request = gapi.client.youtube.search.list({
        part: "snippet",
        type:"video",
         q: encodeURIComponent($('#search').val()).replace(/%20/g, "+"),
         maxResults: 4,
         order: "viewCount"
        });
        request.execute(function (response) {
            var results = response.result;
            $.each(results.items, function(index, item) {
                $.get("item.html", function(data){
                    $("#results").append(tplawesome(data,[{"title":item.snippet.title, "videoid":item.id.videoId}]))
                });
                //$('#results').append(item.id.videoId+" "+item.snippet.title+"<br>");
                console.log(item);
            });
        });
    });
});

function init(){
    gapi.client.setApiKey("AIzaSyBPG1G7zLTMGDapAURihPDa0HAPn-_SyYo");
    gapi.client.load("youtube","v3", function () {
        
    });
}