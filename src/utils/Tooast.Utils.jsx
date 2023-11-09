import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessAlert = (message)=>{
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
}

export const showFailedAlert = (message)=>{
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
}