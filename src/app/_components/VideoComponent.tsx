import React from 'react';

interface VideoPortraitProps {
    pathUrl?: string;
  }

export const VideoPortrait: React.FC<VideoPortraitProps> = ({pathUrl}) => {
  return (
    <div className="video-container" style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <video
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={pathUrl} type="video/mp4" />
        Sorry, your browser doesnt support embedded videos.
      </video>
    </div>
  );
};

// Set a default prop value
VideoPortrait.defaultProps = {
    pathUrl: '/studio-cyber.mp4',
  };