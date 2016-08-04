var neo4j = require('neo4j-driver').v1;
var querystring = require('querystring');

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "redpill"));
var neo_session = driver.session();

module.exports = function(app, config) {

    return {
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

        add: function(req, res, callback) {
    
            console.log('request query: ');
            console.log(req.query);

            var url    = querystring.escape( req.query.url );
            var name   = querystring.escape( req.query.name ).replace(/'/g, "\\'");
            var readme = querystring.escape( req.query.readme );
            var created_on = new Date().toString();

            console.log("url: " + url);
            console.log("name: " + name);
            console.log("readme: " + readme);
            console.log("created_on: " + created_on);

            neo_session.run(" CREATE (n:Repository {url: '" + url + "', name: '" + name + "', readme: '" + readme + "', created_on: '" + created_on + "'}) RETURN n")
            .then( function(result) {

                console.log(" Repository Created! ");
                console.log(result);

                res.setHeader('Content-Type', 'application/json');
                res.send( JSON.stringify(result, 0, 4) );
            });
        },

        edit: function(req, res, callback) {
       
            var repo_id = req.params.repo_id;
   
            res.write("Edit Repository");
            res.end();
        },

        deleteRepo: function(req, res, callback) {

            var repo_id = req.params.repo_id;

            res.write("Delete Repository");
            res.end();
        },

        setOwner: function(req, res, callback) {

            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            res.write("Set Owner for Repository");
            res.end();
        },

        getOwner: function(req, res, callback) {
        
            var repo_id = req.params.repo_id;

            res.write("Get Owner for Repository");
            res.end();
        },

        getInfo: function(req, res, callback) {

            var repo_id = req.params.repo_id;

            res.write("Get Info for Repository");
            res.end();
        },

        addCollaborator: function(req, res, callback) {
  
            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            res.write("Add Collaborator to Repository");
            res.end();
        },

        removeCollaborator: function(req, res, callback) {

            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            res.write("Remove Collaborator from Repository");
            res.end();
        },

        addFollower: function(req, res, callback) {

            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            res.write("Add Follower to Repository");
            res.end();
        },

        removeFollower: function(req, res, callback) {
        
            var repo_id   = req.params.repo_id;
            var person_id = req.params.person_id;

            res.write("Remove Follower from Repository");
            res.end();
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
