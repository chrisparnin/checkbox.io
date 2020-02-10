const marqdown = require('../marqdown');
const fs = require('fs');
const path = require('path');


describe('Render markdown', function() {
    it('successfully renders survey', function(done) {

        fs.readFile( path.join(__dirname, 'resources', 'survey.md'), function(err, data)
        {
            if( err ) throw err;
            let html = marqdown.render(data.toString());

            assert(html.includes("thead"));

            done();
        });

    });
});