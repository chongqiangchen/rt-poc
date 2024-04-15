import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type SessionActions = {
  setEmail: (email: string) => void;
  setSessionId: (email: string) => void;
  resetSession: () => void;
};

type SessionState = {
  sessionId: string;
  email: string;
};

const initialState: SessionState = {
  sessionId: "",
  email: "",
};

const useSessionStore = create<SessionState & SessionActions>()(
  immer(
    devtools(
      persist(
        (set) => ({
          ...initialState,
          setEmail: (email) => set({ email }),
          setSessionId: (sessionId) => set({ sessionId }),
          resetSession: () => set(initialState),
        }),
        { name: "session" }
      ),
      { name: "session" }
    )
  )
);

export default useSessionStore;
