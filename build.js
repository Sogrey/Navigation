#!/usr/bin/env node

var path = require("path");
var fs = require("fs");


deleteFolder(path.join(__dirname, 'dist', 'static'));

listFiles(path.join(__dirname, 'static', 'datas'), {
    recursion: true,
    /**递归查询 */
}).catch((error) => {
    console.error(error);
}).then((list) => {
    // console.log(list);
    if (defined(list) && list.length > 0) {

        var promises = [];
        for (var i = 0; i < list.length; i++) {
            var file = list[i];
            var fileName = path.basename(file);
            promises.push(copyFile(file, path.join(__dirname, 'dist', 'static', 'datas', fileName)));
        }

        return Promise.all(promises).catch((error) => { // 失败的时候，先打回失败结果
            console.error(error)
        })
    }
}).then(() => {
    console.log('Done.');
})

function defined(value) {
    return value !== undefined && value !== null;
}

function defaultValue(a, b) {
    if (a !== undefined && a !== null) {
        return a;
    }

    return b;
}
/**
 * 罗列文件夹下文件 
 * @param {*} dirPath 要检索目录
 * @param {*} options 配置
 * @param {*} options#extension 过滤文件扩展名
 * @param {*} options#recursion 是否递归
 * @returns 
 */
function listFiles(dirPath, options) {
    return existsFile(dirPath).then(() => {
        return new Promise((resolve, reject) => {
            var getAllFiles = function (root) {
                var list = [];
                var files = fs.readdirSync(root);
                files.forEach(function (file) {
                    var pathname = path.join(root, file),
                        stat = fs.lstatSync(pathname);
                    if (!stat.isDirectory()) { // 是文件

                        if (defined(options) && defined(options.extension)) { // 过滤只留下匹配后缀名的文件
                            if (pathname.lastIndexOf(options.extension) > -1) {
                                list.push(pathname);
                            }
                        } else { // 只要是文件就添加进来
                            var isExcludeFile = false;
                            if (defined(options) && defined(options.excludeFiles) && options.excludeFiles.length > 0) { // 过滤排除文件

                                for (var i = 0; i < options.excludeFiles.length; i++) {
                                    var fileItem = options.excludeFiles[i];
                                    if (file == fileItem) { // 匹配
                                        isExcludeFile = true;
                                        break;
                                    }
                                }

                            }

                            if (!isExcludeFile) // 非排除文件加入
                                list.push(pathname);
                        }

                    } else { // 是目录

                        var isExcludeDir = false;
                        if (defined(options) && defined(options.excludeDirs) && options.excludeDirs.length > 0) { //过滤排除指定目录
                            for (var i = 0; i < options.excludeDirs.length; i++) {
                                var dir = options.excludeDirs[i];
                                if (dir.includes('\*')) { //含*通配符
                                    var dirArray = dir.split('\*');
                                    var pattern = `^${dirArray[0]}.*${dirArray[1]}$`;
                                    var reg = new RegExp(pattern, 'g');
                                    // console.log(reg)
                                    // console.log(dirArray);
                                    if (reg.test(file)) { // 匹配
                                        // if (file.startsWith(dirArray[0]) && file.endsWith(dirArray[1])) { // 匹配

                                        // 正则匹配测试
                                        // var  str = 'houseSpaceDraw3dview4708954space';
                                        // var pattern = /^houseSpaceDraw3dview.*space$/g;
                                        // console.log(pattern.test(str));

                                        // 封装
                                        // var dir = 'houseSpaceDraw3dview*space';
                                        // var dirArray = dir.split('\*');
                                        // var str = 'houseSpaceDraw3dview4708954space';
                                        // var pattern = `^${dirArray[0]}.*${dirArray[1]}$`;
                                        // console.log(pattern)
                                        // var reg = new RegExp(pattern, 'g');
                                        // console.log(reg)
                                        // console.log(reg.test(str));

                                        deleteFolder(pathname);
                                        isExcludeDir = true;
                                    }
                                } else { //完全匹配
                                    if (file == dir) { // 匹配
                                        deleteFolder(pathname);
                                        isExcludeDir = true;
                                    }
                                }
                            }
                        }
                        if (!isExcludeDir)
                            if (defined(options) && defined(options.recursion) && options.recursion) { // 是目录且允许递归

                                var result = getAllFiles(pathname);
                                list = list.concat(result);
                            }
                    }
                });

                return list
            }
            var result = getAllFiles(dirPath);
            // console.log(result);
            if (result.length > 0) {
                resolve(result)
            } else {
                logger.e('查找目录 ' + dirPath + ' 未找到指定文件。');
                reject(new Error('查找目录 ' + dirPath + ' 未找到指定文件。'));
            }
        });
    });
}

