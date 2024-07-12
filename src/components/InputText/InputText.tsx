import { InputTextComponent } from "./InputText.style.ts";

const InputText = ({
  ...props
}: {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  buttonMessage?: string;
  [key: string]: any;
}) => {
  return <InputTextComponent type="text" {...props} />;
};

export default InputText;
