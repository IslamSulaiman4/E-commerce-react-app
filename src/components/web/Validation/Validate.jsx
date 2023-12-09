import * as yup from "yup";
export const registerSchema=yup.object({
    userName:yup.string().required("Username is required").min(5,"must be greater than or equal to 5 characters").max(20,"max is 20 characters"),
    email:yup.string().required("Email is required").email(),
    password:yup.string().required("Password is required").min(5,"at least must be 5 characters").max(20,"max is 20 characters")
    
})

export const LoginSchema=yup.object({
    email:yup.string().required("Email is required").email(),
    password:yup.string().required("Password is required").min(5,"at least must be 5 characters").max(20,"max is 20 characters") 
})