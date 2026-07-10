export type GameState = { selectedIds: string[]; hasMixed: boolean };
export type GameAction = { type:"toggle"; id:string } | { type:"selectFunctional"; id:string } | { type:"markMixed" } | { type:"hydrate"; state:GameState } | { type:"reset" };
export const initialGameState: GameState = { selectedIds: [], hasMixed: false };
export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === "reset") return initialGameState;
  if (action.type === "hydrate") return action.state;
  if (action.type === "markMixed") return { ...state, hasMixed: true };
  if (action.type === "selectFunctional") return { ...state, hasMixed:false, selectedIds:[...state.selectedIds.filter(id => !id.startsWith("functional-")), action.id] };
  const exists = state.selectedIds.includes(action.id);
  return { ...state, hasMixed:false, selectedIds: exists ? state.selectedIds.filter(id => id !== action.id) : [...state.selectedIds, action.id] };
}
