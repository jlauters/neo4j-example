var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "redpill"));
var neo_session = driver.session();

module.exports = function(app, config) {

    return {
        list: function(req, res, callback) {

            neo_session.run(" MATCH (n:Person) RETURN n LIMIT 25").then( function(result) {
                console.log(" Data Loaded! ");
               
                var people = Array();
                for(idx in result.records) {
                
                    // Omitting passwords 
                    name            = result.records[idx]._fields[0].properties.name;
                    user_location   = result.records[idx]._fields[0].properties.user_location;
                    email           = result.records[idx]._fields[0].properties.email;
                    url             = result.records[idx]._fields[0].properites.url;
                    tagline         = result.records[idx]._fields[0].properties.tagline;
                    preferences     = result.records[idx]._fields[0].properties.preferences;

                    people.push({"name": name, "user_location": user_location, "email": email, "url": url, "tagline": tagline, "preferences": preferences}); 
                }

                // Dump result to browser as JSON
                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(people, 0 ,4) );

            });
        },

        add: function(req, res, callback) {
            res.write("Add Person node");
            res.end();
        },

        edit: function(req, res, callback) {

            var person_id = req.params.person_id;

            res.write("Edit Person node");
            res.end();
        },

        deletePerson: function(req, res, callback) {
       
            var person_id = req.params.person_id;

            res.write("Delete Person node");
            res.end();
        },

        getRepositories: function(req, res, callback) {
        
            var person_id = req.params.person_id;

            res.write("Get Repositories for person");
            res.end();
        },

        setPassword: function(req, res, callback) {
      
            var person_id = req.params.person_id;

            res.write("Set Password for person");
            res.end();
        }
    }

}
