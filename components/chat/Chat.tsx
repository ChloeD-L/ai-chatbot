"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User } from "lucide-react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">AI Care Assistant</h2>
        <p className="text-sm text-gray-500">How can I help you today?</p>
      </div>

      <div className="h-[calc(100vh-15rem)] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-gray-800" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
