import { loadAbort } from "../utils/load-abort-controller";
import axios from "axios";

export const login = () => {
  const controller = loadAbort();
  return {
    call: axios.get("", { signal: controller.signal }),
    controller,
  };
};
