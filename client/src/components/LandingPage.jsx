import React, { useRef, useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { IoArrowForwardCircleOutline, IoVideocamOff } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { PiDetectiveFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios"


function LandingPage() {
    // const videoRef = useRef();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();


    const handleOnClick = () => {
        setShow(!show);
        setTimeout(() => {
            setShow(false);
        }, 5000);
    }

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const captureAndSend = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        axios.post('http://127.0.0.1:5000/upload', { imageData })
            .then(response => {
                console.log('Image uploaded successfully:', response);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    };

    const [isCameraOn, setIsCameraOn] = useState(true);
    // Automatically send the captured video stream every x milliseconds
    let stream;
    useEffect(() => {
        let intervalId;
        if (isCameraOn) {
            intervalId = setInterval(captureAndSend, 1000); // Adjust interval as needed
        }
        return () => clearInterval(intervalId);
    }, []);

    const startCamera = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };
    useEffect(() => {
        startCamera();
    }, []);

    const stopCamera = () => {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null; // optionally clear the video element srcObject
        }
    };


    return (
        <div className="min-h-screen max-w-screen bg-black text-white">
            <div className="container flex flex-col items-center">
                <div className="w-full flex items-center justify-between px-12 h-[4rem]">
                    <h1 className="text-2xl font-bold"><span className="text-red-700">.Intruder</span>Det</h1>
                    <div className="relative">
                        <FaUserCircle size={35} onClick={handleOnClick} className="cursor-pointer" />
                        {
                            show ?
                                <div className="absolute text-black h-[10rem] w-[13rem] top-[110%] right-2 bg-white">
                                    <div className="w-full mt-4 font-semibold flex flex-col gap-1">
                                        <p className="pl-4">Hello,</p>
                                        <p className="pl-4">+91 7387XXXXXX</p>
                                        <div className="pl-4 h-[3rem] flex items-center cursor-pointer w-full hover:bg-slate-200/90">Change Password</div>
                                    </div>
                                    <IoArrowForwardCircleOutline size={35} onClick={() => navigate("/")} className="absolute right-2 bottom-2 cursor-pointer" />
                                </div>
                                :
                                <></>
                        }
                    </div>
                </div>
                <div className="main mt-4 h-[70vh] w-[90vw] flex justify-between gap-4">
                    <div className={`relative flex items-center justify-center h-full w-[72%] ${true ? "bg-white/5" : "bg-slate-700"}`}>
                        {
                            isCameraOn ?
                                <>
                                    <video ref={videoRef} autoPlay />
                                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                                </>
                                :
                                <div className="flex flex-col items-center">
                                    <IoVideocamOff size={100} />
                                    <p>Camera Off/ERROR</p>
                                </div>
                        }
                    </div>
                    <div className="left h-full w-[28%]">
                        <button onClick={() => {setIsCameraOn(true); startCamera()}} className="h-[4rem] w-full bg-[#0099EE] text-lg hover:bg-[#0099EE]/70">Start Camera</button>
                        <button onClick={() => {setIsCameraOn(false); stopCamera()}} className="h-[4rem] mt-2 w-full border-2 border-[#0099EE] text-lg hover:bg-[#0099EE]">Stop Camera</button>
                        <div className="h-[70%] p-2 px-4 mt-4 w-full bg-slate-700">
                            <p className="text-lg font-semibold">Status:</p>
                            <div className="w-full mt-2">
                                <div className="card h-[5rem] w-full flex items-center gap-4 px-3 bg-slate-500 rounded-md">
                                    <IoMdCheckmarkCircle className="text-green-500" size={30} />
                                    <div>
                                        <p className="text-lg font-semibold">Current Status</p>
                                        <p className="">No Any Intrusion</p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold mt-4">Past Records:</p>
                                <div className="card mt-2 h-[5rem] w-full flex items-center gap-4 px-3 bg-slate-500 rounded-md">
                                    <PiDetectiveFill className="text-red-700" size={30} />
                                    <div>
                                        <p className="text-lg font-semibold">Intruder Detected</p>
                                        <p className="">07:34:28 PM</p>
                                    </div>
                                </div>
                                <div className="card mt-2 h-[5rem] w-full flex items-center gap-4 px-3 bg-slate-500 rounded-md">
                                    <PiDetectiveFill className="text-red-700" size={30} />
                                    <div>
                                        <p className="text-lg font-semibold">Intruder Detected</p>
                                        <p className="">01:23:05 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[70vh] w-[90vw] p-4 bg-slate-800 mt-4">
                    <p className="text-lg font-semibold">All Recorded Timestamps: </p>
                    <div className="w-full flex flex-col gap-2 items-center mt-4">
                        <div className="h-[5rem] w-[95%] bg-slate-700 rounded-md animate-pulse">
                        </div>
                        <div className="h-[5rem] w-[95%] bg-slate-700 rounded-md animate-pulse">
                        </div>
                        <div className="h-[5rem] w-[95%] bg-slate-700 rounded-md animate-pulse">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage
