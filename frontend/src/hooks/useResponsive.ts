import { useTheme, useMediaQuery } from '@mui/material'

/**
 * 반응형 디자인을 위한 커스텀 훅
 * 모든 컴포넌트에서 동일한 breakpoint 로직을 재사용할 수 있습니다.
 */
export const useResponsive = () => {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  // 반응형 크기 값들을 반환하는 유틸리티 함수들
  const getSize = (mobile: number | string, tablet?: number | string, desktop?: number | string) => {
    if (isMobile) return mobile
    if (isTablet && tablet) return tablet
    if (desktop) return desktop
    return mobile
  }

  const getResponsiveValue = <T>(values: {
    xs?: T
    sm?: T
    md?: T
    lg?: T
    xl?: T
  }): T | undefined => {
    if (isMobile && values.xs) return values.xs
    if (isTablet && values.sm) return values.sm
    if (!isSmallScreen && values.md) return values.md
    if (isDesktop && values.lg) return values.lg
    if (values.xl) return values.xl

    // 기본값 폴백
    return values.xs || values.sm || values.md || values.lg || values.xl
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    getSize,
    getResponsiveValue,
    breakpoints: theme.breakpoints
  }
}