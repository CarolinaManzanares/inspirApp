angular.module('inspirapp.db', ['inspirapp.ajax'])
    .factory('db', ['ajax', function(ajax) {

        var db = null,
            cfg = {
                name: 'Inspirations.db',
                version: 2,
                description: 'Inspirations database',
                size: 1 * 1024
            },
            objStore = 'inspirations';

        var loadDB = function(success) {
            ajax.getInspirations(function(data) {
                console.log(data);
                var transaction = db.transaction(objStore, 'readwrite');
                var store = transaction.objectStore(objStore);
                for (var i = 0; i < data.length; i++) {
                    store.add(data[i]);
                }

                transaction.addEventListener('complete', function(e) {
                    console.log('DB loaded')
                    success();
                });

            });
        };

        var init = function(success) {
            if (!db) {
                var request = indexedDB.open(cfg.name, cfg.version);

                request.addEventListener('success', function(e) {
                    db = e.target.result;
                    console.log('database version ' + db.version + ' opened');
                    success();
                });

                request.addEventListener('upgradeneeded', function(e) {
                    db = e.target.result;
                    console.log('version: ' + cfg.version);
                    console.log('version database: ' + db.version);

                    if (e.oldVersion < 1) {
                        var objectStore = db.createObjectStore(objStore, {
                            keyPath: 'id',
                            autoincrement: false
                        });
                        //Load database
                        loadDB(function(e) {
                            success();
                        });
                    }
                });

                request.addEventListener('error', function(e) {
                    console.log('Error opening ' + cfg.name + ' database.');
                });


            } else {
                success();
            }

        };

        var get = function(id, success) {
            init(function() {
                var transaction = db.transaction(objStore, 'readonly');
                var store = transaction.objectStore(objStore);
                var getRequest = store.get(id);

                getRequest.addEventListener('success', function(e) {
                    success(e.target.result);
                });

                getRequest.addEventListener('error', function(e) {
                    success('Sorry. Impossible to get inspiration.');
                });
            });
        };

        return {
            get: get
        };

    }])
