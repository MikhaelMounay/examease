interface User {
    id: number;
    aucId: string;
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
    department: string | null;
    classStanding: string | null;
    major: string | null;
    updatedAt: Date | null;
    createdAt: Date;
    deletedAt: Date | null;
}

interface UserWithoutPassword {
    role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
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

export type { User, UserWithoutPassword, UserWithToken };
