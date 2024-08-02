import styled from "styled-components";

export const SettingsComponent = styled.div`
  position: relative;
  margin: 0 1em 2em 1em;

  .tit {
    display: block;
    margin-bottom: 1em;
  }
`;
export const SettingsInput = styled.div`
  position: relative;

  input:not(:read-only):not(:disabled) {
    padding-right: 48px;
  }

  .send {
    position: absolute;
    right: 6px;
    bottom: 6px;
    padding: 0 12px;
    height: 40px;
    background: #fffda6;
    border: 1px solid #333;
    border-radius: 52px;
    cursor: pointer;
  }
`;

export const SettingButtons = styled.div`
  position: absolute;
  top: -4px;
  right: 0;

  .item {
    font-size: 0.825em;
    padding: 0.5em 1em;
    border: 0;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;
