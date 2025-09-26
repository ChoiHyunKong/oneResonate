// 애니메이션 및 타이밍 상수
export const ANIMATION_DURATION = {
  SHORT: 600,
  MEDIUM: 1000,
  LONG: 2000,
  VERY_SHORT: 300,
  TRANSITION: 800
} as const

// 색상 상수
export const COLORS = {
  PRIMARY: '#9CAF88',
  PRIMARY_LIGHT: '#B8C5A3',
  PRIMARY_DARK: '#7A8A6B',
  TEXT_PRIMARY: '#2c2c2c',
  TEXT_SECONDARY: '#666',
  TEXT_LIGHT: '#999',
  BACKGROUND_OVERLAY: 'rgba(0,0,0,0.04)',
  BORDER_LIGHT: 'rgba(0,0,0,0.08)',
  WHITE_OVERLAY: 'rgba(255,255,255,0.9)',
  SUCCESS: '#9CAF88',
  ERROR: '#f44336'
} as const

// 컴포넌트 크기 상수
export const SIZES = {
  ICON_BUTTON: {
    WIDTH: 48,
    HEIGHT: 48,
    BORDER_RADIUS: '50%'
  },
  FORM_CARD: {
    MAX_WIDTH: {
      xs: '100%',
      sm: 500,
      md: 600
    },
    BORDER_RADIUS: {
      xs: 3,
      sm: 4,
      md: 5
    }
  },
  QUOTE_CARD: {
    MAX_WIDTH: {
      xs: 350,
      sm: 500,
      md: 600
    }
  }
} as const

// 텍스트 제한
export const TEXT_LIMITS = {
  QUOTE_MIN_LENGTH: 10,
  QUOTE_MAX_LENGTH: 150
} as const

// Z-Index 레이어
export const Z_INDEX = {
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500
} as const

// 소셜 미디어 색상
export const SOCIAL_COLORS = {
  FACEBOOK: '#1877f2',
  TWITTER: '#1da1f2',
  INSTAGRAM: '#e4405f',
  THREADS: '#000000'
} as const