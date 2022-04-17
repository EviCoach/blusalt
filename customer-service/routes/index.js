const fs = require('fs');
const path = require('path');
const Router = require('express').Router;
const basename = path.basename(__filename);
const router = Router();

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const route = `/${file.split('.').slice(0, -1).join('.')}`;
        const handler = `.${route}`;
        router.use(route, require(handler));
    });
module.exports = router;