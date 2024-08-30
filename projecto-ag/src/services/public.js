import { loadAbort } from "../utils/load-abort-controller";
import axios from "axios";

export const login = (username, password) => {
  const controller = loadAbort();
  return {
    call: axios.post(
      "http://localhost:3001/api/login",
      { email: username, password },
      { signal: controller.signal }
    ),
    controller,
  };
};

export const register = (name, username, password) => {
  const controller = loadAbort();
  return {
    call: axios
      .post(
        "http://localhost:3001/api/register",
        { name: name, email: username, password: password },
        { signal: controller.signal }
      )
      .catch((reason) => {
        //console.log(reason);
      }),
    controller,
  };
};

export const getContent = () => {
  const controller = loadAbort();
  return {
    call: axios.get("http://localhost:3001/api/content", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const addContent = (data) => {
  const controller = loadAbort();
  return {
    call: axios.post("http://localhost:3001/api/content", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getTemplates = () => {
  const controller = loadAbort();
  return {
    call: axios.get("http://localhost:3001/api/templates", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getTemplate = () => {
  const controller = loadAbort();
  return {
    call: axios.get("http://localhost:3001/api/template", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getVideo = (id) => {
  const controller = loadAbort();
  return {
    call: axios.get("http://localhost:3001/api/content/" + id, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getPendingPayments = () => {
  const controller = loadAbort();
  return {
    call: axios.get(
      "http://localhost:3001/api/payments?id=" + "66ce67d9a743bd281f1e804b",
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
