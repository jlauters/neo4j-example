var neo4j = require('neo4j-driver').v1;
var querystring = require('querystring');

// Neo4j connection
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "redpill"));
var neo_session = driver.session();

module.exports = function(app, config) {

    return {

        // Return list of repository nodes
        list: function(req, res, callback) {

            neo_session.run(" MATCH (n:Repository) RETURN n LIMIT 25").then( function(result) {
                console.log(" Data Loaded! ");

                var repos = Array();
                for(idx in result.records) {

                    url        = result.records[idx]._fields[0].properties.url;
                    name       = result.records[idx]._fields[0].properties.name;
                    readme     = result.records[idx]._fields[0].properties.readme;
                    created_on = result.records[idx]._fields[0].properties.created_on;

                    repos.push({"url": url, "name": name, "readme": readme, "created_on": created_on});
                }

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(repos, 0, 4) );
            });
        },

        // Add an ew repository node
        add: function(req, res, callback) {
    
            var url    = querystring.escape( req.query.url );
            var name   = querystring.escape( req.query.name ).replace(/'/g, "\\'");
            var readme = querystring.escape( req.query.readme );
            var created_on = new Date().toString();

            neo_session.run(" CREATE (n:Repository {url: '" + url + "', name: '" + name + "', readme: '" + readme + "', created_on: '" + created_on + "'}) RETURN n")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Edit existing repository node
        edit: function(req, res, callback) {
       
            var repo_id = req.params.repo_id;
   
            res.write("Edit Repository");
            res.end();
        },

        // Delete existing repository node
        deleteRepo: function(req, res, callback) {

            var repo_id = req.params.repo_id;

            neo_session.run(" MATCH (n:Repository) where ID(n)=" + repo_id + " OPTIONAL MATCH (n)-[r]-() DELETE r,n")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Create owner relationship between Person node and Repository
        setOwner: function(req, res, callback) {

            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            neo_session.run(" MATCH (n:Repository) WHERE ID(n)=" + repo_id + " MATCH (p:Person) WHERE ID(p)=" + person_id +
                " MERGE (p)-[:OWNS]->(n)")
            .then( function(result) {
            
                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Get Person node through Repository OWNS relationship
        getOwner: function(req, res, callback) {
        
            var repo_id = req.params.repo_id;

            neo_session.run(" MATCH (n)<-[:OWNS]-(p) WHERE ID(n)=" + repo_id + " RETURN p")
            .then( function(result) {
            
                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            })

        },

        // Remove OWNS relationship between Person and Repository nodes
        removeOwner: function(req, res, callback) {

            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            neo_session.run(" START p=node(*) MATCH (p)-[rel:OWNS]->(n) WHERE ID(p)=" + person_id + " AND ID(n)=" + repo_id +
                " DELETE rel")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        getInfo: function(req, res, callback) {

            var repo_id = req.params.repo_id;

            res.write("Get Info for Repository");
            res.end();
        },

        // Add Collaborates With relationship between Person and Repository nodes
        addCollaborator: function(req, res, callback) {
  
            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            neo_session.run(" MATCH (n:Repository) WHERE ID(n)=" + repo_id + " MATCH (p:Person) WHERE ID(p)=" + person_id +
                " MERGE (p)-[:COLLABORATES_WITH]->(n)")
            .then( function(result) {
            
                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Remove Collaborates With relationship between Person and Repository nodes
        removeCollaborator: function(req, res, callback) {

            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            neo_session.run(" START p=node(*) MATCH (p)-[rel:COLLABORATES_WITH]->(n) WHERE ID(p)=" + person_id + " AND ID(n)=" + repo_id +
                " DELETE rel")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        // Add Follows relationship between Person and Repository nodes
        addFollower: function(req, res, callback) {

            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            neo_session.run(" MATCH (n:Repository) WHERE ID(n)=" + repo_id + " MATCH (p:Person) WHERE ID(p)=" + person_id +
                " MERGE (p)-[:FOLLOWS]->(n)")
            .then( function(result) {

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });

        },

        // Remove Follows relationship between Person and Repository nodes
        removeFollower: function(req, res, callback) {
        
            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            neo_session.run(" START p=node(*) MATCH (p)-[rel:FOLLOWS]->(n) WHERE ID(p)=" + person_id + " AND ID(n)=" + repo_id +
                " DELETE rel")
            .then( function(result) {
 
                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        addDataNode: function(req, res, callback) {
 
            var repo_id = req.params.repo_id;
  
            res.write("Add Data Node to Repository");
            res.end();
        },

        importData: function(req, res, callback) {

            var repo_id = req.params.repo_id;
    
            res.write("Import Data to Repository");
            res.end();
        },

        query: function(req, res, callback) {

            var repo_id = req.params.repo_id;
            var query_string = req.params.query_string;

            res.write("Query Repository Data");
            res.end();
        },

        getAllData: function(req, res, callback) {

            var repo_id = req.params.repo_id;

            res.write("Get All Data for Repository");
            res.end();
        },

        setEntryPoint: function(req, res, callback) {

            var repo_id = req.params.repo_id;

            res.write("Set Default Entry Point");
            res.end();
        }
    }

}
