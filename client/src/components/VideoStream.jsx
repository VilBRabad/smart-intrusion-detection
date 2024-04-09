import React, { useState, useEffect, useRef } from 'react';

const VideoStream = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/video_feed');
        const reader = response.body.getReader();

        const stream = new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                push();
              });
            }
            push();
          },
        });

        const videoStream = new MediaStream();
        const videoElement = document.createElement('video');
        videoElement.controls = true; // Show controls
        videoElement.srcObject = videoStream;

        const mediaSource = new MediaSource();
        videoElement.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener('sourceopen', () => {
          const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');

          const readerStream = stream.getReader();
          readerStream.read().then(function processText({ done, value }) {
            if (done) return;
            sourceBuffer.appendBuffer(value);
            readerStream.read().then(processText);
          });
        });

        setStream(videoStream);
        videoRef.current = videoElement;
      } catch (error) {
        console.error('Error fetching video stream:', error);
      }
    };

    fetchStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} />
    </div>
  );
};

export default VideoStream;

