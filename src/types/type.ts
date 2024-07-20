export interface MessageProps {
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: string;
  isStreaming?: boolean;
}
