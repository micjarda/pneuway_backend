const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    credentials: {
        name: { type: String, required: true },
        password: { type: String, required: true },
    },
    permissions: {
        content: {
            edit: { type: Boolean, required: true },
            add: { type: Boolean, required: true },
            delete: { type: Boolean, required: true },
        },
        settings: {
            edit: { type: Boolean, required: true },
            add: { type: Boolean, required: true },
            delete: { type: Boolean, required: true },
        },
        users: {
            edit: { type: Boolean, required: true },
            add: { type: Boolean, required: true },
            delete: { type: Boolean, required: true },
        }
    },
    expirationDate: { type: Date, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
