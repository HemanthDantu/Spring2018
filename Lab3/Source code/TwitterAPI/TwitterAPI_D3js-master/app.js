var app =angular.module('app',[]);

app.controller('MainCtrl',function ($scope,$http,$sce) {

    $scope.url = function(videoId){
       return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+ videoId);
    };


    $(document).ready(function () {
        $(document).on('keypress','#search',function (e) {
            if (e.which == 13){

                search = $(this).val();
                $(this).val("");
                $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q="+ search + "&maxResult=5&type=video&order=viewcount&key=AIzaSyBMUhsUKox1UVQecl-T12ElvtAasygNjNc").then(function (value) {

                    $scope.response1 = value.data.items;
                    console.log(search);
                    console.log($scope.response1);
                })
            }
        })

    });
    });