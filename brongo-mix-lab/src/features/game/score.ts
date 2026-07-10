import { reactions, type ReactionBand } from "@/content/reactions";

export const calculateScore = (matches: boolean[]): number | null =>
  matches.length ? Math.round((matches.filter(Boolean).length / matches.length) * 100) : null;

export const getReaction = (score: number): ReactionBand =>
  [...reactions].reverse().find((reaction) => score >= reaction.min)!;

export { reactions };
