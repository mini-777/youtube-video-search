from flask import Flask, request, jsonify
from flask_cors import CORS
from googleapiclient.discovery import build
import os

app = Flask(__name__)
CORS(app)

# YouTube API 키 (환경변수에서 가져오기)
YOUTUBE_API_KEY = os.environ.get('YOUTUBE_API_KEY')


def get_youtube_service():
    return build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)


@app.route('/')
def home():
    return jsonify({
        'message': 'YouTube Video Search API',
        'endpoints': {
            '/api/search': 'POST - Search YouTube videos',
            '/api/video/<video_id>': 'GET - Get video details'
        }
    })


@app.route('/api/search', methods=['POST'])
def search_videos():
    try:
        data = request.get_json()
        query = data.get('query', '')
        max_results = data.get('maxResults', 10)

        if not query:
            return jsonify({'error': 'Query parameter is required'}), 400

        if not YOUTUBE_API_KEY:
            return jsonify({'error': 'YouTube API key not configured'}), 500

        youtube = get_youtube_service()

        # YouTube API 검색 요청
        search_response = youtube.search().list(
            q=query,
            part='id,snippet',
            maxResults=max_results,
            type='video',
            order='relevance'
        ).execute()

        videos = []
        for search_result in search_response.get('items', []):
            video_data = {
                'id': search_result['id']['videoId'],
                'title': search_result['snippet']['title'],
                'description': search_result['snippet']['description'],
                'thumbnail': search_result['snippet']['thumbnails']['medium']['url'],
                'channelTitle': search_result['snippet']['channelTitle'],
                'publishedAt': search_result['snippet']['publishedAt'],
                'url': f"https://www.youtube.com/watch?v={search_result['id']['videoId']}"
            }
            videos.append(video_data)

        return jsonify({
            'success': True,
            'videos': videos,
            'totalResults': len(videos)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/video/<video_id>', methods=['GET'])
def get_video_details(video_id):
    try:
        if not YOUTUBE_API_KEY:
            return jsonify({'error': 'YouTube API key not configured'}), 500

        youtube = get_youtube_service()

        # 비디오 상세 정보 요청
        video_response = youtube.videos().list(
            part='snippet,statistics,contentDetails',
            id=video_id
        ).execute()

        if not video_response.get('items'):
            return jsonify({'error': 'Video not found'}), 404

        video = video_response['items'][0]
        video_data = {
            'id': video['id'],
            'title': video['snippet']['title'],
            'description': video['snippet']['description'],
            'thumbnail': video['snippet']['thumbnails']['high']['url'],
            'channelTitle': video['snippet']['channelTitle'],
            'publishedAt': video['snippet']['publishedAt'],
            'viewCount': video['statistics'].get('viewCount', 0),
            'likeCount': video['statistics'].get('likeCount', 0),
            'duration': video['contentDetails']['duration'],
            'url': f"https://www.youtube.com/watch?v={video_id}"
        }

        return jsonify({
            'success': True,
            'video': video_data
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
