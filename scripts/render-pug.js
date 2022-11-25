'use strict';
const fs = require('fs');
const upath = require('upath');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');
const csv2json = require('./csv2json.js');
const langs=require('./getLang.js');
const { Z_FIXED } = require('zlib');



module.exports = function renderPug(filePath) {
    const srcPath = upath.resolve(upath.dirname(__filename), '../src');
    const destPath = upath.resolve(srcPath,'../docs');

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`);
    if (!sh.test('-e', destPath)) {
        sh.mkdir('-p', destPath);
    }
/*
    const langFiles=fs.readdir(srcPath,{withFileTypes: true},function renderLang(err,files) {
        const langFiles = files.filter(el => el.isFile && upath.extname(el.name) === '.csv');
        const allLangs=[];
        langFiles.forEach( f=> {
            console.log(`### INFO: Rendering ${f.name}`)
            const lang = /.*-(..)\.csv/g.exec(f.name);
            if(lang == null) { console.log("ignoring",f.name); return;}
            else allLangs.push([lang[1],f.name,langs.where(1,lang[1]).local]);
        });
        */
    langs.forEach(f=>{
        const jsonObj=csv2json(fs.readFileSync(srcPath+upath.sep+f.csv,"utf-8").trim(),{separator:",",hash:"true"});
        //console.log(jsonObj);
        const html = pug.renderFile(filePath, {
            doctype: 'html',
            filename: filePath,
            basedir: srcPath,
            dico: jsonObj,
            mylang: f,
            allLangs: langs
        });
        const prettifiedHtml = prettier.format(html, {
            printWidth: 1000,
            tabWidth: 4,
            singleQuote: true,
            proseWrap: 'preserve',
            endOfLine: 'lf',
            parser: 'html',
            htmlWhitespaceSensitivity: 'ignore'
        });
        
        const suffix = f.iso=="en" ? "" : `-${f.iso}`;
        const targetHtml=filePath.replace(/src\/pug\//, 'docs/').replace(/\.pug$/, suffix+".html");
        fs.writeFileSync(targetHtml, prettifiedHtml);

        const targetJson=filePath.replace(/src\/pug\/index/, 'docs/').replace(/\.pug$/,f.iso+".json");
        Object.entries(jsonObj).forEach(o=>{delete o[1].cat;});
        fs.writeFileSync(targetJson,JSON.stringify(jsonObj));


    });
};
