import React, { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material'
import {
  Share,
  ContentCopy,
  Facebook,
  Twitter,
  Instagram,
  ChatBubbleOutline
} from '@mui/icons-material'

interface ShareButtonProps {
  quote: {
    id: string
    content: string
    like_count: number
  }
  size?: 'small' | 'medium' | 'large'
}

const ShareButton: React.FC<ShareButtonProps> = ({ quote, size = 'medium' }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  })

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '하루 한 문장',
          text: `"${quote.content}"`,
          url: window.location.href,
        })
        handleClose()
      } catch (err) {
        console.log('공유 취소됨')
        handleClose()
      }
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.content}"\n\n- 하루 한 문장\n${window.location.href}`)
      showSnackbar('클립보드에 복사되었습니다!')
      handleClose()
    } catch (err) {
      showSnackbar('복사에 실패했습니다.', 'error')
      handleClose()
    }
  }

  const handleSocialShare = (platform: string) => {
    const text = encodeURIComponent(`"${quote.content}"`)
    const url = encodeURIComponent(window.location.href)
    const hashtags = encodeURIComponent('하루한문장,위로,동기부여')

    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`
        break
      case 'instagram':
        // Instagram은 직접 공유 불가, 클립보드 복사로 대체
        handleCopyToClipboard()
        return
      case 'threads':
        // Threads는 직접 공유 불가, 클립보드 복사로 대체
        handleCopyToClipboard()
        return
      default:
        return
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer')
      handleClose()
    }
  }

  // 모바일에서 네이티브 공유 지원시 우선 사용
  if (isMobile && navigator.share) {
    return (
      <>
        <Tooltip title="공유하기" arrow>
          <IconButton
            onClick={handleNativeShare}
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
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 16px rgba(156, 175, 136, 0.25)',
                border: '1px solid rgba(156, 175, 136, 0.3)',
              },
            }}
          >
            <Share />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  return (
    <>
      <Tooltip title="공유하기" arrow>
        <IconButton
          onClick={handleClick}
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
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 16px rgba(156, 175, 136, 0.25)',
              border: '1px solid rgba(156, 175, 136, 0.3)',
            },
          }}
        >
          <Share />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 8,
          sx: {
            borderRadius: '16px',
            mt: 1,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(247,243,233,0.9) 50%, rgba(255,255,255,0.92) 100%)',
            backdropFilter: 'blur(20px) saturate(1.1)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.1)',
            border: '1.5px solid rgba(156, 175, 136, 0.25)',
            boxShadow: `
              0 12px 40px rgba(156, 175, 136, 0.15),
              0 6px 20px rgba(212, 165, 165, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleCopyToClipboard}
          sx={{
            borderRadius: '12px',
            mx: 0.5,
            mb: 0.5,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(156, 175, 136, 0.2) 0%, rgba(156, 175, 136, 0.3) 100%)',
              transform: 'translateX(4px)',
              boxShadow: '0 2px 8px rgba(156, 175, 136, 0.2)',
            },
          }}
        >
          <ListItemIcon>
            <ContentCopy fontSize="small" sx={{ color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText
            primary="링크 복사"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleSocialShare('facebook')}
          sx={{
            borderRadius: '12px',
            mx: 0.5,
            mb: 0.5,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1877f2 0%, #42a5f5 100%)',
              color: 'white',
              transform: 'translateX(4px)',
              boxShadow: '0 4px 16px rgba(24, 119, 242, 0.3)',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon>
            <Facebook fontSize="small" sx={{ color: '#1877f2' }} />
          </ListItemIcon>
          <ListItemText
            primary="Facebook"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleSocialShare('twitter')}
          sx={{
            borderRadius: '12px',
            mx: 0.5,
            mb: 0.5,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1da1f2 0%, #64b5f6 100%)',
              color: 'white',
              transform: 'translateX(4px)',
              boxShadow: '0 4px 16px rgba(29, 161, 242, 0.3)',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon>
            <Twitter fontSize="small" sx={{ color: '#1da1f2' }} />
          </ListItemIcon>
          <ListItemText
            primary="Twitter"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleSocialShare('instagram')}
          sx={{
            borderRadius: '12px',
            mx: 0.5,
            mb: 0.5,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e4405f 0%, #f06292 100%)',
              color: 'white',
              transform: 'translateX(4px)',
              boxShadow: '0 4px 16px rgba(228, 64, 95, 0.3)',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon>
            <Instagram fontSize="small" sx={{ color: '#e4405f' }} />
          </ListItemIcon>
          <ListItemText
            primary="Instagram"
            secondary="클립보드로 복사"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 500
            }}
            secondaryTypographyProps={{
              fontSize: '0.75rem',
              color: 'text.secondary'
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleSocialShare('threads')}
          sx={{
            borderRadius: '12px',
            mx: 0.5,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
              color: 'white',
              transform: 'translateX(4px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon>
            <ChatBubbleOutline fontSize="small" sx={{ color: '#000000' }} />
          </ListItemIcon>
          <ListItemText
            primary="Threads"
            secondary="클립보드로 복사"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 500
            }}
            secondaryTypographyProps={{
              fontSize: '0.75rem',
              color: 'text.secondary'
            }}
          />
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            background: snackbar.severity === 'success'
              ? 'linear-gradient(135deg, rgba(156, 175, 136, 0.95) 0%, rgba(156, 175, 136, 1) 100%)'
              : 'linear-gradient(135deg, rgba(244, 67, 54, 0.95) 0%, rgba(244, 67, 54, 1) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ShareButton