import {create} from "zustand"

const useConversaton = create((set)=>({

    selectedConversation:null,

    setSelectedConversation: (selectedConversation)=>set({selectedConversation}),

messages:[],

setMessages:(messages)=>set({messages}),



}))

export default useConversaton