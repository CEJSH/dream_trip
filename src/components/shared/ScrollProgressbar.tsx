import { useEffect, useState, useRef } from 'react'
import { SerializedStyles } from '@emotion/react'

import { Colors, colors } from '@/styles/colorPalette'

export default function ScrollProgressBar({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const scroll = () => {
      const scrollTop = document.documentElement.scrollTop

      // 전체 높이에서 뷰포트 만큼 빼준다.
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setProgress(scrollTop / height)
      })
    }
    window.addEventListener('scroll', scroll)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div
      css={style}
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
        backgroundColor: colors[color],
        height: 8,
      }}
    ></div>
  )
}
