module.exports = function(app, config) {

    return {
        index: function(req, res, callback) {
            res.write("neo4j example");
            res.end();
        }
    }

}
