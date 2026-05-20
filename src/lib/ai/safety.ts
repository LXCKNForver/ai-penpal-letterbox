export type SafetyResult = {
  safe: boolean;
  riskLevel: "low" | "medium" | "high";
  riskType: "normal" | "self_harm" | "medical" | "violence" | "unknown";
};

export function checkLetterSafety(content: string): SafetyResult {
  void content;

  return {
    safe: true,
    riskLevel: "low",
    riskType: "normal",
  };
}

export function checkReplySafety(content: string): SafetyResult {
  void content;

  return {
    safe: true,
    riskLevel: "low",
    riskType: "normal",
  };
}
