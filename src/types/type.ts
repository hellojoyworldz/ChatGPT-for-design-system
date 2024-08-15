export interface MessageProps {
  role: "user" | "system" | "assistant";
  content: ContentProps[];
  timestamp?: string;
  isStreaming?: boolean;
}

export interface ContentProps {
  type: "text" | "image_url";
  text?: string;
  image_url?: ImageUrlProps;
}

export interface ImageUrlProps {
  url?: string;
}

export interface ModelOptionProps {
  value: string;
  title: string;
}

export interface LangType {
  lang?: "en" | "ko";
}

export interface ImageProps {
  file: File;
  preview: string;
}
