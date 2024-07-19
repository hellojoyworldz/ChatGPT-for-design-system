export interface MessageProps {
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: string;
  isNew?: boolean;
  isStreaming?: boolean;
}
