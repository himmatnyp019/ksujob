import { createContext, useState } from "react";

//creating storeContext
export const StoreContext = createContext();

export const StoreProvider = ({children}) => {

    const text = "Hello, message from storeContext.jsx";

    const value = {
        text
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}