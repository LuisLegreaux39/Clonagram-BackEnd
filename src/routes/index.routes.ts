import { Router } from 'express';
// Controllers imports
import { createUserController, verifyProfileController } from "../controllers/User";
import { createPostControlller, getAllPostController, getAllMyPostController } from '../controllers/Posts'
// Middlewares
import { requestValidator, protectedRouteLoginValidator } from '../Middleware';
// Middleware Schemas Validations
import { UserSchema } from '../Middleware/schemas/UserValidation';
import { ProfileSchema } from '../Middleware/schemas/ProfileValidation';
import { PostSchema } from '../Middleware/schemas/PostValidation'

const router = Router();


const MAIN_ROUTE = '/auth';
const CORE_ROUTE = '/api';
// ****************************** PUBLIC ROUTES ***********************************************
/**
 * Sign-Up route to create a new user
    UserSchema =  Fields validation
 */
router.route(`${MAIN_ROUTE}/signup`).post(UserSchema, requestValidator, createUserController);

/**
 * Sign-In route to verify and login a User
    ProfileSchema =  Fields validation
 */
router.route(`${MAIN_ROUTE}/signin`).post(ProfileSchema, requestValidator, verifyProfileController);

//*************************PROTECTED ROUTES*****************************************************
/**
   *  Create post related to a existing user
      PostSchema  = Fields validation 
*/
router.route(`${CORE_ROUTE}/createpost`).post(PostSchema, requestValidator, protectedRouteLoginValidator, createPostControlller);

/**
   *  Get All existing post
*/
router.route(`${CORE_ROUTE}/getallpost`).get(getAllPostController);

/**
   *  Get All post ppublish by me
*/
router.route(`${CORE_ROUTE}/getallmypost`).get(protectedRouteLoginValidator, getAllMyPostController);



export { router };