const path = require("path");
const fs = require("fs");
exports.handleAxiosError = error => {
    try {
        if (error && error.response) {
            return {
                status: error.response.status,
                statusText: error.response.statusText,
                // message: error.response.data.error,
                message: error.response.data,
                url: error.response.config.url,
                params: error.response.config.params,
                data: error.response.config.data,
                headers: error.response.headers
            }
        }
        return {
            status: 500,
            statusText: error.message || "Unknown Error",
            message: error.message || "Oops, An Error Occurred",
            stack: error.stack
        }
    } catch (ex) {
        return {
            status: 500,
            statusText: "Unknown Error",
            message: "Oops, An Error Occurred",
            error: ex.message,
            stack: ex.stack
        }
    }
};

exports.requireFolderFiles = (currentDir, filename) => {
    const basename = path.basename(filename);
    fs
        .readdirSync(currentDir)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const handler = path.join(path.resolve(currentDir), file);
            require(handler);
        });
}