import React, { createContext, useState } from 'react';
import UserInfo from './types/UserInfo';


interface UserContextProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    userInfo: UserInfo | undefined;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
    const initialUserInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')!)
        : undefined

    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(initialUserInfo);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {props.children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;