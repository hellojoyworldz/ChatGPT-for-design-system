import Callout from "../../../../components/Callout/Callout.tsx";
import EllipsisLoading from "../../../../components/Loading/EllipsisLoading.tsx";
import { MessageComponent, MessageProfileComponent } from "./Message.style.ts";

const Message = ({
  children,
  className,
  $sender,
  ...props
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  $sender?: string;
  [key: string]: any;
}) => {
  return (
    //"message-container user-container"
    <MessageComponent className={className} $sender={$sender}>
      <MessageProfileComponent>
        <span className="emoji">{$sender === "user" ? "🐹" : "💬"}</span>
        <span className="timestamp">오전 10:00</span>
      </MessageProfileComponent>
      <Callout $sender={$sender} {...props}>
        {children}
      </Callout>
      <EllipsisLoading $sender={$sender} />
    </MessageComponent>
  );
};

export default Message;
