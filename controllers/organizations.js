var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "redpill"));
var neo_session = driver.session();

module.exports = function(app, config) {

    return {
        list: function(req, res, callback) {
            res.write("List of Organizations");
            res.end();
        },

        add: function(req, res, callback) {
            res.write("Add Organization node");
            res.end();
        },

        edit: function(req, res, callback) {
        
            var org_id = req.params.org_id;

            res.write("Edit Organization node");
            res.end();
        },

        deleteOrg: function(req, res, callback) {
    
            var org_id = req.params.org_id;

            res.write("Delete Organization node");
            res.end();
        },

        getRepositories: function(req, res, callback) {
 
            var org_id = req.params.org_id;

            res.write("Get Repositories for Organization");
            res.end();
        },

        addPerson: function(req, res, callback) {
 
            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            res.write("Add Person to Organization");
            res.end();
        },

        removePerson: function(req, res, callback) {
 
            var org_id    = req.params.org_id;
            var person_id = req.params.person_id;

            res.write("Remove Person from Organization");
            res.end();
        },

        getPeople: function(req, res, callback) {
 
            var org_id = req.params.org_id;

            res.write("List People from organization");
            res.end();
        } 
    }

}
