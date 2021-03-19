import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useComponentDidMount = callback =>
    useEffect(() => callback(), [])

export const useComponentWillUnmount = callback =>
    useEffect(() => () => callback(), [])

export const useLoggedIn = () =>
    Boolean(useSelector(state => state.session.currentUserId))