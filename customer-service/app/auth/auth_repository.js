const Repository = require("../../Repository");
const { Auth } = require("../../models");

class AuthRepository extends Repository {
    constructor() {
        super(Auth);
    };
}

module.exports = new AuthRepository();