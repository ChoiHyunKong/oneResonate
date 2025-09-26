import React, { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
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
import { useResponsive, useSnackbar } from '@/hooks'
import { COLORS, SOCIAL_COLORS } from '@/constants'
import { createIconButtonStyle } from '@/styles/commonStyles'
import { liquidGlassMenu, liquidGlassMenuItem, createSocialButtonStyle } from '@/styles/liquidGlass'

interface ShareButtonProps {
  quote: {
    id: string
    content: string
    like_count: number
  }
}

const ShareButton: React.FC<ShareButtonProps> = ({ quote }) => {
  const { isMobile } = useResponsive()
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
      showSuccess('클립보드에 복사되었습니다!')
      handleClose()
    } catch (err) {
      showError('복사에 실패했습니다.')
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
  if (isMobile && typeof navigator.share === 'function') {
    return (
      <>
        <Tooltip title="공유하기" arrow>
          <IconButton
            onClick={handleNativeShare}
            sx={createIconButtonStyle()}
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
          sx={createIconButtonStyle()}
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
            ...liquidGlassMenu,
            mt: 1,
            '& .MuiMenuItem-root': {
              ...liquidGlassMenuItem
            }
          } as any,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleCopyToClipboard}
          sx={{
            color: COLORS.TEXT_SECONDARY,
            fontSize: '0.9rem',
            fontWeight: 400
          }}
        >
          <ListItemIcon>
            <ContentCopy fontSize="small" sx={{ color: COLORS.TEXT_LIGHT, transition: 'color 0.2s ease' }} />
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
            color: COLORS.TEXT_SECONDARY,
            fontSize: '0.9rem',
            fontWeight: 400,
            ...createSocialButtonStyle(SOCIAL_COLORS.FACEBOOK)
          }}
        >
          <ListItemIcon>
            <Facebook fontSize="small" sx={{ color: COLORS.TEXT_LIGHT, transition: 'color 0.2s ease' }} />
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
            color: COLORS.TEXT_SECONDARY,
            fontSize: '0.9rem',
            fontWeight: 400,
            ...createSocialButtonStyle(SOCIAL_COLORS.TWITTER)
          }}
        >
          <ListItemIcon>
            <Twitter fontSize="small" sx={{ color: COLORS.TEXT_LIGHT, transition: 'color 0.2s ease' }} />
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
            color: COLORS.TEXT_SECONDARY,
            fontSize: '0.9rem',
            fontWeight: 400,
            ...createSocialButtonStyle(SOCIAL_COLORS.INSTAGRAM)
          }}
        >
          <ListItemIcon>
            <Instagram fontSize="small" sx={{ color: COLORS.TEXT_LIGHT, transition: 'color 0.2s ease' }} />
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
            color: COLORS.TEXT_SECONDARY,
            fontSize: '0.9rem',
            fontWeight: 400,
            ...createSocialButtonStyle(SOCIAL_COLORS.THREADS)
          }}
        >
          <ListItemIcon>
            <ChatBubbleOutline fontSize="small" sx={{ color: COLORS.TEXT_LIGHT, transition: 'color 0.2s ease' }} />
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
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            backgroundColor: snackbar.severity === 'success' ? COLORS.SUCCESS : COLORS.ERROR,
            color: 'white',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            fontSize: '0.9rem',
            fontWeight: 400,
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