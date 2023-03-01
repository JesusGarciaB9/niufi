#!/usr/bin/env node

let shell = require('shelljs') 
let fs = require('fs') //fs already comes included with node.
//let templates = require('./templates/templates.js')

let appName = process.argv[2]
console.log("app name ",appName)
let appDirectory = `${process.cwd()}/${appName}`

const createNextApp = () => {
    return new Promise(resolve=>{
        if(appName){
        shell.exec(`npx create-next-app@latest ${appName} --example https://github.com/JesusGarciaB9/Niufi-app-boiler`, () => {
         
            console.log("Created next app")
            resolve(true)
        })
        }else{
        console.log("\nNo app name was provided.".red)
        console.log("\nProvide an app name in the following format: ")
        console.log("\ncreate-next-app ", "app-name\n".cyan)
            resolve(false)
        }
    })
}

const cdIntoNewApp = () => {
    return new Promise(resolve=>{
        shell.exec(`cd ${appName}`, ()=>{resolve()})
    })
}

const installPackages = () => {
    return new Promise(resolve=>{
        console.log("\nInstalling redux, react-router, react-router-dom, react-redux, and redux-thunk\n".cyan)
        shell.exec(`npm install --save redux react-router react-redux redux-thunk react-router-dom`, () => {
            console.log("\nFinished installing packages\n".green)
            resolve()
        })
    })
}

const updateTemplates = () => {
    function deleteFiles(files, callback){
        var i = files.length;
        files.forEach(function(filepath){
            fs.unlink(filepath, function(err) {
            i--;
            if (err) {
                callback(err);
                return;
            } else if (i <= 0) {
                callback(null);
            }
            });
        });
    }

    deleteFiles([`${appDirectory}/src/App.test.js`, `${appDirectory}/src/logo.svg`, `${appDirectory}/src/index.css`, `${appDirectory}/src/App.css`], function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Removed App.test.js, logo.svg, index.css, App.css');
        }
    });

    return new Promise(resolve=>{
        let promises = []
        Object.keys(templates).forEach((fileName, i)=>{
        promises[i] = new Promise(res=>{
            fs.writeFile(`${appDirectory}/src/${fileName}`, templates[fileName], function(err) {
                if(err) { return console.log(err) }
                res()
            })
        })
        })
        Promise.all(promises).then(()=>{resolve()})
    })
}


const run = async () => {
    let success = await createNextApp() 
    if(!success){
        console.log('Something went wrong while trying to create a new React app using create-react-app'.red)
        return false;
    }
    //await cdIntoNewApp()
    //await installPackages()
    //await updateTemplates()
    console.log("All done")
}
run()