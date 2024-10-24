import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@store/atom/user'

export default function AuthGard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  // 유저의 상태의 변화 캐치
  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      //TODO
    } else {
      console.log('user', user)
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    }

    setInitialize(true)
  })

  if (initialize === false) {
    return null
  }
  return <>{children}</>
}
