var readyCode;
function tanslateCode(code) {
    readyCode = codeToBox(code);
    console.log(readyCode);
    let xmlText = translateCodeToXml(readyCode);
    blocklyOpen(xmlText);
}

function codeToBox(code) {
    let boxs = [];
    while (code.length > 0) {
        let oldCode = code;
        try {
            let data = {};
            switch (checkTypeBox(code)) {
                case "if":
                    data = toBoxIf(code);
                    break;
                case "while":
                    data = toBoxWhile(code);
                    break;
                case "dowhile":
                    data = toBoxDoWhile(code);
                    break;
                case "for":
                    data = toBoxFor(code);
                    break;
                case "declare":
                    data = toBoxDeclare(code);
                    break;
                case "cout":
                    data = toBoxCout(code);
                    break;
                case "cin":
                    data = toBoxCin(code);
                    break;
                case "set":
                    data = toBoxSet(code);
                    break;
                case "logic":
                    data = toBoxLogic(code);
                    break;
                case "text":
                    data = toBoxText(code);
                    break;
                default:
                    data.code = code.slice(1);
                    data.box = null;
                    break;
            }
            code = data.code;
            if (data.box !== null) {
                boxs.push(data.box);
            }
        } catch (e) {
            console.log(e, code);
            break;
        }
        if (oldCode == code) {
            break;
        }
    }
    return boxs;
}

function checkTypeBox(code) {
    if (code.startsWith("if ") || code.startsWith("if(")) {
        return "if";
    } else if (code.startsWith("while ") || code.startsWith("while(")) {
        return "while";
    } else if (code.startsWith("do ") || code.startsWith("do{")) {
        return "dowhile";
    } else if (code.startsWith("for ") || code.startsWith("for(")) {
        return "for";
    } else if (code.startsWith("int ") || code.startsWith("float ") || code.startsWith("string ") || code.startsWith("char ")) {
        return "declare";
    } else if (code.startsWith("cout ") || code.startsWith("cout<")) {
        return "cout";
    } else if (code.startsWith("cin ") || code.startsWith("cin>")) {
        return "cin";
    } else if (/^[a-zA-Z0-9\-]*$/.test(code[0])) {
        return checkTypeRogic(code);
    } else if (code[0] === "\"") {
        return "text";
    } else {// " ", ";", "\n", "\t" etc
        return "";
    }
}

function checkTypeRogic(code) {
    let box = {};
    let iend = code.indexOf(";");
    if (iend == -1) {
        iend = code.length;
    }
    let tmp = code.slice(0, iend);
    if (tmp.indexOf("=") != -1 && !/^[><!]*$/.test(tmp[tmp.indexOf("=") - 1]) && !/^[=]*$/.test(tmp[tmp.indexOf("=") + 1])) {
        return "set";
    }
    return "logic";
}

function insertBracket(code) {
    //split nums
    let nums = [];
    let tmp = "";
    let cout = 0;
    let bStart = -1;
    for (let i = 0; i < code.length; i++) {
        if (code[i] == " ") {
            continue;
        }
        if (bStart > -1) {
            if (code[i] == "(") {
                cout++;
            } else if (code[i] == ")") {
                cout--;
            }
            tmp += code[i];
            if (cout < 0) {
                nums.push(tmp);
                tmp = "";
                bStart = -1;
                cout = 0;
            }
            continue;
        }
        if (code[i] == "(") {
            bStart = i;
            tmp += code[i];
        } else if (code[i] == "*" || code[i] == "/" || code[i] == "%") {
            if (tmp == "") {
                tmp = code[i];
            } else {
                nums.push(tmp);
                tmp = code[i];
            }
        } else if (code[i] == "+" || code[i] == "-") {
            if (tmp == "") {
                tmp = code[i];
            } else if (/^[+\-*/%]*$/.test(tmp[tmp.length - 1])) {
                tmp = tmp + code[i];
            } else {
                nums.push(tmp);
                tmp = code[i];
            }
        } else {
            tmp = tmp + code[i];
        }
    }
    if (tmp != "") {
        nums.push(tmp);
    }
    //pair ()
    let dummy = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i][0] == "(") {
            nums[i] = insertBracket(nums[i].slice(1, nums[i].length - 1));
        } else if (nums[i][1] == "(") {
            nums[i] = nums[i][0] + insertBracket(nums[i].slice(2, nums[i].length - 1));
        }
    }

    //pair * / %
    dummy = [];
    for (let i = 0; i < nums.length; i++) {
        if (/^[*/%]*$/.test(nums[i][0])) {
            if (/^[+\-*/%]*$/.test(dummy[dummy.length - 1][0]) && dummy.length > 1) {
                dummy[dummy.length - 1] = dummy[dummy.length - 1][0] + "(" + dummy[dummy.length - 1].slice(1) + nums[i] + ")";
            } else {
                dummy[dummy.length - 1] = "(" + dummy[dummy.length - 1] + nums[i] + ")";
            }
        } else {
            dummy.push(nums[i]);
        }
    }
    nums = dummy.slice();
    //pair + -
    dummy = [];
    for (let i = 0; i < nums.length; i++) {
        if (/^[+\-]*$/.test(nums[i][0]) && dummy.length != 0) {
            if (/^[+\-*/%]*$/.test(dummy[dummy.length - 1][0]) && dummy.length > 1) {
                dummy[dummy.length - 1] = dummy[dummy.length - 1][0] + "(" + dummy[dummy.length - 1].slice(1) + nums[i] + ")";
            } else {
                dummy[dummy.length - 1] = "(" + dummy[dummy.length - 1] + nums[i] + ")";
            }
        } else {
            dummy.push(nums[i]);
        }
    }
    nums = dummy.slice();

    return nums.join("");
}

