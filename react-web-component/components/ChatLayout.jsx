// import { Navbar } from "react-daisyui";
import React, { useEffect, useState } from "react";
import { getChatPromt } from "../services/services";
import Message from "../components/Message";




function ChatLayout({ onclose,chatSessionId }) {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="flex flex-col h-full sticky top-0">
      <div className="bg-blue-500 text-white p-4 flex flex-row border">
        <div className="flex-1"><span>Vartalap</span></div>
        
        <div className="">
          <button type="button" onClick={onclose}>Close</button>
        </div>
      </div>
      <div className="messages flex-grow overflow-y-auto p-2">
        <div className="grid grid-col w-full">
        {messages.length>0 ?
            messages.map((message,index) => 
            (
             
              <Message message={message} key={index}/>
              
            )):<span>Start Chatting....!!!</span> }
        </div>
      </div>

      <div className="sticky bottom-0 p-2 flex">
      <div className="flex-1">
      <input
        type="text"
        placeholder="Enter your query."
        className="border-none focus:border-teal" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      </div>
      <div className="">
      <button 
        type="button" 
        onClick={OnSubmit}  
        className="btn btn-primary" 
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Chat'}
      </button>
      </div>
      </div>
    </div>
  );

  async function OnSubmit() {
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: name }
    ]);
    
    try {
      const result = await getChatPromt(name,chatSessionId);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", text: result.data }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }
}

export default ChatLayout;
