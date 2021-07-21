import { body } from 'express-validator'

// Profile Schema for validations
export const ProfileSchema = [
    body("email").isEmail().exists(),
    body("password").exists().isLength({ min: 5 })
]