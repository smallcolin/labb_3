	
var app = angular.module('Labb3', ['ui.router', 'chart.js']);

app.config(function ($stateProvider, $locationProvider) {
	
	$locationProvider.html5Mode(true);

	$stateProvider.state( {
		name: 'maths',
		url: '/maths',
		templateUrl: 'partials/maths.html'
	});

	$stateProvider.state( {
		name: 'basic',
		url: '/basic',
		templateUrl: 'partials/basic.html',
		controller: 'First'
	});

});

app.controller('First', function($rootScope) {
	$rootScope.name = "Colin";
	$rootScope.age = "37";
	$rootScope.avatar = 'img/moody.jpg';
})



// CITIES SECTION

app.controller('Joncit', function ($rootScope, cities) {
    $rootScope.cities = cities.data.items;
});

app.controller('popName', function($scope) {
});

app.config(function ($stateProvider) {
    $stateProvider.state('cities', {
        controller: 'Joncit',
        resolve: {
            cities: function ($http) {
                return $http({
                    method: 'GET',
                    url: 'http://cities.jonkri.se/0.0.0/cities'
                });
            }
        },
        templateUrl: 'partials/jon-cities.html',
        url: '/cities'
    });
});

// ____________________________________________________________________________________________________


app.controller('AddCity', function($scope, $rootScope, $http) {
	$scope.sendData = function () {
		
		// console.log($scope.cityName);
		// console.log($scope.popNumber);
		$scope.cities.push($scope.cityName);
		$scope.cities.push($scope.popNumber);
		
	}
	
});

// app.config(function ($stateProvider) {
// 	$stateProvider.state('addCities', {
// 		controller: 'AddCity',
// 		resolve: {
// 			addCities: function ($http) {
// 				return $http({
// 					method: 'POST',
// 					url: 'http://cities.jonkri.se/0.0.0/cities'
// 				}).then(function sendData(response) {
// 					alert();
// 						$rootScope.cities.data.items.push($rootScope.cityName);
// 					});
			
// 			},
			
// 		},
// 		templateUrl: 'partials/jon-cities.html',
// 		url: '/cities'
// 	});
// }),

	// CHARTS

app.controller("DoughnutCtrl", function ($scope, $rootScope) {

	$scope.labels = [];
	$scope.data = [];

	for ( var i = 0; i < $rootScope.cities.length; i++ ) {
		$scope.labels.push($rootScope.cities[i].name);
		$scope.data.push($rootScope.cities[i].population);
	}
});






// DIRECTIVES

app.directive('photoOne', function() {
		return {
			template: '<img />',
			link: function($scope, element, attrs) {

				var img = angular.element(element.children()[0]);
				
				img.attr('src', 'img/goat-buddy.jpg');
				img.css({
					'background-color':'white',
					'border':'1px solid black',
					'width':'100%',
					'padding':'20px',
					'margin':'20px 0'
				});
			},
			scope: {},
			restrict: 'E'
		}
	});

app.directive('photoTwo', function() {
		return {
			template: '<img />',
			link: function($scope, element, attrs) {

				var img = angular.element(element.children()[0]);
				
				img.attr('src', 'img/beach.jpg');
				img.css({
					'background-color':'white',
					'border':'1px solid black',
					'width':'100%',
					'padding':'20px',
					'margin':'20px 0'
				});
			},
			scope: {},
			restrict: 'E'
		}
	});


//  MATHS SECTION

	app.value('addNumbers', [10,20,30]);

	app.factory('addition' , function (addNumbers) {
		var result = { value: 0 }; // Data binding won't work with primitive values
		
		return {
			add: function() {
				var num = addNumbers;
				result.value = 0;
				// console.log(result);
				for ( var i = 0; i < num.length; i++ ) {
					result.value += num[i];
				}
			},
			getResult: function() {
				return result;
			}
			

		};
	});

	app.controller('FourController', function( $scope, addNumbers, addition ) {
		addition.add();
		$scope.fourNumber = addition.getResult();
	});


	// CALCULATOR

	app.controller('Calculator', function($scope) {
		$scope.output = function() {
			if ( $scope.operator == '+' ) {
				return $scope.first + $scope.second;
			}
			else if ( $scope.operator == '-' ) {
				return $scope.first - $scope.second;
			}
			else if ( $scope.operator == '*' ) {
				return $scope.first * $scope.second;
			}
			else if ( $scope.operator == '/' ) {
				return $scope.first / $scope.second;
			}
		}	
	});
	