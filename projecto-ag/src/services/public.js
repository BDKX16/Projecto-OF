import { loadAbort } from "../utils/load-abort-controller";
import axios from "axios";

export const login = (username, password) => {
  const controller = loadAbort();
  return {
    call: axios.post(
      import.meta.env.VITE_BASE_URL + "/login",
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
        import.meta.env.VITE_BASE_URL + "/register",
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
    call: axios.get(import.meta.env.VITE_BASE_URL + "/content", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const addContent = (data) => {
  const controller = loadAbort();
  return {
    call: axios.post(import.meta.env.VITE_BASE_URL + "/content", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getTemplates = () => {
  const controller = loadAbort();
  return {
    call: axios.get(import.meta.env.VITE_BASE_URL + "/templates", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getTemplate = () => {
  const controller = loadAbort();
  return {
    call: axios.get(import.meta.env.VITE_BASE_URL + "/template", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getVideo = (id) => {
  const controller = loadAbort();
  return {
    call: axios.get(import.meta.env.VITE_BASE_URL + "/content/" + id, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getPendingPayments = () => {
  const controller = loadAbort();
  return {
    call: axios.get(
      import.meta.env.VITE_BASE_URL +
        "/payments?id=" +
        "66ce67d9a743bd281f1e804b",
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getTheme = () => {
  const controller = loadAbort();
  return {
    call: axios.get(import.meta.env.VITE_BASE_URL + "/theme", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const addTheme = (data) => {
  const controller = loadAbort();
  return {
    call: axios.post(import.meta.env.VITE_BASE_URL + "/admin/theme", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const editTheme = (data) => {
  const controller = loadAbort();
  return {
    call: axios.put(import.meta.env.VITE_BASE_URL + "/admin/theme", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteTheme = (id) => {
  const controller = loadAbort();
  return {
    call: axios.delete(import.meta.env.VITE_BASE_URL + "/admin/theme/" + id, {
      signal: controller.signal,
    }),
    controller,
  };
};
