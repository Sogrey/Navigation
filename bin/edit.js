import program from 'commander';
import IN from 'inquirer'; // require inquirerjs library

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
const questions = [{
        type: 'input',
        name: 'name',
        message: 'Enter your name ...'
    },
    {
        type: 'input',
        name: 'age',
        message: 'Enter your age ...',
        default: 18,
        // validate: (val) => {
        //     if (val > 10 && val < 120) {
        //         return val;
        //     } else {
        //         return "我猜你绝对不是一个正常人类";
        //     }
        // }
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter phone number ...'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email address ...'
    }
];
program
    .command('addContact') // No need of specifying arguments here
    .alias('a')
    .description('Add a contact')
    .action(() => {
        IN.prompt(questions).then(answers =>
            console.table(answers)
        );
    });

program.parse(process.argv);