import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faPen } from "@fortawesome/free-solid-svg-icons"; // Importing icons
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Exam } from "../../../types/Exam";
import { useAuth } from "../../../contexts/AuthWrapper";
import { Question } from "../../../types/Exam";
import { useCourseContext } from "../../../contexts/CourseContext.tsx";

const CreateExam: React.FC = () => {
    const { token } = useAuth();
    const {courseData} = useCourseContext(); // TODO: ERROR: NOT GETTING THE CORRECT courseId FAILING TO CREATE EXAM
    const [examName, setExamName] = useState("");
    const [examDate, setExamDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionType, setQuestionType] = useState("");
    const [questionPrompt, setQuestionPrompt] = useState("");
    const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
    const [options, setOptions] = useState<string[]>([""]); // For MCQs
    const navigator = useNavigate();
    const [codingLanguage, setCodingLanguage] = useState(""); // For coding questions
    const [isCodeSnippet, setIsCodeSnippet] = useState(false); // For code snippet checkbox
    const [codeSnippet, setCodeSnippet] = useState(""); // For the code snippet textarea
    const [maxGrade, setMaxGrade] = useState(0);
    const [dateError, setDateError] = useState("");


    // Load data from localStorage on page load
    useEffect(() => {
        const savedData = localStorage.getItem("examData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setExamName(parsedData.examName);
            setExamDate(parsedData.examDate);
            setStartTime(parsedData.startTime);
            setEndTime(parsedData.endTime);
            setQuestions(parsedData.questions);
        }
    }, []);

    // Add a new question
    const addQuestion = () => {
        if (questionType && questionPrompt) {
            setQuestions((prevQuestions) => [
                ...prevQuestions,
                {
                    id: Date.now(),
                    type: questionType,
                    prompt: questionPrompt,
                    options: questionType === "mcq" ? options.filter(Boolean) : undefined,
                    language: questionType === "Coding" ? codingLanguage : undefined,
                    isCodeSnippet,
                    codeSnippet: isCodeSnippet ? codeSnippet : undefined, // Add code snippet if applicable
                    maxGrade: maxGrade,
                },
            ]);
            resetForm();
        }
    };

    // Update an existing question
    const saveEditedQuestion = () => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === editingQuestionId
                    ? {
                        ...q,
                        type: questionType,
                        prompt: questionPrompt,
                        options: questionType === "mcq" ? options.filter(Boolean) : undefined,
                        language: questionType === "Coding" ? codingLanguage : q.language,
                        isCodeSnippet,
                        codeSnippet: isCodeSnippet ? codeSnippet : q.codeSnippet, // Update code snippet
                        maxGrade: q.maxGrade,
                    }
                    : q
            )
        );
        resetForm();
    };

    // Start editing a question
    const editQuestion = (question: Question) => {
        setEditingQuestionId(question.id);
        setQuestionType(question.type);
        setQuestionPrompt(question.prompt);
        setOptions(question.options || [""]);
        setCodingLanguage(question.language || "");
        setIsCodeSnippet(question.isCodeSnippet || false); // Set the checkbox for code snippet
        setCodeSnippet(question.codeSnippet || ""); // Set the code snippet for editing
        setMaxGrade(question.maxGrade || 0);
    };

    // Delete a question
    const deleteQuestion = (questionId: number) => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
    };

    // Reset the form after adding/editing a question
    const resetForm = () => {
        setEditingQuestionId(null);
        setQuestionType("");
        setQuestionPrompt("");
        setOptions([""]);
        setCodingLanguage("");
        setIsCodeSnippet(false);
        setCodeSnippet("");
    };

    // Add an option for MCQs
    const addOption = () => {
        setOptions((prevOptions) => [...prevOptions, ""]);
    };

    // Update an option
    const updateOption = (index: number, value: string) => {
        setOptions((prevOptions) => prevOptions.map((opt, i) => (i === index ? value : opt)));
    };

    // Remove an option
    const removeOption = (index: number) => {
        setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
    };

    // Mutation function to handle the exam creation logic
    const createExamMutation = useMutation({
        mutationFn: async (data: {
            title: string;
            examDate: string;
            startTime: string;
            endTime: string;
            questions: Question[];
            courseId: number; // Added courseId parameter
        }) => {
            console.log("ay haga");
            console.log(data);
            const response = await fetch(import.meta.env.VITE_API_URL + "/exams/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok || response.status !== 200) throw new Error("Failed to create exam.");
            return response.json() as Promise<Exam>;
        },
        onSuccess: (data) => {
            console.log("Exam created successfully:", data);
            alert("Exam created successfully!");
            navigator("/courses"); // Show success message
            // Optionally, you could redirect to another page or show a modal here
        },
        onError: (error) => {
            console.error("Error occurred while creating exam:", error);
            alert("Failed to create exam.");
        },
    });

    function handleCreateExam() {
        const currentDate = new Date();
        const selectedExamDate = new Date(examDate);
    
        if (selectedExamDate < currentDate) {
            setDateError("The exam date must be in the future.");
            return;
        } else {
            setDateError(""); // Clear error if validation passes
        }
    
        // Proceed with the rest of the validation and mutation
        if (!(examName && examDate && startTime && endTime && questions.length > 0)) {
            console.error("Please fill in all fields and add at least one question");
            return;
        }
    
        createExamMutation.mutate({
            title: examName,
            examDate: examDate,
            startTime: new Date(examDate + " " + startTime).toISOString(),
            endTime: new Date(examDate + " " + endTime).toISOString(),
            questions: questions,
            courseId: courseData?.id || 1,
        });
    }
    
    return (
        <div className="create-exam-container">
            <h1>Create New Exam</h1>

            {/* Exam Details */}
            <div className="exam-details">
                <h2>Exam Details</h2>
                <label>
                    Exam Name:
                    <input
                        type="text"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        placeholder="Enter exam name"
                    />
                </label>
                <label>
                    Exam Date:
                    <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
                </label>
                {dateError && <div className="error-message">{dateError}</div>}
                <label>
                    Start Time:
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </label>
                <label>
                    End Time:
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </label>
            </div>

            {/* Question Form */}
            <div className="add-questions">
                <h2>{editingQuestionId ? "Edit Question" : "Add Question"}</h2>
                <label>
                    Question Type:
                    <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                        <option value="">Select type</option>
                        <option value="Short-Answer">Short Answer</option>
                        <option value="Essay">Essay</option>
                        <option value="mcq">Multiple Choice</option>
                        <option value="Coding">Coding</option>
                    </select>
                </label>
                <label>
                    Question Prompt:
                    <textarea
                        value={questionPrompt}
                        onChange={(e) => setQuestionPrompt(e.target.value)}
                        placeholder="Enter the question prompt"
                    />
                </label>
                <label className="code-snippet-label">
                    Will be a code snippet?
                    <input type="checkbox" checked={isCodeSnippet} onChange={(e) => setIsCodeSnippet(e.target.checked)} />
                </label>
                {isCodeSnippet && (
                    <label>
                        Code Snippet:
                        <textarea
                            value={codeSnippet}
                            onChange={(e) => setCodeSnippet(e.target.value)}
                            placeholder="Enter the code snippet"
                        />
                    </label>
                )}

                {/* MCQ Options */}
                {questionType === "mcq" && (
                    <div className="mcq-options">
                        <h3>Options</h3>
                        {options.map((option, index) => (
                            <div key={index} className="option-item">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                />
                                {options.length > 1 && (
                                    <button onClick={() => removeOption(index)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button onClick={addOption}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                )}

                {/* Coding Question Language */}
                {questionType === "Coding" && (
                    <>
                        <label>
                            Programming Language:
                            <select value={codingLanguage} onChange={(e) => setCodingLanguage(e.target.value)}>
                                <option value="">Select language</option>
                                <option value="Python">Python</option>
                                <option value="Java">Java</option>
                                <option value="C++">C++</option>
                                <option value="JavaScript">JavaScript</option>
                            </select>
                        </label>
                    </>
                )}

                <button onClick={editingQuestionId ? saveEditedQuestion : addQuestion} className="add-question">
                    {editingQuestionId ? "Save Changes" : "Add Question"}
                </button>
            </div>

            {/* Display Questions */}
            {questions.length > 0 && (
                <div className="questions-list">
                    <h2>Questions</h2>
                    <ul>
                        {questions.map((question) => (
                            <li key={question.id}>
                                <strong>Type:</strong> {question.type} <br />
                                <strong>Prompt:</strong> {question.prompt} <br />
                                {question.isCodeSnippet && (
                                    <>
                                        <strong>Code Snippet:</strong>
                                        <pre>{question.codeSnippet}</pre>
                                    </>
                                )}
                                {question.type === "mcq" && (
                                    <>
                                        <strong>Options:</strong>
                                        <ul>{question.options?.map((opt, idx) => <li key={idx}>{opt}</li>)}</ul>
                                    </>
                                )}
                                {question.type === "Coding" && (
                                    <>
                                        <strong>Language:</strong> {question.language} <br />
                                    </>
                                )}
                                <div className="action-buttons">
                                    <button onClick={() => editQuestion(question)}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button onClick={() => deleteQuestion(question.id)} className="delete-button">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Submit Exam */}
            <button onClick={handleCreateExam} className="submit-exam">
                Save Exam
            </button>
            
        </div>
    );
};

export default CreateExam;
