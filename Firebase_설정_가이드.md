# Firebase 설정 가이드

## 1. Firebase 프로젝트 생성

### 1.1. Firebase Console 접속
1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: `one-sentence-platform` 입력
4. Google 애널리틱스 설정 (선택사항)
5. 프로젝트 생성 완료

### 1.2. Firestore Database 설정
1. 프로젝트 대시보드에서 "Firestore Database" 선택
2. "데이터베이스 만들기" 클릭
3. **테스트 모드**로 시작 (나중에 보안 규칙 설정)
4. 위치: `asia-northeast3 (서울)` 선택
5. "완료" 클릭

### 1.3. 웹 앱 등록
1. 프로젝트 설정 > 일반 탭
2. "앱 추가" > 웹 아이콘 클릭
3. 앱 이름: `one-sentence-web` 입력
4. Firebase Hosting 설정 (선택)
5. **Firebase 구성 정보 복사** (중요!)

```javascript
// 예시 Firebase 구성 (실제 값으로 교체 필요)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 2. 서비스 계정 키 생성 (백엔드용)

### 2.1. 서비스 계정 생성
1. 프로젝트 설정 > 서비스 계정 탭
2. "새 비공개 키 생성" 클릭
3. JSON 형식 선택
4. **키 파일 다운로드 및 안전한 곳에 보관**

### 2.2. 환경 변수 설정
다운로드한 JSON 파일에서 다음 정보 추출:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "123456789"
}
```

## 3. Firestore 보안 규칙 설정

### 3.1. 기본 보안 규칙
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // quotes 컬렉션 - 읽기는 모든 사용자, 쓰기는 관리자만
    match /quotes/{document} {
      allow read: if true;
      allow write: if false; // 관리자 전용
    }

    // submissions 컬렉션 - 생성은 모든 사용자, 읽기/수정은 관리자만
    match /submissions/{document} {
      allow create: if true;
      allow read, update, delete: if false; // 관리자 전용
    }
  }
}
```

### 3.2. 보안 규칙 배포
1. Firestore Database > 규칙 탭
2. 위 규칙 복사해서 붙여넣기
3. "게시" 클릭

## 4. 프론트엔드 설정

### 4.1. Firebase 구성 파일 생성
```bash
# frontend/.env 파일 생성
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### 4.2. Firebase 초기화
이미 구현된 파일들:
- `frontend/src/config/firebase.ts` - Firebase 초기화
- `frontend/src/services/` - API 서비스들

## 5. 백엔드 설정

### 5.1. 환경 변수 설정
```bash
# backend/.env 파일 생성
NODE_ENV=development
PORT=5000

# Firebase 설정 (서비스 계정 JSON에서 추출)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id

FRONTEND_URL=http://localhost:3000
```

### 5.2. 초기 데이터 추가
Firestore에 기본 글귀 데이터 추가를 위한 스크립트가 필요합니다.

## 6. 실행 순서

### 6.1. 의존성 설치
```bash
# 프론트엔드
cd frontend
npm install

# 백엔드
cd ../backend
npm install
```

### 6.2. 환경 변수 설정
1. `frontend/.env` 파일 생성 후 Firebase 웹 구성 정보 입력
2. `backend/.env` 파일 생성 후 서비스 계정 정보 입력

### 6.3. 개발 서버 실행
```bash
# 터미널 1: 백엔드 실행
cd backend
npm run dev

# 터미널 2: 프론트엔드 실행
cd frontend
npm run dev
```

### 6.4. 접속 확인
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:5000

## 7. 주의사항

### 7.1. 보안
- `.env` 파일은 절대 Git에 커밋하지 않기
- 서비스 계정 키 파일 안전하게 관리
- 프로덕션에서는 환경 변수로 설정

### 7.2. 방화벽/네트워크
- Firebase 접속을 위한 네트워크 권한 확인
- 로컬 개발시 CORS 설정 확인

## 8. 문제 해결

### 8.1. Firebase 연결 실패
- API 키와 프로젝트 ID 정확성 확인
- 네트워크 연결 상태 확인
- Firebase 프로젝트 활성화 상태 확인

### 8.2. 권한 오류
- Firestore 보안 규칙 확인
- 서비스 계정 권한 확인
- 프로젝트 멤버 권한 확인

이제 Firebase 프로젝트를 생성하고 위 가이드를 따라 설정해주세요!