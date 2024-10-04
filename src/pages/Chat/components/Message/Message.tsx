import ReactMarkdown from "react-markdown";
import { MessageProps } from "../../../../types/type.ts";
import { MessageComponent, MessageProfileComponent, MessageImageList, MessageImage } from "./Message.style.ts";
import Callout from "../../../../components/Callout.tsx";
import EllipsisLoading from "../../../../components/EllipsisLoading.tsx";

const Message = ({ content, className, role, isInputting, isLoading, timestamp }: MessageProps) => {
  const contentText = content.filter((item) => item.type === "text");
  const contentImages = content.filter((item) => item.type === "image_url");

  return (
    <MessageComponent className={className} role={role}>
      <MessageProfileComponent role={role}>
        <span className="emoji">{role === "user" ? "🐹" : "💬"}</span>
        <span className="timestamp">{timestamp}</span>
      </MessageProfileComponent>

      {isInputting || isLoading ? (
        <EllipsisLoading role={role} />
      ) : (
        <>
          {contentText.map((item, idx) => (
            <Callout key={idx} role={role}>
              {role === "user" ? item.text : <ReactMarkdown>{item.text || ""}</ReactMarkdown>}
            </Callout>
          ))}

          {contentImages.length > 0 && (
            <MessageImageList>
              {contentImages.map((item, key) => (
                <MessageImage key={key} src={item.image_url?.url} alt="image" />
              ))}
            </MessageImageList>
          )}
        </>
      )}
    </MessageComponent>
  );
};

export default Message;
