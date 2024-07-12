import Message from "./components/Message/Message.tsx";
import MessageInput from "./components/MessageInput/MessageInput.tsx";
import {
  HomepageComponent,
  HomepageHeader,
  HomepageMessage,
  HomepageInput,
} from "./Homepage.style.ts";
import { chatResponse } from "../../utils/api.ts";
import { useCallback, useEffect, useRef, useState } from "react";

interface MessageProps {
  sender: "user" | "partner";
  content: string;
  timestamp: string;
  isNew: boolean;
}
const Homepage: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isInputting, setInputting] = useState<boolean>(false);
  const [inputtingTimer, setInputtingTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const messageEndRef = useRef<HTMLDivElement>(null);

  // 대화창 하단으로 이동하는 함수
  const scrollBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 대화창 하단으로 이동
  useEffect(() => {
    scrollBottom();
  }, [messages, input]);

  // localStorage에 저장된 messages 가져오기
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(
        JSON.parse(savedMessages).map((msg: MessageProps) => ({
          ...msg,
          isNew: false,
        }))
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
    [inputtingTimer]
  );

  // messages를 삭제하고 localStorage를 초기화
  const handleReset = useCallback(() => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  }, []);

  // setMessages에 message를 추가하는 함수
  const makeSetMessage = (sender: "user" | "partner", content: string) => {
    const newMessage: MessageProps = {
      sender,
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isNew: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

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
        makeSetMessage("user", filterInput);
        setLoading(true);
      }

      try {
        const response = await chatResponse(filterInput);
        makeSetMessage("partner", response);
      } catch (error) {
        console.log("send message error", error);
        makeSetMessage(
          "partner",
          "죄송합니다. 응답을 생성하는 데 문제가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    },
    [isLoading]
  );

  return (
    <HomepageComponent>
      <HomepageHeader>
        <h1>🎨 ChatGPT for design system 🖌</h1>
        <button onClick={handleReset} className="reset">
          초기화
        </button>
      </HomepageHeader>
      <HomepageMessage>
        {messages.map((message, idx) => (
          <Message
            key={idx}
            $sender={message.sender}
            content={message.content}
            timestamp={message.timestamp}
            isNew={message.isNew}
            scrollBottom={scrollBottom}
          />
        ))}
        {isInputting && (
          <Message
            $sender="user"
            isInputting={isInputting}
            content={"입력중"}
          />
        )}
        {isLoading && (
          <Message $sender="partner" isLoading={isLoading} content={"로딩중"} />
        )}
        <div ref={messageEndRef} />
      </HomepageMessage>
      <HomepageInput>
        <MessageInput
          placeholder={"메세지를 입력하세요"}
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
          onClick={() => handleSendMessage(input)}
          disabled={isLoading}
          buttonMessage={isLoading ? "전송중..." : "보내기"}
        />
      </HomepageInput>
    </HomepageComponent>
  );
};

export default Homepage;
