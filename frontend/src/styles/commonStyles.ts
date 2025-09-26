import { SxProps, Theme } from '@mui/material/styles'
import { COLORS, SIZES } from '@/constants'

/**
 * 공통 IconButton 스타일
 * QuoteCard와 ShareButton에서 사용되는 동일한 스타일을 통합
 */
export const createIconButtonStyle = (options: {
  backgroundColor?: string
  hoverBackgroundColor?: string
  color?: string
  hoverColor?: string
  size?: number
  additionalStyles?: SxProps<Theme>
} = {}): SxProps<Theme> => {
  const {
    backgroundColor = COLORS.BACKGROUND_OVERLAY,
    hoverBackgroundColor = COLORS.PRIMARY,
    color = COLORS.TEXT_SECONDARY,
    hoverColor = 'white',
    size = SIZES.ICON_BUTTON.WIDTH,
    additionalStyles = {}
  } = options

  return {
    width: size,
    height: size,
    backgroundColor,
    color,
    border: `1px solid ${COLORS.BORDER_LIGHT}`,
    borderRadius: SIZES.ICON_BUTTON.BORDER_RADIUS,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: hoverBackgroundColor,
      color: hoverColor,
      transform: 'scale(1.05)',
      boxShadow: `0 4px 12px ${COLORS.PRIMARY}4D`, // 4D는 30% opacity
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
    ...additionalStyles
  }
}

/**
 * 중앙 정렬 Box 스타일
 * 여러 컴포넌트에서 사용되는 중앙 정렬 패턴을 통합
 */
export const createCenterBoxStyle = (options: {
  direction?: 'row' | 'column'
  spacing?: number | Record<string, number>
  padding?: number | Record<string, number>
  additionalStyles?: SxProps<Theme>
} = {}): SxProps<Theme> => {
  const {
    direction = 'column',
    spacing,
    padding,
    additionalStyles = {}
  } = options

  return {
    display: 'flex',
    flexDirection: direction,
    justifyContent: 'center',
    alignItems: 'center',
    ...(spacing && { gap: spacing }),
    ...(padding && { p: padding }),
    ...additionalStyles
  }
}

/**
 * 페이드인 애니메이션 스타일
 * 공통으로 사용되는 페이드인 애니메이션 키프레임
 */
export const fadeInUpAnimation: SxProps<Theme> = {
  animation: 'fadeInUp 1.2s ease-out',
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(30px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}

/**
 * 하트비트 애니메이션 스타일
 */
export const createHeartbeatAnimation = (delay: number = 0): SxProps<Theme> => ({
  animation: `heartbeat ${1 + delay * 0.2}s ease-in-out infinite`,
  '@keyframes heartbeat': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
  }
})

/**
 * 반응형 패딩 스타일
 * 일관된 반응형 패딩을 제공
 */
export const responsivePadding: SxProps<Theme> = {
  py: { xs: 4, sm: 6, md: 8 },
  px: { xs: 2, sm: 3, md: 4 }
}

/**
 * 반응형 텍스트 스타일
 */
export const createResponsiveTypography = (options: {
  fontSize: { xs: string, sm?: string, md?: string }
  fontWeight?: number
  lineHeight?: number | Record<string, number>
  letterSpacing?: string
  additionalStyles?: SxProps<Theme>
} = { fontSize: { xs: '1rem' } }): SxProps<Theme> => {
  const {
    fontSize,
    fontWeight = 300,
    lineHeight = 1.7,
    letterSpacing = '0.5px',
    additionalStyles = {}
  } = options

  return {
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
    ...additionalStyles
  }
}

/**
 * 공통 카드 스타일
 */
export const createCardStyle = (options: {
  maxWidth?: number | Record<string, number | string>
  borderRadius?: number | Record<string, number>
  padding?: number | Record<string, number>
  additionalStyles?: SxProps<Theme>
} = {}): SxProps<Theme> => {
  const {
    maxWidth,
    borderRadius,
    padding,
    additionalStyles = {}
  } = options

  return {
    ...(maxWidth && { maxWidth }),
    mx: 'auto',
    ...(borderRadius && { borderRadius }),
    ...(padding && { p: padding }),
    boxShadow: {
      xs: '0 8px 24px rgba(156, 175, 136, 0.12)',
      sm: '0 12px 40px rgba(156, 175, 136, 0.15)',
    },
    ...additionalStyles
  }
}

/**
 * 버튼 호버 효과 스타일
 */
export const buttonHoverEffect: SxProps<Theme> = {
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${COLORS.PRIMARY}66`, // 66은 40% opacity
  },
  '&:active': {
    transform: 'translateY(0px)',
  }
}

/**
 * 리스트 아이템 호버 효과
 */
export const listItemHoverEffect: SxProps<Theme> = {
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(156, 175, 136, 0.3)',
  }
}