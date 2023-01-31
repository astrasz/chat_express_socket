import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageType {
    avatar: string,
    text: string,
    date: string
    senderId: string
}

interface PartnerType {
    id: string,
    username: string
}

interface CurrentConversationState {
    conversationId: string | null,
    partner: PartnerType | null,
    messages: Array<MessageType | null>
}

const initialCurrentConversationState: CurrentConversationState = {
    conversationId: null,
    partner: null,
    messages: []
}



export const currentConversationSlice = createSlice({
    name: 'currentConversation',
    initialState: initialCurrentConversationState,
    reducers: {
        setCurrentConversation: (state, action: PayloadAction<string>) => {
            state.conversationId = action.payload;
        },
        addMessage: (state, action: PayloadAction<MessageType>) => {
            state.messages.push(action.payload);
        },
        setPartner: (state, action: PayloadAction<PartnerType>) => {
            state.partner = action.payload;
        }
    }
})


export const { setCurrentConversation, addMessage, setPartner } = currentConversationSlice.actions;
export default currentConversationSlice.reducer;