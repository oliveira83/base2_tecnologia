const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on)
            on('task', { 
            downloadFile,
            saveFile({ filePath, content }) {
                return new Promise((resolve, reject) => {
                    fs.writeFile(filePath, content, 'base64', (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(true);
                    });
                });
            },
            fileExists({ filePath }) {
                return fs.existsSync(filePath);
            }
        });
    },

    baseUrl: 'https://mantis-prova.base2.com.br/'
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: 'cypress/reports',
            overwrite: false,
            html: true,
            json: true,
            charts: true
    },
});
