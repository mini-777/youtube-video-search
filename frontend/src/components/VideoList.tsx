import React from 'react';
import { Video } from '../types/Video';
import VideoCard from './VideoCard';
import './VideoList.css';

interface VideoListProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect }) => {
  if (videos.length === 0) {
    return (
      <div className='video-list-empty'>
        <p>검색 결과가 없습니다. 다른 키워드로 검색해보세요.</p>
      </div>
    );
  }

  return (
    <div className='video-list'>
      <h2>검색 결과 ({videos.length}개)</h2>
      <div className='video-grid'>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => onVideoSelect(video)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
