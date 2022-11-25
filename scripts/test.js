'use strict';
const lang = /[^-]*-(..)-?(..)?\.csv/g.exec("dico-cz.csv");
console.log(lang);