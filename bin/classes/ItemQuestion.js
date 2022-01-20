/**
{
    "id": 100011,
    "url": "http://ftp.kaist.ac.kr/",
    "img": "",
    "title": "KAIST Mirror",
    "desc": "KAIST Mirror 是一种镜像服务，可以镜像 Debian、*BSD、Mozilla、Apache 等开源软件。您可以通过 ftp、http、https 和 rsync 访问它。 ",
    "language": ["en"],
    "recommend": ["FTP", "镜像站"]
}
*/
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

export default ItemQuestion