import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Badge,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Skeleton
} from '@mui/material'
import {
  Check,
  Close,
  Dashboard
} from '@mui/icons-material'

interface Submission {
  id: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: Date
  reviewed_at?: Date
  reviewer_note?: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

const AdminPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [tabValue, setTabValue] = useState(0)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [reviewDialog, setReviewDialog] = useState(false)
  const [reviewNote, setReviewNote] = useState('')

  // Mock data
  useEffect(() => {
    const mockSubmissions: Submission[] = [
      {
        id: '1',
        content: '오늘도 수고하셨습니다. 내일은 더 좋은 날이 될 거예요.',
        status: 'pending',
        created_at: new Date('2025-01-15T09:30:00'),
      },
      {
        id: '2',
        content: '작은 진전도 진전이다. 포기하지 말고 계속 해보자.',
        status: 'pending',
        created_at: new Date('2025-01-15T10:15:00'),
      },
    ]

    setTimeout(() => {
      setSubmissions(mockSubmissions)
      setLoading(false)
    }, 1000)
  }, [])

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleReview = (submission: Submission, _: 'approve' | 'reject') => {
    setSelectedSubmission(submission)
    setReviewNote('')
    setReviewDialog(true)
  }

  const handleReviewSubmit = (action: 'approve' | 'reject') => {
    if (!selectedSubmission) return

    const updatedSubmissions = submissions.map(sub =>
      sub.id === selectedSubmission.id
        ? {
            ...sub,
            status: action === 'approve' ? 'approved' as const : 'rejected' as const,
            reviewed_at: new Date(),
            reviewer_note: reviewNote
          }
        : sub
    )

    setSubmissions(updatedSubmissions)
    setReviewDialog(false)
    setSelectedSubmission(null)
    setReviewNote('')
  }

  const pendingCount = submissions.filter(sub => sub.status === 'pending').length

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
        <Card>
          <CardContent>
            <Skeleton variant="rectangular" height={400} />
          </CardContent>
        </Card>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{
            mb: 1,
            fontWeight: 600,
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Dashboard sx={{ color: 'primary.main' }} />
          관리자 패널
        </Typography>
        <Typography variant="body2" color="text.secondary">
          제출된 글귀를 검토하고 관리할 수 있습니다.
        </Typography>
      </Box>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label={
                <Badge badgeContent={pendingCount} color="warning">
                  대기중인 글귀
                </Badge>
              }
            />
            <Tab label="승인된 글귀" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {pendingCount === 0 ? (
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              대기중인 글귀가 없습니다.
            </Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>내용</TableCell>
                    <TableCell>제출일시</TableCell>
                    <TableCell align="center">작업</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions
                    .filter(sub => sub.status === 'pending')
                    .map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell sx={{ maxWidth: 300 }}>
                          <Typography variant="body2">
                            {submission.content}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {submission.created_at.toLocaleDateString('ko-KR')}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleReview(submission, 'approve')}
                            >
                              <Check />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleReview(submission, 'reject')}
                            >
                              <Close />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Alert severity="info">승인된 글귀가 없습니다.</Alert>
        </TabPanel>
      </Card>

      <Dialog
        open={reviewDialog}
        onClose={() => setReviewDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          글귀 검토
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            "{selectedSubmission?.content}"
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="검토 의견 (선택사항)"
            value={reviewNote}
            onChange={(e) => setReviewNote(e.target.value)}
            placeholder="승인/반려 사유를 입력해주세요..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog(false)}>취소</Button>
          <Button
            color="error"
            onClick={() => handleReviewSubmit('reject')}
          >
            반려
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => handleReviewSubmit('approve')}
          >
            승인
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default AdminPage