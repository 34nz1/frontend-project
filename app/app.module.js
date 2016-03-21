var app = angular.module('mainApp', ['ngRoute','angularUtils.directives.dirPagination']);

/* ophalen van de paginationTemplate Provider om de css code te kunnen aanpassen */
app.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('asserts/libs/node_modules/angular-utils-pagination//dirPagination.tpl.html');
});

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/inloggen', // wanneer in de url /inloggen staat,
		{
		templateUrl: 'app/components/login/loginView.html', // roep dan deze template aan
		controller: 'loginCtrl'})

	.when('/dashboard', // wanneer in de url /dashboard staat, 
		{
		templateUrl: 'app/components/dashboard/dashboardView.html', //roep dan deze template aan
		controller: 'dashboardCtrl'})
	.otherwise({redirectTo: '/inloggen'}); //de standaard url is /url, de gebruiker word hier verwezen.
	}]);


app.run(function($rootScope, $location, authenticationService){
	var routespermission=['/dashboard'];  //om in de dashboard binnen te komen  zou u eerst moeten inloggen
	$rootScope.$on('$routeChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1)
		{
			var connected=authenticationService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
});