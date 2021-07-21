import { Response, Request } from 'express';
import { hashPassword, comparePassword } from '../../helpers/PasswordEncrypting'
import { createToken } from '../../helpers/JsonWebToken'
import { userEntity } from '../../models/Schemas/User.schema'


//Post controllers to
export function createUserController(req: Request, res: Response): Response {

    const { userName, email, password } = req.body;

    // Handling User Registration
    userEntity.findOne({ email: email }) //Finding a user querying our data base
        .then((savedUser) => {
            //If user exist on the DataBase ,We will not save the data and return a error to the user and will not save the data
            if (savedUser) {
                return res.status(422).json({ Message: "The email seems to be in use, please use another one" });
            }

            // Defining User Entity to be saved on db with has passwords
            const user = new userEntity({
                userName,
                email,
                password: hashPassword(password, 10)
            });
            //Saving User on data base
            user.save((error, record) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json({ Message: "Error saving user on db" });
                } else {

                    console.log(`User succesfully saved Record id===> ${record._id} `);
                    return res.status(200).json({ Message: "User succesfully saved" });
                }
            })
        })

    return res.status(200);

}

export function verifyProfileController(req: Request, res: Response): Response {

    const { email, password } = req.body;

    userEntity.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                let match = comparePassword(password, savedUser.password);
                if (match) {
                    let token: string = createToken(savedUser._id);

                    return res.status(200).json({ Message: `Succesfully login`, token, payload: savedUser })

                } else {
                    // Incorrect Password`
                    return res.status(401).json({ Message: `Incorrect Email or Password` })
                }
            } else {
                // Email Not found`
                return res.status(404).json({ Message: `Incorrect Email or Password` })
            }
        })
    return res.status(400);
}