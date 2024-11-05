import { useState } from "react";
import pb from "./lib/pocketbase"
import {useForm} from "react-hook-form"
export const Auth = () => {
    const {register, handleSubmit} = useForm();
    const [isLoading, setLoading] = useState<boolean>(false)
    const isLoggedIn = pb.authStore.isValid;
    const login = async (data : any) => {
        setLoading(true)
        try{
            const response = await pb.collection("users").authWithPassword(data.email,data.password)
        } catch(e){
            alert(e)
        }
        
        setLoading(false)
    }
    const logOut = () => {
        pb.authStore.clear()
        window.location.reload()
    }
    if (isLoading){
        return(
            <div>
                loading
            </div>
        )
    }
    if(isLoggedIn){
        return(
            <div>
                <h1>Logged IN : {pb.authStore.isValid && pb.authStore.model?.email}</h1>
                <button onClick={logOut}>logout</button>
            </div>
        )
    }
    return(
        <div>
            <h1>Log In!</h1>
            <form onSubmit={handleSubmit(login)}>
                <input type="text" placeholder="email" {...register("email")}/>
                <input type="text" placeholder="password" {...register("password")}/>
                <button type="submit" disabled = {isLoading}>{isLoading ? "loading" : "Login"}</button>
            </form>
        </div>
    )
}