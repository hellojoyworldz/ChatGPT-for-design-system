# ChatGPT-for-design-system

## 서비스 특징
- API 키 입력: 우측 하단의 배너를 클릭하여 OpenAI API 키를 입력해야 대화를 시작할 수 있습니다.    
    ![chrome-capture-2024-8-12](https://github.com/user-attachments/assets/5a4302e2-bbfe-4260-943c-c65777cf83e2)
- AI 모델을 선택 다양한 AI 모델을 선택할 수 있습니다.    
    ![chrome-capture-2024-8-12 (3)](https://github.com/user-attachments/assets/2d5c81e6-ba0b-4471-a5df-3a2f029c406d)
- 디자인 시스템 전문: 이 챗봇은 디자인 시스템에 관한 대화에 특화되어 있습니다.    
- 전문적인 답변 제공: UI/UX 디자인, 컴포넌트 설계, 스타일 가이드, 디자인 원칙 등 디자인 시스템과 관련된 다양한 주제에 대해 전문적인 답변을 제공합니다.    
  ![chrome-capture-2024-8-12 (1)](https://github.com/user-attachments/assets/b42a4bd4-8af6-422c-82b3-9f69e6be2f8f)
- 대화 내용 제한: 디자인 시스템과 관련된 내용이 아닌 경우, 답변을 제공하지 않습니다.    
  ![chrome-capture-2024-8-12 (2)](https://github.com/user-attachments/assets/672d89e2-c0fb-4caf-9ea2-04fd1fdef16b)
- 대화 저장 및 초기화: 나누던 대화는 브라우저에 저장되며, 언제든지 대화를 초기화할 수 있습니다.    
  ![chrome-capture-2024-8-12 (4)](https://github.com/user-attachments/assets/90349205-be3d-48c9-b331-d2445fb39512)

## 사용 방법
1. OpenAI API 키 입력:
- OpenAI 웹사이트에서 발급받을 수 있습니다.
- 발급받은 API 키는 세팅에서 입력해 주세요.
2. Model 선택:
- 원하는 챗봇의 모델을 선택할 수 있습니다.
3. 대화 시작:
- API 키 입력 후, 디자인 시스템에 관한 질문이나 논의하고 싶은 주제를 자유롭게 입력해 주세요

## 실행
- API 서버 실행: `$ node api/chat.js`
- 개발 서버 실행: `$ npm run dev`

## .env 파일 설정
- VITE_SECRET_KEY: OpenAI API 키의 암호화 및 복호화에 사용됩니다.
- VITE_CHAT_URL: http://localhost:3001
- VITE_CHAT_URL_PORT: API 서버의 포트 번호를 설정할 수 있습니다. (VITE_CHAT_URL에 포함된 포트 번호)