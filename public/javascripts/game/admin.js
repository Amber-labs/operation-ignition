//angularjs application
var ignite = angular.module('ignite',[]);

//angularjs controller
ignite.controller('ignite-controller', function($scope, $http, prettyPrint){
    //ajax call for player data
    $http.get("/api/players/data").then(function(res){
        $scope.player = res.data;
        log('player', JSON.stringify($scope.player));
    });
    //ajax call for class data
    $http.get("/api/classes/data").then(function(res){
        $scope.classes = res.data.classes;
        log('classes', JSON.stringify($scope.classes));
        for (var i = 0; i < $scope.classes.length; i++)
            $scope.classes[i].prettyPrint = prettyPrint.tabs($scope.classes[i]);
    });

    $scope.doneClasses = function(){
        //modal windows
        var modals = $("div[type='modal']");
        //close modal spans
        var modalsClose = $("span[type='modalClose']");
        //open modal buttons
        var modalsOpen = $("button[type='modalButton']");

        modalsClose.click(function(){
            log('modalClose', this.className);
            $("#"+this.className).css('display','none');
        })

        modalsOpen.click(function(){
            log('modalButton',this.className);
            $("#"+this.className).css('display','block');
        });

        log('classes','done');
    }
});

ignite.service('prettyPrint', function(){
    this.tabs = function(json){
        return JSON.stringify(json, null, '\t');
    };
});

ignite.directive('igniteClasses', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.igniteClasses);
        }
    }
})

ignite.directive('ignite-classes', function (){
    return function(scope, element, attrs) {
        angular.element(element).css('background-color: blue');
        log('test','test');
        if (scope.$last)
        {
            alert('last');
        }
    };
});
