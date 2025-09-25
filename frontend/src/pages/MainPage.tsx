import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import QuoteCard from '@/components/QuoteCard'

const MainPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 3 },
        background: {
          xs: 'linear-gradient(135deg, #F7F3E9 0%, #E8E0D1 50%, #F0EAD8 100%)',
          md: 'radial-gradient(ellipse at center, rgba(247,243,233,0.9) 0%, rgba(232,224,209,0.8) 50%, rgba(240,234,216,0.9) 100%), linear-gradient(135deg, rgba(156,175,136,0.05) 0%, rgba(212,165,165,0.08) 50%, rgba(156,175,136,0.03) 100%)'
        }
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          mb: { xs: 4, sm: 5, md: 6 },
          color: 'text.primary',
          fontWeight: 300,
          opacity: 0.9,
          textShadow: '0 2px 4px rgba(44, 62, 58, 0.1)',
          animation: 'fadeInDown 0.8s ease-out',
          '@keyframes fadeInDown': {
            '0%': {
              opacity: 0,
              transform: 'translateY(-20px)'
            },
            '100%': {
              opacity: 0.9,
              transform: 'translateY(0)'
            }
          }
        }}
      >
        오늘의 문장
      </Typography>

      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { xs: '100%', sm: 500, md: 700, lg: 800 },
          mx: 'auto',
          p: { xs: 3, sm: 4, md: 5 },
          // Liquid Glass Background
          background: {
            xs: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(247,243,233,0.85) 50%, rgba(255,255,255,0.9) 100%)',
            sm: 'linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(247,243,233,0.75) 30%, rgba(255,255,255,0.9) 70%, rgba(232,224,209,0.8) 100%)'
          },
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          // Liquid Glass Border
          borderRadius: { xs: 20, sm: 28, md: 32 },
          border: {
            xs: '1px solid rgba(156, 175, 136, 0.2)',
            sm: '1.5px solid transparent'
          },
          // Enhanced Shadow System
          boxShadow: {
            xs: `
              0 8px 32px rgba(156, 175, 136, 0.15),
              0 4px 16px rgba(212, 165, 165, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `,
            sm: `
              0 20px 60px rgba(156, 175, 136, 0.2),
              0 10px 40px rgba(212, 165, 165, 0.15),
              0 4px 20px rgba(44, 62, 58, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.9),
              inset 0 -1px 0 rgba(156, 175, 136, 0.1)
            `
          },
          // Gradient Border Effect for larger screens
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            padding: '1.5px',
            background: {
              xs: 'none',
              sm: 'linear-gradient(145deg, rgba(156, 175, 136, 0.3) 0%, rgba(212, 165, 165, 0.25) 50%, rgba(156, 175, 136, 0.2) 100%)'
            },
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'exclude',
            maskComposite: 'exclude',
            zIndex: -1
          },
          // Hover Effects
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: {
              xs: 'none',
              sm: 'translateY(-2px) scale(1.005)'
            },
            boxShadow: {
              xs: `
                0 8px 32px rgba(156, 175, 136, 0.15),
                0 4px 16px rgba(212, 165, 165, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.9)
              `,
              sm: `
                0 25px 80px rgba(156, 175, 136, 0.25),
                0 15px 50px rgba(212, 165, 165, 0.2),
                0 5px 25px rgba(44, 62, 58, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.95),
                inset 0 -1px 0 rgba(156, 175, 136, 0.15)
              `
            },
          },
          // Animation
          animation: 'fadeInUp 1s ease-out 0.3s both',
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(40px) scale(0.95)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0) scale(1)'
            }
          },
          textAlign: 'center',
        }}
      >
        <QuoteCard />
      </Paper>
    </Box>
  )
}

export default MainPage