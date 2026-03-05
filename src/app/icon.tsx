import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#542E91',
          borderRadius: '6px',
        }}
      >
        <span
          style={{
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFD700',
            letterSpacing: '-1px',
          }}
        >
          AI
        </span>
      </div>
    ),
    { ...size }
  )
}
