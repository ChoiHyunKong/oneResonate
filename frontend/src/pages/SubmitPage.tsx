import React from 'react'
import {
  Box,
  Typography,
  Container,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Edit, Favorite } from '@mui/icons-material'
import SubmissionForm from '@/components/SubmissionForm'

const SubmitPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSubmit = async (content: string) => {
    console.log('제출된 글:', content)

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve()
        } else {
          reject(new Error('서버 오류'))
        }
      }, 2000)
    })
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Fade in={true} timeout={600}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Box sx={{ mb: 2 }}>
            <Edit
              sx={{
                fontSize: { xs: '3rem', sm: '4rem' },
                color: 'primary.main',
                mb: 1
              }}
            />
          </Box>

          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            sx={{
              mb: 2,
              fontWeight: 300,
              color: 'text.primary',
              letterSpacing: '0.5px'
            }}
          >
            따뜻한 마음을 나눠주세요
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              maxWidth: 500,
              mx: 'auto',
              fontSize: { xs: '0.95rem', sm: '1.1rem' }
            }}
          >
            당신의 경험에서 우러나온 위로의 말이
            <br />
            누군가에게는 큰 힘이 될 수 있어요.
          </Typography>

          <Box sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            opacity: 0.6
          }}>
            {[1, 2, 3].map((i) => (
              <Favorite
                key={i}
                sx={{
                  fontSize: '1rem',
                  color: 'secondary.main',
                  animation: `heartbeat ${1 + i * 0.2}s ease-in-out infinite`,
                  '@keyframes heartbeat': {
                    '0%, 100%': {
                      transform: 'scale(1)',
                    },
                    '50%': {
                      transform: 'scale(1.1)',
                    },
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Fade>

      <SubmissionForm onSubmit={handleSubmit} />

      <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
        <Box sx={{
          mt: { xs: 4, sm: 6 },
          p: { xs: 3, sm: 4 },
          backgroundColor: 'rgba(156, 175, 136, 0.08)',
          borderRadius: 3,
          textAlign: 'center',
          border: '1px solid rgba(156, 175, 136, 0.1)'
        }}>
          <Typography
            variant="body2"
            sx={{
              color: 'primary.dark',
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}
          >
            "작은 친절이 큰 변화를 만들어냅니다.
            <br />
            당신의 따뜻한 마음이 세상을 더 아름답게 만들어요."
          </Typography>
        </Box>
      </Fade>
    </Container>
  )
}

export default SubmitPage