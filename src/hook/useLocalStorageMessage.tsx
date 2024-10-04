import { useCallback, useEffect, useState } from "react";
import { MessageProps } from "../types/type";

export const useLocalStorageMessage = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  // localStorage에 저장된 messages 가져오기
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(
        JSON.parse(savedMessages).map((msg: MessageProps) => ({
          ...msg,
        }))
      );
    }
  }, []);

  // localStorage에 messages 저장
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // messages를 삭제하고 localStorage를 초기화
  const handleReset = useCallback(() => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  }, []);

  return { messages, setMessages, handleReset };
};
