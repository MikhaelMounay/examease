/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // primary: "#02a6fb",
                // secondary: "#e2725b",
                // tertiary: "#5a6673",
                primary: "#168AAD",
                secondary: "#34A0A4",
                tertiary: "#52B69A",
                quaternary: "#76C893",
                primaryContrast: "#EE6C4D",
                primaryBg: "#e8f0fe",
                textColor: "#111",
                textColorLight: "#f3f4f6",
            },
        },
    },
    plugins: [],
};
