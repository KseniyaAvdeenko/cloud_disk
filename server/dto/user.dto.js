module.exports = class UserDTo {
    email;
    id;
    diskSpace;
    usedSpace;
    avatar;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.diskSpace = model.diskSpace;
        this.usedSpace = model.usedSpace;
        this.avatar = model.avatar;
    }
}