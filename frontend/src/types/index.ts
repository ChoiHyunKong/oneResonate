// Re-export shared types
export * from '../../shared/types'

// Frontend specific types
export interface UIState {
  loading: boolean
  error: string | null
}

export interface QuoteCardProps {
  quote?: {
    id: string
    content: string
    like_count: number
  }
  loading?: boolean
  onLike?: (quoteId: string) => Promise<void>
  onNext?: () => Promise<void>
}

export interface SubmissionFormProps {
  onSubmit?: (content: string) => Promise<void>
}

export interface ShareButtonProps {
  quote: {
    id: string
    content: string
    like_count: number
  }
  size?: 'small' | 'medium' | 'large'
}

// Navigation types
export interface RouteParams {
  id?: string
}

// API Response types
export interface ApiError {
  message: string
  code: string
  details?: any
}