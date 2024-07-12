import { InputTextComponent } from "./InputText.style.ts";

const InputText = ({
  placeholder,
  ...props
}: {
  placeholder?: string;
  [key: string]: any;
}) => {
  return <InputTextComponent type="text" placeholder={placeholder} />;
};

export default InputText;
