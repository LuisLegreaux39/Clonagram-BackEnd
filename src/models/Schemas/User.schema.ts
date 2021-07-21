import mongoose, { Schema, model } from 'mongoose';
// User Interface
interface USER {
    userName: string,
    email: string,
    password: string
}
// User Blue print for mongo
const userSchema = new Schema<USER>({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

// Model where we are going to handle the data
const userModel = model<USER>('user', userSchema);

export {
    userModel as userEntity
}