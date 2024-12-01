import { useMutation } from "@tanstack/react-query";

type CodeOutputProps = {
    value: string;
}

const CodeOutput: React.FC<CodeOutputProps> = function(props) {

    const runCodeMutation = useMutation({
        mutationFn: async (code: string) => {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                body: JSON.stringify({
                    language: "cpp",
                    version: "10.2.0",
                    files: [
                        {
                            content: code,
                        },
                    ],
                }),
            });

            const resJson = await response.json();
            const output: string = resJson.run.output;
            return output;
        },
        onSuccess: () => {
        },
        onError: () => {
        },
    });

    function handleRunCodeMutation() {
        runCodeMutation.mutate(props.value);
    }

    return (
        <div>
            <div>
                <button disabled={runCodeMutation.isPending} onClick={handleRunCodeMutation}
                        className="rounded-md px-5 py-2 bg-primary enabled:hover:bg-secondary disabled:opacity-75 disabled:cursor-not-allowed duration-200 text-textColorLight">
                    {runCodeMutation.isPending ? "Running Code" : "Run Code"}
                </button>
            </div>
            <div className="bg-[#1e1e1e] text-textColorLight mt-4 rounded px-6 py-4 text-base">
                {runCodeMutation.data?.split("\n").map((line, i) => <p key={i}>{line}</p>)}
            </div>
        </div>
    );
};

export default CodeOutput;