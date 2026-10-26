import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface DemoUser { id: string; name: string; age: number; email: string; passwordHash: string; joinedAt: string; }
interface AuthState { users: DemoUser[]; activeUserId: string | null; status: 'guest' | 'authenticated'; }
const initialState: AuthState = { users: [], activeUserId: null, status: 'guest' };
const authSlice = createSlice({
  name: 'auth', initialState,
  reducers: {
    registerUser(state, action: PayloadAction<DemoUser>) { state.users.push(action.payload); state.activeUserId = action.payload.id; state.status = 'authenticated'; },
    loginUser(state, action: PayloadAction<string>) { state.activeUserId = action.payload; state.status = 'authenticated'; },
    logoutUser(state) { state.activeUserId = null; state.status = 'guest'; },
    changeDisplayName(state, action: PayloadAction<{ id: string; name: string }>) { const user = state.users.find(u => u.id === action.payload.id); if (user) user.name = action.payload.name; }
  }
});
export const { registerUser, loginUser, logoutUser, changeDisplayName } = authSlice.actions;
export default authSlice.reducer;

// მხოლოდ სასწავლო დემო: პაროლები არ იგზავნება სერვერზე. რეალურ პროექტს სჭირდება backend ავტორიზაცია.
export async function hashDemoPassword(password: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, '0')).join('');
}
