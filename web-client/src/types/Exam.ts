interface Question {
    id: number;
    type: string;
    prompt: string;
    options?: string[]; // For MCQs
    language?: string; // For coding questions
    isCodeSnippet?: boolean; // Whether it's a code snippet
    codeSnippet?: string; // The actual code snippet
    maxGrade: number;
}
export type { Question };
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
export type { Exam };
