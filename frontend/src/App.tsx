import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';
import { Video } from './types/Video';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleSearch = async (query: string, maxResults: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, maxResults }),
      });

      const data = await response.json();

      if (data.success) {
        setVideos(data.videos);
      } else {
        setError(data.error || '검색 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('서버와의 연결에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>🎥 YouTube 동영상 검색</h1>
        <p>원하는 동영상을 검색해보세요!</p>
      </header>

      <main className='App-main'>
        <SearchForm onSearch={handleSearch} loading={loading} />

        {error && <div className='error-message'>❌ {error}</div>}

        {loading && <div className='loading-message'>🔍 검색 중...</div>}

        <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
      </main>

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
