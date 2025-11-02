// Simple local prediction logic
export function predictRisk(complaints, density) {
  const score = 0.5 * (complaints / 100) + 0.5 * density;
  if (score > 0.6) return "High";
  if (score > 0.3) return "Medium";
  return "Low";
}
