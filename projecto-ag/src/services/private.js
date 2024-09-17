import { loadAbort } from "../utils/load-abort-controller";
import axios from "axios";
import store from "../redux/store";
//import { useSelector } from "react-redux";

const getAxiosHeaders = () => {
  //const userState = useSelector((store) => store.user);
  const state = store.getState();
  //const token = state.userState.token;
  return {
    headers: {
      token: state.user.token,
      "Content-Type": "application/json",
    },
  };
};

export const addContent = (data) => {
  const controller = loadAbort();

  return {
    call: axios.post(
      import.meta.env.VITE_BASE_URL + "/admin/content",
      data,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const editContent = (data) => {
  console.log(data);
  const controller = loadAbort();
  return {
    call: axios.put(
      import.meta.env.VITE_BASE_URL + "/admin/content",
      data,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const deleteContent = (id) => {
  const controller = loadAbort();
  return {
    call: axios.delete(
      import.meta.env.VITE_BASE_URL + "/admin/content/" + id,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const contentState = (id, status) => {
  const controller = loadAbort();
  return {
    call: axios.put(
      import.meta.env.VITE_BASE_URL + "/admin/content-state/",
      { id, status },
      getAxiosHeaders(),
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
    call: axios.get(
      import.meta.env.VITE_BASE_URL + "/admin/users",
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getUser = (id) => {
  const controller = loadAbort();
  return {
    call: axios.get(
      import.meta.env.VITE_BASE_URL + "/admin/user/" + id,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const editUser = (role = null, nullDate = null) => {
  const controller = loadAbort();
  return {
    call: axios.put(
      import.meta.env.VITE_BASE_URL + "/admin/user/" + id,
      { role, nullDate },
      getAxiosHeaders(),
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
    call: axios.delete(
      import.meta.env.VITE_BASE_URL + "/admin/user/" + id,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const addTheme = (data) => {
  const controller = loadAbort();
  return {
    call: axios.post(
      import.meta.env.VITE_BASE_URL + "/admin/theme",
      data,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const editTheme = (data) => {
  const controller = loadAbort();
  return {
    call: axios.put(
      import.meta.env.VITE_BASE_URL + "/admin/theme",
      data,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const deleteTheme = (id) => {
  const controller = loadAbort();
  return {
    call: axios.delete(
      import.meta.env.VITE_BASE_URL + "/admin/theme/" + id,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getCategorys = () => {
  const controller = loadAbort();
  return {
    call: axios.get(
      import.meta.env.VITE_BASE_URL + "/admin/categorys",
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const addCategory = (data) => {
  const controller = loadAbort();
  return {
    call: axios.post(
      import.meta.env.VITE_BASE_URL + "/admin/category",
      data,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const editCategory = (data) => {
  const controller = loadAbort();
  return {
    call: axios.put(
      import.meta.env.VITE_BASE_URL + "/admin/category",
      data,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const deleteCategory = (id) => {
  const controller = loadAbort();
  return {
    call: axios.delete(
      import.meta.env.VITE_BASE_URL + "/admin/category/" + id,
      getAxiosHeaders(),
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
