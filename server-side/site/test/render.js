const marqdown = require('../marqdown');
const fs = require('fs');


describe('Render markdown', function() {
    it('successfully renders survey', function(done) {

        fs.readFile('resources/survey.md', function(err, data)
        {
            if( err ) throw err;
            let html = marqdown.render(data.toString());

            assert(html.includes("thead"));

            done();
        });

    });
});