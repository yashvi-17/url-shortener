//making axios instance
import axios from 'axios';

const axiosInstance=axios.create({
    baseURL: "https://url-shortener-backend-ykh8.onrender.com",
    timeout:10000,      //10s
    withCredentials:true
})
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response){
            const {status,data} = error.response;
            switch(status){
                case 400:
                    console.error("bad request",data);
                    break;
                case 401:
                    console.error("Unauthorised:",data);
                    break;
                case 403:
                    console.error("Forbidden:",data);
                    break;
                case 404:
                    console.error("Not Found:",data);
                    break;
                case 500:
                    console.error("server error:",data);
                    break;
                default:
                    console.error(`Error (${status}):`,data);
            }

        }else if(error.request){
            console.error("network error: no response recieved",error.request);
        }else{
            console.error("error:",error.message);
        }
        return Promise.reject({
            isAxiosError:true,
            message:error.response?.data?.message|| error.message ||"unknown error",
            status: error.response?.status,
            data: error.response?.data,
            originalError: error
        });
    }
);
export default axiosInstance;