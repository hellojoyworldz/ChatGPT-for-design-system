import Title from "../../components/Title.tsx";
import styled from "styled-components";

const NoticeComponent = styled.section`
  padding: 0 1em;

  ul,
  ol {
    display: block;
    margin: 1em 0;
    padding: 0 0 0 1em;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 8px 4px;
  }
`;
const Notice = () => {
  return (
    <section className="box">
      <Title title="공지" />
      <NoticeComponent>
        <strong>서비스 특징 </strong>
        <ul>
          <li>디자인 시스템에 관한 대화에 특화되어 있습니다.</li>
          <li>
            UI/UX 디자인, 컴포넌트 설계, 스타일 가이드, 디자인 원칙 등 디자인
            시스템과 관련된 다양한 주제에 대해 전문적인 답변을 제공합니다.
          </li>
        </ul>

        <strong>사용 방법 </strong>
        <ol>
          <li>
            OpenAI API 키 입력:
            <ul>
              <li>OpenAI 웹사이트에서 발급받을 수 있습니다. </li>
              <li>발급받은 API 키는 세팅에서 입력해 주세요.</li>
            </ul>
          </li>
          <li>
            대화 시작:
            <ul>
              <li>
                API 키 입력 후, 디자인 시스템에 관한 질문이나 논의하고 싶은
                주제를 자유롭게 입력해 주세요
              </li>
            </ul>
          </li>
        </ol>
      </NoticeComponent>
    </section>
  );
};

export default Notice;
