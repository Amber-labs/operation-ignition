//angularjs application
var ignite = angular.module('ignite',[]);

//angularjs controller
ignite.controller('ignite-controller', function($scope, $http){
    //ajax call for player data
    $http.get("/api/players/data").then(function(res){
        $scope.player = res.data;
        log('player', JSON.stringify($scope.player));
    });
    //ajax call for class data
    $http.get("/api/classes/data").then(function(res){
        $scope.classes = res.data.classes;
        log('classes', JSON.stringify($scope.classes));
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
    /*
    $(document).ready(function() {
        /*
        var modals = $('div[type*="modal"]');
        modals.css('background-color', 'red');
        log('modal', JSON.stringify(modals));
        modals.each(function(index){alert(this);});
        */
    /*
        var modals = $('div[type="modal"]')
        //select close button
        var modalButtons = $("button");
        modalButtons.css('background-color','red');
        //alert(modalButtons);
        console.log(modalButtons);
        modalButtons.click(function(){
            alert(this);
            modals.each(function (id){
                alert(id);
            });
        });
    });
    */

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
    /*
    .directive('ignite-main', function (){
    return function (scope, element, attrs) {
        alert('done');
    };
});
*/


/*
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
*/
