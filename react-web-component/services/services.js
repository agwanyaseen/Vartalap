import { Axios } from "axios";

const axios = new Axios({
  baseURL:  process.env.REACT_APP_API_ENDPOINT
});

export async function getChatPromt(query,chatSessionId) {
  const interactRequestBody = {
    query: query,
  };

  
  const result = await axios.post(
    `/interact/${chatSessionId}`,
    JSON.stringify(interactRequestBody),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
    
  const response = JSON.parse(result.data);
  return response;
}
