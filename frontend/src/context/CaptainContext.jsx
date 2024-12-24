import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext()

const CaptainContext = ({children})=>{
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateCaptain = (captainData)=>{
        setCaptain(captainData)
    }

    const value ={
        captain,
        setCaptain,
        updateCaptain,
        isLoading,
        setIsLoading,
        error,
        setError
    }

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
    
}

export default CaptainContext;  //exporting the context as default