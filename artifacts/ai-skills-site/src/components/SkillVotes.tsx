// Votes require a backend API — disabled on static hosts like GitHub Pages.
// Controlled by VITE_DISABLE_VOTES env var.

const VOTES_DISABLED = import.meta.env.VITE_DISABLE_VOTES === "1";

export function SkillVotes() {
  if (VOTES_DISABLED) return null;
  return null;
}
