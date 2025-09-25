// 공통 타입 정의
export interface Quote {
  id: string
  type: 'quote' | 'text'
  content: string
  like_count: number
  last_shown_date?: string
  status: 'published' | 'hidden'
  created_at?: Date
  updated_at?: Date
}

export interface Submission {
  id?: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: Date
  reviewed_at?: Date
  reviewer_note?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface TodayQuoteResponse {
  quote: Quote
  next_quotes?: Quote[]
}

export interface LikeResponse {
  like_count: number
  success: boolean
}

export interface SubmissionRequest {
  content: string
}

export interface ShareData {
  title: string
  text: string
  url: string
  image?: string
}