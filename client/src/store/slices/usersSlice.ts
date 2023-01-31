import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getUsers } from "../../api";


interface UsersState {
    [x: string]: any;
    users: Array<Object | null>
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
        addUser: (state, action: PayloadAction<string>) => {
            if (Array.isArray(state)) state.push(action.payload)
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload.rows
        })
    }
})


export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
