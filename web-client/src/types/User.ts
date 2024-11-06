type Role = "ADMIN" | "INSTRUCTOR" | "STUDENT";

interface User {
    id: number;
    aucId: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    department: string | null;
    classStanding: string | null;
    major: string | null;
    updatedAt: Date | null;
    createdAt: Date;
    deletedAt: Date | null;
}

interface UserWithoutPassword {
    role: Role;
    id: number;
    aucId: string;
    name: string;
    email: string;
    department: string | null;
    classStanding: string | null;
    major: string | null;
    updatedAt: Date | null;
    createdAt: Date;
    deletedAt: Date | null;
}

type UserWithToken = UserWithoutPassword & { token: string };

interface NewUser {
    role: Role;
    aucId: string;
    name: string;
    email: string;
    password: string;
    department?: string | null;
    classStanding?: string | null;
    major?: string | null;
}

export type { Role, User, UserWithoutPassword, UserWithToken, NewUser };
