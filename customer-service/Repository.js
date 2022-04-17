class Repository {
    constructor(Model) {
        this.Model = Model;
    }

    getModel() {
        return this.Model;
    }

    create(obj) {
        return this.Model.create(obj);
    }
    findById(id) {
        return this.Model.findByPK(id);
    }

    findOne(condition = {}) {
        return this.Model.findOne({
            where: condition
        });
    }

    findOrCreate(condition, obj) {
        return this.Model.findOrCreate({
            where: condition,
            defaults: obj
        });
    }

    all(condition) {
        return this.Model.findAll(condition);
    }

    count(condition) {
        if (condition) {
            return this.Model.count(condition);
        }
        return this.Model.count();

    }

    delete(condition) {
        return this.Model.destroy({
            where: condition
        });
    }

    massInsert(data = []) {
        return this.Model.bulkCreate(data);
    }

    update(condition, update) {
        return this.Model.update(update, {
            where: condition
        })
    }
}

module.exports = Repository;