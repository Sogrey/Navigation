// cli.js
import program from 'commander';
import IN from 'inquirer'; // require inquirerjs library

import {
    LowSync,
    JSONFileSync
} from 'lowdb'

import ClassificationQuestion from './classes/ClassificationQuestion.js'
import ItemQuestion from './classes/ItemQuestion.js'
import SelectNumQuestion from './classes/SelectNumQuestion.js'
program
    .version('0.0.1')
    .description('Contact management system');

// program
//     .command('addItem1') // No need of specifying arguments here
//     .alias('b')
//     .description('Add a item1')
//     .action(() => {
//         IN.prompt(ClassificationQuestion).then(answers =>
//             console.table(answers)
//         );
//     });

// program
//     .command('addItem') // No need of specifying arguments here
//     .alias('a')
//     .description('Add a item')
//     .action(() => {
//         IN.prompt(ItemQuestion).then(answers =>
//             console.table(answers)
//         );
//     });

var fullDB, currentData;
var dataNavigation = [];

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
    const adapter = new JSONFileSync('../public/datas/db.json')
    const db = new LowSync(adapter)

    db.read()

    if (!db.data)
        db.data = [];

    fullDB = db.data;
    currentData = fullDB;

    menuMain()
}

function menuMain() {
    var path = '';
    if (dataNavigation.length > 0) {
        path = ' > ' + dataNavigation.join(' > ')
    }
    
    printInterlaced(`当前节点：(root) ${path}`)

    // console.table(fullDB); // 总数据
    // console.table(currentData);// 当前节点数据
    printData(currentData) // 当前节点数据

    console.log(`
    操作：

    1. 新增条目(本节点)\t\t4. 查询子分类(children)  
    2. 编辑条目(本节点)\t\t5. 查询数据(list)    
    3. 删除条目(慎用)
    0. 退出
    `);

      
       
    

    IN.prompt(SelectNumQuestion).then(answers => {
        switch (answers.index) {
            case '0': // 退出
                setTimeout(() => {
                    printInterlaced('退出中...')

                    process.exit(0);
                }, 100);
                break;
            case '1'://1. 新增条目(本节点)
                printInterlaced('新增分类：')
                break;
            case '2'://2. 编辑条目(本节点)
                break;
            case '3'://3. 删除条目(慎用)
                break;
            case '4'://4. 查询子分类(children)  
            printInterlaced('请选择需要查询的子分类序号：')
            IN.prompt(SelectNumQuestion).then(answers => {
                var thisItem = currentData[answers.index]
                dataNavigation.push(thisItem.label)
                currentData = thisItem.children
                menuMain()
            });
                break;
            case '5'://5. 查询数据(list)            
            printInterlaced('请选择需要查询数据的条目序号：')
            IN.prompt(SelectNumQuestion).then(answers => {
                var thisItem = currentData[answers.index]
                dataNavigation.push(thisItem.label)
                currentData = thisItem.list
                menuMain()
            });
                break;

            default:
                printInterlaced('【ERROR】无效输入，请重新输入！')
                menuMain()
                break;
        }
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

function writeFile(data,fileName) {
    // TODO
}

// readDB()


// function menu() {
//     console.log(`
//     1 -- 当前节点下追加\t\t2 -- 展开子选项\t\t3 -- 删除子选项（慎选）

//     请选择：
//     `);
// }

// menu()
// db.data.push({
//     title
// })

// db.write()