function toBoxIf(code) {
    let box = {};
    box.type = "if";
    //condition if
    let extract = extractBracket(code);
    box.condition = codeToBox(extract.val);
    code = extract.code;
    //statement if
    extract = extractFlank(code);
    box.statement = codeToBox(extract.val);
    code = extract.code;
    code = code.trim();
    if (code.startsWith("else{") || code.startsWith("else {")) {
        box.type = "ifelse";
        extract = extractFlank(code);
        box.statement2 = codeToBox(extract.val);
        code = extract.code;
    }
    return { box: box, code: code };
}
function toBoxWhile(code) {
    let box = {};
    box.type = "while";
    let extract = extractBracket(code);
    box.condition = codeToBox(extract.val);
    code = extract.code;
    extract = extractFlank(code);
    box.statement = codeToBox(extract.val);
    code = extract.code;
    return { box: box, code: code };
}
function toBoxDoWhile(code) {
    let box = {};
    box.type = "dowhile";
    let extract = extractFlank(code);
    box.statement = codeToBox(extract.val);
    code = extract.code;
    extract = extractBracket(code);
    box.condition = codeToBox(extract.val);
    code = extract.code;
    return { box: box, code: code };
}
function toBoxCin(code) {
    let box = {};
    box.type = "cin";
    let istart = code.indexOf(">>") + 2;
    let iend = code.indexOf(";");
    box.value = codeToBox(code.slice(istart, iend));
    code = code.slice(iend + 1);
    return { box: box, code: code };
}
function toBoxCout(code) {
    let box = {};
    box.type = "cout";
    let istart = code.indexOf("<<") + 2;
    let iend = code.indexOf(";");
    box.value = codeToBox(code.slice(istart, iend));
    code = code.slice(iend + 1);
    return { box: box, code: code };
}
function toBoxText(code) {
    let box = {};
    box.type = "text";
    let istart = code.indexOf("\"") + 1;
    let iend = code.slice(1).indexOf("\"") + 1;
    box.value = code.slice(istart, iend);
    code = code.slice(iend + 1);
    return { box: box, code: code };
}
function toBoxSet(code) {
    let box = {};
    box.type = "set";
    let iend = code.indexOf(";");
    if (iend == -1) {
        iend = code.length;
    }
    let tmp = code.slice(0, iend);
    code = code.slice(iend + 1);
    box.variable = tmp.slice(0, tmp.indexOf("=")).trim();
    box.value = codeToBox(tmp.slice(tmp.indexOf("=") + 1));
    return { box: box, code: code };
}
function toBoxLogic(code) {
    console.log(555)
    let dummy = [];
    let iv1, iv2;
    let var1 = "";
    let var2 = "";
    code = code.trim();
    if (code[0] == "(") {
        code = code.slice(1, code.length);
    }
    console.log(code);
    let cout = 0;
    for (let i = 0; i < code.length; i++) {
        console.log(var1, var2);
        if (code[i] == " ") {
            continue;
        }
        if (code[i] == "(") {
            cout++;
            continue;
        }
        if (cout > 0) {
            if (code[i] == ")") {
                cout--;
            }
            continue;
        }
        if (var2 == "") {
            iv2 = i;
            var2 = code[i];
        } else if (/^[a-zA-Z0-9]*$/.test(code[i])) {
            if (/^[0-9]*$/.test(code[i]) && /^[a-zA-Z0-9]*$/.test(var2[0])) {
                var2 += code[i];
            } else if (/^[a-zA-Z]*$/.test(code[i]) && /^[a-zA-Z]*$/.test(var2[0])) {
                var2 += code[i];
            } else {
                if (valueLogicCompare(var1) > valueLogicCompare(var2)) {
                    var2 = code[i];
                    iv2 = i;
                } else {
                    var1 = var2;
                    iv1 = iv2;
                    var2 = code[i];
                    iv2 = i;
                }
            }
        } else if (/^[=&|]*$/.test(code[i])) {
            if (code[i] == "=" && /^[><=!]*$/.test(var2[0])) {
                var2 += code[i];
            } else if (code[i] == var2[0]) {
                var2 += code[i];
            } else {
                if (valueLogicCompare(var1) > valueLogicCompare(var2)) {
                    var2 = code[i];
                    iv2 = i;
                } else {
                    var1 = var2;
                    iv1 = iv2;
                    var2 = code[i];
                    iv2 = i;
                }
            }
        } else {
            if (valueLogicCompare(var1) > valueLogicCompare(var2)) {
                var2 = code[i];
                iv2 = i;
            } else {
                var1 = var2;
                iv1 = iv2;
                var2 = code[i];
                iv2 = i;
            }
        }
    }
    if (valueLogicCompare(var1) <= valueLogicCompare(var2)) {
        var1 = var2;
        iv1 = iv2;
    }
    let box = {};
    if (var1 == "&&" || var1 == "||") {
        box.type = "compare";
        box.sym = var1;
        box.var1 = codeToBox(code.slice(0, iv1));
        box.var2 = codeToBox(code.slice(iv1 + var1.length));
    } else if (/^[><=!]*$/.test(var1)) {
        box.type = "condition";
        box.sym = var1;
        box.var1 = codeToBox(code.slice(0, iv1));
        box.var2 = codeToBox(code.slice(iv1 + var1.length));
    } else if (/^[+\-*/%]*$/.test(var1)) {
        box.type = "math";
        box.sym = var1;
        box.var1 = codeToBox(code.slice(0, iv1));
        box.var2 = codeToBox(code.slice(iv1 + var1.length));
    } else if (/^[a-zA-Z]*$/.test(var1)) {
        box.type = "variable";
        box.value = var1;
    } else {
        box.type = "number";
        box.value = Number(var1);
    }
    return { box: box, code: "" }
}

