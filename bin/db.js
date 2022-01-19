// cli.js
import program from 'commander';
import IN from 'inquirer'; // require inquirerjs library

import {
    LowSync,
    JSONFileSync
} from 'lowdb'

program
    .version('0.0.1')
    .description('Contact management system');


/*
type：表示提问的类型，包括：input、confirm、 list、rawlist、expand、checkbox、password、editor。
name: 存储当前输入的值。
message：问题的描述。
default：默认值。
choices：列表选项，在某些type下可用，并且包含一个分隔符(separator)；
validate：对用户的回答进行校验。
filter：对用户的回答进行过滤处理，返回处理后的值。
when：根据前面问题的回答，判断当前问题是否需要被回答。
pageSize：修改某些type类型下的渲染行数。
prefix：修改message默认前缀。
suffix：修改message默认后缀。
*/
const itemQuestion = [{
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
    default: '',
}, {
    type: 'input',
    name: 'title',
    message: '请输入网址标题 ...',
    default: '',
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
    default: '',
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
    message: '请输入网站支持语言 ...',
    default: 'en',
    validate: (val) => {
        if (val.length == 0) {
            return '请输入有效网址标题！'
        } else {
            return true
        }
    }
}, {
    type: 'input',
    name: 'recommend',
    message: '请输入推荐理由 ...',
    default: '',
}];
// {
//     "id": 100011,
//     "url": "http://ftp.kaist.ac.kr/",
//     "img": "",
//     "title": "KAIST Mirror",
//     "desc": "KAIST Mirror 是一种镜像服务，可以镜像 Debian、*BSD、Mozilla、Apache 等开源软件。您可以通过 ftp、http、https 和 rsync 访问它。 ",
//     "language": ["en"],
//     "recommend": ["FTP", "镜像站"]
// }
program
    .command('addItem') // No need of specifying arguments here
    .alias('a')
    .description('Add a item')
    .action(() => {
        IN.prompt(itemQuestion).then(answers =>
            console.table(answers)
        );
    });

program
    .command('editDB') // No need of specifying arguments here
    .alias('e')
    .description('Edit the DB.')
    .action(() => {
        readDB()
    });

program.parse(process.argv);

var fullDB, currentData;

function readDB() {
    const title = process.argv[2]
    const adapter = new JSONFileSync('../public/datas/db.json')
    const db = new LowSync(adapter)

    db.read()

    if (!db.data)
        db.data = [];

    console.table(db.data);

    fullDB = db.data;
    currentData = db.data;

    IN.prompt(itemQuestion).then(answers =>{
        console.table(answers);
        readDB();
    });
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