
app.directive('bibliotheekGegevens', function (){
	return {
		restrict: 'A', // onze directive moet aangegeven als een attribute
		templateUrl: 'app/components/dashboard/dashboardTableView.html'
	};
});

app.directive('clock', function($timeout, dateFilter){
    return function(scope, element, attrs){
       var timeoutId; // deze timeoutId is nodig om de time updates te kunnen annuleren  
 
      // plan een update in 1 seconde
      function updateLater() {
        // timeoutId opslaan voor het annuleren
        timeoutId = $timeout(function() {
          element.text(dateFilter(new Date(), 'dd-MM-yyyy HH:mm'));
          updateLater(); // volgende update inplannen
        }, 1000);
      }
      //luisteren aan de DOM destroy(removal) event, en annuleer de volgende UI update
      //onderstaande code is om te voorkomen dat er geen update plaats vindt na de DOM verwijdered is.
      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });
 
      updateLater(); 
    }
});
