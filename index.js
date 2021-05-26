const fs = require('fs');
const inquirer = require('inquirer');

const generateReadme = ({title, description, installation, usage, license, contributing, tests, github, email, licenseBadge}) =>

`
# ${title}
${licenseBadge}

## Description
${description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Contact](#contact)

## Installation
${installation}

## Usage
${usage}

## License
${license}

## Contributing
${contributing}

## Tests
${tests}

## Contact
https://github.com/${github}

`

inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "Title of project:"
        },
      
        {
            type: "input",
            name: "description",
            message: "Description of project:"
        },
  
        {
            type: "input",
            name: "installation",
            message: "Installation directions:"
        },

        {
            type: "input",
            name: "usage",
            message: "Usage directions:"
        },

        {
            type: "input",
            name: "credits",
            message: "Credits to collaborators:"
        },

        {
            type: "list",
            name: "license",
            message: "License for project:",
            choices: ["MIT", "GNU GPL v3", "Apache 2.0", "ISC"]
        },

        {
            type: "input",
            name: "contributing",
            message: "Methods of contributing to project:"
        },

        {
            type: "input",
            name: "tests",
            message: "Tests for project:"
        },

        {
            type: "input",
            name: "github",
            message: "GitHub profile:"
        },

    ])
    .then((responses) => {
        let licenseImg
        switch (responses.license) {
            case ("MIT"):
                licenseImg = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
                break;
            case ("GNU GPL v3"):
                licenseImg = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
                break;
            case ("Apache 2.0"):
                licenseImg = "[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
                break;
            case ("ISC"):
                licenseImg = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
                break;
            default:
                licenseImg = "";
        };
        const readmeFile = generateReadme({...responses, licenseBadge: licenseImg});
        console.log(readmeFile);

        fs.writeFile("README.md", readmeFile, (err) =>
            err ? console.err(err) : console.log("Success!")
        );
});