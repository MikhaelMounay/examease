import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Type definitions for clarity
interface Student {
    aucId: string;
    name: string;
    grades: { [examId: number]: string | null };
}

interface Exam {
    id: number;
    name: string;
}

const ViewStudentsInfo: React.FC = () => {
    const { courseId } = useParams(); // Get the courseId from the URL
    const [students, setStudents] = useState<Student[]>([]); // State for students
    const [exams, setExams] = useState<Exam[]>([]); // State for exams
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string>("");

    // Fetch students and exams when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch exams for the course
                const examsResponse = await fetch(`/api/courses/${courseId}/exams`);
                if (!examsResponse.ok) throw new Error("Failed to fetch exams.");
                const examsData = await examsResponse.json();
                setExams(examsData);

                // Fetch students enrolled in the course along with their grades
                const studentsResponse = await fetch(`/api/courses/${courseId}/students`);
                if (!studentsResponse.ok) throw new Error("Failed to fetch students.");
                const studentsData = await studentsResponse.json();
                setStudents(studentsData);

                setLoading(false); // Set loading state to false once data is fetched
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("An error occurred while fetching data.");
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]); // Dependency array ensures fetch is run when courseId changes

    // Function to update grade for a student in a particular exam
    const handleGradeChange = async (aucId: string, examId: number, grade: string) => {
        try {
            const response = await fetch(`/api/courses/${courseId}/students/${aucId}/grades`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    examId,
                    grade,
                }),
            });

            if (!response.ok) throw new Error("Failed to update grade.");

            // If grade update is successful, update the local state
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.aucId === aucId ? { ...student, grades: { ...student.grades, [examId]: grade } } : student
                )
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("An error occurred while updating the grade.");
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading message while data is being fetched
    }

    if (error) {
        return <div>{error}</div>; // Display error message if there is an issue with the fetch
    }

    return (
        <div className="view-student-info-container">
            <h2>Students Enrolled in Course {courseId}</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>AUC ID</th>
                            <th>Name</th>
                            {exams.map((exam) => (
                                <th key={exam.id}>{exam.name}</th> // Dynamically generate exam columns
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.aucId}>
                                <td>{student.aucId}</td>
                                <td>{student.name}</td>
                                {exams.map((exam) => (
                                    <td key={exam.id}>
                                        {student.grades[exam.id] === null ? (
                                            <input
                                                type="text"
                                                value=""
                                                placeholder="Grade"
                                                onChange={(e) => handleGradeChange(student.aucId, exam.id, e.target.value)}
                                            />
                                        ) : (
                                            student.grades[exam.id]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewStudentsInfo;

// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// // Mock Data for Testing
// const mockExams = [
//   { id: 1, name: 'Midterm 1' },
//   { id: 2, name: 'Final Exam' }
// ];

// const mockStudents = [
//   { aucId: '123456789', name: 'John Doe', grades: { 1: null, 2: null } },
//   { aucId: '234567890', name: 'Jane Smith', grades: { 1: null, 2: null } },
//   { aucId: '345678901', name: 'Mohamed Ali', grades: { 1: null, 2: null } },
//   { aucId: '456789012', name: 'Sara Ahmed', grades: { 1: null, 2: null } },
//   { aucId: '567890123', name: 'Laila Hassan', grades: { 1: null, 2: null } }
// ];

// const ViewStudentsInfo: React.FC = () => {
//   const { courseId } = useParams();  // Get the courseId from the URL
//   const [students, setStudents] = useState(mockStudents);  // State for students
//   const [exams, setExams] = useState(mockExams);  // State for exams

//   // Function to update grade for a student
//   const handleGradeChange = (aucId: string, examId: number, grade: string) => {
//     setStudents(prevStudents =>
//       prevStudents.map(student =>
//         student.aucId === aucId
//           ? { ...student, grades: { ...student.grades, [examId]: grade } }
//           : student
//       )
//     );
//   };

//   return (
//     <div className="view-student-info-container">
//       <h2>Students Enrolled in Course {courseId}</h2>
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>AUC ID</th>
//               <th>Name</th>
//               {exams.map(exam => (
//                 <th key={exam.id}>{exam.name}</th>  // Dynamically generate exam columns
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {students.map(student => (
//               <tr key={student.aucId}>
//                 <td>{student.aucId}</td>
//                 <td>{student.name}</td>
//                 {exams.map(exam => (
//                   <td key={exam.id}>
//                     {student.grades[exam.id] === null ? (
//                       <input
//                         type="text"
//                         value=""
//                         placeholder="Grade"
//                         onChange={(e) => handleGradeChange(student.aucId, exam.id, e.target.value)}
//                       />
//                     ) : (
//                       student.grades[exam.id]
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button onClick={() => setExams([...exams, { id: exams.length + 1, name: `Midterm ${exams.length + 1}` }])}>
//         Add New Exam (Test)
//       </button>
//     </div>
//   );
// };

// export default ViewStudentsInfo;
