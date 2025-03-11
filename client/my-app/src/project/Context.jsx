import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider=({children})=>{
    
    const [user,setUser]=useState();

    const login = (newUser)=>{
        if(newUser!=null)
            setUser(newUser)
    }
    return(
        <UserContext.Provider value={{login,user}}>
            {children}
        </UserContext.Provider>
    )
}