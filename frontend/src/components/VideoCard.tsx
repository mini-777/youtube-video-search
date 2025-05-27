import React from 'react';
import { Video } from '../types/Video';
import { Calendar, User } from 'lucide-react';
import './VideoCard.css';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className='video-card' onClick={onClick}>
      <div className='video-thumbnail'>
        <img src={video.thumbnail} alt={video.title} />
      </div>

      <div className='video-info'>
        <h3 className='video-title'>{truncateText(video.title, 60)}</h3>

        <div className='video-meta'>
          <div className='video-channel'>
            <User size={14} />
            <span>{video.channelTitle}</span>
          </div>

          <div className='video-date'>
            <Calendar size={14} />
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        </div>

        <p className='video-description'>
          {truncateText(video.description, 100)}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
