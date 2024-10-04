import { useEffect, useState } from "react";
import { modelOptions } from "../utils/data";
import { settingModel } from "../utils/api";

export const useModel = () => {
  const [model, setModel] = useState<string>(modelOptions[0].value);

  useEffect(() => {
    setModel(model);
    settingModel(model);
  }, [model]);

  return { model, setModel };
};
