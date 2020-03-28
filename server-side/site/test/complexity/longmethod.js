// https://eslint.org/docs/rules/max-lines-per-function

function longMethod() {
    var a = '';
    var b = '';

    var questionNumber = 0;

    // Incididunt do incididunt irure consectetur. 
    // Deserunt in eiusmod nisi irure aliquip esse adipisicing in qui in aliqua nisi. 
    // Eiusmod in nisi laboris ipsum cillum consectetur. 
    // Quis sint aute non fugiat officia Lorem amet exercitation aute. 
    // Commodo non ex non proident pariatur proident reprehenderit esse labore amet enim commodo. 
    // Proident occaecat mollit sint sint proident ullamco non.

    var parentToken = null;
    var parentHeader = '<div data-question="{0}" data-kind="{1}">';
    // hr in markdown (------) marks a new page in marqdown.
    // Questions are wrapped in a container div, with a data attribute indicating what page it belongs on.
    var pageNumber = 0;
    var pageHeader = '<div data-page="{0}">';

    // First page.
    newTokens.push({ type: 'text', text: pageHeader.format(pageNumber++) });

    var t = tokens[i];
    newTokens.push(t);
    //console.log(t);
    // remove code
    newTokens.splice(newTokens.length - 1, 1);

    var html = templates.code({ text: EscapeCode(t.text) });
    //console.log( html );

    newTokens.push({ type: 'text', text: html });

    var lastToken = newTokens[newTokens.length - 2];

    parentToken = { type: 'text', text: '' };
    newTokens.splice(newTokens.length - 1, 0, parentToken);
    //newTokens.push(parentToken);

    questionNumber++;
    if (qOptions) {
        t.text = questionNumber + ". " + t.text;
    }

    if (t.type == "hr") {
        // remove hr token
        newTokens.splice(newTokens.length - 1, 1);


        newTokens.push({ type: 'text', text: '</div>' });
        //newTokens.push({ type: 'text', text: '<span></span></div>'});
        newTokens.push({ type: 'text', text: pageHeader.format(pageNumber++) });

    }

    // Magna minim nostrud Lorem proident incididunt anim. 
    // Lorem duis velit do velit aute exercitation elit. 
    // Sint consequat sit cillum sint minim voluptate duis consequat qui labore incididunt magna voluptate esse. 
    // Et culpa et dolor adipisicing eu velit aliqua consectetur est ipsum tempor in sunt. 
    // Ea labore dolore occaecat duis aliqua consectetur qui velit. 
    // Fugiat veniam aliquip eiusmod nostrud ea eiusmod ullamco nulla adipisicing eiusmod non. 
    // Dolore velit minim eiusmod occaecat officia minim enim ipsum consequat.


    newTokens.splice(newTokens.length - 1, 1);

    var choices = [];
    var innerTokens = [];
    var listKind = t.ordered;
    var itemNumber = 0;
    if (t.type == "list_item_start" || t.type == "loose_item_start") {
        innerTokens = [];
    }

    if (t.type != "list_item_start" && t.type != "loose_item_start" && t.type != "list_item_end") {
        innerTokens.push(t);
        itemNumber++;
    }

    if (t.type == "list_item_end") {
        innerTokens.links = tokens.links

        var embeddedHtml = processInnerText(innerTokens, tokens);

        var choice = { label: embeddedHtml, name: questionNumber, value: choices.length };
        choices.push(choice);
    }

    t = tokens[++i];

    var html = "";
    if (listKind) {
        html = templates.singlechoice({ choices: choices });
        parentToken.text = parentHeader.format(questionNumber, 'singlechoice');
    }
    else {
        html = templates.multichoice({ choices: choices });
        parentToken.text = parentHeader.format(questionNumber, 'multichoice');
    }

    newTokens.push({ type: 'text', text: html });

    // next token.
    t = tokens[++i];


    // remove blockquote_start
    newTokens.splice(newTokens.length - 1, 1);


    // parse json representation
    var json = JSON5.parse(text);

    var html = "";
    if (json && json.upload) {
        html = templates.fileupload({ placeholder: json.placeholder, name: questionNumber });
        parentToken.text = parentHeader.format(questionNumber, 'fileupload');
    }
    else if (json && json.rows && json.rows > 1) {
        html = templates.textarea({ placeholder: json.placeholder, rows: json.rows, name: questionNumber });
        parentToken.text = parentHeader.format(questionNumber, 'textarea');
    }
    else {
        var placeholder = "";
        if (json && json.placeholder)
            placeholder = json.placeholder;
        html = templates.text({ name: questionNumber, placeholder: placeholder });
        parentToken.text = parentHeader.format(questionNumber, 'text');
    }

    newTokens.push({ type: 'text', text: html });


    if (t.cells.length == 0 || t.cells[0].length != t.header.length)
        return; // let marked handle it...

    // remove table
    newTokens.splice(newTokens.length - 1, 1);

    // Handle marked bug:
    var lastRow = t.cells.length - 1;
    if (lastRow > 0 && t.cells[lastRow].length != t.cells[lastRow - 1].length) {
        // marked bug misses last cell if empty
        t.cells[lastRow].push("");
    }

    var headers = t.header;
    var bodyRows = t.cells;

    var html = "";
    // Is this a multi-choice?
    // choice | [] | [ ] | [ ] |
    var testChoices = bodyRows[0].slice(1, bodyRows[0].length);
    if (_.any(testChoices, function (col) {
        // without whitespace is []
        return col.trim().replace(/\s/g, "") == "[]";
    }
    )
    ) {
        html = templates.multichoicetable({ table: questionNumber, headers: headers, rows: bodyRows });
        parentToken.text = parentHeader.format(questionNumber, 'multichoicetable');
    }
    else {
        html = templates.singlechoicetable({ table: questionNumber, headers: headers, rows: bodyRows });
        parentToken.text = parentHeader.format(questionNumber, 'singlechoicetable');
    }

    newTokens.push({ type: 'text', text: html });
    // Close page div. 
    newTokens.push({ type: 'text', text: '</div>' });
}
