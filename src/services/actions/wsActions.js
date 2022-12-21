export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';

export const WS_USER_CONNECTION_START = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE = 'WS_USER_GET_MESSAGE';

export const wsConnectionStart = () => {
  return {
      type: WS_CONNECTION_START
  };
};

export const wsConnectionSuccess = () => {
  return {
      type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
      type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
      type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = message => {
  return {
      type: WS_GET_MESSAGE,
      payload: message
  };
};

export const wsUserConnectionStart = () => {
  return {
      type: WS_USER_CONNECTION_START
  };
};

export const wsUserConnectionSuccess = () => {
  return {
      type: WS_USER_CONNECTION_SUCCESS
  };
};

export const wsUserConnectionError = () => {
  return {
      type: WS_USER_CONNECTION_ERROR
  };
};

export const wsUserConnectionClosed = () => {
  return {
      type: WS_USER_CONNECTION_CLOSED
  };
};

export const wsUserGetMessage = userMessage => {
  return {
      type: WS_USER_GET_MESSAGE,
      payload: userMessage
  };
};
