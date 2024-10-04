// common types
export interface commonProps {
  as?: React.ElementType;
  className?: string;
}

// types
export interface MessageProps extends commonProps {
  role: "user" | "system" | "assistant";
  content: ContentProps[];
  timestamp?: string;
  isStreaming?: boolean;
  isInputting?: boolean;
  isLoading?: boolean;
}

export interface ModelOptionProps {
  value: string;
  title: string;
}

export interface ContentProps {
  type: "text" | "image_url";
  text?: string;
  image_url?: ImageUrlProps;
}

export interface ImageUrlProps {
  url?: string;
}

export interface ImageProps {
  file: File;
  preview: string;
}

export interface LangType {
  lang?: "en" | "ko";
}

export interface ChatProps extends commonProps {}

export interface SettingProps {
  modelOptions: ModelOptionProps[];
  inputKey: string;
  setInputKey: React.Dispatch<React.SetStateAction<string>>;
  isApiKey: boolean;
  setApiKey: React.Dispatch<React.SetStateAction<boolean>>;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
}

// components types
export interface defaultComponentsProps {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

export interface BoxComponentProps extends defaultComponentsProps {}

export interface ButtonProps extends defaultComponentsProps, React.HTMLAttributes<HTMLButtonElement> {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: (() => void) | (() => Promise<void>);
}

export interface CalloutProps extends defaultComponentsProps {
  role?: string;
}

export interface EllipsisLoadingProps extends defaultComponentsProps {
  role?: string;
}

export interface InputTextProps extends defaultComponentsProps, React.HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectBoxProps extends defaultComponentsProps {
  options: ModelOptionProps[];
  model: string;
  setModel: (value: string) => void;
}

export interface TitleProps extends defaultComponentsProps {
  title?: string;
}
