import React, { useState, useRef } from 'react'
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  Chip,
  Fade,
  Zoom,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  Send,
  Clear,
  Lightbulb,
  FormatQuote,
  Check
} from '@mui/icons-material'
import { useResponsive, useAnimationDelay } from '@/hooks'
import { COLORS, TEXT_LIMITS, ANIMATION_DURATION } from '@/constants'
import {
  createCardStyle,
  buttonHoverEffect
} from '@/styles/commonStyles'

interface SubmissionFormProps {
  onSubmit?: (content: string) => Promise<void>
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit }) => {
  const { isMobile, isTablet } = useResponsive()
  useAnimationDelay()

  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [charCount, setCharCount] = useState(0)
  const textFieldRef = useRef<HTMLTextAreaElement>(null)

  const maxLength = TEXT_LIMITS.QUOTE_MAX_LENGTH
  const minLength = TEXT_LIMITS.QUOTE_MIN_LENGTH

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    if (value.length <= maxLength) {
      setContent(value)
      setCharCount(value.length)
    }
  }

  const handleClear = () => {
    setContent('')
    setCharCount(0)
    if (textFieldRef.current) {
      textFieldRef.current.focus()
    }
  }

  const handleSubmit = async () => {
    if (content.trim().length < minLength) {
      setSubmitStatus({
        type: 'error',
        message: `최소 ${minLength}글자 이상 입력해주세요.`
      })
      return
    }

    if (content.trim().length > maxLength) {
      setSubmitStatus({
        type: 'error',
        message: `최대 ${maxLength}글자까지만 입력할 수 있습니다.`
      })
      return
    }

    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(content.trim())
      } else {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION.LONG))
      }

      setSubmitStatus({
        type: 'success',
        message: '소중한 글귀를 제출해주셔서 감사합니다! 검토 후 게시될 예정입니다.'
      })
      setContent('')
      setCharCount(0)
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: '제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCharCountColor = () => {
    if (charCount < minLength) return 'text.secondary'
    if (charCount >= maxLength * 0.9) return 'warning.main'
    return 'primary.main'
  }

  const suggestions = [
    '포기하지 않는 한, 실패는 없다',
    '오늘 하루도 수고했어',
    '작은 진전도 진전이다',
    '네가 있어서 다행이야',
  ]

  const handleSuggestionClick = (suggestion: string) => {
    setContent(suggestion)
    setCharCount(suggestion.length)
  }

  return (
    <Fade in={true} timeout={800}>
      <Card
        sx={{
          ...createCardStyle({
            maxWidth: isMobile ? '100%' : isTablet ? 500 : 600,
            borderRadius: isMobile ? 3 : 4
          } as any),
          background: {
            xs: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,243,233,0.8) 100%)',
            sm: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(247,243,233,0.6) 100%)',
          },
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(156, 175, 136, 0.1)',
        }}
      >
        <CardContent sx={{
          p: {
            xs: 3,
            sm: 4,
            md: 5
          }
        }}>
          {/* 헤더 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <FormatQuote
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem' },
                color: 'primary.main',
                mb: 1
              }}
            />
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{
                mb: 1,
                fontWeight: 300,
                color: 'text.primary',
                letterSpacing: '0.5px'
              }}
            >
              따뜻한 글귀 제안하기
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.6
              }}
            >
              다른 이들에게 위로가 될 수 있는 문장을 나눠주세요
            </Typography>
          </Box>

          {/* 제안 칩들 */}
          <Zoom in={true} style={{ transitionDelay: '400ms' }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Lightbulb sx={{ color: 'primary.main', mr: 1, fontSize: '1.1rem' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                  이런 문장들은 어떠세요?
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center'
              }}>
                {suggestions.map((suggestion, index) => (
                  <Chip
                    key={index}
                    label={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{
                      backgroundColor: 'primary.light',
                      color: 'primary.dark',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: COLORS.PRIMARY,
                        color: 'white',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      },
                    }}
                  />
                ))}      </Box>
            </Box>
          </Zoom>

          {/* 입력 필드 */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                height: '140px',
                width: '100%',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.7)',
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderColor: 'rgba(0, 0, 0, 0.87)'
                },
                '&:focus-within': {
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderColor: COLORS.PRIMARY,
                  borderWidth: '2px'
                }
              }}
            >
              <textarea
                ref={textFieldRef}
                value={content}
                onChange={handleContentChange}
                placeholder="마음 깊은 곳에서 우러나오는 따뜻한 문장을 적어주세요..."
                disabled={isSubmitting}
                rows={4}
                cols={50}
                style={{
                  width: '100%',
                  height: '108px',
                  minWidth: '100%',
                  maxWidth: '100%',
                  minHeight: '108px',
                  maxHeight: '108px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  resize: 'none',
                  padding: '16px',
                  fontFamily: 'inherit',
                  fontSize: '1.1rem',
                  lineHeight: '1.4',
                  letterSpacing: '0.3px',
                  color: 'rgba(0, 0, 0, 0.87)',
                  boxSizing: 'border-box',
                  overflow: 'auto',
                  verticalAlign: 'top',
                  display: 'block'
                }}
              />
            </Box>

            {/* 글자수 카운터 */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1,
              px: 1
            }}>
              <Typography
                variant="caption"
                sx={{
                  color: getCharCountColor(),
                  fontWeight: 500
                }}
              >
                {charCount < minLength
                  ? `최소 ${minLength}글자 필요 (현재 ${charCount}글자)`
                  : `${charCount} / ${maxLength}글자`
                }
              </Typography>

              {content && (
                <Tooltip title="내용 지우기">
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                        backgroundColor: 'error.light',
                      },
                    }}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            {/* 진행률 바 */}
            <LinearProgress
              variant="determinate"
              value={Math.min((charCount / maxLength) * 100, 100)}
              sx={{
                mt: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(156, 175, 136, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: charCount >= maxLength * 0.9 ? 'warning.main' : COLORS.PRIMARY,
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* 상태 알림 */}
          {submitStatus.type && (
            <Zoom in={true}>
              <Alert
                severity={submitStatus.type}
                icon={submitStatus.type === 'success' ? <Check /> : undefined}
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-message': {
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  },
                }}
                onClose={() => setSubmitStatus({ type: null, message: '' })}
              >
                {submitStatus.message}
              </Alert>
            </Zoom>
          )}

          {/* 제출 버튼 */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              startIcon={isSubmitting ? undefined : <Send />}
              onClick={handleSubmit}
              disabled={isSubmitting || content.trim().length < minLength}
              sx={{
                minWidth: { xs: 200, sm: 240 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '0.95rem', sm: '1rem' },
                fontWeight: 600,
                backgroundColor: COLORS.PRIMARY,
                borderRadius: 6,
                boxShadow: `0 4px 16px ${COLORS.PRIMARY}4D`,
                ...buttonHoverEffect,
                '&:hover': {
                  backgroundColor: COLORS.PRIMARY_DARK,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 24px ${COLORS.PRIMARY}66`,
                },
                '&:disabled': {
                  backgroundColor: 'action.disabledBackground',
                  color: 'action.disabled',
                  boxShadow: 'none',
                },
              }}
            >
              {isSubmitting ? '제출 중...' : '마음을 전하기'}
            </Button>
          </Box>

          {/* 안내 텍스트 */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 2,
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              lineHeight: 1.4
            }}
          >
            제출된 글귀는 검토를 거쳐 게시됩니다.<br />
            부적절한 내용은 게시되지 않을 수 있습니다.
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  )
}

export default SubmissionForm