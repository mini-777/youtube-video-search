# 🎥 YouTube 동영상 검색 웹 애플리케이션

YouTube API를 활용한 동영상 검색 및 정보 조회 웹 애플리케이션입니다. Flask 백엔드와 React 프론트엔드로 구성되어 있으며, Vercel에 배포됩니다.

## ✨ 주요 기능

- 🔍 **동영상 검색**: 키워드로 YouTube 동영상 검색
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원
- 🎯 **상세 정보**: 동영상 제목, 설명, 채널, 조회수 등 표시
- 🚀 **빠른 로딩**: 최적화된 성능과 사용자 경험
- 🎨 **모던 UI**: 아름답고 직관적인 사용자 인터페이스

## 🛠 기술 스택

### 백엔드 (Flask)

- **Flask**: Python 웹 프레임워크
- **Google API Client**: YouTube Data API v3 연동
- **Flask-CORS**: CORS 처리

### 프론트엔드 (React)

- **React 18**: 최신 React 버전
- **TypeScript**: 타입 안정성
- **Lucide React**: 아이콘 라이브러리
- **CSS3**: 모던 스타일링 (Grid, Flexbox, Animations)

### 배포

- **Vercel**: 서버리스 배포 플랫폼

## 📁 프로젝트 구조

```
youtube-video-search/
├── api/
│   └── index.py              # Flask API 서버
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # React 컴포넌트
│   │   │   ├── SearchForm.tsx
│   │   │   ├── VideoList.tsx
│   │   │   ├── VideoCard.tsx
│   │   │   ├── VideoModal.tsx
│   │   │   └── *.css
│   │   ├── types/
│   │   │   └── Video.ts      # TypeScript 타입 정의
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
├── requirements.txt          # Python 의존성
├── vercel.json              # Vercel 배포 설정
└── README.md
```

## 🚀 로컬 개발 환경 설정

### 1. 저장소 클론

```bash
git clone <repository-url>
cd youtube-video-search
```

### 2. YouTube API 키 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. YouTube Data API v3 활성화
3. API 키 생성
4. 환경변수 설정:

```bash
export YOUTUBE_API_KEY=your_api_key_here
```

### 3. 백엔드 설정

```bash
# Python 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# Flask 서버 실행
cd api
python index.py
```

### 4. 프론트엔드 설정

```bash
# 새 터미널에서
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

## 🌐 Vercel 배포

### 1. Vercel CLI 설치

```bash
npm i -g vercel
```

### 2. 환경변수 설정

Vercel 대시보드에서 다음 환경변수를 설정:

- `YOUTUBE_API_KEY`: YouTube API 키

### 3. 배포

```bash
vercel --prod
```

## 📖 API 엔드포인트

### POST `/api/search`

YouTube 동영상 검색

**요청 본문:**

```json
{
  "query": "검색어",
  "maxResults": 10
}
```

**응답:**

```json
{
  "success": true,
  "videos": [
    {
      "id": "video_id",
      "title": "동영상 제목",
      "description": "동영상 설명",
      "thumbnail": "썸네일 URL",
      "channelTitle": "채널명",
      "publishedAt": "2024-01-01T00:00:00Z",
      "url": "https://www.youtube.com/watch?v=video_id"
    }
  ],
  "totalResults": 10
}
```

### GET `/api/video/<video_id>`

특정 동영상 상세 정보 조회

**응답:**

```json
{
  "success": true,
  "video": {
    "id": "video_id",
    "title": "동영상 제목",
    "description": "동영상 설명",
    "thumbnail": "고화질 썸네일 URL",
    "channelTitle": "채널명",
    "publishedAt": "2024-01-01T00:00:00Z",
    "viewCount": 1000000,
    "likeCount": 50000,
    "duration": "PT10M30S",
    "url": "https://www.youtube.com/watch?v=video_id"
  }
}
```

## 🎨 주요 컴포넌트

### SearchForm

- 검색어 입력 및 결과 수 설정
- 실시간 검색 상태 표시
- 반응형 디자인

### VideoList

- 검색 결과를 그리드 형태로 표시
- 무한 스크롤 지원 (향후 추가 예정)

### VideoCard

- 개별 동영상 정보 카드
- 호버 효과 및 애니메이션
- 썸네일, 제목, 채널, 날짜 표시

### VideoModal

- 동영상 상세 정보 모달
- 조회수, 좋아요 수 등 추가 정보
- YouTube 링크 연결

## 🔧 개발 도구

### 코드 품질

- **TypeScript**: 타입 안정성
- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅 (권장)

### 테스팅

```bash
# 프론트엔드 테스트
cd frontend
npm test
```

## 📱 반응형 디자인

- **모바일**: 320px ~ 768px
- **태블릿**: 768px ~ 1024px
- **데스크톱**: 1024px 이상

## 🚀 성능 최적화

- **이미지 최적화**: 썸네일 lazy loading
- **코드 분할**: React.lazy() 사용 (향후 추가)
- **캐싱**: API 응답 캐싱 (향후 추가)
- **압축**: Gzip 압축 적용

## 🔒 보안

- **API 키 보호**: 환경변수로 관리
- **CORS 설정**: 적절한 CORS 정책
- **입력 검증**: 사용자 입력 검증

## 🐛 문제 해결

### 일반적인 문제들

1. **API 키 오류**

   - YouTube API 키가 올바르게 설정되었는지 확인
   - API 할당량 초과 여부 확인

2. **CORS 오류**

   - Flask-CORS가 올바르게 설정되었는지 확인
   - 개발 환경에서는 프록시 설정 확인

3. **빌드 오류**
   - Node.js 버전 확인 (16+ 권장)
   - 의존성 재설치: `rm -rf node_modules && npm install`

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
