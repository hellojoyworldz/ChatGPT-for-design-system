import InputText from "../../../../components/InputText/InputText.tsx";
import { MessageInputComponent } from "./MessageInput.style.tsx";

const MessageInput = ({
  placeholder,
  value,
  onChange,
  onKeyPress,
  onClick,
  disabled,
  buttonMessage,
}: {
  inputRef?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  buttonMessage?: string;
}) => {
  return (
    <MessageInputComponent>
      <InputText
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick} className="send" disabled={disabled}>
        {buttonMessage}
      </button>
    </MessageInputComponent>
  );
};

export default MessageInput;
