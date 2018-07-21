//block definition
Blockly.Blocks['myloop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("ทำซ้ำ")
            .appendField(new Blockly.FieldNumber(0), "number");
        this.appendStatementInput("todo")
            .setCheck(null);
        this.setColour(300);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//begin

Blockly.Blocks['my_declare_variable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["int", "int"], ["float", "float"], ["char", "char"]]), "type")
            .appendField(new Blockly.FieldVariable("x"), "variableName");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_scanf'] = {
    init: function () {
        this.appendValueInput("variable")
            .setCheck(null)
            .appendField("cin >> ")
        this.appendDummyInput()
            .appendField(" ;");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_variable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("x"), "setcount_set");
        this.setOutput(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_setvariable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("x"), "count");
        this.appendDummyInput()
            .appendField("=");
        this.appendValueInput("var1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(";");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['ask_setvariable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("x"), "count");
        this.appendDummyInput()
            .appendField("=");
        this.appendValueInput("var1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(";");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "number");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_math'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput("var1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"]]), "math");
        this.appendValueInput("var2")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("\"")
            .appendField(new Blockly.FieldTextInput(""), "message_input")
            .appendField("\"");
        this.setOutput(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_printf'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cout << ");
        this.appendValueInput("var1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(" ;");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_condition'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput("var1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["==", "=="], ["!=", "!="], [">", ">"], ["<", "<"], [">=", ">="], ["<=", "<="]]), "symbol");
        this.appendValueInput("var2")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(") ");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_compare'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput("var1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["&&", "&&"], ["||", "||"]]), "symbol");
        this.appendValueInput("var2")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_if'] = {
    init: function () {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("if (");
        this.appendDummyInput()
            .appendField("){");
        this.appendStatementInput("todo")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['ask_if'] = {
    init: function () {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("if (");
        this.appendDummyInput()
            .appendField("){");
        this.appendStatementInput("todo")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_ifelse'] = {
    init: function () {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("if (");
        this.appendDummyInput()
            .appendField(") {");
        this.appendStatementInput("todo1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("else {");
        this.appendStatementInput("todo2")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['ask_ifelse'] = {
    init: function () {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("if (");
        this.appendDummyInput()
            .appendField(") {");
        this.appendStatementInput("todo1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("else {");
        this.appendStatementInput("todo2")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_while'] = {
    init: function () {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("while (");
        this.appendDummyInput()
            .appendField(") {");
        this.appendStatementInput("todo")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(105);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['ask_while'] = {
    init: function () {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("while (");
        this.appendDummyInput()
            .appendField(") {");
        this.appendStatementInput("todo")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_dowhile'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("do {");
        this.appendStatementInput("todo")
            .setCheck(null);
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("} while(");
        this.appendDummyInput()
            .appendField(");");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(105);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['ask_dowhile'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("do {");
        this.appendStatementInput("todo")
            .setCheck(null);
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("} while(");
        this.appendDummyInput()
            .appendField(");");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_for'] = {
    init: function () {
        this.appendValueInput("varCount")
            .setCheck("Number")
            .appendField("for (");
        this.appendValueInput("numCount")
            .setCheck("Number")
            .appendField("=");
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(";");
        this.appendValueInput("varStep")
            .setCheck("Number")
            .appendField(";");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["++", "++"], ["--", "--"]]), "symStep")
            .appendField(") {");
        this.appendStatementInput("todo")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("}");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(105);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_boxfunc'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["void", "void"], ["int", "int"], ["float", "float"], ["string", "string"], ["char", "char"]]), "type")
            .appendField("function ")
            .appendField(new Blockly.FieldVariable("abc"), "NAME")
            .appendField("(");
        this.appendValueInput("para1")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([["int", "int"], ["float", "float"], ["string", "string"], ["char", "char"]]), "pt1");
        this.appendValueInput("para2")
            .setCheck(null)
            .appendField(",")
            .appendField(new Blockly.FieldDropdown([["int", "int"], ["float", "float"], ["string", "string"], ["char", "char"]]), "pt2");
        this.appendValueInput("para3")
            .setCheck(null)
            .appendField(",")
            .appendField(new Blockly.FieldDropdown([["int", "int"], ["float", "float"], ["string", "string"], ["char", "char"]]), "pt3");
        this.appendValueInput("para4")
            .setCheck(null)
            .appendField(",")
            .appendField(new Blockly.FieldDropdown([["int", "int"], ["float", "float"], ["string", "string"], ["char", "char"]]), "pt4");
        this.appendDummyInput()
            .appendField(") {");
        this.appendStatementInput("todo")
            .setCheck(null);
        this.appendValueInput("return")
            .setCheck(null)
            .appendField("return");
        this.appendDummyInput()
            .appendField(";}");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(45);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_callfunc'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("abc"), "name")
            .appendField("(");
        this.appendValueInput("para1")
            .setCheck(null);
        this.appendValueInput("para2")
            .setCheck(null)
            .appendField(",");
        this.appendValueInput("para3")
            .setCheck(null)
            .appendField(",");
        this.appendValueInput("para4")
            .setCheck(null)
            .appendField(",");
        this.appendDummyInput()
            .appendField(");");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(45);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['my_callfunc_re'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("abc"), "name")
            .appendField("(");
        this.appendValueInput("para1")
            .setCheck(null);
        this.appendValueInput("para2")
            .setCheck(null)
            .appendField(",");
        this.appendValueInput("para3")
            .setCheck(null)
            .appendField(",");
        this.appendValueInput("para4")
            .setCheck(null)
            .appendField(",");
        this.appendDummyInput()
            .appendField(")");
        this.setOutput(true, null);
        this.setColour(45);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

/*******************************  ***************************************/
/*******************************  ***************************************/
//generator stub

//test
Blockly.JavaScript['myloop'] = function (block) {
    var number_number = block.getFieldValue('number');
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    statements_todo = Blockly.JavaScript.addLoopTrap(statements_todo, block.id);
    // TODO: Assemble JavaScript into code variable.
    var code =
        'for(var i = 0 ; i < ' + number_number + ' ; i ++){\n' +
        statements_todo + '\n' +
        "}\n"
    return code;
};

//begin

Blockly.JavaScript['my_declare_variable'] = function (block) {
    var dropdown_type = block.getFieldValue('type');
    var variable_variablename = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variableName'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble JavaScript into code variable.
    var code = 'var ' + variable_variablename + ";\n";
    code += "//<div>" + dropdown_type + " " + variable_variablename + ';</div>\n';
    return code;
};

Blockly.JavaScript['my_scanf'] = function (block) {
    var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_variable + ' = prompt("", "");\n' +
        'if( ' + value_variable + '== null ){' + value_variable + ' = ""; }\n';
    code += "//<div>cin >> " + value_variable + ' ;</div>\n';
    return code;
};

Blockly.JavaScript['my_variable'] = function (block) {
    var variable_setcount_set = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('setcount_set'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble JavaScript into code variable.
    var code = variable_setcount_set;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['my_setvariable'] = function (block) {
    var variable_count = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('count'), Blockly.Variables.NAME_TYPE);
    var value_var1 = Blockly.JavaScript.valueToCode(block, 'var1', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable
    var code = variable_count + ' = ' + value_var1 + ';\n';
    code += "//<div>" + variable_count + ' = ' + value_var1 + ';</div>\n';
    return code;
};

Blockly.JavaScript['ask_setvariable'] = function (block) {
    var variable_count = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('count'), Blockly.Variables.NAME_TYPE);
    var value_var1 = Blockly.JavaScript.valueToCode(block, 'var1', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable
    var ask = 'askQ("ค่าของ ' + variable_count + ' คืออะไร?",eval(' + value_var1 + '));\n' +
        'askA();\n';
    var code = variable_count + ' = ' + value_var1 + ';\n';
    code += "//<div>" + variable_count + ' = ' + value_var1 + ';</div>\n';
    code = ask + code;
    return code;
};

Blockly.JavaScript['my_number'] = function (block) {
    var number_number = block.getFieldValue('number');
    // TODO: Assemble JavaScript into code variable.
    var code = number_number;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['my_math'] = function (block) {
    var value_var1 = Blockly.JavaScript.valueToCode(block, 'var1', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_math = block.getFieldValue('math');
    var value_var2 = Blockly.JavaScript.valueToCode(block, 'var2', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_var1 + dropdown_math + value_var2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['my_string'] = function (block) {
    var text_message_input = block.getFieldValue('message_input');
    // TODO: Assemble JavaScript into code variable.
    var code = '"' + text_message_input + '"';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['my_printf'] = function (block) {
    var value_var1 = Blockly.JavaScript.valueToCode(block, 'var1', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'alert(' + value_var1 + ');\n';
    code += "//<div>cout << " + value_var1 + ';</div>\n';
    //console.log(value_detail);
    return code;
};

Blockly.JavaScript['my_compare'] = function (block) {
    var value_var1 = Blockly.JavaScript.valueToCode(block, 'var1', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_symbol = block.getFieldValue('symbol');
    var value_var2 = Blockly.JavaScript.valueToCode(block, 'var2', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_var1 + dropdown_symbol + value_var2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['my_condition'] = function (block) {
    var value_var1 = Blockly.JavaScript.valueToCode(block, 'var1', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_symbol = block.getFieldValue('symbol');
    var value_var2 = Blockly.JavaScript.valueToCode(block, 'var2', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_var1 + ' ' + dropdown_symbol + ' ' + value_var2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['my_if'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    // TODO: Assemble JavaScript into code variable.
    var code =
        'if(' + value_condition + '){\n' +
        "//<div>if( " + value_condition + " ){<div class='stage'>\n" +
        statements_todo +
        '}\n' +
        "//</div>}</div>\n";
    return code;
};

Blockly.JavaScript['ask_if'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    // TODO: Assemble JavaScript into code variable.
    var code = 'if(' + value_condition + '){\n' +
        "//<div>if( " + value_condition + " ){<div class='stage'>\n" +
        statements_todo +
        '}\n' +
        "//</div>}</div>\n";
    var ask = 'askQ("เข้าเงื่อนไข if ใช่หรือไม่",(eval(' + value_condition + ')? true : false));\n';
    var answer = 'askA();\n';
    code = ask + answer + code;
    return code;
};

Blockly.JavaScript['my_ifelse'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_todo1 = Blockly.JavaScript.statementToCode(block, 'todo1');
    var statements_todo2 = Blockly.JavaScript.statementToCode(block, 'todo2');
    // TODO: Assemble JavaScript into code variable.
    var code = 'if(' + value_condition + '){\n' +
        "//<div>if( " + value_condition + " ){<div class='stage'>\n" +
        statements_todo1 +
        '}else{\n' +
        "//</div>}else{<div class='stage'>\n" +
        statements_todo2 +
        '}\n' +
        "//</div>}</div>\n";
    return code;
};

Blockly.JavaScript['ask_ifelse'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_todo1 = Blockly.JavaScript.statementToCode(block, 'todo1');
    var statements_todo2 = Blockly.JavaScript.statementToCode(block, 'todo2');
    // TODO: Assemble JavaScript into code variable.
    var code = 'if(' + value_condition + '){\n' +
        "//<div>if( " + value_condition + " ){<div class='stage'>\n" +
        statements_todo1 +
        '}else{\n' +
        "//</div>}else{<div class='stage'>\n" +
        statements_todo2 +
        '}\n' +
        "//</div>}</div>\n";
    var ask = 'askQ("เข้าเงื่อนไข if ใช่หรือไม่",(eval(' + value_condition + ')? true : false));\n';
    var answer = 'askA();\n';
    code = ask + answer + code;
    return code;
};

Blockly.JavaScript['my_while'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    statements_todo = Blockly.JavaScript.addLoopTrap(statements_todo, block.id);
    // TODO: Assemble JavaScript into code variable.
    var code = 'while (' + value_condition + ') {\n' +
        "//<div>while( " + value_condition + " ){<div class='stage'>\n" +
        statements_todo +
        '}\n' +
        "//</div>}</div>\n";
    return code;
};

Blockly.JavaScript['ask_while'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    statements_todo = Blockly.JavaScript.addLoopTrap(statements_todo, block.id);
    // TODO: Assemble JavaScript into code variable.
    var ask = 'askQ("เข้าลูปนี้ใช่หรือไม่?",(eval(' + value_condition + ')? true : false));\n' +
        "//<div>while( " + value_condition + " ){<div class='stage'>\n" +
        'askA();\n';
    var code = 'while (' + value_condition + ') {\n' +
        statements_todo +
        'askQ("ทำงานในลูปต่อใช่หรือไม่?",(eval(' + cutVariable(value_condition) + ')? true : false));\n' +
        'askA();\n' +
        '}\n' +
        "//</div>}</div>\n";
    code = ask + code;
    return code;
};

Blockly.JavaScript['my_dowhile'] = function (block) {
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    statements_todo = Blockly.JavaScript.addLoopTrap(statements_todo, block.id);
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'do{\n' +
        "//<div>do{<div class='stage'>\n" +
        statements_todo +
        '}while(' + value_condition + ');\n' +
        "//</div>}while( " + cutVariable(value_condition) + " );</div>\n";
    return code;
};

Blockly.JavaScript['ask_dowhile'] = function (block) {
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    statements_todo = Blockly.JavaScript.addLoopTrap(statements_todo, block.id);
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'do{\n' +
        "//<div>do{<div class='stage'>\n" +
        statements_todo +
        'askQ("ทำงานในลูปต่อใช่หรือไม่?",(eval(' + value_condition + ')? true : false));\n' +
        'askA();\n' +
        '}while(' + value_condition + ');\n' +
        "//</div>}while( " + value_condition + " );</div>\n";
    return code;
};

Blockly.JavaScript['my_for'] = function (block) {
    var value_varcount = Blockly.JavaScript.valueToCode(block, 'varCount', Blockly.JavaScript.ORDER_ATOMIC);
    var value_numcount = Blockly.JavaScript.valueToCode(block, 'numCount', Blockly.JavaScript.ORDER_ATOMIC);
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var value_varstep = Blockly.JavaScript.valueToCode(block, 'varStep', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_symstep = block.getFieldValue('symStep');
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    statements_todo = Blockly.JavaScript.addLoopTrap(statements_todo, block.id);
    //branch
    // TODO: Assemble JavaScript into code variable.
    var code = 'for (' + value_varcount + ' = ' + value_numcount + '; ' +
        value_condition + '; ' +
        value_varstep + dropdown_symstep + ') {\n' +
        "//<div>for(" + cutVariable(value_varcount) + " = " + cutVariable(value_numcount) + "; " + cutVariable(value_condition) + "; " +
        cutVariable(value_varstep) + dropdown_symstep + "){<div class='stage'>\n" +
        statements_todo + '}\n' +
        "//</div>};</div>\n";
    return code;
};

Blockly.JavaScript['my_boxfunc'] = function (block) {
    var dropdown_type = block.getFieldValue('type');
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var dropdown_pt1 = block.getFieldValue('pt1');
    var value_para1 = Blockly.JavaScript.valueToCode(block, 'para1', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_pt2 = block.getFieldValue('pt2');
    var value_para2 = Blockly.JavaScript.valueToCode(block, 'para2', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_pt3 = block.getFieldValue('pt3');
    var value_para3 = Blockly.JavaScript.valueToCode(block, 'para3', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_pt4 = block.getFieldValue('pt4');
    var value_para4 = Blockly.JavaScript.valueToCode(block, 'para4', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
    var value_return = Blockly.JavaScript.valueToCode(block, 'return', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var parametor = "";
    var divpara = "";
    if (value_para1 != "") {
        parametor += value_para1.slice(1, value_para1.length - 1);
        divpara += dropdown_pt1 + " " + value_para1.slice(1, value_para1.length - 1);
        if (value_para2 != "") {
            parametor += ", " + value_para2.slice(1, value_para2.length - 1);
            divpara += ", " + dropdown_pt2 + " " + value_para2.slice(1, value_para2.length - 1);
            if (value_para3 != "") {
                parametor += ", " + value_para3.slice(1, value_para3.length - 1);
                divpara += ", " + dropdown_pt3 + " " + value_para3.slice(1, value_para3.length - 1);
                if (value_para4 != "") {
                    parametor += ", " + value_para4.slice(1, value_para4.length - 1);
                    divpara += ", " + dropdown_pt4 + " " + value_para4.slice(1, value_para4.length - 1);
                }
            }
        }
    }
    console.log(divpara);

    var code = 'function ' + variable_name + '( ' + parametor + ') {\n' +
        "//<br><div>" + dropdown_type + " " + variable_name + "( " + divpara + " ){<div class='stage'>\n" +
        statements_todo + "\n" +
        "return " + value_return + ";\n" +
        "//<div>return " + value_return + ";</div>\n" +
        "}\n" +
        "//</div>}</div>\n";
    return code;
};

Blockly.JavaScript['my_callfunc'] = function (block) {
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
    var value_para1 = Blockly.JavaScript.valueToCode(block, 'para1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_para2 = Blockly.JavaScript.valueToCode(block, 'para2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_para3 = Blockly.JavaScript.valueToCode(block, 'para3', Blockly.JavaScript.ORDER_ATOMIC);
    var value_para4 = Blockly.JavaScript.valueToCode(block, 'para4', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var parametor = "";
    if (value_para1 != "") {
        parametor += value_para1;
        if (value_para2 != "") {
            parametor += ", " + value_para2;
            if (value_para3 != "") {
                parametor += ", " + value_para3;
                if (value_para4 != "") {
                    parametor += ", " + value_para4;
                }
            }
        }
    }
    var code = variable_name + "( " + parametor + " );\n";
    code += "//<div>" + variable_name + "( " + parametor + " );</div>\n";
    return code;
};

Blockly.JavaScript['my_callfunc_re'] = function (block) {
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
    var value_para1 = Blockly.JavaScript.valueToCode(block, 'para1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_para2 = Blockly.JavaScript.valueToCode(block, 'para2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_para3 = Blockly.JavaScript.valueToCode(block, 'para3', Blockly.JavaScript.ORDER_ATOMIC);
    var value_para4 = Blockly.JavaScript.valueToCode(block, 'para4', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var parametor = "";
    if (value_para1 != "") {
        parametor += value_para1;
        if (value_para2 != "") {
            parametor += ", " + value_para2;
            if (value_para3 != "") {
                parametor += ", " + value_para3;
                if (value_para4 != "") {
                    parametor += ", " + value_para4;
                }
            }
        }
    }
    var code = variable_name + "( " + parametor + " )";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

function cutVariable(vname) {
    if (vname[0] == "(") {
        return vname.slice(1, vname.length - 1);
    }
    return vname;
}