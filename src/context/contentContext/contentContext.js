import contentReducer from "./contentReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    content: [],
    isFetching: false,
    error: false,
}

export const ContentContext = createContext(INITIAL_STATE);

export const ContentContextProvider = ({children}) => {
    const [state, dispatch] = useReducer( contentReducer, INITIAL_STATE );


    return(
        <ContentContext.Provider 
        value={{
            content: state.content, 
            isFetching: state.isFetching, 
            error: state.error,
            dispatch
        }}
        >{children}</ContentContext.Provider>
    )
}

