import { State, Action } from "./StateProvider";

export const initialState: State = {
    selectedChat: '',
    userId: '',
    socket: undefined,
    messages: [],
  };
  
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'SELECT_CHAT':
        return { ...state, selectedChat: action.payload };
      case 'SET_USER_ID':
        return { ...state, userId: action.payload };
      case 'SET_SOCKET':
        return { ...state, socket: action.payload };
        case 'SET_MESSAGES':
        return { ...state, messages: action.payload };
      case 'ADD_MESSAGE':
        return { ...state, messages: [...state.messages, action.payload] };
      default:
        return state;
    }
  };
  