import React, { useState, useCallback } from 'react'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Fade,
  Chip,
  Grow,
  useTheme,
  useMediaQuery,
  Skeleton
} from '@mui/material'
import {
  Favorite,
  FavoriteBorder,
  Share,
  Refresh,
  TouchApp
} from '@mui/icons-material'
import ShareButton from './ShareButton'

interface QuoteCardProps {
  quote?: {
    id: string
    content: string
    like_count: number
  }
  loading?: boolean
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote = {
    id: 'sample',
    content: '가장 어두운 밤도 곧 끝날 것이다.',
    like_count: 127
  },
  loading = false
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(quote.like_count)
  const [likeAnimating, setLikeAnimating] = useState(false)

  const handleLike = useCallback(() => {
    if (!liked && !likeAnimating) {
      setLikeAnimating(true)
      setLiked(true)
      setLikeCount(prev => prev + 1)

      // 애니메이션 종료 후 상태 리셋
      setTimeout(() => {
        setLikeAnimating(false)
      }, 600)

      // TODO: API 호출
    }
  }, [liked, likeAnimating])

  const handleNextQuote = useCallback(() => {
    // TODO: 다음 글 로딩
    console.log('다음 글 요청')
  }, [])

  if (loading) {
    return (
      <Card
        sx={{
          maxWidth: isMobile ? '100%' : isTablet ? 500 : 600,
          mx: 'auto',
          borderRadius: isMobile ? 3 : 4,
          boxShadow: '0 12px 40px rgba(156, 175, 136, 0.15)',
        }}
      >
        <CardContent sx={{ p: isMobile ? 4 : 6 }}>
          <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={40} sx={{ mb: 4 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }


  return (
    <Fade in={true} timeout={800}>
      <Card
        sx={{
          maxWidth: isMobile ? '100%' : isTablet ? 500 : 600,
          mx: 'auto',
          borderRadius: isMobile ? 3 : 4,
          boxShadow: {
            xs: '0 8px 24px rgba(156, 175, 136, 0.12)',
            sm: '0 12px 40px rgba(156, 175, 136, 0.15)',
          },
          background: {
            xs: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,243,233,0.8) 100%)',
            sm: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(247,243,233,0.6) 100%)',
          },
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: isMobile ? 'none' : 'translateY(-4px)',
            boxShadow: isMobile
              ? '0 8px 24px rgba(156, 175, 136, 0.12)'
              : '0 16px 48px rgba(156, 175, 136, 0.2)',
          },
        }}
      >
        <CardContent sx={{
          p: {
            xs: 3,
            sm: 4,
            md: 6
          }
        }}>
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            sx={{
              mb: {
                xs: 3,
                sm: 4
              },
              color: 'text.primary',
              fontWeight: 300,
              lineHeight: {
                xs: 1.6,
                sm: 1.8
              },
              letterSpacing: '0.5px',
              minHeight: {
                xs: '80px',
                sm: '100px',
                md: '120px'
              },
              fontSize: {
                xs: '1.4rem',
                sm: '1.8rem',
                md: '2rem'
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
            }}
          >
            "{quote.content}"
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'stretch' : 'center',
              pt: {
                xs: 2,
                sm: 2
              },
              borderTop: '1px solid rgba(0,0,0,0.08)',
              gap: isMobile ? 2 : 0,
            }}
          >
            {/* 공감 영역 */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <Grow in={!likeAnimating}>
                <IconButton
                  onClick={handleLike}
                  disabled={likeAnimating}
                  sx={{
                    color: liked ? 'secondary.main' : 'text.secondary',
                    transform: likeAnimating ? 'scale(1.3)' : 'scale(1)',
                    background: liked
                      ? 'linear-gradient(135deg, rgba(212, 165, 165, 0.2) 0%, rgba(212, 165, 165, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(247, 243, 233, 0.2) 100%)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(156, 175, 136, 0.15)',
                    borderRadius: '12px',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(212, 165, 165, 0.3) 0%, rgba(212, 165, 165, 0.4) 100%)',
                      color: 'secondary.main',
                      transform: 'scale(1.1) translateY(-1px)',
                      boxShadow: '0 4px 16px rgba(212, 165, 165, 0.25)',
                      border: '1px solid rgba(212, 165, 165, 0.3)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                  }}
                >
                  {liked ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Grow>

              <Chip
                icon={<TouchApp sx={{ fontSize: '16px !important' }} />}
                label={isMobile
                  ? `${likeCount}`
                  : `${likeCount}명이 공감했어요`
                }
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  background: 'linear-gradient(135deg, rgba(212, 165, 165, 0.15) 0%, rgba(212, 165, 165, 0.25) 100%)',
                  color: 'secondary.dark',
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.85rem'
                  },
                  fontWeight: 500,
                  border: '1px solid rgba(212, 165, 165, 0.2)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(212, 165, 165, 0.3) 0%, rgba(212, 165, 165, 0.5) 100%)',
                    color: 'white',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(212, 165, 165, 0.3)',
                  },
                }}
              />
            </Box>

            {/* 액션 버튼 영역 */}
            <Box sx={{
              display: 'flex',
              gap: 1,
              justifyContent: isMobile ? 'center' : 'flex-end'
            }}>
              <ShareButton
                quote={quote}
                size={isMobile ? 'small' : 'medium'}
              />

              <IconButton
                onClick={handleNextQuote}
                sx={{
                  color: 'text.secondary',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(247, 243, 233, 0.2) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(156, 175, 136, 0.15)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(156, 175, 136, 0.3) 0%, rgba(156, 175, 136, 0.4) 100%)',
                    color: 'primary.main',
                    transform: 'rotate(180deg) translateY(-1px)',
                    boxShadow: '0 4px 16px rgba(156, 175, 136, 0.25)',
                    border: '1px solid rgba(156, 175, 136, 0.3)',
                  },
                }}
              >
                <Refresh />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  )
}

export default QuoteCard