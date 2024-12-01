import React, { useState, useEffect } from "react";
import CodingQuestion from "../../../components/code-editor/CodingQuestion.tsx";

interface Question {
    id: number;
    title: string;
    description: string;
    starterCode: string;
}

const TakeExamPage: React.FC = () => {
    const [fromApp, setFromApp] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questions: Question[] = [
        {
            id: 1,
            title: "Reverse a String",
            description: "Write a function that takes a string as input and returns the string reversed.",
            starterCode: `
#include <iostream>
#include <string>
using namespace std;

string reverseString(string str) {
    // Write your code here
    return str;
}

int main() {
    string input = "SoftwareEngineering";
    cout << "Reversed string: " << reverseString(input) << endl;
    return 0;
}
            `,
        },
        {
            id: 2,
            title: "Sum of Two Numbers",
            description: "Write a function that takes two numbers as input and returns their sum.",
            starterCode: `
#include <iostream>
using namespace std;

int sum(int a, int b) {
    // Write your code here
    return a + b;
}

int main() {
    int num1 =10, num2 =50;
    cout << "Sum: " << sum(num1, num2) << endl;
    return 0;
}
            `,
        },
        {
            id: 3,
            title: "Check Prime",
            description: "Write a function to check if a given number is a prime number.",
            starterCode: `
#include <iostream>
using namespace std;

bool isPrime(int num) {
    // Write your code here
    return true;
}

int main() {
    int number = 20;

    if (isPrime(number)) {
        cout << number << " is a prime number." << endl;
    } else {
        cout << number << " is not a prime number." << endl;
    }
    return 0;
}
            `,
        },
        {
            id: 4,
            title: "Find the Largest Number",
            description: "Write a function that takes an array of numbers and returns the largest number.",
            starterCode: `
#include <iostream>
#include <vector>
using namespace std;

int findLargest(vector<int> arr) {
    // Write your code here
    return 0;
}

int main() {
    vector<int> nums = {10, 20, 5, 30, 25};
    cout << "The largest number is: " << findLargest(nums) << endl;
    return 0;
}
            `,
        },
        {
            id: 5,
            title: "Factorial of a Number",
            description: "Write a function to calculate the factorial of a given number.",
            starterCode: `
#include <iostream>
using namespace std;

int factorial(int n) {
    // Write your code here
    return 1;
}

int main() {
    int number = 5;
    
    cout << "Factorial of " << number << " is: " << factorial(number) << endl;
    return 0;
}
            `,
        },
    ];

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

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div className="page-container">
            <h1>Take an Exam</h1>
            {!fromApp && (
                <div>
                    Please <a href="#">download</a> the desktop app to take the exam!
                </div>
            )}
            {fromApp && (
                <div className="w-full">
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    <div className="question-container">
                        <h3>{questions[currentQuestionIndex].title}</h3>
                        <p>{questions[currentQuestionIndex].description}</p>
                        <CodingQuestion starterCode={questions[currentQuestionIndex].starterCode} />
                    </div>
                    <div className="mt-4 flex w-full justify-between">
                        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="action-button1">
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className="action-button1"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TakeExamPage;
