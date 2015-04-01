angular.module('dd', ['ngResource'])

.directive('fabData', function ($resource, $http) {



	return {
		restrict: 'AE',
		controller: function ($scope) {
			$scope.abilities = [];

			this.addStrength = function () {
				$scope.abilities.push('strength');
			}

			this.addSpeed = function () {
				$scope.abilities.push('speed');
			}
		},

		link: function (scope, element, attrs, ctrls, transclude) {

			// // build a resource object
			// var Resource = $resource(attrs.fabDataSrc, {}, {
			// 	update: {
			// 		method: 'PUT'
			// 	}
			// });


			// console.log(Resource.query().length)

			// create variable to hold results when they arrive
			// var data;
			

			var scopeProperty = attrs.fabData || attrs.fabDataProperty;
			var dataSrc = attrs.fabDataSrc;

			// set the data to the scope
			scope[scopeProperty] = {};

			// do request and alter set result to the data value
			$http.get(dataSrc).then(function (res) {
				console.log(res);

				scope[scopeProperty] = res.data;
			});



			// BIND EVENTS
			// forms
			element.find('form').bind('submit', function () {

				$http.put(dataSrc, scope[scopeProperty])
					.then(function (res) {
						scope.$apply()
					})

				console.log(arguments)
				alert('11231')
			})
		},
	}
});