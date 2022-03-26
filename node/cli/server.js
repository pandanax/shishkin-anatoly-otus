#!/usr/bin/env node
const {Command} = require('commander');
const program = new Command();
const {version, name} = require('./package.json');
//enquirer
//vorpal
//!! oclif - сложный но мощный
// gluegun - проще и круче!
// можно просто поискать по ключу cli в npm

program.command('--help').action(() =>{
    console.log('HHH')
})

