angular.module('inspirapp.ajax', [])
.factory('ajax', ['$http', function($http) {

    var baseURL = '/';

    var _httpRequest = function(cfg, success) {

        $http(cfg)
            .success(function(data, status) {
                success(data);
            })
            .error(function(data, status) {
                success({});
            });
    };


    var getInspirations = function(success) {
        var cfg = {
            method: 'GET',
            url: baseURL + 'inspirations.json'
        };

        _httpRequest(cfg, function(data) {
            success(data);
        });
    };

    
    return {
        getInspirations: getInspirations
    };

}]);