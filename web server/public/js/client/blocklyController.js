var theWorkspace = Blockly.inject('blocklyDiv',
    {
        media: '/blockly/media/',
        toolbox: document.getElementById('toolbox')
    });
//Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), theWorkspace);

var outputArea = document.getElementById('output');
var myInterpreter = null;

function initApi(interpreter, scope) {
    // Add an API function for the alert() block, generated for "text_print" blocks.
    interpreter.setProperty(scope, 'alert',
        interpreter.createNativeFunction(function (text) {
            text = (text != null) ? text.toString() : '';
            outputArea.value += '\n' + text;
        }));

    // Add an API function for the prompt() block.
    var wrapper = function (text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(prompt(text));
    };
    interpreter.setProperty(scope, 'prompt',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for highlighting blocks.
    var wrapper = function (id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for askQ blocks.
    var wrapper = function (text, answer) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(askQ(text, answer));
    };
    interpreter.setProperty(scope, 'askQ',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for askA blocks.
    var wrapper = function () {
        return interpreter.createPrimitive(askA());
    };
    interpreter.setProperty(scope, 'askA',
        interpreter.createNativeFunction(wrapper));
    // Add an API function for highlightCode blocks.
    var wrapper = function (id) {
        return interpreter.createPrimitive(highlightCode(id));
    };
    interpreter.setProperty(scope, 'highlightCode',
        interpreter.createNativeFunction(wrapper));
    var wrapper = function () {
        return interpreter.createPrimitive(updateVariable());
    };
    interpreter.setProperty(scope, 'updateVariable',
        interpreter.createNativeFunction(wrapper));
}

var highlightPause = false;
var latestCode = '';

function highlightBlock(id) {
    theWorkspace.highlightBlock(id);
    highlightCode(id);
    updateVariable();
    highlightPause = true;
}

var textQuestion = "";
var textChoices = [];
var textAnswer = "";
//สร้างคำถาม
function askQ(text, answer) {
    highlightPause = true; // หยุด block

    //สร้างชุดคำถาม ตัวเลือก เฉลย
    var choices = [];
    if (typeof answer == "boolean") {
        choices = ["ใช่", "ไม่ใช่"]
        answer = answer ? "ใช่" : "ไม่ใช่";
    } else if (typeof answer == "number") {
        choices = genChoice(answer);
    } else {
        return;
    }
    textQuestion = text;
    textAnswer = answer;
    textChoices = choices;

    //แสดงคำถามต่อจากนี้
    startQA();
}

function askA() {
    highlightPause = true; // หยุด block
    console.log("เฉลย " + textAnswer);
}

function highlightCode(id) {
    $(".hl").removeClass("hl");
    let bcid = "bc-" + id;
    let lineCode = document.getElementById(bcid);
    lineCode.className = "hl";
    console.log(lineCode);
}

function updateVariable() {
    let boxVariables = theWorkspace.getAllVariables();
    let variables = [];
    for (let i = 0; i < boxVariables.length; i++) {
        let dummy = {};
        dummy.name = boxVariables[i].name;
        dummy.value = eval(boxVariables[i]);
        variables.push(dummy);
    }
    console.log(variables);
}

//สุ่มสร้างตัวเลือกประเภทตัวเลข
function genChoice(answer) {
    var num = [];
    for (var i = -10; i <= 10; i++) {
        if (i == 0) continue;
        num.push(answer + i);
    }
    var choices = [];
    for (var i = 0; i < 3; i++) {
        var rng = Math.floor(Math.random() * num.length);
        choices.push(num[rng]);
        num.splice(rng, 1);
    }

    choices.push(answer);

    //สลับตำแหน่งตัวเลือก
    var a = choices;
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    choices = a;

    return choices;
}

function resetStepUi(clearOutput) {
    theWorkspace.highlightBlock(null);
    highlightPause = false;

    if (clearOutput) {
        outputArea.value = 'Program output:\n=================';
    }
}

function setBlocklyToCode(pstr) {
    let str = pstr;
    let codes = str.split("\n");
    str = "";
    let newCodes = [];
    let id = "";
    for (let i = 0; i < codes.length; i++) {
        let line = codes[i].trim();
        if (line.startsWith("//")) {
            let newLine = line.replace("//", "");
            if (newLine.startsWith("<div>")) {
                newLine = newLine.replace(/<div>/, "<div id='" + id + "'>");
            }
            str += newLine;
        } else {
            if (line.startsWith("highlightBlock")) {
                id = "bc-" + line.split("'")[1];
            }
            newCodes.push(codes[i]);
        }
    }
    let newStr = newCodes.join("\n");
    console.log(newStr);
    document.getElementById("div-code").innerHTML = str;
    return newStr;
}

function generateCodeAndLoadIntoInterpreter() {
    // Generate JavaScript code and parse it.
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    latestCode = Blockly.JavaScript.workspaceToCode(theWorkspace);
    latestCode = setBlocklyToCode(latestCode);
    resetStepUi(true);
}

function stepCode() {
    if (!myInterpreter) {
        // First statement of this code.
        // Clear the program output.
        resetStepUi(true);
        myInterpreter = new Interpreter(latestCode, initApi);

        // And then show generated code in an alert.
        // In a timeout to allow the outputArea.value to reset first.
        setTimeout(function () {
            /*alert('Ready to execute the following code\n' +
                '===================================\n' + latestCode);*/
            highlightPause = true;
            stepCode();
        }, 1);
        return;
    }
    highlightPause = false;
    do {
        try {
            var hasMoreCode = myInterpreter.step();
            console.log(hasMoreCode);
        } finally {
            if (!hasMoreCode) {
                // Program complete, no more code to execute.
                outputArea.value += '\n\n<< Program complete >>';

                myInterpreter = null;
                resetStepUi(false);

                return;
            }
        }
        // Keep executing until a highlight statement is reached,
        // or the code completes or errors.
    } while (hasMoreCode && !highlightPause);
}

function resetCode() {
    myInterpreter = null;
    resetStepUi(false);
}

// Load the interpreter now, and upon future changes.
generateCodeAndLoadIntoInterpreter();
theWorkspace.addChangeListener(function (event) {
    if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        generateCodeAndLoadIntoInterpreter();
    }
});

var xmlWorkspace;
var xmlTextWorkspace;
function blocklySave() {
    xmlWorkspace = Blockly.Xml.workspaceToDom(theWorkspace);
    xmlTextWorkspace = Blockly.Xml.domToText(xmlWorkspace);
    return xmlTextWorkspace;
}
function blocklyOpen(xmlCode) {
    theWorkspace.clear();
    xmlWorkspace = Blockly.Xml.textToDom(xmlCode);
    Blockly.Xml.domToWorkspace(xmlWorkspace, theWorkspace);
}