import { useCallback, useEffect, useRef, useState } from "react";
import { chatResponse } from "../../utils/api.ts";
import { MessageProps } from "../../types/type.ts";
import {
  ChatComponent,
  ChatHeader,
  ChatMessage,
  ChatInput,
  MessageInput,
} from "./Chat.style.ts";
import Message from "./components/Message/Message.tsx";
import InputText from "../../components/InputText.tsx";

const Chat = ({ as }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isInputting, setInputting] = useState<boolean>(false);
  const [isStreaming, setStreaming] = useState<boolean>(false);
  const [inputtingTimer, setInputtingTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const messageEndRef = useRef<HTMLDivElement>(null);

  // 대화창 하단으로 이동하는 함수
  const scrollBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 대화창 하단으로 이동
  useEffect(() => {
    scrollBottom();
  }, [messages, streamingMessage, input]);

  // localStorage에 저장된 messages 가져오기
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(
        JSON.parse(savedMessages).map((msg: MessageProps) => ({
          ...msg,
        })),
      );
    }
  }, []);

  // localStorage에 messages 저장
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // 메세지를 입력할 때
  const handleInputChange = useCallback(
    (input: string) => {
      setInput(input);
      setInputting(true);
      if (inputtingTimer) clearTimeout(inputtingTimer);
      setInputtingTimer(setTimeout(() => setInputting(false), 500));
    },
    [inputtingTimer],
  );

  // messages를 삭제하고 localStorage를 초기화
  const handleReset = useCallback(() => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  }, []);

  // setMessages에 message를 추가하는 함수
  const makeSetMessage = useCallback(
    (role: "user" | "assistant", content: string) => {
      const newMessage: MessageProps = {
        role,
        content,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    },
    [],
  );

  // 입력한 메세지를 전송하고 응답을 받아 messages에 추가
  const handleSendMessage = useCallback(
    async (input: string) => {
      const filterInput = input.trim();

      if (!filterInput) {
        alert("메세지를 입력해주세요.");
        setInput("");
        return;
      }
      setInput("");
      setInputting(false);

      if (filterInput && !isLoading) {
        const newUserMessage = makeSetMessage("user", filterInput);
        setLoading(true);

        try {
          setStreamingMessage("");
          const response = await chatResponse(
            [...messages, newUserMessage],
            setStreamingMessage,
            setStreaming,
            setLoading,
            isLoading,
          );

          makeSetMessage("assistant", response);
        } catch (error) {
          console.log("send message error", error);
          makeSetMessage(
            "assistant",
            "죄송합니다. 응답을 생성하는 데 문제가 발생했습니다.",
          );
        } finally {
          setLoading(false);
        }
      }
    },
    [isLoading, messages, makeSetMessage],
  );

  return (
    <ChatComponent as={as}>
      <ChatHeader>
        <div className="in">
          <h1>🎨 ChatGPT for design system 🖌</h1>
          <button onClick={handleReset} className="reset">
            초기화
          </button>
        </div>
      </ChatHeader>
      <section>
        <ChatMessage>
          {messages.map((message, idx) => (
            <Message
              key={idx}
              $role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          {isStreaming && (
            <Message $role="assistant" content={streamingMessage} />
          )}
          {isLoading && (
            <Message
              $role="assistant"
              isLoading={isLoading}
              content={"로딩중"}
            />
          )}
          {isInputting && (
            <Message
              $role="user"
              isInputting={isInputting}
              content={"입력중"}
            />
          )}

          <div ref={messageEndRef} />
        </ChatMessage>
        <ChatInput>
          <MessageInput>
            <InputText
              placeholder={"메세지를 입력하세요"}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.ctrlKey &&
                  !e.shiftKey &&
                  !e.altKey
                ) {
                  if (e.keyCode === 229) return;
                  e.preventDefault();
                  handleSendMessage(input);
                }
              }}
            />
            <button
              onClick={() => handleSendMessage(input)}
              className="send"
              disabled={isLoading}
            >
              보내기
              {/*{isLoading ? "전송중..." : "보내기"}*/}
            </button>
          </MessageInput>
        </ChatInput>
      </section>
    </ChatComponent>
  );
};

export default Chat;
