const upath = require('upath');
const srcPath = upath.resolve(upath.dirname(__filename), '../src');
const langs = require('langs');
const fs = require('fs');


const files=fs.readdirSync(srcPath,{withFileTypes: true});
const langFiles = files.filter(el => el.isFile && upath.extname(el.name) === '.csv');
module.exports = langFiles.map( f=> { 
    const lang = /[^-]*-(..)-?(..)?\.csv/g.exec(f.name);
    if(lang != null) {
        return {
            iso:lang[1],
            flag:(lang[2]?lang[2]:lang[1]),
            csv:f.name,
            name:langs.where(1,lang[1]).local
        }
    }
});

