import { SxProps, Theme } from '@mui/material/styles'

// 메뉴용 리퀄드 글래스 스타일
export const liquidGlassMenu: SxProps<Theme> = {
  borderRadius: '16px',
  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(247,243,233,0.9) 50%, rgba(255,255,255,0.92) 100%)',
  backdropFilter: 'blur(20px) saturate(1.1)',
  WebkitBackdropFilter: 'blur(20px) saturate(1.1)',
  border: '1.5px solid rgba(156, 175, 136, 0.25)',
  boxShadow: `
    0 12px 40px rgba(156, 175, 136, 0.15),
    0 6px 20px rgba(212, 165, 165, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8)
  `
}

// 메뉴 아이템 호버 효과
export const liquidGlassMenuItem: SxProps<Theme> = {
  borderRadius: '12px',
  mx: 0.5,
  mb: 0.5,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(156, 175, 136, 0.2) 0%, rgba(156, 175, 136, 0.3) 100%)',
    transform: 'translateX(4px)',
    boxShadow: '0 2px 8px rgba(156, 175, 136, 0.2)',
  }
}

// 소셜 버튼 스타일 생성기
export const createSocialButtonStyle = (color: string) => ({
  borderRadius: '12px',
  mx: 0.5,
  mb: 0.5,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
    color: 'white',
    transform: 'translateX(4px)',
    boxShadow: `0 4px 16px ${color}4D`,
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
  }
})

export default {
  liquidGlassMenu,
  liquidGlassMenuItem,
  createSocialButtonStyle
}