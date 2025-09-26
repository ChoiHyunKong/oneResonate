import React, { useState, useCallback } from 'react'
import {
  Typography,
  IconButton,
  Box,
  Fade,
  Chip,
  Skeleton
} from '@mui/material'
import {
  Favorite,
  FavoriteBorder,
  Refresh,
  TouchApp
} from '@mui/icons-material'
import ShareButton from './ShareButton'
import { useResponsive, useAnimationDelay } from '@/hooks'
import { COLORS, SIZES, ANIMATION_DURATION } from '@/constants'
import {
  createIconButtonStyle,
  fadeInUpAnimation
} from '@/styles/commonStyles'

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
  const { isMobile } = useResponsive()
  useAnimationDelay()

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
      }, ANIMATION_DURATION.SHORT)

      // TODO: API 호출
    }
  }, [liked, likeAnimating])

  const handleNextQuote = useCallback(() => {
    // TODO: 다음 글 로딩
    console.log('다음 글 요청')
  }, [])

  if (loading) {
    return (
      <Box
        sx={{
          maxWidth: SIZES.QUOTE_CARD.MAX_WIDTH,
          mx: 'auto',
          textAlign: 'center',
          py: { xs: 4, sm: 6 },
          px: { xs: 3, sm: 4 }
        }}
      >
        <Skeleton variant="text" height={80} sx={{ mb: 4, borderRadius: 2 }} />
        <Skeleton variant="text" height={40} sx={{ mb: 2, borderRadius: 2 }} />
        <Skeleton variant="text" height={40} sx={{ mb: 6, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="circular" width={48} height={48} />
        </Box>
      </Box>
    )
  }


  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          maxWidth: SIZES.QUOTE_CARD.MAX_WIDTH,
          mx: 'auto',
          textAlign: 'center',
          py: { xs: 4, sm: 6 },
          px: { xs: 3, sm: 4 },
          ...fadeInUpAnimation
        }}
      >
        {/* 명언 텍스트 */}
        <Typography
          sx={{
            mb: { xs: 6, sm: 8 },
            color: COLORS.TEXT_PRIMARY,
            fontWeight: 300,
            lineHeight: { xs: 1.7, sm: 1.8 },
            letterSpacing: '0.5px',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.2rem'
            },
            textAlign: 'center',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
            minHeight: { xs: '60px', sm: '80px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              fontSize: { xs: '3rem', sm: '4rem' },
              color: COLORS.PRIMARY,
              position: 'absolute',
              left: { xs: -15, sm: -20 },
              top: { xs: -15, sm: -20 },
              opacity: 0.3,
              fontFamily: 'serif'
            },
            '&::after': {
              content: '""',
              fontSize: { xs: '3rem', sm: '4rem' },
              color: COLORS.PRIMARY,
              position: 'absolute',
              right: { xs: -15, sm: -20 },
              bottom: { xs: -15, sm: -20 },
              opacity: 0.3,
              fontFamily: 'serif'
            }
          }}
        >
          {quote.content}
        </Typography>

        {/* 버튼 영역 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 3, sm: 2 },
          }}
        >
          {/* 공감 영역 */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            order: { xs: 2, sm: 1 }
          }}>
            <IconButton
              onClick={handleLike}
              disabled={likeAnimating}
              sx={{
                ...createIconButtonStyle({
                  backgroundColor: liked ? COLORS.PRIMARY : COLORS.BACKGROUND_OVERLAY,
                  color: liked ? 'white' : COLORS.TEXT_SECONDARY,
                  hoverBackgroundColor: COLORS.PRIMARY
                }),
                transform: likeAnimating ? 'scale(1.2)' : 'scale(1)'
              }}
            >
              {liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>

            <Chip
              icon={<TouchApp sx={{ fontSize: '16px !important' }} />}
              label={isMobile
                ? `${likeCount}`
                : `${likeCount}명이 공감`
              }
              size={isMobile ? 'small' : 'medium'}
              sx={{
                backgroundColor: COLORS.BACKGROUND_OVERLAY,
                color: COLORS.TEXT_SECONDARY,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                fontWeight: 400,
                border: `1px solid ${COLORS.BORDER_LIGHT}`,
                borderRadius: '20px',
                height: { xs: 28, sm: 32 },
                '&:hover': {
                  backgroundColor: `${COLORS.PRIMARY}1A`, // 1A는 10% opacity
                  color: COLORS.PRIMARY
                }
              }}
            />
          </Box>

          {/* 액션 버튼 영역 */}
          <Box sx={{
            display: 'flex',
            gap: 1.5,
            order: { xs: 1, sm: 2 }
          }}>
            <ShareButton
              quote={quote}
            />

            <IconButton
              onClick={handleNextQuote}
              sx={{
                ...createIconButtonStyle(),
                '&:hover': {
                  backgroundColor: COLORS.PRIMARY,
                  color: 'white',
                  transform: 'rotate(180deg) scale(1.05)',
                  boxShadow: `0 4px 12px ${COLORS.PRIMARY}4D`,
                }
              }}
            >
              <Refresh />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}

export default QuoteCard