const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const route = `/${file.split('.').slice(0, -1).join('.')}`;
        const handler = `.${route}`;
        console.log(`The required handler: ${handler}`);
        require(handler);
    });