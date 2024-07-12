import { useState, useEffect } from "react";
import Callout from "../../../../components/Callout/Callout.tsx";
import EllipsisLoading from "../../../../components/Loading/EllipsisLoading.tsx";
import { MessageComponent, MessageProfileComponent } from "./Message.style.ts";

const Message = ({
  content,
  className,
  $sender,
  isInputting,
  isLoading,
  timestamp,
  isNew,
  scrollBottom,
  ...props
}: {
  content: string;
  style?: React.CSSProperties;
  className?: string;
  $sender?: string;
  isInputting?: boolean;
  isLoading?: boolean;
  timestamp?: string;
  isNew?: boolean;
  scrollBottom?: () => void;
  [key: string]: any;
}) => {
  const [displayedContent, setDisplayedContent] = useState(
    isNew ? "" : content
  );

  useEffect(() => {
    if (isLoading) {
      setDisplayedContent("...");
      return;
    }

    if (
      isNew &&
      $sender === "partner" &&
      displayedContent.length < content.length
    ) {
      const timer = setTimeout(() => {
        setDisplayedContent(content.slice(0, displayedContent.length + 1));
        if (scrollBottom) scrollBottom();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [content, displayedContent, isLoading, $sender, scrollBottom, isNew]);

  return (
    <MessageComponent className={className} $sender={$sender}>
      <MessageProfileComponent $sender={$sender}>
        <span className="emoji">{$sender === "user" ? "🐹" : "💬"}</span>
        <span className="timestamp">{timestamp}</span>
      </MessageProfileComponent>

      {isInputting || isLoading ? (
        <EllipsisLoading $sender={$sender} />
      ) : (
        <Callout $sender={$sender} {...props}>
          {$sender === "user" ? content : displayedContent}
        </Callout>
      )}
    </MessageComponent>
  );
};

export default Message;
