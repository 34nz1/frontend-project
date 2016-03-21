
app.factory('authenticationService',function($http, $location, sessionService){

	//Bij het inloggen, worden de inloggegevens naar een php bestand toe gestuurd
	return{
		login:function(data,scope){
			var $promise=$http.post('app/shared/gegevens.php',data); //gegevens opsturen naar gegevens.php
			$promise.then(function(msg){
				var uid=msg.data;
				if(uid){
					sessionService.set('uid',uid);
					$location.path('/dashboard');
				}	 

				//wanneer er onjuiste inlog gegevens ingetoetst worden      
				else  {
					$location.path('/inloggen');
				}				   
			});
		},

//Bij het uitloggen, zou de session vernietigd  moeten worden, en de gebruiker terug verwezen 
//naar de inloggen pagina
		logout:function(){
			sessionService.destroy('uid'); //vernietig de session unique Id
			$location.path('/inloggen'); //gebruiker wordt terug naar het inlog pagina gestuurd
		},
		islogged:function(){
			var $checkSessionServer=$http.post('app/shared/session_controleren.php');
			return $checkSessionServer;
		}
	}

});

//Deze factory geeft aan hoe de sessions moeten werken
app.factory('sessionService', ['$http', function($http){
	return{
		set:function(key,value){
			return sessionStorage.setItem(key,value);
		},
		get:function(key){
			return sessionStorage.getItem(key);
		},
		destroy:function(key){ 
			$http.post('app/shared/session_vernietiger.php');
			return sessionStorage.removeItem(key);
		}
	};
}]);

//Ophalen van de gegeven via $http.get(); 
app.service("Data", function ($http, $q)
{
	var deferred = $q.defer();
	//Data komt vanuit >>>>>> http://datatank.stad.gent/4/cultuursportvrijetijd/bibliotheekleners.json
	$http.get('app/shared/data.json')
	.then(function(data){
		deferred.resolve(data);
	});

	this.getLeners = function ()
	{
		return deferred.promise;
	}
});

