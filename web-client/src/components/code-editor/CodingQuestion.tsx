import { useState } from "react";
import CodeEditor from "./CodeEditor.tsx";
import CodeOutput from "./CodeOutput.tsx";

const CodingQuestion: React.FC = function () {
    const [value, setValue] = useState("");

    return (
        <div className="w-full">
            {/*<p>Setup the code editor here for questions that require code input</p>*/}
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 xl:col-span-1">
                    <CodeEditor value={value} setValue={setValue} />
                </div>
                <div className="col-span-2 xl:col-span-1">
                    <CodeOutput value={value} />
                </div>
            </div>
        </div>
    )
}

export default CodingQuestion;