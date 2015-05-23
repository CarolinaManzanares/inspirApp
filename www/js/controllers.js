angular.module('starter.controllers', ['inspirapp.db'])

.controller('DashCtrl', ['$scope', 'db', function($scope, db) {

	db.get('1', function(data){
		$scope.type= data.type;
		$scope.title = data.title;
		$scope.inspiration = ($scope.type === 'formattext') ? data.inspiration.split('|') : data.inspiration;
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
		templateUrl: '../templates/format-text-view.html'
	}

})

.directive('mp3', function(){
	return{
		restrict: 'E',
		template: '<h1>mp3 Directive</h1>',
	}

})

.directive('text', function(){
	return{
		restrict: 'E',
		template: '<h1>text Directive</h1>',
	}

});
