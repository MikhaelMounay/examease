/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/renderer/**/*.{js,ts,jsx,tsx}"],
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
                primaryBg: "#f0f4fc",
                textColor: "#111",
                textColorLight: "#f3f4f6",
            },
        },
    },
    plugins: [],
};
