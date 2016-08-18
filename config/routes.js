module.exports = function(app, config) {

    // controllers - tbd
    var home   = require('../controllers/home')(app, config);
    //var data   = require('../controllers/data')(app, config);
    var people = require('../controllers/people')(app, config);
    var orgs   = require('../controllers/organizations')(app, config);
    var repos  = require('../controllers/repositories')(app, config);

    app.get('/', home.index);

    // file import
    //app.get('/import/:fileurl', data.importdata);

    // People
    app.get('/people', people.list);   
    app.post('/people/add', people.add);
    app.get('/people/edit/:person_id', people.edit);
    app.get('/people/delete/:person_id', people.deletePerson);
    app.get('/people/get_repositories/:person_id', people.getRepositories);
    app.get('/people/set_password/:person_id', people.setPassword);

    // Organizations
    app.get('/organizations/', orgs.list);
    app.post('/organizations/add', orgs.add);
    app.get('/organizations/edit/:org_id', orgs.edit);
    app.get('/organizations/delete/:org_id', orgs.deleteOrg);
    app.get('/organizations/get_repositories/:org_id', orgs.getRepositories);
    app.get('/organizations/add_person/:org_id/:person_id', orgs.addPerson);
    app.get('/organizations/remove_person/:org_id/:person_id', orgs.removePerson);
    app.get('/organizations/get_people/:org_id', orgs.getPeople);

    // Repositories
    app.get('/repositories/', repos.list);
    app.post('/repositories/add', repos.add);
    app.get('/repositories/edit/:repo_id', repos.edit);
    app.post('/repositories/delete/:repo_id', repos.deleteRepo);
    app.post('/repositories/set_owner/:repo_id/:person_id', repos.setOwner);
    app.get('/repositories/get_owner/:repo_id', repos.getOwner);
    app.get('/repositories/get_info/:repo_id', repos.getInfo);
    app.post('/repositories/add_collaborator/:repo_id/:person_id', repos.addCollaborator);
    app.post('/repositories/remove_collaborator/:repo_id/:person_id', repos.removeCollaborator);
    app.post('/repositories/add_follower/:repo_id/:person_id', repos.addFollower);
    app.post('/repositories/remove_follower/:repo_id/:person_id', repos.removeFollower);
    app.get('/repositories/add_data_node/:repo_id', repos.addDataNode);
    app.get('/repositories/import_data/:repo_id', repos.importData);
    app.get('/repositories/query/:repo_id/:query_string', repos.query);
    app.get('/repositories/get_all_data/:repo_id', repos.getAllData);
    app.get('/repositories/set_entry_point/:repo_id', repos.setEntryPoint); 
    
    
} 
