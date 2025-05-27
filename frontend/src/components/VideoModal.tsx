import React from 'react';
import { Video } from '../types/Video';
import { X, ExternalLink, Calendar, User } from 'lucide-react';
import './VideoModal.css';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='video-modal-backdrop' onClick={handleBackdropClick}>
      <div className='video-modal'>
        <div className='video-modal-header'>
          <h2>{video.title}</h2>
          <button className='close-button' onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className='video-modal-content'>
          <div className='video-thumbnail-large'>
            <img src={video.thumbnail} alt={video.title} />
          </div>

          <div className='video-details'>
            <div className='video-meta-large'>
              <div className='meta-item'>
                <User size={16} />
                <span>{video.channelTitle}</span>
              </div>

              <div className='meta-item'>
                <Calendar size={16} />
                <span>{formatDate(video.publishedAt)}</span>
              </div>

              {video.viewCount && (
                <div className='meta-item'>
                  <span>조회수: {formatNumber(video.viewCount)}회</span>
                </div>
              )}

              {video.likeCount && (
                <div className='meta-item'>
                  <span>좋아요: {formatNumber(video.likeCount)}개</span>
                </div>
              )}
            </div>

            <div className='video-description-full'>
              <h3>설명</h3>
              <p>{video.description}</p>
            </div>

            <div className='video-actions'>
              <a
                href={video.url}
                target='_blank'
                rel='noopener noreferrer'
                className='watch-button'
              >
                <ExternalLink size={16} />
                YouTube에서 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
