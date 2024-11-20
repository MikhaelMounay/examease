interface Course {
    id: number;
    openForEnrollment: boolean;
    enrollmentKey: string | null;
    title: string;
    numStudents: number;
    instructorId: number | null;
    createdAt: Date | null;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type { Course };
