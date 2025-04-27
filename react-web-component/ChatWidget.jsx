import React, { useEffect, useState } from "react";
import  { Axios }  from "axios";
import ChatLayout from "./components/ChatLayout";

const ChatWidget = ({chatSessionId}) => {
  const [open, setOpen] = useState(false);
  console.log(chatSessionId)
  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {open ? (
        <div style={{ width: "300px", height: "400px", background: "white", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
          
          {chatSessionId!==0?(
          <ChatLayout onclose={() => setOpen(false)} chatSessionId={chatSessionId} />):
            <h3>SomeThing Went Wrong While configuring</h3>
          }

        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{ background: "#007aff", color: "white", borderRadius: "50%", width: "50px", height: "50px", border: "none" }}>
          💬
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
