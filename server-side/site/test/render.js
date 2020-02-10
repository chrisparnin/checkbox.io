const marqdown = require('../marqdown');
const fs = require('fs');
const path = require('path');
const chai = require('chai');


describe('Render markdown', function() {
    it('successfully renders survey', function(done) {

        fs.readFile( path.join(__dirname, 'resources', 'survey.md'), function(err, data)
        {
            if( err ) throw err;
            let html = marqdown.render(data.toString());

            chai.assert('rendered html contains <thead>', html.includes("thead"));

            console.log(html);
            done();
        });

    });
});