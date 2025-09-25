import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

import quoteRoutes from '@/routes/quotes.js'
import submissionRoutes from '@/routes/submissions.js'
import { errorHandler } from '@/middleware/errorHandler.js'
import { initializeFirebase } from '@/config/firebase.js'
import { startScheduler } from '@/services/scheduler.js'

// 환경 변수 로드
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// 미들웨어 설정
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-domain.com']
    : ['http://localhost:3000'],
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 최대 요청 수
  message: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
})
app.use('/api', limiter)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// 헬스 체크
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API 라우트
app.use('/api/quotes', quoteRoutes)
app.use('/api/submissions', submissionRoutes)

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '요청한 리소스를 찾을 수 없습니다.'
  })
})

// 에러 핸들러
app.use(errorHandler)

// 서버 시작
async function startServer() {
  try {
    // Firebase 초기화
    await initializeFirebase()
    console.log('✅ Firebase 초기화 완료')

    // 스케줄러 시작 (오늘의 글 선정)
    startScheduler()
    console.log('✅ 스케줄러 시작')

    // 서버 시작
    app.listen(PORT, () => {
      console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다.`)
      console.log(`🌍 환경: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('❌ 서버 시작 실패:', error)
    process.exit(1)
  }
}

startServer()

export default app