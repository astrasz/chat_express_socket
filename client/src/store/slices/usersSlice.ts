import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { getUsers } from "../../api";
import { UserType } from "../../components/chat/sidebar/UsersList";


export interface UsersState {
    [x: string]: any;
    users: UserType[]
}

const initialUsersState: UsersState = {
    users: []
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (token: string, thunkApi) => {
        const response = await getUsers(token);

        if (!response.ok) {
            return thunkApi.rejectWithValue(await response.json());
        }

        return await response.json();
    }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers: {
        addUser: (state, action: PayloadAction<UserType>) => {
            state.push(action.payload)
        },
        increaseUnread: (state, action: PayloadAction<string>) => {
            const usersArr = state.filter((user: UserType) => user.conversationId === action.payload);
            usersArr[0].unread += 1;
        },
        clearUnread: (state, action: PayloadAction<string>) => {
            const usersArr = state.filter((user: UserType) => user.conversationId === action.payload);
            usersArr[0].unread = 0;
        },
        updateLastMessage: (state, action: PayloadAction<any>) => {
            const { conversationId, lastMessage, lastMessageDate } = action.payload;
            const usersArr = state.filter((user: UserType) => user.conversationId === conversationId);
            usersArr[0].lastMessage = lastMessage;
            usersArr[0].lastMessageDate = lastMessageDate;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload.rows
        })
    }
})


export const { addUser, increaseUnread, clearUnread, updateLastMessage } = usersSlice.actions;
export default usersSlice.reducer;
