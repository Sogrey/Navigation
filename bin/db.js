// cli.js
import program from 'commander';
import IN from 'inquirer'; // require inquirerjs library

import {
    LowSync,
    JSONFileSync
} from 'lowdb'

import SelectNumQuestion from './classes/SelectNumQuestion.js'
import YesOrNo from './classes/YesOrNo.js';
import YesOrNoDelete from './classes/YesOrNoDelete.js';

program
    .version('0.0.1')
    .description('Contact management system');

var dbPath = '../public/datas/db.json'
var fullDB, currentData = [];
var currentDataType = "Type" // or Data
var dataNavigation = [];
var db;

program
    .command('editDB') // No need of specifying arguments here
    .alias('e')
    .description('Edit the DB.')
    .action(() => {
        readDB()
    });

program.parse(process.argv);

function readDB() {
    const title = process.argv[2]
    const adapter = new JSONFileSync(dbPath)
    db = new LowSync(adapter)

    db.read()

    if (!db.data)
        db.data = [];

    fullDB = db.data;
    currentData = [fullDB];
    dataNavigation.push('(root)')

    menuMain()
}

function menuMain() {
    var path = dataNavigation.join(' > ');

    printInterlaced(`当前节点： ${path}`)

    // console.table(fullDB); // 总数据
    // console.table(currentData);// 当前节点数据
    printData(currentData[currentData.length - 1]) // 当前节点数据

    console.log(`
    操作：

    ---------------------------------------------------
    1. 新增条目(本节点)\t\t4. 查询子分类(children)  
    2. 编辑条目(本节点)\t\t5. 查询数据(list)    
    3. 删除条目(慎用)\t\t6. 返回上一级(parent)   
    ---------------------------------------------------
    0. 退出\t\t\ts:保存并写入数据
    `);

    IN.prompt(SelectNumQuestion).then(answers => {
        switch (answers.index.toLowerCase()) {
            case 's': // 保存并写入数据   
                writeFile(fullDB, dbPath)
                break;
            case '0': // 退出            
                printInterlaced('退出中...');
                setTimeout(() => {
                    process.exit(0);
                }, 500);
                break;
            case '1': //1. 新增条目(本节点)
                printInterlaced('新增数据：')
                addItem()
                break;
            case '2': //2. 编辑条目(本节点)
                printInterlaced('请选择需要编辑的条目序号(index)：')
                IN.prompt(SelectNumQuestion).then(answers => {
                    var thisItem = currentData[currentData.length - 1][answers.index]
                    currentData.push(thisItem)
                    menuItem()
                });
                break;
            case '3': //3. 删除条目(慎用)
                printInterlaced('请选择需要删除的条目序号(index)：')
                IN.prompt(SelectNumQuestion).then(answers => {
                    var thisItem = currentData[currentData.length - 1][answers.index]
                    currentData.push(thisItem)
                    deleteItem(currentData[currentData.length - 2], answers.index)
                });
                break;
            case '4': //4. 查询子分类(children)  
                printInterlaced('请选择需要查询子分类的条目序号(index)：')
                IN.prompt(SelectNumQuestion).then(answers => {
                    var thisItem = currentData[currentData.length - 1][answers.index]
                    dataNavigation.push(thisItem.label)
                    currentData.push(thisItem.children)
                    currentDataType = "Type";
                    menuMain()
                });
                break;
            case '5': //5. 查询数据(list)            
                printInterlaced('请选择需要查询数据的条目序号(index)：')
                IN.prompt(SelectNumQuestion).then(answers => {
                    var thisItem = currentData[currentData.length - 1][answers.index]
                    dataNavigation.push(thisItem.label)
                    currentData.push(thisItem.list)
                    currentDataType = "Data";
                    menuMain()
                });
                break;
            case '6': //6. 返回上一级(parent) 
                if (dataNavigation.length > 1) {
                    dataNavigation.pop()
                    currentData.pop()
                    currentDataType = "Type";
                    menuMain()
                } else {
                    printInterlaced('已经是根数据了！')
                    menuMain()
                }
                break;

            default:
                printInterlaced('【ERROR】无效输入，请重新输入！')
                menuMain()
                break;
        }
    });
}

