import React from 'react'
import {
  Box,
  Typography,
  Fade
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
import SubmissionForm from '@/components/SubmissionForm'
import { useResponsive, useAnimationDelay } from '@/hooks'
import { COLORS, ANIMATION_DURATION } from '@/constants'
import { createCenterBoxStyle, createHeartbeatAnimation, responsivePadding } from '@/styles/commonStyles'

const SubmitPage: React.FC = () => {
  useResponsive()
  useAnimationDelay()

  const handleSubmit = async (content: string) => {
    console.log('제출된 글:', content)

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve()
        } else {
          reject(new Error('서버 오류'))
        }
      }, ANIMATION_DURATION.LONG)
    })
  }

  return (
    <Box
      sx={{
        minHeight: '80vh',
        ...createCenterBoxStyle(),
        ...responsivePadding
      } as any}
    >
      <Box sx={{ display: 'flex', mb: 4, opacity: 0.6 }}>
        {[1, 2, 3].map((i) => (
          <Favorite
            key={i}
            sx={{
              fontSize: '1rem',
              color: COLORS.PRIMARY,
              mx: 0.5,
              ...createHeartbeatAnimation(i)
            }}
          />
        ))}
      </Box>

      <SubmissionForm onSubmit={handleSubmit} />

      <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
        <Typography
          variant="body2"
          sx={{
            mt: { xs: 4, sm: 6 },
            color: COLORS.TEXT_SECONDARY,
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            lineHeight: 1.6,
            fontStyle: 'italic',
            textAlign: 'center',
            maxWidth: 400
          }}
        >
          "작은 친절이 큰 변화를 만들어냅니다.
          <br />
          당신의 따뜻한 마음이 세상을 더 아름답게 만들어요."
        </Typography>
      </Fade>
    </Box>
  )
}

export default SubmitPage