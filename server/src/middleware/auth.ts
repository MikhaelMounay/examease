import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { usersTable, UserWithToken } from "../db/schema/schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";

export interface ExpressRequest extends Request {
    user?: UserWithToken;
}

export const authenticate = async (req: ExpressRequest, res: Response, next: NextFunction) => {
    // Check if the authorization header is present
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Unauthorized." });
        return;
    }

    // Get the token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized." });
        return;
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { email: string };

        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, decoded.email)).limit(1);

        const { password: _, ...userWithoutPassword } = user;
        const userWithToken: UserWithToken = { ...userWithoutPassword, token };

        // Attach the user to the request
        req.user = userWithToken;
        next();
    } catch (err) {
        console.log("Error: ", err);
        req.user = undefined;
        next(err);
    }
};
