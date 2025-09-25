import admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

let db: FirebaseFirestore.Firestore

export async function initializeFirebase() {
  try {
    // Firebase Admin SDK 초기화
    if (process.env.NODE_ENV === 'production') {
      // 프로덕션 환경: 서비스 계정 키 파일 사용
      if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        throw new Error('GOOGLE_APPLICATION_CREDENTIALS 환경 변수가 설정되지 않았습니다.')
      }

      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.FIREBASE_PROJECT_ID,
      })
    } else {
      // 개발 환경: 서비스 계정 키 JSON 사용
      const serviceAccount = {
        type: 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
      })
    }

    // Firestore 인스턴스 초기화
    db = getFirestore()

    // Firestore 설정
    db.settings({
      ignoreUndefinedProperties: true,
    })

    console.log('Firebase Admin SDK 초기화 완료')
    return db
  } catch (error) {
    console.error('Firebase 초기화 실패:', error)
    throw error
  }
}

export function getDB(): FirebaseFirestore.Firestore {
  if (!db) {
    throw new Error('Firebase가 초기화되지 않았습니다. initializeFirebase()를 먼저 호출하세요.')
  }
  return db
}

export { admin }