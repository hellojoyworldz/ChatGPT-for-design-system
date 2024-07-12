import styled from "styled-components";

export const CalloutComponent = styled.p<{ $sender?: string; as?: string }>`
  as: ${(props) => props.as};
  margin: 0;
  padding: 10px;
  max-width: 70%;
  color: #333;
  line-height: 1.5;
  white-space: pre-wrap;
  border: 1px solid #333;
  border-radius: 18px;
  ${(props) => {
    switch (props.$sender) {
      case "user":
        return `
          margin-left:auto;
          background: linear-gradient(#fff, #95C8F5);
          border-top-right-radius: 0;
        `;
      case "partner":
        return `
          margin-right: auto;
          background: linear-gradient(#fff, #A4E156);
          border-top-left-radius: 0;
        `;
      default:
        return "background:#f1f1f1";
    }
  }}
`;
