var neo4j = require('neo4j-driver').v1;
var querystring = require('querystring');

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

            var name          = querystring.escape( req.query.name );
            var user_location = querystring.escape( req.query.user_location );
            var email         = querystring.escape( req.query.email );
            var url           = querystring.escape( req.query.url );
            var tagline       = querystring.escape( req.query.tagline );
            var preferences   = querystring.escape( req.query.preferences );

            neo_session.run(" CREATE (p:Person {name: '" + name + "', user_location: '" + user_location + "', email: '" + email + "', url: '" + url
                + "', tagline: '" + tagline + "', preferences: '" + preferences + "'")
            .then( function(result) {
       
                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });

        },

        edit: function(req, res, callback) {

            var person_id = req.params.person_id;

            res.write("Edit Person node");
            res.end();
        },

        deletePerson: function(req, res, callback) {
       
            var person_id = req.params.person_id;

            neo_session.run(" MATCH (p:Person) WHERE ID(p)=" + person_id + " OPTIONAL MATCH (p)-[r]-() DELETE r,p")
            .then( function(result) {
            
                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Get Repositories Owned, Followed, Collaborated with
        getRepositories: function(req, res, callback) {
        
            var person_id = req.params.person_id;

            neo_session.run(" MATCH (n)<-[:OWNS|FOLLOWS|COLLABORATES_WITH]-(p) WHERE ID(p)=" + person_id + " RETURN n")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        setPassword: function(req, res, callback) {
      
            var person_id = req.params.person_id;

            res.write("Set Password for person");
            res.end();
        }
    }

}
