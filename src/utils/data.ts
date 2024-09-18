export const navText = {
  en: {
    notice: "Notice",
    chat: "Chat",
    settings: "Settings",
  },
  ko: {
    notice: "공지",
    chat: "채팅",
    settings: "세팅",
  },
};

export const modelOptions = [
  {
    value: "gpt-4o-mini",
    title: "GPT-4o-mini",
  },
  {
    value: "gpt-4o",
    title: "GPT-4o",
  },
  {
    value: "gpt-4-turbo",
    title: "GPT-3.5-Turbo",
  },
];

export const errorMesaage = {
  400: "모델을 확인해주세요.",
  401: "API 키를 확인해주세요.",
  403: "지원되지 않는 국가, 지역 또는 영토에서 API에 액세스하고 있습니다.",
  404: "요청한 리소스를 찾을 수 없습니다.",
  429: "요청에 대한 속도 제한에 도달했거나 요청 한도를 초과했습니다.",
  500: "요청을 처리하는 동안 서버에 오류가 발생했습니다",
  503: "현재 엔진에 과부하가 걸렸습니다. 나중에 다시 시도해 주세요.",
  default: "죄송합니다. 응답을 받아오는 데 문제가 발생했습니다.",
};
