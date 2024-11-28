import React, { useEffect, useState } from "react";

const TakeExamPage: React.FC = () => {
    const [fromApp, setFromApp] = useState(false);

    useEffect(() => {
        try {
            (async () => {
                // @ts-ignore
                if (await window.api.getConfirmationFromDesktopApp()) {
                    setFromApp(true);
                }
            })();
        } catch (err) {
            console.log("Error: ", err);
        }
    }, []);

    return (
        <div className="page-container">
            <h1>Take an Exam</h1>
            {!fromApp && (<div>Please <a href="#">download</a> the desktop app to take the exam!</div>)}
            {fromApp && (
                <div>
                    <p>Setup the code editor here for questions that require code input</p>
                </div>
            )}
        </div>
    );
};

export default TakeExamPage;
