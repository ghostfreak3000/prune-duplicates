
const getTemplate = (file) => new Promise ( (resolve, reject) => {
    const fs = require('fs');
    fs.readFile(file, 'utf8', (err,data) => {
        if(err){
            return reject(err);
        }
        return resolve(data);
    });
})

const main = async () => {

    const file = './template.txt';
    const templateStr = await getTemplate(file);

    const Handlebars = require("handlebars");
    
    Handlebars.registerHelper('join', function (array) {        
        return array.join(", ")
    })

    Handlebars.registerHelper('comma', function (array) {
        return (array.length > 0)?",":""
    })    

    Handlebars.registerHelper('isLast', function (value,array) {
        return value == array[array.length - 1];
    });
      

    const template = Handlebars.compile(templateStr);
    
    const input = {
        id:"ctid",
        span:[
            "call_id",
            "ticket_id"
        ],
        table:"ticketcall"
    }
    const output = template(input)
                    .split("\r").join("")
                    .split("\n").join("")
                    .split("\t").join(" ")
                    .split("  ").join(" ")
                    .split("  ").join(" ");
    console.log(output);
}

main();