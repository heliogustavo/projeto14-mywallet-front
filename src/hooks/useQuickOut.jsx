import { useContext, useEffect } from "react"
import AuthContext from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function useQuickOut() {
    const {token, userName} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!token || !userName) navigate("/")
      },[])
} 