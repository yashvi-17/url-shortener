import axiosInstance from "../utils/axiosinstance";

export const loginUser = async (email,password) => {
    const {data} = await axiosInstance.post("/api/auth/login",{password,email});
    return data;
}

export const RegisterUser = async ({name,password,email}) => {
    const {data} = await axiosInstance.post("/api/auth/register",{name,email,password});
    return data;
}

export const logoutUser = async () => {
    const {data} = await axiosInstance.post("/api/auth/logout");
    return data;
}

export const getCurrentUser = async () => {
    const {data} = await axiosInstance.get("/api/auth/me");
    return data;
}

export const getAllUserUrls = async () => {
    const{data} =await axiosInstance.get("/api/user/urls");
    return data;
}