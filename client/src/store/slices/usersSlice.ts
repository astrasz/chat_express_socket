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
            const user = state.find((user: UserType) => user._id === action.payload);
            user.unread += 1;
        },
        clearUnread: (state, action: PayloadAction<string>) => {
            const user = state.find((user: UserType) => user.conversationId === action.payload);
            user.unread = 0;
        },
        updatePartner: (state, action: PayloadAction<any>) => {
            const { partnerId, conversationId } = action.payload;
            const user = state.find((user: UserType) => user._id === partnerId);
            user.conversationId = conversationId;
        },
        updateLastMessage: (state, action: PayloadAction<any>) => {
            const { senderId, conversationId, lastMessage, lastMessageDate, participant } = action.payload;
            let user = state.find((user: UserType) => user.conversationId === conversationId);
            if (participant === 'partner') {
                user = state.find((user: UserType) => user._id === senderId);
            }
            user.lastMessage = lastMessage;
            user.lastMessageDate = lastMessageDate;


        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload.rows
        })
    }
})


export const { addUser, increaseUnread, clearUnread, updatePartner, updateLastMessage } = usersSlice.actions;
export default usersSlice.reducer;
