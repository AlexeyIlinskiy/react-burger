import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE
} from '../actions/wsActions';

const initialState = {
  wsConnected: false,
  wsError: undefined,
  messages: {
    orders: [],
    total: 0,
    totalToday: 0 },
  userMessages: {
    orders: [],
    total: 0,
    totalToday: 0 }
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
        // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
        // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: undefined,
      };

        // Опишем обработку экшена с типом WS_CONNECTION_ERROR
        // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };

        // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
        // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: undefined,
      };

        // Опишем обработку экшена с типом WS_GET_MESSAGE
        // Обработка происходит, когда с сервера возвращаются данные
        // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: {...action.payload}
      };

//Опишем всё тоже самое для экшенов связанных с пользователем     
      case WS_USER_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true,
          wsError: undefined,
        };
  
      case WS_USER_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false,
          wsError: action.payload,
        };
  
      case WS_USER_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          wsError: undefined,
        };
  
      case WS_USER_GET_MESSAGE:
        return {
          ...state,
          userMessages: {...action.payload}
      };
    default:
      return state;
  }
};

export default wsReducer;