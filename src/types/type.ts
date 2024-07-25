export interface MessageProps {
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: string;
  isStreaming?: boolean;
}

export interface LangType {
  lang?: "en" | "ko";
}
