import express, { NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";

dotenv.config();

import { SaveContextRequest, InteractRequest } from "./models/models";
import { errorHandler } from "./middleware/application_errors";
import {
  createChatSessionService,
  interactService,
} from "./service/chat_service";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/context", async (req, res, next) => {
  try {
    let result = await createChatSessionService(req.body as SaveContextRequest);

    res.send({
      data: result,
      error: null,
    });
  } catch (err) {
    next(err);
  }
});

app.post(
  "/interact/:chatSessionId",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const request = req.body as InteractRequest;

      request.chatSessionId = req.params.chatSessionId;

      const result = await interactService(request);

      res.send({
        data: result,
        error: null,
      });
    } catch (err) {
      
      next(err);
    }
  }
);

app.get("/ping", (req, res) => {
  res.send("Hi, I am from server");
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "lambda") {
  app.listen(3000, () => console.log("Server running on port 3000"));
}
export const handler = serverless(app);
