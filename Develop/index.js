const fs = require('fs');
const inquirer = require('inquirer');
// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the title?',
        validate: function (nameInput) {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage information:',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Contribution guidelines:',
    },
    {
        type: 'input',
        name: 'test',
        message: 'Tests instructions:',
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'Tests instructions:',
        choices: [
            {
                name: 'Apache 2.0 License',
                value: {
                    name: 'Apache 2.0 License',
                    badge: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
                }
            },
            {
                name: 'Boost Software License 1.0',
                value: {
                    name: 'Boost Software License 1.0',
                    badge: '[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt) '
                }
            },
            {
                name: 'BSD 3-Clause License',
                value: {
                    name: 'BSD 3-Clause License',
                    badge: '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
                }
            },
            {
                name: 'BSD 2-Clause License ',
                value: {
                    name: ' BSD 2-Clause License',
                    badge: ' [![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'
                }
            }
        ]
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter Github username:', 
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email:', 
    }

];



const writeFiles = (data) => {
    fs.writeFile('./README.md', data, 'utf8', err => {
        if (err) {
            console.log(err)
        }
    })

}

const promptUser = () => {
    return inquirer.prompt(
        questions
    ).then(answers => {
        return answers
    })
        .catch(error =>
            console.log('ERROR-->', error))
};





const generateReadme = answers => {
    const licenses = (answers.license);
    let licensenames = '';
    for (let i = 0; i < licenses.length; i++) {
        licensenames = licensenames + '\n ### ' + licenses[i].name;
    };
    let licensebadges = '';
    for (let i = 0; i < licenses.length; i++) {
        licensebadges = licensebadges + '\n' + licenses[i].badge;
    };


    return `# ${answers.name}
    ${licensebadges}
1. [ Description. ](#desc)
2. [ Installation. ](#instal)
3. [ Usage. ](#use)
4. [ Contributing.](#contr)
5. [ Tests.](#test)
6. [ License.](#licen)
7. [ Questions.](#ques)
<a name="desc"></a>
## Description:
### ${answers.description}
<a name="instal"></a>
## Installation:
### ${answers.installation}
<a name="use"></a>
## Usage:
### ${answers.usage}
<a name="contr"></a>
## Contributing:
### ${answers.contribution}
<a name="test"></a>
## Tests:
### ${answers.test}
<a name="licen"></a>
## License:
${licensenames}
<a name="ques"></a>
## Questions:
### My gitHub profile:
## https://github.com/${answers.github}
### Email me:
## ${answers.email}
    ` ;

}

//PROMISE CHAINING
promptUser()
    .then(answers => generateReadme(answers))
    .then(stuffToWrite => writeFiles(stuffToWrite))
    .catch(error => console.log(error))



//promptUser()
    // .then(readmeData => {
    //     return generateReadme(readmeData);
    // })
    // .then(data => writeFiles(data)

    //     );
        // function to write README file


// function to initialize program
 //function init() {

// }

// // function call to initialize program
// init();

