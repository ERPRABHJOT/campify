import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeArea } from "native-base";
import React, { createContext, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState();
    const [campId, setCampId] = useState();
    const [campStatus, setCampStatus] = useState();
    const [info , setInfo] = useState();
    const [username , setUsername] = useState();


    function updateUsername(data)
    {
        setUsername(data)
    }

    function updateinfo(data)
    {
        setInfo(data)
        
    }


    function updateRole(data) {
        setRole(data)
        // console.log("new updated role is = " + data)
    }
    function updateCampId(data) {
        setCampId(data)
        // console.log("new updated camp id is  = " + data)
    }
    function updateIdToken(data) {
        AsyncStorage.setItem("idToken", data)
        // console.log("new updated camp id token is = " + data)
    }
    function updateCampStatus(data) {
        setCampStatus(data)
        // console.log("new updated camp status is = " + data)
    }
    function logout() {
        AsyncStorage.removeItem("idToken")
        setRole(null)
        setCampId(null)
        // console.log("all stored data of user is removed ")
    }
    return (<AuthContext.Provider value={{ username,updateUsername ,role, updateRole, campId, updateCampId, updateIdToken, logout, campStatus, updateCampStatus , updateinfo, info}}>{children}</AuthContext.Provider>)
}