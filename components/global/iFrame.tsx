import React, { useState, useEffect } from "react";

interface Props {
  videoId: string;
  className: string;
  title: string;
}

const IFrame: React.FC<Props> = ({ videoId, className, title }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className={className} 
        style={{
        borderRadius: "10px",
        width: "100%",
        height: windowWidth > 720 ? "100%" : "100%",
        objectFit: "contain",
        }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&controls=1&autoplay=0&mute=0&start=0`}
        frameBorder={0}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
          borderRadius: "10px",
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={title}
        loading="lazy"
      />
    </div>
  );
};

export default IFrame;
