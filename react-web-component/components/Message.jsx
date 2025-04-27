import React from "react";

export function Message({ message }) {
    console.log(message);
const messageDirection = message.role==="system"?"justify-self-end":" ";
  return (
    <>
     <div className={`bg-sky-100  max-wdth-3/4 fit-content-width inline-block break-words mt-2 p-2 rounded ${messageDirection}`}>
        <label>{message.text}</label>
      </div>
    </>
  );
}

export default Message;
