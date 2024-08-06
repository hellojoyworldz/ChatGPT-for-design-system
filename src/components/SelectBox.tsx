import styled from "styled-components";
import { HTMLAttributes } from "react";
import { ModelOptionProps } from "../types/type.ts";

const SelectBoxComponent = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0 52px 0 16px;
  height: 52px;
  font-size: 1em;
  border: 1px solid #333;
  border-radius: 52px;
  cursor: pointer;
  box-sizing: border-box;
`;

interface SelectBoxProps extends HTMLAttributes<HTMLElement> {
  options: ModelOptionProps[];
  model: string;
  setModel: (value: string) => void;
}
const SelectBox = ({ options, model, setModel }: SelectBoxProps) => {
  return (
    <>
      <SelectBoxComponent
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </SelectBoxComponent>
    </>
  );
};

export default SelectBox;
