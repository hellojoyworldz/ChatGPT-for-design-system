import { useCallback, useEffect, useRef, useState } from "react";
import { chatResponse } from "../../utils/api.ts";
import { ChatProps, ContentProps, MessageProps } from "../../types/type.ts";
import {
  ChatComponent,
  ChatHeader,
  ChatBody,
  ChatMessage,
  ChatInputField,
  MessageInput,
  MessageInputButton,
  ImageBox,
  ImageDragZone,
  ImageList,
  ImageListItem,
} from "./Chat.style.ts";
import Message from "./components/Message/Message.tsx";
import InputText from "../../components/InputText.tsx";
import Button from "../../components/Button.tsx";
import { useImageUpload } from "../../hook/useImageUpload.tsx";
import { useLocalStorageMessage } from "../../hook/useLocalStorageMessage.tsx";

const Chat = ({ as, className }: ChatProps) => {
  const {
    MAX_IMAGES,
    MAX_SIZE,
    images,
    setImages,
    isDragging,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    handleFileChange,
    removeImage,
  } = useImageUpload();
  const { messages, setMessages, handleReset } = useLocalStorageMessage();

  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isInputting, setInputting] = useState<boolean>(false);
  const [isStreaming, setStreaming] = useState<boolean>(false);
  const [inputtingTimer, setInputtingTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  // 대화창 하단으로 이동하는 함수
  const scrollBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 대화창 하단으로 이동
  useEffect(() => {
    scrollBottom();
  }, [messages, streamingMessage, input]);

  // 이미지를 base64로 변환하는 함수
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

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

  // setMessages에 message를 추가하는 함수
  const makeSetMessage = useCallback(
    (role: MessageProps["role"], content: ContentProps[]) => {
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
    [setMessages]
  );

  // 입력한 메세지를 전송하고 응답을 받아 messages에 추가
  const handleSendMessage = useCallback(
    async (input: string) => {
      const filterInput = input.trim();

      if (!filterInput && images.length === 0) {
        return;
      }
      setInput("");
      setInputting(false);
      setImages([]);

      const messageContent: ContentProps[] = [];

      if (images.length > 0) {
        const imageContents: ContentProps[] = await Promise.all(
          images.map(async (img) => {
            const base64 = await convertToBase64(img.file);
            return {
              type: "image_url",
              image_url: { url: base64 },
            };
          })
        );
        messageContent.push(...imageContents);
      }
      if (filterInput) {
        messageContent.push({ type: "text", text: filterInput });
      }

      if (messageContent && !isLoading) {
        const newUserMessage = makeSetMessage("user", messageContent);
        setLoading(true);

        try {
          setStreamingMessage("");
          const response: ContentProps[] = await chatResponse(
            [...messages, newUserMessage],
            setStreamingMessage,
            setStreaming,
            setLoading
          );

          makeSetMessage("assistant", response);
        } catch (error) {
          console.log("send message error", error);
          makeSetMessage("assistant", [
            {
              type: "text",
              text: "죄송합니다. 응답을 생성하는 데 문제가 발생했습니다.",
            },
          ]);
        } finally {
          setLoading(false);
        }
      }
    },
    [isLoading, messages, makeSetMessage, images, setImages]
  );

  return (
    <ChatComponent
      as={as}
      className={className}
      ref={componentRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragEnd}
      onDrop={handleDrop}>
      <ChatHeader>
        <div className="in">
          <h1>🎨 ChatGPT for design system 🖌</h1>
          <p>✨디자인 시스템에 대한 모든 것을 알려주는 AI 챗봇입니다. ✨</p>
          <p>✨우측 하단 배너를 클릭하여 API 키를 입력해주세요! ✨</p>
          <button onClick={handleReset} className="reset">
            초기화
          </button>
        </div>
      </ChatHeader>
      <ChatBody>
        <ChatMessage>
          {messages.map((message, idx) => (
            <Message
              key={idx}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          {isStreaming && (
            <Message
              role="assistant"
              content={[{ type: "text", text: streamingMessage }]}
            />
          )}
          {isLoading && (
            <Message
              role="assistant"
              isLoading={isLoading}
              content={[{ type: "text", text: "로딩중" }]}
            />
          )}
          {isInputting && (
            <Message
              role="user"
              isInputting={isInputting}
              content={[{ type: "text", text: "입력중" }]}
            />
          )}

          <div ref={messageEndRef} />
        </ChatMessage>

        <ChatInputField>
          {!isDragging && images.length > 0 ? (
            <ImageBox>
              <ImageList>
                {images.map((image, idx) => (
                  <ImageListItem key={idx}>
                    <img src={image.preview} alt="" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="close">
                      ❌<span className="readonly">삭제</span>
                    </button>
                  </ImageListItem>
                ))}
              </ImageList>
            </ImageBox>
          ) : null}
          {isDragging ? (
            <ImageBox>
              <ImageDragZone>
                <strong className="title">
                  🏞️ 이미지를 가져다 놓으세요 🏞️
                </strong>
                <p className="text">
                  형식: 이미지 / 용량: {MAX_SIZE}mb 까지 / 개수: {MAX_IMAGES}개
                </p>
              </ImageDragZone>
            </ImageBox>
          ) : null}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            hidden
          />
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
            <MessageInputButton>
              {!(images.length >= MAX_IMAGES) ? (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}>
                  📎<span className="readonly">이미지첨부</span>
                </Button>
              ) : null}
              <Button
                onClick={() => handleSendMessage(input)}
                disabled={isLoading}>
                보내기
              </Button>
            </MessageInputButton>
          </MessageInput>
        </ChatInputField>
      </ChatBody>
    </ChatComponent>
  );
};

export default Chat;
