import { editor } from "monaco-editor";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

type CodeEditorProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const CodeEditor: React.FC<CodeEditorProps> = function(props) {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const [language, _setLanguage] = useState("cpp");

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
        editorRef.current = editor;
        editor.focus();
    }

    const defaultValue = `#include<iostream>\nusing namespace std;\n\nint main() {\n    cout<< "Hello World!";\n    \n    return 0;\n}\n`;

    useEffect(() => {
        props.setValue(defaultValue);
    }, []);

    return (
        <div>
            <p className="mb-4 italic border-primary border rounded px-4 py-1 opacity-80">Language: C++ - version 10.2.0</p>
            <Editor theme="vs-dark" height="90vh" language={language} defaultValue={defaultValue} value={props.value}
                    onChange={(value) => props.setValue(value || "")} onMount={handleEditorDidMount} />
        </div>
    );
};

export default CodeEditor;