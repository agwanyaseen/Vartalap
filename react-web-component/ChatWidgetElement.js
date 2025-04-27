import "./chat-widget-styles.css";

import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import createRoot from react-dom/client
import ChatWidget from "./ChatWidget"; // Your main widget component
class ChatWidgetElement extends HTMLElement {
  constructor() {
    super();
    this.root = null;
    this.chatContext = null;
    this.ChatSessionId = this.getAttribute("chatsessionid");
  }

  async createChatSession(context) {
    const result = await createChatSession(context);
    if (result.data != 0) {
      this.chatSessionId = result.data;
      // console.log(this.chatSessionId);
    }
  }

  connectedCallback() {
    if (!this.root) {
      this.root = ReactDOM.createRoot(this);
      this.root.render(<ChatWidget chatSessionId={this.ChatSessionId} />);
    }
  }
  static get observedAttributes() {
    return ["chatsessionid"]; // ✅ React to attribute changes
  }

  attributeChangedCallback(name, oldValue, newValue){
    if(name==="chatsessionid"){
      this.ChatSessionId = newValue;  
      if (this.root) {
        this.root.render(<ChatWidget chatSessionId={this.ChatSessionId} />);
      }
    }
  }


  disconnectedCallback() {
    if (this.root) {
      this.root.unmount(); // ✅ Properly clean up the component
    }
  }
}

// Define the Web Component
customElements.define("chat-widget", ChatWidgetElement);
