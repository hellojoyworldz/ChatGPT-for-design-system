import Message from "./components/Message/Message.tsx";
import MessageInput from "./components/MessageInput/MessageInput.tsx";
import {
  HomepageComponent,
  HomepageHeader,
  HomepageMessage,
  HomepageInput,
} from "./Homepage.style.ts";
const Homepage = () => {
  return (
    <HomepageComponent>
      <HomepageHeader>
        <h1>🎨 ChatGPT for design system 🖌</h1>
      </HomepageHeader>
      <HomepageMessage>
        <Message $sender={"user"}>메세지입니당</Message>
        <Message $sender={"partner"}>partner 메세지 입니다</Message>
      </HomepageMessage>
      <HomepageInput>
        <MessageInput placeholder={"메세지를 입력하세요"} />
      </HomepageInput>
    </HomepageComponent>
  );
};

export default Homepage;
