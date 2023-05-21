import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    email: {required: true, unique: true, type: String},
    password: {required: true, type: String},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
});

export default model('User', UserSchema);