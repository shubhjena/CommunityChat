import React, {createContext, useReducer, useContext, Dispatch } from 'react'
import { Socket } from 'socket.io-client';
import { initialState, reducer } from './StateReducers';

// Types
interface Message {
  text: string;
  sender: string;
  sendTime: Date;
  chatId: string;
}

export interface State {
  selectedChat: string;
  userId: string;
  socket?: Socket;
  messages: Message[];
}

export type Action =
  | { type: 'SELECT_CHAT'; payload: string }
  | { type: 'SET_USER_ID'; payload: string }
  | { type: 'SET_SOCKET'; payload: Socket | undefined }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message };

interface StateProviderProps {
  children?: React.ReactNode;
}

const StateContext = createContext<[ state: State, dispatch: Dispatch<Action> ] | undefined>(undefined);

export const useStateProvider = () => {
  const state = useContext(StateContext);
  if (!state) throw new Error("socket state is undfined");
  return state;
};

export const StateProvider: React.FC<StateProviderProps> = ({children}) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  )
} 
