module.exports = function(app, config) {

    // controllers - tbd
    var home = require('../controllers/home')(app, config);
    var data = require('../controllers/data')(app, config);

    app.get('/', home.index);

    // file import
    app.get('/import/:fileurl', data.importdata);

    // fork
    app.get('/fork/:dataname', data.fork);

    // merge
    app.get('/merge/:dataname1/:dataname2', data.merge);

    // browse data sets
    app.get('/datasets', data.browse);
   
}
