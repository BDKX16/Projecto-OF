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

export const getCarousel = () => {
  const controller = loadAbort();
  return {
    call: axios.get(import.meta.env.VITE_BASE_URL + "/admin/carousel", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const editCarousel = (data) => {
  const controller = loadAbort();
  return {
    call: axios.put(import.meta.env.VITE_BASE_URL + "/admin/carousel/", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const addCarousel = (data) => {
  const controller = loadAbort();
  return {
    call: axios.post(import.meta.env.VITE_BASE_URL + "/admin/carousel", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteCarousel = (id) => {
  const controller = loadAbort();
  return {
    call: axios.delete(
      import.meta.env.VITE_BASE_URL + "/admin/carousel/" + id,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
