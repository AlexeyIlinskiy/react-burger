import { getCookie } from "../../utils/cookies";

const socketMiddleware = (url, actions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = actions;

      const { isAuth } = getState().authReducer;
      
      const token = isAuth
        ? `?token=${getCookie('token')?.replace('Bearer ', '')}`
        : '';

        if (type === wsInit) {
          socket = new WebSocket(`${url}${token}`);
        } else if (socket && type === onClose) {
        socket.close();
        }
      

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
}

export default socketMiddleware;