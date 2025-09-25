import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Header from '@/components/Header'
import MainPage from '@/pages/MainPage'
import SubmitPage from '@/pages/SubmitPage'
import AdminPage from '@/pages/AdminPage'

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App