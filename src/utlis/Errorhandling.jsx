import React from 'react'
import toast from 'react-hot-toast';

export default function Errorhanding(error) {

    const message = error.response?.data?.message 
    || error?.message || "Something went wrong";

    toast.error(message);
}
