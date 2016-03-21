
//index pagina controller
app.controller('indexCtrl', ['$scope', function($scope){
		var indexPage ={
			Title:"Test project Kunstmaan"
		};
		//{{indexPage}} uit de view koppelen aan onze indexPage variable
		$scope.indexPage = indexPage;
}]);


//Login pagina Controller
app.controller('loginCtrl',['$scope','authenticationService', function($scope, authenticationService) {
	/*login service aanroepen*/
	$scope.submit=function(data){
		authenticationService.login(data,$scope); // aanroepen van de inlog methode, (zie authenticationService)
	};

//Login pagina strings
	var admin = {
		imagePlaceholder:"asserts/images/admin.png",
		name:"placeholderImage",
		loginTitle: "admin panel",
		username: "Gebruikernaam",
		password: "Wachtwoord",
		login: "inloggen",
		forgetPassword: "Wachtwoord vergeten?"

	};
	//{{admin}} uit de view koppelen aan onze admin variable
	$scope.admin = admin;
}]);

//Dashboard pagina controller
app.controller('dashboardCtrl',['$scope','Data', 'authenticationService', function($scope, Data,authenticationService){
	//afhandelen van het uitloggen knopje
	$scope.logUit=function(){
		authenticationService.logout(); // aanroepen van de logout methode, (zie authenticationService)
	};
	/*Ophalen van gegevens in de table */
	var promise = Data.getLeners();
	promise.then(function(data){
		$scope.leners = data.data;
	});
	
    /** Gegevens uit de tabel sorteren */
    $scope.sort = function(keyname){
		$scope.sortKey = keyname;   //stel de sortkey in naar aangegeven parameter
		$scope.reverse = !$scope.reverse; //als het true, dan maak het false en vice versa
	}


	//Admin pagina strings
	var dashboard= {
		dashboardTitleEen: "Test",
		dashboardTitleTwee: "Project",
		dashboardZoeken: "Zoeken",
		dashboardlogout: "Uitloggen",
		dashboardAccountInfo: "Account info",
		dashboard: "dashboard",
		dashboardUsers: "Gebruikers",
		dashboardGebInfo: "Informatie",
		dashboardGebFoto: "asserts/images/admin.png",
		dashboardHome: "Datum"
	};
	//{{dashboard}} uit de view koppelen aan onze dashboard variable
	$scope.dashboard = dashboard;

	//dashboard  table strings
	var lener= {
		id:"ID",
		lidnummer: "Lidnummer",
		geboortedecennium: "Geb.dec",
		geslacht: "Geslacht"
	};
	$scope.lener = lener;

}]);

   
