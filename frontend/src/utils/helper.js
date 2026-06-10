import store from "../store/store";
import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({context}) => { //context gives query client [helper.js]
    try{
        const {queryClient,store} = context;
        const user = await queryClient.ensureQueryData({
            queryKey: ['currentUser'],
            queryFn: getCurrentUser,
        });
        if(!user) return false;

        store.dispatch(login(user));

        const {isAuthenticated} = store.getState().auth;
        if(!isAuthenticated) return false;
        return true;
    } catch(error){
        return redirect({to:'/auth'}); //if the access token is deleted or expired, the user is redirected to login page
    }   
}

//solving reloading - auth problems. Solutions:-
//1] saving token in local storage: easy but backend link broken [if token expires in backend, the local storage still keeps the suth on true][weak UI]
//2] persistent auth using redux: a bit difficult but " " " [" "]["]
//3] check with the backend for the correct state