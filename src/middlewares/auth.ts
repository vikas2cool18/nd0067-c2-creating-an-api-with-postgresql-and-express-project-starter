import express ,{Request, Response} from "express";

import jwt from 'jsonwebtoken'

export function verifyAuthToken (
    req: Request,
    res: Response,
    next: express.NextFunction){

	if(!req.headers || !req.headers.authorization){
         return res.status(401).send({message: "No authorization headers"});
	}

	const tokenBearer = req.headers.authorization.split(' ');

	if(tokenBearer.length != 2){
         return res.status(401).send({message: "Malformed token"})
	}

	const token = tokenBearer[1];
        return jwt.verify(token, process.env.TOKEN_SECRET as string, (err) => {
            if(err){
              return res.status(500).send({message: "Failed to authenticate"});
	    }

	return next();
     })
  }