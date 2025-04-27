import { AppError } from "../middleware/application_errors";
import { InteractRequest, SaveContextRequest } from "../models/models";
import { interactWithAi } from "../repositories/ai_repository";
import {
  createNewChatSession,
  getChatSessionContextById,
} from "../repositories/chat_repository";

export async function createChatSessionService(contextRequest: SaveContextRequest) {
  let result = await createNewChatSession(contextRequest.context);
  if (result == 0) {
    throw new AppError("Error Saving ChatContext");
  }
  return result;
}

export async function interactService(
  interactRequest: InteractRequest
): Promise<string> {
  const chatSessionContext = await getChatSessionContextById(
    interactRequest.chatSessionId!
  );

  if (!chatSessionContext) {
    throw new AppError("Invalid Chat Session");
  }

  return await interactWithAi(chatSessionContext,interactRequest.query);
}
