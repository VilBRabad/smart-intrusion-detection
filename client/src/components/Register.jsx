import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoEye, IoEyeOff } from "react-icons/io5";

function Register({ mobile }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (mobile === "") {
            navigate("/");
        }
    }, [])

    const [show, setShow] = useState(false);
    const clickChange = () => {
        setShow(!show);
    }

    const [password, setPassword] = useState("");
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:5000/sign-up", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: mobile,
                    password: password
                }),
            })

            const res_data = await res.json();
            if(res_data.status === 201){
                window.alert("Successfully Register");
                navigate("/login")
            }
            else if(res_data.status == 401){
                window.alert("User already exists");
                navigate("/");
            }
            else{
                window.alert("Server Error");
            }
        } catch (error) {
            window.alert("Something went wrong!")
            console.log(error)
        }
    }

    return (
        <div className="container xl:px-[4rem] h-screen w-screen overflow-hidden">
            <div className="navbar flex mx-8 pb-4 pt-2 justify-between border-b-2">
                <h1 className="text-2xl font-bold"><span className="text-red-700">.Intruder</span>Det</h1>
                <Link to="/" className="font-semibold text-lg">Sign Out</Link>
            </div>
            <div className="h-[90%] w-full flex items-center justify-center">
                <form className="h-[27rem] w-[25rem] bg-black/10 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-semibold mb-8">Create a password</h1>
                    <input type="text" className="h-12 w-[85%] px-3 text-lg text-black/80 bg-gray-800/5 border border-black/40 rounded-sm mb-4" value={mobile} readOnly />
                    <div className="h-12 w-[85%] flex items-center justify-btween bg-gray-800/5 border border-black/40 rounded-sm mb-4">
                        <input type={show ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} className="px-3 h-full w-[90%] outline-0 bg-transparent text-lg" placeholder="Password" />
                        {
                            !show ?
                                <IoEye className="text-xl cursor-pointer" onClick={clickChange} />
                                :
                                <IoEyeOff className="text-xl cursor-pointer" onClick={clickChange} />
                        }
                    </div>
                    <button type="submit" onClick={submitForm} className="h-12 w-[85%] bg-red-700 mb-4 text-white text-lg hover:bg-red-600">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register
