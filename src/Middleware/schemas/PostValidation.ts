import { body } from 'express-validator';

//Post validation schema 
export const PostSchema = [
    body('title').isString().exists(),
    body('body').isString().exists(),
    body('photo').isString().exists(),
]