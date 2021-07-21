import { Schema, model, ObjectId as objectId, Types } from "mongoose";

// Post Interface
interface POST {
    title: string,
    body: string,
    photo: string,
    postedBy: objectId // Object id Type interface
}
// Object Id Constructor comming from types 
const { ObjectId } = Types;

//Mongo db post Schema
const postSchema = new Schema<POST>({
    title: { type: String, required: true },
    body: { type: String, require: true },
    photo: { type: String, required: true },
    postedBy: { type: ObjectId, ref: "user" } //Ref to user table
})

const postModel = model<POST>('post', postSchema);

export {
    postModel as postEntity
}