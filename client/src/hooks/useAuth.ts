import { useContext } from "react";
import {UserContext} from "../UserContext";

const useAuth = () => {
    const context = useContext(UserContext)!;
    const { userInfo } = context
    return { userInfo};
};

export {useAuth};