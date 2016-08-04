var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "redpill"));
var neo_session = driver.session();

module.exports = function(app, config) {

    return {
        list: function(req, res, callback) {
            res.write("List Repositories");
            res.end();
        },

        add: function(req, res, callback) {
            res.write("Add repository");
            res.end();
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
