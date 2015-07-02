GameUpApp.controller('ListEventsController', ['$scope', '$location', function($scope, $location){

  $scope.eventList = [];

  $scope.retrieveEventList = function(){
    var events = Parse.Object.extend("Event");
    var query = new Parse.Query(events);
    query.limit(100);
    return query.find();
  };

  $scope.retrieveEventList().then(function(data) {
    $scope.eventList.push(data);
  });

  $scope.formatDate = function(date){
    var date = date.split("-").join("/");
    var dateOut = new Date(date);
    return dateOut;
  }; 

}]);