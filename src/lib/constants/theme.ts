export const theme = {
  colors: {
    paper: "#f8efd9",
    paperSoft: "#fff8e8",
    paperDeep: "#efe2c6",
    ink: "#3f3428",
    inkMuted: "#7c6b51",
    olive: "#75884e",
    oliveSoft: "#e6edcf",
    oliveDeep: "#5f713b",
    line: "rgba(218, 200, 166, 0.42)",
    border: "#ddc9a9",
    stampRed: "#b45c4f",
    lakeBlue: "#66758b",
    moon: "#f7e9b9",
  },
  radius: {
    cardRadius: "18px",
    buttonRadius: "999px",
    pillRadius: "999px",
    paperRadius: "20px",
  },
  shadow: {
    paperShadow: "0 8px 22px rgba(89, 64, 33, 0.1)",
    floatingShadow: "0 16px 34px rgba(86, 62, 33, 0.1)",
    buttonShadow:
      "0 10px 22px rgba(89, 103, 55, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
    navShadow: "0 10px 30px rgba(88, 63, 31, 0.18)",
  },
  spacing: {
    pagePadding: "1.25rem",
    sectionGap: "1.25rem",
    cardPadding: "1rem",
  },
  animation: {
    floatSlow: "float-slow 4.8s ease-in-out infinite",
    fadeUp: "fade-up 420ms ease-out both",
    softPulse: "soft-pulse 2.8s ease-in-out infinite",
  },
} as const;
