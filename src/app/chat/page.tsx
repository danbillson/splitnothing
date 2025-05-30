"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
} from "@/components/ui/kibo-ui/ai/input";
import {
  AIMessage,
  AIMessageContent,
} from "@/components/ui/kibo-ui/ai/message";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { defaultChatStore } from "ai";
import { LightbulbIcon, SendIcon } from "lucide-react";

const chatStore = defaultChatStore({
  api: "/api/chat",
});

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    chatStore,
  });

  return (
    <div className="max-w-3xl mx-auto p-8 h-screen border-x-px relative">
      <div>
        {messages.map((message, index) => (
          <DropdownMenu key={message.id}>
            <AIMessage from={message.role === "user" ? "user" : "assistant"}>
              <DropdownMenuTrigger asChild>
                <AIMessageContent className={cn(index > 0 && "cursor-pointer")}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <div key={`${message.id}-${i}`}>{part.text}</div>
                        );
                    }
                  })}
                </AIMessageContent>
              </DropdownMenuTrigger>
            </AIMessage>

            {message.role === "user" && index > 0 && (
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LightbulbIcon size={16} /> Show feedback
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        ))}
      </div>

      <AIInput
        onSubmit={handleSubmit}
        className="fixed bottom-10 w-full md:max-w-3xl"
      >
        <AIInputTextarea
          value={input}
          onChange={handleInputChange}
          placeholder={
            messages.length === 0
              ? "What scenario would you like to practice?"
              : "What is your response?"
          }
        />
        <AIInputToolbar>
          <AIInputSubmit className="ml-auto">
            <SendIcon size={16} />
          </AIInputSubmit>
        </AIInputToolbar>
      </AIInput>
    </div>
  );
}
