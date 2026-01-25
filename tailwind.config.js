/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./shared/**/*.{js,jsx,ts,tsx}",
  "./widgets/**/*.{js,jsx,ts,tsx}",
];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      // Primary Colors (Sky)
      primary: {
        50: "#F0F9FF",
        100: "#E0F2FE",
        200: "#BAE6FD",
        300: "#7DD3FC",
        400: "#38BDF8",
        500: "#0EA5E9",
        600: "#0284C7",
        700: "#0369A1",
        800: "#075985",
        900: "#0C4A6E",
        DEFAULT: "#0EA5E9",
      },
      // Danger Colors (Red)
      danger: {
        50: "#FEF2F2",
        100: "#FEE2E2",
        200: "#FECACA",
        300: "#FCA5A5",
        400: "#F87171",
        500: "#EF4444",
        600: "#DC2626",
        700: "#B91C1C",
        800: "#991B1B",
        900: "#7F1D1D",
        DEFAULT: "#EF4444",
      },
      // Neutral Colors
      neutral: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
    },
    fontFamily: {
      pretendard: ["PretendardVariable"],
    },
    fontSize: {
      // TDS Typography Scale
      "display-1": ["32px", { lineHeight: "40px", fontWeight: "700" }],
      "display-2": ["28px", { lineHeight: "36px", fontWeight: "700" }],
      "title-1": ["24px", { lineHeight: "32px", fontWeight: "700" }],
      "title-2": ["20px", { lineHeight: "28px", fontWeight: "600" }],
      "title-3": ["18px", { lineHeight: "26px", fontWeight: "600" }],
      "body-1": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      "body-2": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      "caption-1": ["13px", { lineHeight: "18px", fontWeight: "400" }],
      "caption-2": ["12px", { lineHeight: "16px", fontWeight: "400" }],
    },
    borderRadius: {
      none: "0px",
      sm: "4px",
      DEFAULT: "8px",
      md: "12px",
      lg: "16px",
      xl: "20px",
      full: "9999px",
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "12px",
      base: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
      "3xl": "40px",
      "4xl": "48px",
    },
  },
};
export const plugins = [];
