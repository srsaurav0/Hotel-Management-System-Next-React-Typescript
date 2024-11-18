import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';
import { Hotel } from '../../types/types';

export function generateSlug(req: Request<{}, {}, Hotel>, res: Response, next: NextFunction) {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title, { lower: true, strict: true });
        next();
    } else {
        res.status(400).send("Title is required to create a hotel.");
    }
}

export function generateRoomSlug(req: Request, res: Response, next: NextFunction): void {
    if (req.body.roomTitle) {
        req.body.roomSlug = slugify(req.body.roomTitle, { lower: true, strict: true });
    }
    next();
}