interface Question {
    id: number;
    text: string; // The question text
    type: 'multiple-choice' | 'short-answer'; // The type of question
    options?: string[]; // Options for multiple-choice questions
    correctAnswer: string | string[]; // The correct answer(s)
}

interface Exam {
    id: number;
    title: string;
    maxGrade: number;
    duration: number; // Duration in minutes
    questions: Question[]; // Array of questions
    instructorId: number | null;
    createdAt: Date | null;
    updatedAt: Date;
    deletedAt: Date | null;
}
export type { Question };
export type { Exam };
