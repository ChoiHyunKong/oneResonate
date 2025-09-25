import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase 구성 - sentence250925 프로젝트
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// 환경 변수 확인
if (!firebaseConfig.projectId) {
  console.error('Firebase 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.')
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)

// Firestore 데이터베이스 인스턴스
export const db = getFirestore(app)

// 개발 환경에서 디버깅
if (import.meta.env.DEV) {
  console.log('Firebase 초기화됨 - Project ID:', firebaseConfig.projectId)
}

export default app