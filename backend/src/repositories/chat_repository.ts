import { supabaseClient } from "./supabase_client";

const TABLE = {
    CHATSESSION:"ChatSession"
}

export async function createNewChatSession(context: string){
    let trasactionId = 0;
    const result = await supabaseClient.from(TABLE.CHATSESSION).insert({
        context: context
    }).select();

    if(!result.error){
        trasactionId = result.data[0].id;
    }
    return trasactionId;
    
}

export async function getChatSessionContextById(chatSessionId: string){
    let contextResult :string | undefined;
    
    const {data,error} = await supabaseClient.from(TABLE.CHATSESSION).select().eq("id",chatSessionId);

    if(data && !error){
        contextResult =  data[0]?.context;
    }

    return contextResult;
    
}