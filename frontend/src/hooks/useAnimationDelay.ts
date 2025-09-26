import { useCallback } from 'react'
import { ANIMATION_DURATION } from '@/constants'

/**
 * 애니메이션 딜레이 및 타이밍을 관리하는 커스텀 훅
 */
export const useAnimationDelay = () => {
  // 타이밍 기반 딜레이 함수
  const createDelay = useCallback((duration: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, duration)
    })
  }, [])

  // 짧은 애니메이션 딜레이
  const shortDelay = useCallback(() => {
    return createDelay(ANIMATION_DURATION.VERY_SHORT)
  }, [createDelay])

  // 중간 애니메이션 딜레이
  const mediumDelay = useCallback(() => {
    return createDelay(ANIMATION_DURATION.SHORT)
  }, [createDelay])

  // 긴 애니메이션 딜레이
  const longDelay = useCallback(() => {
    return createDelay(ANIMATION_DURATION.MEDIUM)
  }, [createDelay])

  // 사용자 정의 딜레이
  const customDelay = useCallback((duration: number) => {
    return createDelay(duration)
  }, [createDelay])

  // 애니메이션 상태 관리를 위한 헬퍼
  const withAnimation = useCallback(async <T>(
    callback: () => T,
    duration: keyof typeof ANIMATION_DURATION = 'SHORT'
  ): Promise<T> => {
    const result = callback()
    await createDelay(ANIMATION_DURATION[duration])
    return result
  }, [createDelay])

  return {
    shortDelay,
    mediumDelay,
    longDelay,
    customDelay,
    withAnimation,
    durations: ANIMATION_DURATION
  }
}