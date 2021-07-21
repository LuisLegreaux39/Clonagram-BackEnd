import { Request, Response, NextFunction } from 'express';
import { postEntity } from '../../models/Schemas/Post.schemas'

export function createPostControlller(req: Request, res: Response): Response {
    const { _id } = req.body.userData;
    const { title, body, photo } = req.body.payload;

    let post = new postEntity({

        title,
        body,
        photo,
        postedBy: req.body.userData
    });

    post.save((error, record) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ Error: "Could not save record" })
        } else {
            return res.status(200).json({ record })
        }
    })
    return res.status(200)
}

export function getAllPostController(req: Request, res: Response): any {

    postEntity.find()
        .populate("postedBy", "_id userName")
        .then(records => {
            return res.status(200).json({ payload: records })

        }).catch(err => {

            return res.status(500).json({ Error: "Could not retrive info" });
        })
}

export function getAllMyPostController(req: Request, res: Response): any {
    const { userData } = req.body;

    postEntity.find({ postedBy: userData._id })
        .populate("postedBy", "_id userName")
        .then(records => {

            return res.status(200).json({ payload: records })

        }).catch(err => {
            return res.status(500).json({ Error: "Could not retrive info" });
        })
}