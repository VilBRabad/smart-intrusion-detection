import React, {useState} from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const clickChange = () => {
        setShow(!show);
    }


    return (
        <div className="w-screen h-screen bg-homeBg bg-cover text-white">
            <div className="container h-full w-full">
                <div className="nav flex items-center justify-between px-12 h-[4rem]">
                    <Link to="/" className="text-2xl font-bold"><span className="text-red-700">.Intruder</span>Det</Link>
                    <button onClick={()=>navigate("/")} className="h-9 w-[6rem] bg-red-800 font-semibold hover:bg-red-700">Register</button>
                </div>
                <div className="main w-full h-[91%] flex items-center justify-center">
                    <div className="h-[30rem] py-6 w-[28rem] bg-slate-950/70 rouded-md flex flex-col gap-3 items-center">
                        <h1 className="text-xl font-semibold mb-12">Sign In</h1>
                        <input type="number" className="h-12 w-[80%] outline-0 bg-slate-800/50 border-2 border-white/50 rounded-sm px-2 text-lg" placeholder="Mobile Number"/>
                        <div className="h-12 w-[80%] bg-slate-800/50 border-2 border-white/50 rounded-sm text-lg flex items-center">
                            <input type={show?"text":"password"} className="h-12 w-[90%] outline-0 bg-transparent px-2 text-lg" placeholder="Password"/>
                            {
                                show?
                                <IoEyeOff size={20} onClick={clickChange} className="cursor-pointer"/>
                                :
                                <IoEye size={20} onClick={clickChange} className="cursor-pointer"/>
                            }
                        </div>
                        <button type="submit" className="h-12 w-[80%] outline-0 bg-red-800 hover:bg-red-700 rounded-sm px-2 text-lg font-semibold">Sign In</button>
                        <p className="mt-6 opacity-[0.6] hover:opacity-[1] cursor-pointer">Forgot Password</p>
                        <p className="text-white/60">New to .IntruderDet? <Link to="/" className="hover:text-white cursor-pointer"> Sign-Up</Link></p>

                        <div className="flex justify-center gap-2 opacity-[0.5] mt-10 text-sm">
                            <input type="checkbox" disabled defaultChecked/>
                            <p>All term & conditions applied</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
