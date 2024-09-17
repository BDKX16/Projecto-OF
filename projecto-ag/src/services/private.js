import { loadAbort } from "../utils/load-abort-controller";
import axios from "axios";

export const addContent = (data) => {
  const controller = loadAbort();
  return {
    call: axios.post(import.meta.env.VITE_BASE_URL + "/admin/content", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const editContent = (data) => {
  console.log(data);
  const controller = loadAbort();
  return {
    call: axios.put(import.meta.env.VITE_BASE_URL + "/admin/content", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteContent = (id) => {
  const controller = loadAbort();
  return {
    call: axios.delete(import.meta.env.VITE_BASE_URL + "/admin/content/" + id, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const contentState = (id, status) => {
  const controller = loadAbort();
  return {
    call: axios.put(
      import.meta.env.VITE_BASE_URL + "/admin/content-state/",
      { id, status },
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getUsers = () => {
  const controller = loadAbort();
  return {
    call: axios.get(import.meta.env.VITE_BASE_URL + "/admin/users", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getUser = (id) => {
  const controller = loadAbort();
  return {
    call: axios.get(import.meta.env.VITE_BASE_URL + "/admin/user/" + id, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const editUser = (role = null, nullDate = null) => {
  const controller = loadAbort();
  return {
    call: axios.put(
      import.meta.env.VITE_BASE_URL + "/admin/user/" + id,
      { role, nullDate },
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const deleteUser = (id) => {
  const controller = loadAbort();
  return {
    call: axios.delete(import.meta.env.VITE_BASE_URL + "/admin/user/" + id, {
      signal: controller.signal,
    }),
    controller,
  };
};
