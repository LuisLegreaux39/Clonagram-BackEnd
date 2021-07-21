import { body } from 'express-validator'

// User Schema for validations
export const UserSchema = [
    body("userName").isString().exists(),
    body("email").isEmail().exists(),
    body("password").exists().isLength({ min: 5 })
]