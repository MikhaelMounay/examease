import { Request, Response } from "express";

export default function getUser (_req: Request, res: Response) {
    res.status(200).json({ message: "Hello, world!" });
}