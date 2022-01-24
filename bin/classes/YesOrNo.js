/**
{
    "index": 0,
}
*/
const YesOrNo = [{
    type: 'list',
    name: 'choice',
    message: '确认数据 ...',
    default:'Yes',
    choices: [
        "Yes",
        "No"
    ],
    filter: function (val) { // 使用filter将回答变为小写
        return val == 'Yes';
    }
}];

export default YesOrNo