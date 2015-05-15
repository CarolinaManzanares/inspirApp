angular.module('starter.controllers', ['inspirapp.db'])

.controller('DashCtrl', ['$scope', 'db', function($scope, db) {

	db.get('3', function(data){
		$scope.inspiration = data.inspiration;

	});
	
	
	
}])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
