import * as yup from "yup";
export const registerSchema=yup.object({
    userName:yup.string().required("Username is required").min(5,"must be greater than or equal to 5 characters").max(20,"max is 20 characters"),
    email:yup.string().required("Email is required").email(),
    password:yup.string().required("Password is required").min(5,"at least must be 5 characters").max(20,"max is 20 characters")
    
})

export const LoginSchema=yup.object({
    email:yup.string().required("Email is required").email(),
})

export const SendCodeSchema=yup.object({
    email:yup.string().required("Email is required").email(),
})

export const ForgetPasswordSchema=yup.object({
    email:yup.string().required("Email is required").email(),
    password:yup.string().required("Password is required").min(5,"at least must be 5 characters").max(20,"max is 20 characters"), 
    code:yup.string().required("Code is required").length(4," must be 4 characters")

})
export const CreateOrderSchema=yup.object({
    address:yup.string().required("Address is required"),
    phone:yup.string().required("Phone number is required").length(10,'must be 10 numbers'), 

})
