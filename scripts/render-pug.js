'use strict';
const fs = require('fs');
const upath = require('upath');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');
const csv2json = require('./csv2json.js');


module.exports = function renderPug(filePath) {
    const srcPath = upath.resolve(upath.dirname(__filename), '../src');
    const destPath = upath.resolve(srcPath,'../docs');

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`);
    if (!sh.test('-e', destPath)) {
        sh.mkdir('-p', destPath);
    }

    const langFiles=fs.readdir(srcPath,{withFileTypes: true},function renderLang(err,files) {
        const langFiles = files.filter(el => el.isFile && upath.extname(el.name) === '.csv');
        const allLangs=[];
        langFiles.forEach( f=> {
            console.log(`### INFO: Rendering ${f.name}`)
            const lang = /.*-(..)\.csv/g.exec(f.name);
            if(lang == null) { console.log("ignoring",f.name); return;}
            else allLangs.push([lang[1],f.name]);
        });
        allLangs.forEach(f=>{
            const jsonObj=csv2json(fs.readFileSync(srcPath+upath.sep+f[1],"utf-8").trim(),{separator:","});
            //console.log(jsonObj);
            const html = pug.renderFile(filePath, {
                doctype: 'html',
                filename: filePath,
                basedir: srcPath,
                dico: jsonObj,
                mylang: f[0],
                allLangs: allLangs
            });
            const prettified = prettier.format(html, {
                printWidth: 1000,
                tabWidth: 4,
                singleQuote: true,
                proseWrap: 'preserve',
                endOfLine: 'lf',
                parser: 'html',
                htmlWhitespaceSensitivity: 'ignore'
            });
            const suffix = f[0]=="en" ? ".html" : `-${f[0]}.html`;
            const target=filePath.replace(/src\/pug\//, 'docs/').replace(/\.pug$/, suffix);
            fs.writeFileSync(target, prettified);

        });
    });
    
};