function menuItem() {
    var path = dataNavigation.join(' > ');

    printInterlaced(`当前节点： ${path}`)

    // console.table(fullDB); // 总数据
    // console.table(currentData);// 当前节点数据

    var cd = currentData[currentData.length - 1]

    printData(cd) // 当前节点数据

    var isData = cd.url != undefined

    console.log(`
    操作：

    ---------------------------------------------------
    1. 编辑${isData?'数据':'条目'}(本${isData?'数据':'条目'}) 
    ---------------------------------------------------
    0. 退出
    `);

    IN.prompt(SelectNumQuestion).then(answers => {
        switch (answers.index) {
            case '0': // 退出编辑
                currentData.pop()
                menuMain()
                break;
            case '1': //1. 新增条目(本节点)
                if (isData) {
                    printInterlaced('编辑数据：')
                    editData()
                } else {
                    printInterlaced('编辑条目：')
                    editItem()
                }
                break;

            default:
                printInterlaced('【ERROR】无效输入，请重新输入！')
                menuMain()
                break;
        }
    });


}

function addItem() {
    if (currentDataType == "Type") {
        const ClassificationQuestion = [{
            type: 'input',
            name: 'label',
            message: '请输入分类名 ...',
            validate: (val) => {
                if (val.length == 0) {
                    return '请输入有效分类名！'
                } else {
                    return true
                }
            }
        }, {
            type: 'list',
            name: 'expand',
            message: '设置默认是否展开 ...',
            default: 'False',
            choices: [
                "False",
                "True"
            ],
            filter: function (val) { // 使用filter将回答变为小写
                return val == 'True';
            }
        }, {
            type: 'input',
            name: 'iconFont',
            message: '设置icon ...',
        }];
        IN.prompt(ClassificationQuestion).then(answers => {
            console.table(answers)

            IN.prompt(YesOrNo).then(answers1 => {

                if (answers1.choice) { // 确认修改
                    answers.label = trim(answers.label);
                    answers.iconFont = trim(iconFont);
                    answers.children = [];
                    answers.list = [];
                    currentData[currentData.length - 1].push(answers)
                }
                menuMain()
            });

        });
    } else {
        const ItemQuestion = [{
            type: 'input',
            name: 'url',
            message: '请输入网址 ...',
            validate: (val) => {
                if (val.length == 0) {
                    return '请输入有效网址！'
                } else {
                    return true
                }
            }
        }, {
            type: 'input',
            name: 'img',
            message: '请输入网站LOGO url ...',
        }, {
            type: 'input',
            name: 'title',
            message: '请输入网址标题 ...',
            validate: (val) => {
                if (val.length == 0) {
                    return '请输入有效网址标题！'
                } else {
                    return true
                }
            }
        }, {
            type: 'input',
            name: 'desc',
            message: '请输入网址描述 ...',
            validate: (val) => {
                if (val.length == 0) {
                    return '请输入有效网址标题！'
                } else {
                    return true
                }
            }
        }, {
            type: 'input',
            name: 'language',
            message: '请输入网站支持语言(多个空格间隔) ...',
            validate: (val) => {
                if (val.length == 0) {
                    return '请输入有效网址语言标记！'
                } else {
                    return true
                }
            }
        }, {
            type: 'input',
            name: 'recommend',
            message: '请输入推荐理由(多个空格间隔) ...',
        }];

        IN.prompt(ItemQuestion).then(answers => {
            console.table(answers)

            IN.prompt(YesOrNo).then(answers1 => {
                if (answers1.choice) { // 确认修改
                    answers.url = trim(answers.url);
                    answers.img = trim(answers.img);
                    answers.title = trim(answers.title);
                    answers.desc = trim(answers.desc);
                    answers.language = trim(answers.language).split(' ');
                    answers.recommend = trim(answers.recommend).split(' ');

                    currentData[currentData.length - 1].push(answers)
                }
                menuMain()
            });

        });
    }
}
/**
 * 编辑条目
 */
function editItem() {
    var cData = currentData[currentData.length - 1]
    const ClassificationQuestion = [{
        type: 'input',
        name: 'label',
        message: '请输入分类名 ...',
        default: cData.label,
        validate: (val) => {
            if (val.length == 0) {
                return '请输入有效分类名！'
            } else {
                return true
            }
        }
    }, {
        type: 'list',
        name: 'expand',
        message: '设置默认是否展开 ...',
        default: cData.expand,
        choices: [
            "False",
            "True"
        ],
        filter: function (val) { // 使用filter将回答变为小写
            return val.toLowerCase() == 'true';
        }
    }, {
        type: 'input',
        name: 'iconFont',
        message: '设置icon ...',
        default: cData.iconFont,
    }];

    IN.prompt(ClassificationQuestion).then(answers => {
        console.table(answers)

        IN.prompt(YesOrNo).then(answers1 => {
            if (answers1.choice) { // 确认修改
                cData.label = answers.label;
                cData.expand = answers.expand;
                cData.iconFont = answers.iconFont;
            }
            currentData.pop()
            menuMain()
        });

    });
}
/**
 * 删除条目
 */