function valueLogicCompare(val) {
    if (val == "") {
        return 0;
    } else if (val == "*" || val == "/" || val == "%") {
        return 1;
    } else if (val == "+" || val == "-") {
        return 2;
    } else if (/^[><=!]*$/.test(val)) {
        return 3;
    } else if (/^[&|]*$/.test(val)) {
        return 4;
    } else {
        return 0;
    }
}

function extractBracket(code) {
    let first = code.indexOf("(") + 1;
    let cout = 0;
    for (let i = 0; i < code.length; i++) {
        if (code[i] == "(") {
            cout++;
        } else if (code[i] == ")") {
            cout--;
            if (cout == 0) {
                return { val: code.slice(first, i), code: code.slice(i + 1) };
            }
        }
    }
}
function extractFlank(code) {
    let first = code.indexOf("{") + 1;
    let cout = 0;
    for (let i = 0; i < code.length; i++) {
        if (code[i] == "{") {
            cout++;
        } else if (code[i] == "}") {
            cout--;
            if (cout == 0) {
                return { val: code.slice(first, i), code: code.slice(i + 1) };
            }
        }
    }
}
function enableTab(id) {
    let el = document.getElementById(id);
    el.onkeydown = function (e) {
        if (e.keyCode === 9) {
            let val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;
            this.value = val.substring(0, start) + '\t' + val.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
            return false;
        }
    };
}
enableTab('code-area');

function translateCodeToXml(boxs) {
    let xmlText = boxListToXml(boxs);
    console.log(xmlText);
}

function boxListToXml() {
    for (let i = 0; i < boxs.length; i++) {
        codeBoxToXml(boxs[i]);
    }
    return
}

