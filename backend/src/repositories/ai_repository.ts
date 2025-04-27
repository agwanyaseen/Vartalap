import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";
import { getChatSessionContextById } from "./chat_repository";
import { OPENAI_API_KEY } from "../config_values";
import { InteractRequest } from "../models/models";
import { AppError } from "../middleware/application_errors";

const openai = new OpenAI({
    apiKey:OPENAI_API_KEY
});

export async function interactWithAi(chatSessionContext:string, interactQuery: string) : Promise<string> {

    const message :ChatCompletionMessageParam[] = [];

    message.push({
        role:"system",
        content: chatSessionContext
    });

    message.push({
        role:"user",
        "content":interactQuery
    })

    const completion : ChatCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        store: true,
        messages: [...message]
    });

    return buildResponse(completion);
}

function buildResponse(chat: ChatCompletion) : string {
    let result : string[] =[]
    
    chat.choices.forEach((choice)=>{
        if(choice?.message?.content){
            result.push(choice.message.content);
        }
    });

    if(!(result.length>0)){
        return "";
    }

    return result.join("");
}