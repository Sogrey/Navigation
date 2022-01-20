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
/**
 {
    "label": "常用推荐",
    "expand": false,
    "iconFont": "fa-star",
    "children": [],
    "list": []
 }
 */
const ClassificationQuestion = [{
    type: 'input',
    name: 'label',
    message: '请输入分类 ...',
    validate: (val) => {
        if (val.length == 0) {
            return '请输入有效网址！'
        } else {
            return true
        }
    }
}, {
    type: 'list',
    name: 'expand',
    message: '设置默认是否展开 ...',
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
    message: '设置icon ...'
}];

export default ClassificationQuestion