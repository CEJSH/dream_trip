import { Suspense, ComponentType, ReactNode } from 'react'

export default function withSuspense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  options: { fallback: ReactNode },
) {
  return (props: Props) => {
    return (
      <Suspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
}

// withSuspense(<App />, {fallback:<로딩컴포넌트 />})
// 해당 컴포넌트들을 Suspense로 감싸고 Fallback을 받아서 로딩에 대한 처리
// 선언적으로 할 수 있게 도와주는 High Order Component
