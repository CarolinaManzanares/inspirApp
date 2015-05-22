angular.module('starter.controllers', ['inspirapp.db'])

.controller('DashCtrl', ['$scope', 'db', function($scope, db) {

	db.get('1', function(data){
		$scope.type= data.type;
		console.log(data.type);
		if ($scope.type === 'formattext')
		{
			$scope.formattext = data.inspiration.split('|');
			console.log($scope.formattext);
		}
		$scope.inspiration = data.inspiration;
		$scope.$apply();

	});
	
	
	
}])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.directive('formatText', function(){
	return{
		restrict: 'E',
		templateUrl: '../templates/format-text-view.html',
		//controller: 'DashCtrl'

	}

})

.directive('mp3', function(){
	return{
		restrict: 'E',
		template: '<h1>mp3 Directive</h1>',
		//controller: 'DashCtrl'

	}

})

.directive('text', function(){
	return{
		restrict: 'E',
		template: '<h1>text Directive</h1>',
		//controller: 'DashCtrl'

	}

});
