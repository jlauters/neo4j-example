var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "redpill"));
var neo_session = driver.session();

module.exports = function(app, config) {

    return {
        importdata: function(req, res, callback) {

            var fileurl = req.params.fileurl;

            console.log("file url: " + fileurl);

            /* EXAMPLE IMPORT STATEMENT
             *

             LOAD CSV WITH HEADERS FROM "http://samplecsvs.s3.amazonaws.com/SacramentocrimeJanuary2006.csv" 
             AS line CREATE (:CrimeRecord { latitude:line.latitude, datetime:line.cdatetime,
             desc:line.crimedescr, longitude:line.longitude, grid:line.grid, beat:line.beat, address:line.address, district:line.district})

             *
             */

            neo_session.run(" LOAD CSV WITH HEADERS FROM 'http://samplecsvs.s3.amazonaws.com/SacramentocrimeJanuary2006.csv' AS line WITH line RETURN line LIMIT 5")
              .then( function(result) {
                  console.log( 'Data Loaded!' );
                  console.log( result );
                  session.close();
                  driver.close();
              })

            res.write("wee");
            res.end();
        },

        fork: function(req, res, callback) {
           res.write("forking");
           res.end();
        },

        merge: function(req, res, callback) {
           res.write("merging");
           res.end();
        },

        browse: function(req, res, callback) {
           res.write("browse data sets");
           res.end();
        } 
    }

}
