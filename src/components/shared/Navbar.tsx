import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'

import Flex from './Flex'
import Button from './Button'
import { colors } from '@styles/colorPalette'
import { useCallback } from 'react'
import useUser from '@hooks/auth/useUser'
import Spacing from './Spacing'

export default function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false
  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Flex align={'center'}>
          <Link to="/my">
            {/* @TODO */}
            <img
              alt="userImage"
              src={
                user.photoURL ??
                'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-64.png'
              }
              width={36}
              height={36}
              style={{ borderRadius: '100%' }}
            />
          </Link>
          <Spacing size={8} direction="horizontal" />
          <Link to="/settings">
            <img
              alt="settings"
              src={
                'https://cdn1.iconfinder.com/data/icons/ionicons-outline-vol-2/512/settings-outline-512.png'
              }
              width={36}
              height={36}
              style={{ borderRadius: '100%' }}
            />
          </Link>
        </Flex>
      )
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }
  }, [user, showSignButton])

  return (
    <Flex css={navbarContainerStyles} justify={'space-between'} align="center">
      <Link to="/">Dream Trip</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`
