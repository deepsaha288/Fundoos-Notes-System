import React,{createContext } from 'react'

const ContextGetNote = createContext();

export const UserProvider = ContextGetNote.Provider
export const UserConsumer = ContextGetNote.Consumer


export default ContextGetNote;