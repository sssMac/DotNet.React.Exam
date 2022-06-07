import express, {Application, Request, Response,NextFunction} from 'express';
import {checkCredit} from "../controllers/CreditsController";

const creditRoute = express.Router()

creditRoute.post('/creditCheck', checkCredit)

export {
    creditRoute
}