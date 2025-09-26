import React from 'react'
import { Box } from '@mui/material'
import QuoteCard from '@/components/QuoteCard'
import { createCenterBoxStyle, responsivePadding } from '@/styles/commonStyles'

const MainPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '50vh',
        ...createCenterBoxStyle(),
        ...responsivePadding
      } as any}
    >
      <QuoteCard />
    </Box>
  )
}

export default MainPage