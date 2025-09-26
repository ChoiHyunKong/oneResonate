import { useState, useCallback } from 'react'

export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
}

/**
 * 스낵바 상태를 관리하는 커스텀 훅
 * ShareButton과 다른 컴포넌트에서 공통으로 사용할 수 있습니다.
 */
export const useSnackbar = (initialState: Partial<SnackbarState> = {}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
    ...initialState
  })

  const showSnackbar = useCallback((
    message: string,
    severity: SnackbarState['severity'] = 'success'
  ) => {
    setSnackbar({
      open: true,
      message,
      severity
    })
  }, [])

  const hideSnackbar = useCallback(() => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }))
  }, [])

  const showSuccess = useCallback((message: string) => {
    showSnackbar(message, 'success')
  }, [showSnackbar])

  const showError = useCallback((message: string) => {
    showSnackbar(message, 'error')
  }, [showSnackbar])

  const showWarning = useCallback((message: string) => {
    showSnackbar(message, 'warning')
  }, [showSnackbar])

  const showInfo = useCallback((message: string) => {
    showSnackbar(message, 'info')
  }, [showSnackbar])

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}