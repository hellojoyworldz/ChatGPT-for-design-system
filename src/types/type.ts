export interface MessageProps {
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: string;
  isStreaming?: boolean;
}

export interface ModelOptionProps {
  value: string;
  title: string;
}

export interface LangType {
  lang?: "en" | "ko";
}