function translateCodeToXml(boxs) {
    let xmlText = "<xml>" + boxListToXml(boxs) + "</xml>";
    console.log(xmlText);
    return xmlText;
}

function boxListToXml(boxs) {
    let xmlText = "";
    for (let i = 0; i < boxs.length; i++) {
        if (i == 0) {
            xmlText += boxToXml(boxs[i]);
        } else {
            xmlText += "<next>" + boxToXml(boxs[i]);
            if (i + 1 >= boxs.length) {
                xmlText += "</block></next>";
            }
            if (i > 1) {
                xmlText += "</block></next>";
            }
        }
        if (i + 1 >= boxs.length) {
            xmlText += "</block>";
        }
    }
    return xmlText;
}

function boxToXml(box) {
    let xmlText = "";
    if (box.type == "if") {
        xmlText =
            "<block type=\"ask_if\">" +
            "<value name=\"condition\">" +
            boxListToXml(box.condition) +
            "</value>" +
            "<statement name=\"todo\">" +
            boxListToXml(box.statement) +
            "</statement>";
    } else if (box.type == "ifelse") {
        xmlText =
            "<block type=\"my_ifelse\">" +
            "<value name=\"condition\">" +
            boxListToXml(box.condition) +
            "</value>" +
            "<statement name=\"todo1\">" +
            boxListToXml(box.statement) +
            "</statement>" +
            "<statement name=\"todo2\">" +
            boxListToXml(box.statement) +
            "</statement>";
    } else if (box.type == "while") {
        xmlText =
            "<block type=\"my_while\">" +
            "<value name=\"condition\">" +
            boxListToXml(box.condition) +
            "</value>" +
            "<statement name=\"todo\">" +
            boxListToXml(box.statement) +
            "</statement>";
    } else if (box.type == "dowhile") {
        xmlText =
            "<block type=\"my_dowhile\">" +
            "<statement name=\"todo\">" +
            boxListToXml(box.statement) +
            "</statement>" +
            "<value name=\"condition\">" +
            boxListToXml(box.condition) +
            "</value>";
    } else if (box.type == "cin") {
        xmlText =
            "<block type=\"my_scanf\">" +
            "<value name=\"variable\">" + boxListToXml(box.value) + "</value>";
    } else if (box.type == "cout") {
        xmlText =
            "<block type=\"my_printf\">" +
            "<value name=\"var1\">" + boxListToXml(box.value.slice(0, 1)) + "</value>";
    } else if (box.type == "compare") {
        xmlText =
            "<block type=\"my_compare\">" +
            "<field name=\"symbol\">" + convertSymbolToCode(box.sym) + "</field>" +
            "<value name=\"var1\">" + boxListToXml(box.var1) + "</value>" +
            "<value name=\"var2\">" + boxListToXml(box.var2) + "</value>";
    } else if (box.type == "condition") {
        xmlText =
            "<block type=\"my_condition\">" +
            "<field name=\"symbol\">" + convertSymbolToCode(box.sym) + "</field>" +
            "<value name=\"var1\">" + boxListToXml(box.var1) + "</value>" +
            "<value name=\"var2\">" + boxListToXml(box.var2) + "</value>";
    } else if (box.type == "set") {
        xmlText =
            "<block type=\"my_setvariable\">" +
            "<field name=\"count\">" + box.variable + "</field>" +
            "<value name=\"var1\">" + boxListToXml(box.value) + "</value>";
    } else if (box.type == "math") {
        xmlText =
            "<block type=\"my_math\">" +
            "<field name=\"math\">" + convertSymbolToCode(box.sym) + "</field>" +
            "<value name=\"var1\">" + boxListToXml(box.var1) + "</value>" +
            "<value name=\"var2\">" + boxListToXml(box.var2) + "</value>";
    } else if (box.type == "variable") {
        xmlText =
            "<block type=\"my_variable\">" +
            "<field name=\"setcount_set\">" + box.value + "</field>";
    } else if (box.type == "number") {
        xmlText =
            "<block type=\"my_number\">" +
            "<field name=\"number\">" + box.value + "</field>";
    } else if (box.type == "text") {
        xmlText =
            "<block type=\"my_string\">" +
            "<field name=\"message_input\">" + box.value + "</field>";
    }
    return xmlText;
}

function convertSymbolToCode(sym) {
    return sym.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}