function deleteItem(dataParent, deleteIndex) {
    var path = dataNavigation.join(' > ');
    printInterlaced(`当前节点： ${path}`)

    printInterlaced(`将要删除的数据：`)

    var cd = currentData[currentData.length - 1];
    printData(cd) // 当前节点数据

    IN.prompt(YesOrNoDelete).then(answers1 => {
        if (answers1.choice) { // 确认
            dataParent.splice(deleteIndex, 1);
        }
        currentData.pop()
        menuMain()
    });
}
/**
 * 编辑数据
 */
function editData() {
    var cData = currentData[currentData.length - 1]
    const ItemQuestion = [{
        type: 'input',
        name: 'url',
        message: '请输入网址 ...',
        default: cData.url,
        validate: (val) => {
            if (val.length == 0) {
                return '请输入有效网址！'
            } else {
                return true
            }
        }
    }, {
        type: 'input',
        name: 'img',
        message: '请输入网站LOGO url ...',
        default: cData.img,
    }, {
        type: 'input',
        name: 'title',
        message: '请输入网址标题 ...',
        default: cData.title,
        validate: (val) => {
            if (val.length == 0) {
                return '请输入有效网址标题！'
            } else {
                return true
            }
        }
    }, {
        type: 'input',
        name: 'desc',
        message: '请输入网址描述 ...',
        default: cData.desc,
        validate: (val) => {
            if (val.length == 0) {
                return '请输入有效网址标题！'
            } else {
                return true
            }
        }
    }, {
        type: 'input',
        name: 'language',
        message: '请输入网站支持语言(多个空格间隔) ...',
        default: cData.language,
        validate: (val) => {
            if (val.length == 0) {
                return '请输入有效网址语言标记！'
            } else {
                return true
            }
        }
    }, {
        type: 'input',
        name: 'recommend',
        message: '请输入推荐理由(多个空格间隔) ...',
        default: cData.recommend,
    }];

    IN.prompt(ItemQuestion).then(answers => {
        console.table(answers)

        IN.prompt(YesOrNo).then(answers1 => {
            if (answers1.choice) { // 确认修改
                cData.url = trim(answers.url);
                cData.img = trim(answers.img);
                cData.title = trim(answers.title);
                cData.desc = trim(answers.desc);
                cData.language = Array.isArray(answers.language) ? answers.language : trim(answers.language).split(' ');
                cData.recommend = Array.isArray(answers.recommend) ? answers.recommend : trim(answers.recommend).split(' ');
            }
            currentData.pop()
            menuMain()
        });

    });
}

function printData(data) {
    var result = {};
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (Array.isArray(value)) {
                result[key] = `${value.length} 条数据`;
            } else {
                result[key] = value;
            }
        }
    }
    console.table(result)
}

function printInterlaced(text) {
    console.log(`
${text}
    `)
}

function writeFile(fullDB, dbPath) {
    // TODO
    // console.log(fullDB, dbPath);

    IN.prompt(YesOrNo).then(answers1 => {
        if (answers1.choice) { // 确认修改
            db.data = fullDB;
            db.write();
        }
        menuMain()
    });
}

//供使用者调用  
function trim(s){  
    return trimRight(trimLeft(s));  
}  
//去掉左边的空白  
function trimLeft(s){  
    if(s == null) {  
        return "";  
    }  
    var whitespace = new String(" \t\n\r");  
    var str = new String(s);  
    if (whitespace.indexOf(str.charAt(0)) != -1) {  
        var j=0, i = str.length;  
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1){  
            j++;  
        }  
        str = str.substring(j, i);  
    }  
    return str;  
}  

//去掉右边的空白 www.2cto.com   
function trimRight(s){  
    if(s == null) return "";  
    var whitespace = new String(" \t\n\r");  
    var str = new String(s);  
    if (whitespace.indexOf(str.charAt(str.length-1)) != -1){  
        var i = str.length - 1;  
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){  
           i--;  
        }  
        str = str.substring(0, i+1);  
    }  
    return str;  
}