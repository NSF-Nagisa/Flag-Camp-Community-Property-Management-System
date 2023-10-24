import React from "react";
import { useSelector } from "react-redux";

export default function auth(ExistingComponent  ) {
    return function WrapperComponent(props){
        const isLoggedIn = useSelector(state => state.isLoggedIn.value);
        if (!isLoggedIn) {
            props.history.push("/login");
        }
        return(
            <ExistingComponent {...props}></ExistingComponent>
        );
    }
}