/**
 * 读文件
 * @param {string} filePath 文件路径
 * @returns Promise
 */
function readFile(filePath) {
    return existsFile(filePath).then(() => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, function (err, data) {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(data.toString());
                }
            });
        });
    });
}

/**
 * 写文件
 * @param {*} txt 文件内容
 * @param {*} fileName 文件名
 * @returns 
 */
function writeFile(txt, fileName) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, txt, {
            'flag': 'w'
        }, function (err) {
            if (err) {
                throw err;
            }

            // 写入成功后读取测试
            // fs.readFile(fileName, 'utf-8', function(err, data) {
            //     if (err) {
            //         throw err;
            //     }
            //     console.log(data);
            // });

            resolve()
        });
    });
}

/**
 * 判断文件是否存在
 * @param {*} filePath 
 */
function existsFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.exists(filePath, function (exists) {
            if (!exists) {
                console.error(filePath + ' not found.');
                reject(new Error(filePath + ' not found.'));
            } else {
                resolve();
            }
        });
    });
}

/**
 * 复制文件
 * @param {*} sourceFile 源文件
 * @param {*} targetFile 目标文件
 * @returns 
 */
function copyFile(sourceFile, targetFile) {
    return existsFile(sourceFile).then(() => {
        return new Promise((resolve, reject) => {
            var readStream = fs.createReadStream(sourceFile);
            var targetFileParentDir = path.resolve(targetFile, '..');

            mkdirsSync(targetFileParentDir);

            var writeStream = fs.createWriteStream(targetFile);
            readStream.pipe(writeStream);
            readStream.on('error', function (err) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
            });
            writeStream.on('error', function (err) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
            });
            writeStream.on('close', function () {
                console.log('文件复制成功:' + sourceFile + " => " + targetFile);
                resolve();
            });

        });
    });
}

/**
 * 移动文件
 * @param {*} sourceFile 源文件
 * @param {*} targetFile 目标文件
 */
function moveFile(sourceFile, targetFile) {
    return existsFile(sourceFile).then(() => {
        return new Promise((resolve, reject) => {
            fs.rename(sourceFile, targetFile, function (err) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                fs.stat(targetFile, function (err, stats) {
                    if (err || !stats) {
                        console.error(err);
                        reject(err);
                    }
                    console.log('文件移动成功:' + sourceFile + " => " + targetFile);
                    resolve();
                });
            });
        });
    });
}

// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            // console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
                // console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
            });
        }
    });
}

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

/**
 * 递归删除文件夹
 * @param {*} dir 
 */
function deleteFolder(dir) {

    var rmdirSync = (function () {
        function iterator(url, dirs) {
            var stat = fs.statSync(url);
            if (stat.isDirectory()) {
                dirs.unshift(url); //收集目录
                inner(url, dirs);
            } else if (stat.isFile()) {
                fs.unlinkSync(url); //直接删除文件
            }
        }

        function inner(dir, dirs) {
            var arr = fs.readdirSync(dir);
            for (var i = 0, el; el = arr[i++];) {
                iterator(path.join(dir, el), dirs);
            }
        }

        return function (dir, cb) {
            cb = cb || function () {};
            var dirs = [];

            try {
                iterator(dir, dirs);

                for (var i = 0, el; el = dirs[i++];) {
                    fs.rmdirSync(el); //一次性删除所有收集到的目录
                }

                cb()
            } catch (e) { //如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生

                // if (e.code === "ENOTEMPTY") {
                // }

                e.code === "ENOENT" ? cb() : cb(e);

            }
        }
    })();

    rmdirSync(dir, function (e) {
        if (e) {
            logger.e(e);
        }
        // console.log("!!!" + e)
        // console.log("删除目录以及子目录成功")
    })

}