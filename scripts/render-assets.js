'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');
const langs=require('./getLang.js');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const sourcePathFlags = upath.resolve(upath.dirname(__filename), '../node_modules/flag-icons/flags/4x3/');
    const destPath = upath.resolve(upath.dirname(__filename), '../docs/.');
    const ll=langs.map(l=>{return sourcePathFlags+upath.sep+l.flag+".svg";});

    sh.cp('-R', sourcePath, destPath);
    sh.cp('-u',ll,destPath+upath.sep+"assets");
};