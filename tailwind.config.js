/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      primary: "#4F46E5",
      secondary: "#00FF00",
      tertiary: "#0000FF",
    },
    fontFamily: {
      pretendard: ["PretendardVariable"],
    },
  },
};
export const plugins = [];
