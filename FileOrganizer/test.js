const fs = require('fs');
const path = require('path');

const sourceDirectory = './source/';
const targetDirectory = `./organized/`;
let extName = []

if (!fs.existsSync('./source')) {
    fs.mkdirSync('./source');
    console.log(`Add files in ${sourceDirectory}`)
}
if (!fs.existsSync('./organized')) {
    fs.mkdirSync('./organized');
}

fs.readdirSync(sourceDirectory).forEach(file => {
    extName.push(path.extname(file))
});

function createDirectoryIfNotExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}
function organizeFilesByExtension() {
    extName.forEach(ext => {
        console.log(ext)
        createDirectoryIfNotExists(targetDirectory + ext);
    })
    fs.readdir(sourceDirectory, (err, files) => {
        if (err) {
            console.log(`Error in reading Dir :` + err);
        }
        files.forEach(file => {
            const ext = path.extname(file);
            const sourceFile = path.join(sourceDirectory, file);
            const targetFile = path.join(targetDirectory + ext, file);

            fs.rename(sourceFile, targetFile, err => {
                if (err) {
                    console.error(`Error moving file ${sourceFile} to ${targetFile}: ${err}`);
                } else {
                    console.log(`Moved ${file} to ${targetDirectory + ext}`);
                }
            });
        })
    })
}
//func call
organizeFilesByExtension();
