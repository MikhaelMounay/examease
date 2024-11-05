import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { db } from "../db/index.js";
import { usersTable, User } from "../db/schema/schema.js";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { ExpressRequest } from "../middleware/auth.js";

function generateJwtToken(user: User) {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1d",
    });
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        // Hash the password with bcrypt before inserting it into the database
        const hashedPassword = await hash(req.body.password, 10);
        console.log("Hashed password: ", hashedPassword);

        // Insert the user into the database
        const [createdUser] = await db
            .insert(usersTable)
            .values({ ...req.body, password: hashedPassword })
            .returning();

        if (!createdUser) {
            res.status(400).json({ message: "User not created." });
            return;
        }

        const { password: _, ...userWithoutPassword } = createdUser;
        res.json({ ...userWithoutPassword, token: generateJwtToken(createdUser) });
    } catch (err) {
        console.log("Error: ", err);
        next(err);
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
        // Find the user by email
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, req.body.email)).limit(1);

        if (!user) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }

        // Check if the password is correct
        const isPasswordCorrect = await compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }

        const { password: _, ...userWithoutPassword } = user;

        res.json({ ...userWithoutPassword, token: generateJwtToken(user) });
    } catch (err) {
        console.log("Error: ", err);
        next(err);
    }
}

export async function getUser(req: ExpressRequest, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }

        res.json(req.user);
    } catch (err) {
        console.log("Error: ", err);
        next(err);
    }
}
