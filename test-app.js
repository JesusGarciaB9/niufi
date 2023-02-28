#!/usr/bin/env node

let shell = require('shelljs') 
const run = async () => {
    //let success = await createNextApp()
    shell.exec("echo shell.exec works");
 
}
run()