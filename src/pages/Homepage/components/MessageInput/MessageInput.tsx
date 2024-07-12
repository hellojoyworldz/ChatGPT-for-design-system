import InputText from "../../../../components/InputText/InputText.tsx";
import { MessageInputComponent } from "./MessageInput.style.tsx";

const MessageInput = ({ placeholder }: { placeholder?: string }) => {
  return (
    <MessageInputComponent>
      <InputText placeholder={placeholder} />
      <button>보내기</button>
    </MessageInputComponent>
  );
};

export default MessageInput;
