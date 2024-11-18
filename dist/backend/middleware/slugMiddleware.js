"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
exports.generateRoomSlug = generateRoomSlug;
const slugify_1 = __importDefault(require("slugify"));
function generateSlug(req, res, next) {
    if (req.body.title) {
        req.body.slug = (0, slugify_1.default)(req.body.title, { lower: true, strict: true });
        next();
    }
    else {
        res.status(400).send("Title is required to create a hotel.");
    }
}
function generateRoomSlug(req, res, next) {
    if (req.body.roomTitle) {
        req.body.roomSlug = (0, slugify_1.default)(req.body.roomTitle, { lower: true, strict: true });
    }
    next();
}
