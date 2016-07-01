var app = angular.module("MyApp", []);

var category = {
    id : "989",
    startdate : new Date("06/22/2016")
};

if ( new Date().getDay() === category.startdate.getDay())  {
    console.log("startdate");
}

$.ajax({
        type: "GET",
        url: 'http://localhost/regex.php',
        dataType: 'json',
        error: function(){
            alert('Unable to load feed, Incorrect path or invalid feed');
        },
        success: function(xml){
           console.log(xml.employees);
        }
    });


app.controller("feedrss", function($scope, $http) {
    $scope.data = [];
   var url = 'http://kliknklik.com/modules/feeder/rss.php?id_category='+category.id+'&orderby=id&orderway=desc&n=100';
       $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url))
    .success(function (result) {
        
        function getFullName(item,index) {
          item.content = item.content.match(/<img[^>]*>/)[0].replace('small_default','home_default').replace('img src', 'img class="img-responsive" src');
          return item;
           }
        $scope.feeds = result.responseData.feed.entries.map(getFullName);
         })
    .error(function (data, status) {
        //do whatever you want with the error
    });
});