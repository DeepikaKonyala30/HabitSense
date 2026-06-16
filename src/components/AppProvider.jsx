// AppProvider.jsx
// NOTE: AuthProvider and SocketProvider are already wired at the root in main.jsx.
// This file is kept as a safe no-op wrapper in case it gets imported elsewhere.
// Do NOT import HabitsProvider from useHabits — it does not exist (useHabits is a hook, not a provider).

function AppProvider({ children }) {
  return children;
}

export default AppProvider;
