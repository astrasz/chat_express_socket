import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageType {
    avatar: string,
    text: string,
    date: string
    senderId: string
}

export interface MessagesType {
    messages: Array<MessageType | null>
}

interface PartnerType {
    id: string | null,
    username: string | null,
    avatar: string | null
}

interface CurrentConversationState {
    conversationId: string | null,
    partner: PartnerType,
    messages: Array<MessageType | null>
}

const initialCurrentConversationState: CurrentConversationState = {
    conversationId: null,
    partner: { id: null, username: null, avatar: null },
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
        setMessages: (state, action: PayloadAction<Array<MessageType>>) => {
            state.messages = action.payload
        },
        setPartner: (state, action: PayloadAction<PartnerType>) => {
            state.partner.id = action.payload.id;
            state.partner.username = action.payload.username;
            state.partner.avatar = action.payload.avatar;
        }
    }
})


export const { setCurrentConversation, addMessage, setPartner, setMessages } = currentConversationSlice.actions;
export default currentConversationSlice.reducer;