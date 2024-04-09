import React, {useEffect} from 'react'


function Camera({videoRef, startVideo, stopVideo}) {

    useEffect(() => {
        console.log("vilas")
        startVideo();
        return () => {
            stopVideo(); // Clean up video when component unmounts
        };
    }, []);

    return (
        <>
            <video ref={videoRef} className="w-full h-full" autoPlay playsInline controls />
        </>
    )
}

export default Camera
