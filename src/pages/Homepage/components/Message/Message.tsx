import { HTMLAttributes } from "react";
import { MessageComponent, MessageProfileComponent } from "./Message.style.ts";
import Callout from "../../../../components/Callout.tsx";
import EllipsisLoading from "../../../../components/EllipsisLoading.tsx";

interface MessageProps extends HTMLAttributes<HTMLElement> {
  content: string;
  $role?: string;
  isInputting?: boolean;
  isLoading?: boolean;
  timestamp?: string;
}

const Message = ({
  content,
  className,
  $role,
  isInputting,
  isLoading,
  timestamp,
}: MessageProps) => {
  return (
    <MessageComponent className={className} $role={$role}>
      <MessageProfileComponent $role={$role}>
        <span className="emoji">{$role === "user" ? "🐹" : "💬"}</span>
        <span className="timestamp">{timestamp}</span>
      </MessageProfileComponent>

      {isInputting || isLoading ? (
        <EllipsisLoading $role={$role} />
      ) : (
        <Callout $role={$role}>{content}</Callout>
      )}
    </MessageComponent>
  );
};

export default Message;
