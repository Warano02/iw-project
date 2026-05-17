    'use client'
    import { useState } from 'react'
    import { Input } from '../ui/input'
    import { axiosInstance } from '@/lib/axios'

    function RegisterForm() {
        const [formData,setFormData]=useState({
            name:"",
            email:"",
            identifier:"",
            password:"",
        })

        const handleSubmit=async () => {
            if(!formData.name || !formData.email || !formData.identifier || !formData.password )return alert("fill all")
                try {
                    const {data}=await axiosInstance.post('/auth/login',ayii)
                    console.log(data)
                } catch (e) {
                    alert("Error occured while login ",)
                    console.error(e)
                    alert("invalide data")
                }
        }
        console.log( process.env.NEXT_API_BASE_URL)
    return (
        <form
                onSubmit={(e)=>{e.preventDefault();handleSubmit()}}
                className="
                    bg-white/5
                    w-150
                    border border-white/10
                    rounded-3xl
                    p-12
                    backdrop-blur-xl
                "
                > 
                <div className="max-w-2xl mx-auto px-6 py-6 flex  justify-center gap-4">
                    <h1 className="text-3xl font-bold ">
                    Login Form
                    </h1>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-zinc-300">
                    Name
                    </label>

                    <Input 
                    type="text"
                    onChange={(e)=>setAyii(p=>({...p,name:e.target.value}))}
                    className=" w-full h-15 px-4 py-3 rounded-xl   bg-black/40 border border-white/10" required/>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-zinc-300">
                    Email
                    </label>

                    <Input 
                    type="email"
                    onChange={(e)=>setAyii(p=>({...p,email:e.target.value}))}
                    className=" w-full h-15 px-4 py-3 rounded-xl   bg-black/40 border border-white/10" required/>
                </div>
                
                <div className="mb-6">
                    <label className="block mb-2 text-zinc-300">
                    matricule
                    </label>

                    <Input 
                    type="text"
                    onChange={(e)=>setAyii(p=>({...p,identifier:e.target.value}))}
                    className=" w-full h-15 px-4 py-3 rounded-xl   bg-black/40 border border-white/10" required/>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-zinc-300">
                    Password
                    </label>

                    <Input 
                    type="password"
                    onChange={(e)=>setAyii(p=>({...p,password:e.target.value}))}

                    className="
                        w-full
                        h-15
                        px-4 py-3
                        rounded-xl
                        bg-black/40
                        border border-white/10
                    " required/>
                </div>

                <div className="flex justify-center gap-4 border-t border-white/10 pt-6">
                    <button
                    type="submit"
                    className="
                        inline-flex items-center gap-2
                        px-6 py-3 
                        rounded-xl
                        bg-pink-500
                        hover:bg-pink-600
                    "
                    >
                    Submit
                    </button>
                </div>
                </form>
    )
    }

    export default LoginForm
