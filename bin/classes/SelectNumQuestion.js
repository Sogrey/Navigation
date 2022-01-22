/**
{
    "index": 0,
}
*/
const SelectNumQuestion = [{
    type: 'input',
    name: 'index',
    message: '请输入序号 ...',
    validate: (val) => {
        if (!val || val.length == 0 || isNaN(Number(val))) {
            return '请输入有效数字序号！'
        } else {
            return true
        }
    }
}];

export default SelectNumQuestion