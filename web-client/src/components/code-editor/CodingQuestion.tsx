import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor.tsx";
import CodeOutput from "./CodeOutput.tsx";
type CodingQuestionprops = {starterCode: string}

const CodingQuestion: React.FC <CodingQuestionprops> = function (props) {
    const [value, setValue] = useState("");
    useEffect(()=>{
        setValue(props.starterCode)
    }, [props.starterCode])

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