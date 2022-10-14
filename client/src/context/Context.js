import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
    basketId: null,
    update: false,
    update2: false,
    update3: null,
    delivery: null,
    updateDelivery: false,
    showBasket: false
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            update: state.update,
            update2: state.update2,
            update3: state.update3,
            delivery: state.delivery,
            updateDelivery: state.updateDelivery,
            showBasket: state.showBasket,
            dispatch,
      }}>
      {children}
    </Context.Provider>
  );
};
