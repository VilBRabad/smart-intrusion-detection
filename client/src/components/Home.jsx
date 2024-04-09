import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home({mobile, setMobile}) {

    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-homeBg bg-cover text-white">
            <div className="container h-full w-full">
                <div className="nav flex items-center justify-between px-12 h-[4rem]">
                    <h1 className="text-2xl font-bold"><span className="text-red-700">.Intruder</span>Det</h1>
                    <button onClick={()=>navigate("/sign-in")} className="h-9 w-[6rem] bg-red-800 font-semibold hover:bg-red-700">Sing In</button>
                </div>
                <div className="main w-full h-[91%]">
                    <div className="up h-[60%] w-full flex gap-4 flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold">Setup AI based <span className="text-red-700">Intruder Detection</span> Camera</h1>
                        <p className="text-center w-[60%] text-lg opacity-[0.6]">Lorem ipsum, adipisicing elit. Quos culpa voluptatibus in quia non? Odit, asperiores magni aliquam numquam sed, inventore, iste tempora a molestiae ea ducimus libero reprehenderit praesentium facilis officiis.</p>
                        <form onSubmit={()=>navigate("/create-password")} className="flex gap-2">
                            <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} className="bg-slate-900/50 h-12 w-[20rem] border-2 border-white/50 rounded-sm outline-0 px-2 text-lg" placeholder="Mobile Number"/>
                            <button type="submit" className="h-12 w-[10rem] text-lg bg-red-800 rounded-sm font-semibold hover:bg-red-700">Get Started</button>
                        </form>
                    </div>
                    <div className="down pt-5 text-black w-full h-[40%] bg-white/60 flex flex-col items-center">
                        <h1 className="text-xl font-bold">About Us</h1>
                        <div className="flex flex-col items-center mt-6">
                            <div className="h-[5rem] mb-4 w-[5rem] bg-black/90 rounded-full animate-pulse"></div>
                            <div className="w-[40rem] rounded-md animate-pulse mb-2 bg-black/90 h-[2rem]"></div>
                            <div className="w-[30rem] rounded-md animate-pulse bg-black/90 h-[2rem]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
