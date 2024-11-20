import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ManageStudentsView: React.FC = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const queryClient = useQueryClient();

    const getStudentsQuery = useQuery({
        queryKey: ["coursestudents"],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + `/courses/coursestudents/${courseId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("user_token")}`,
                },
            });

            return response.json();
        },
    });

    // Methods
    async function removeStudentFromCourse(studentId: number) {
        const response = await fetch(import.meta.env.VITE_API_URL + `/courses/remove`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`,
            },
            body: JSON.stringify({ studentId: studentId, courseId: courseId }),
        });

        if (response.ok) {
            queryClient.invalidateQueries({ queryKey: ["coursestudents"] });
        }
    }

    return (
        <div className="manage-students-container">
            <h1>Manage Enrolled Students</h1>
            <p>Control student enrollment and access their information.</p>

            <div className="actions-grid mb-6">
                <div></div>
                <div></div>
                <button className="action-card" onClick={() => navigate(`/${courseId}/add-student`)}>
                    <span className="card-title">Add Student</span>
                </button>

                {/*<button className="action-card" onClick={() => navigate("/remove-student")}>*/}
                {/*    <span className="card-title">Remove Student</span>*/}
                {/*</button>*/}

                {/*<button className="action-card" onClick={() => navigate("/view-students-info")}>*/}
                {/*    <span className="card-title">View Student Info</span>*/}
                {/*</button>*/}
            </div>

            {!getStudentsQuery.isLoading && (
                <div className="w-full">
                    <DataTable value={getStudentsQuery.data} style={{ width: "100%" }}>
                        <Column field="studentAucId" header="Student Id" />
                        <Column field="studentName" header="Student Name" />
                        <Column field="classStanding" header="Class Standing" />
                        <Column header="Actions" body={(student) => (
                            <button onClick={() => removeStudentFromCourse(student.studentId)}><FontAwesomeIcon
                                icon={faTrash} /></button>
                        )}>
                        </Column>
                    </DataTable>
                </div>
            )}
        </div>
    );
};

export default ManageStudentsView;
