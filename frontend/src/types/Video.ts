export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  url: string;
  viewCount?: number;
  likeCount?: number;
  duration?: string;
} 