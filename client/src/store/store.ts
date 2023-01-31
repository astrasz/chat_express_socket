import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import currentConversationReducer from "./slices/currentConversationSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        currentConversation: currentConversationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

