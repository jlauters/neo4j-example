var neo4j = require('neo4j-driver').v1;
var querystring = require('querystring');

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "redpill"));
var neo_session = driver.session();

module.exports = function(app, config) {

    return {
        list: function(req, res, callback) {

            neo_sesson.run(" MATCH (n:Organization) RETURN n LIMIT 25").then( function(result) {

                var organizations = Array();
                for(idx in result.records) {

                    name         = result.records[idx]._fields[0].properties.name;
                    org_location = result.records[idx]._fields[0].properties.org_location;
                    email        = result.records[idx]._fields[0].properties.email;
                    url          = result.records[idx]._fields[0].properties.url;
                    tagline      = result.records[idx]._fields[0].properties.tagline;

                    organizations.push({"name": name, "org_location": org_location, "email": email, "url": url, "tagline": tagline});
                }

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(organizations, 0, 4) );
            });
        },

        add: function(req, res, callback) {

          var name         = querystring.escape( req.query.name );
          var org_location = querystring.escape( req.query.org_location );
          var email        = querystring.escape( req.query.email );
          var url          = querystring.escape( req.query.url );
          var tagline      = querystring.escape( req.query.tagline );

          neo_session.run(" CREATE (o:Organization {name: '" + name + "', org_location: '" + org_location + "', email: '" + email + "', url: '" + url +
              "', tagline: '" + tagline + "'}) RETURN n")
          .then( function(result) {

              res.setHeader('Content-Type', 'application/json');
              res.send( JSON.stringify(result, 0, 4) );
          });
        },

        edit: function(req, res, callback) {
        
            var org_id = req.params.org_id;

            res.write("Edit Organization node");
            res.end();
        },

        deleteOrg: function(req, res, callback) {
    
            var org_id = req.params.org_id;

            neo_session.run(" MATCH (o:Organization) WHERE ID(o)=" + org_id + " OPTIONAL MATCH (o)-[r]-() DELETE r,o")
            .then( function(result) {
 
                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        getRepositories: function(req, res, callback) {
 
            var org_id = req.params.org_id;

            neo_session.run(" MATCH (n)<-[:PART_OF]-(o) WHERE ID(o)=" + org_id + " RETURN n")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            }
        },

        // Organizations have the following relationships to people
        // PART_OF, OWNED_BY, MANAGED_BY, FOLLOWED_BY

        // Add PART_OF Person
        addPerson: function(req, res, callback) {
 
            var org_id       = req.params.org_id;
            var person_id    = req.params.person_id;

            neo_session.run(" MATCH (o:Organization) WHERE ID(o)=" + org_id + " MATCH (p:Person) WHERE ID(p)=" + person_id +
                " MERGE (p)-[:PART_OF]->(o)")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Remove PART OF relationship between Person and Organization nodes
        removePerson: function(req, res, callback) {
 
            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            neo_session.run(" START p=node(*) MATCH (p)-[rel:PART_OF]->(n) WHERE ID(p)=" + person_id + " AND ID(n)=" + org_id + " DELETE rel")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Add OWNED_BY Relationship
        setOwner: function(req, res, callback) {

            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            neo_session.run(" MATCH (o:Organization) WHERE ID(o)=" + org_id + " MATCH (p:Person) WHERE ID(p)=" + person_id +
                " MERGE (o)<-[:OWNED_BY]-(p)")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });

        },

        // Get Organization Owner
        getOwner: function(req, res, callback) {

            var org_id = req.params.repo_id;

            neo_session.run(" MATCH (n)<-[:OWNED_BY]-(p) WHERE ID(n)=" + org_id + " RETURN p")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Remove OWNED_BY relationship
        removeOwner: function(req, res, callback) {

            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            neo_session.run(" START p=node(*) MATCH (p)<-[rel:OWNED_BY]-(n) WHERE ID(p)=" + person_id + " AND ID(n)=" + org_id + " DELETE rel")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Add MANAGED_BY relationship
        addManager: function(req, res, callback) {

            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            neo_session.run(" MATCH (o:Organization) WHERE ID(n)=" + org_id + " MATCH (p:Person) WHERE ID(p)=" + person_id +
                " MERGE (o)-[:MANAGED_BY]->(p)")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        getManagers: function(req, res, callback) {

            var org_id = req.params.org_id;

            neo_session.run(" MATCH (n)<-[:MANAGED_BY]-(p) WHERE ID(n)=" + org_id + " RETURN p")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Remove MANAGED_BY relationship
        removeManager: function(req, res, callback) {

            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            neo_session.run(" START p=node(*) MATCH (p)<-[rel:MANAGED_BY]-(n) WHERE ID(p)=" + person_id + " AND ID(n)=" + org_id + " DELETE rel")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        addFollower: function(req, res, callback) {

            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            neo_session.run(" MATCH (o:Organization) WHERE ID(o)=" + org_id + " MATCH (p:Person) WHERE ID(p)=" + person_id +
                " MERGE (o)-[:FOLLOWED_BY]->(p)")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        getFollowers: function(req, res, callback) {

            var org_id = req.params.org_id;

            neo_session.run(" MATCH (n)-[:FOLLOWED_BY]->(p) WHERE ID(n)=" + org_id + " RETURN p")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },
    
        removeFollower: function(req, res, callback) {

            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            neo_session.run(" START p=node(*) MATCH (n)-[rel:FOLLOWED_BY]->(p) WHERE ID(p)=" + person_id + " AND ID(n)=" + org_id + " DELETE rel")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Get :PART_OF, OWNED_BY, MANAGED_BY, FOLLOWED BY
        getPeople: function(req, res, callback) {
 
            var org_id = req.params.org_id;

            neo_session.run(" MATCH (n)-[:OWNED_BY|FOLLOWED_BY|MANAGED_BY|PART_OF]-(p) WHERE ID(n)=" + org_id + " RETURN p")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        } 
    }

}
