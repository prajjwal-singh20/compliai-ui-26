export function calculateComplianceScore(data) {
  if (!data) return { score: 0, label: "No data" };

  const totalPossibleRegistrations = 9;
  const regCount = Array.isArray(data.registrations)
    ? data.registrations.length
    : 0;
  const riskCount = Array.isArray(data.riskAlerts)
    ? data.riskAlerts.length
    : 0;

  let score = 40;

  const regFactor = Math.min(regCount / totalPossibleRegistrations, 1);
  score += Math.round(regFactor * 40);

  const names = (data.registrations || []).map((r) => r.name);
  if (names.includes("Startup India Recognition")) score += 5;
  if (names.includes("Trademark Registration")) score += 5;

  const riskPenalty = Math.min(riskCount * 2, 20);
  score -= riskPenalty;

  score = Math.max(0, Math.min(100, score));

  let label = "Getting Started";
  if (score >= 80) label = "Strongly Compliant";
  else if (score >= 60) label = "On Track";
  else if (score >= 40) label = "Work in Progress";
  else label = "High Risk";

  return { score, label };
}

