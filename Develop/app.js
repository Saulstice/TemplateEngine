const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const questions = ["What's this employee's role? ",
    "What's this employee's name? ",
    "What's this employee's id? ",
    "What's this employee's email?",
    "What's this employee's school?",
    "What's this employee's github username? ",
    "What's this employee's office number? ",
    "Would you like to add another employee? ",
    "Would you like to add another employee? "
];

const employees = [];
const newEmployees = () => {
    var newManager = new Manager();
    var newEngineer = new Engineer();
    var newIntern = new Intern();
    inquirer
        .prompt([
            {
                type: "list",
                message: questions[0],
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]
            },
            {
                type: "input",
                message: questions[1],
                name: "name"
            },
            {
                type: "input",
                message: questions[2],
                name: "id"
            },
            {
                type: "input",
                message: questions[3],
                name: "email"
            }

        ]).then(data => {

            if (data.role === "Manager") {
                var newGuy = new Manager(data.name, data.id, data.email, "")

                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: questions[6],
                            name: "office"
                        },
                        {
                            type: "list",
                            message: questions[8],
                            name: "add",
                            choices: ["yes", "no"]
                        }
                    ]).then(dataTwo => {
                        newGuy.officeNumber = dataTwo.office
                        newManager = newGuy;
                        employees.push(newManager);
                        // console.log(employees);
                        if (dataTwo.add === "yes") {
                            newEmployees();
                        } else {
                            render(employees);
                        }
                    });
            } else if (data.role === "Engineer") {
                var newGuy = new Engineer(data.name, data.id, data.email, "")
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: questions[5],
                            name: "github"
                        },
                        {
                            type: "list",
                            message: questions[8],
                            name: "add",
                            choices: ["yes", "no"]
                        }
                    ]).then(dataTwo => {
                        newGuy.github = dataTwo.github
                        newEngineer = newGuy;
                        employees.push(newEngineer);
                        // console.log(employees);
                        if (dataTwo.add === "yes") {
                            newEmployees();
                        } else {
                            render(employees);
                        }
                    });
            } else {
                var newGuy = new Intern(data.name, data.id, data.email, "")
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: questions[4],
                            name: "school"
                        },
                        {
                            type: "list",
                            message: questions[8],
                            name: "add",
                            choices: ["yes", "no"]
                        }
                    ]).then(dataTwo => {
                        newGuy.school = dataTwo.school;
                        newIntern = newGuy;
                        employees.push(newIntern);
                        // console.log(employees);
                        if (dataTwo.add === "yes") {
                            newEmployees();
                        } else {
                            render(employees);
                        }
                    });
            }
        })
}

newEmployees();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
