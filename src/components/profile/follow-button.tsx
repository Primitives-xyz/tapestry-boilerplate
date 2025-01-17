'use client'

import { Alert } from '@/components/common/alert'
import { Button } from '@/components/common/button'
import { LoadCircle } from '@/components/common/load-circle'
import { useFollowUser } from '@/components/profile/hooks/use-follow-user'
import { useGetFollowers } from '@/components/profile/hooks/use-get-followers'
import { UserRoundCheck } from 'lucide-react'
import { useCurrentWallet } from '../auth/hooks/use-current-wallet'

interface Props {
  username: string
}

export function FollowButton({ username }: Props) {
  const { walletAddress, mainUsername, loadingMainUsername } =
    useCurrentWallet()
  const { followUser, loading, error, success } = useFollowUser()

  const { followers } = useGetFollowers(username)

  const followersList = followers?.profiles?.map((item) => item.username)

  const handleFollow = async () => {
    if (mainUsername && username) {
      await followUser({
        followerUsername: mainUsername,
        followeeUsername: username,
      })
    }
  }

  if (!walletAddress) {
    return null
  }

  if (followersList?.includes(mainUsername)) {
    return <UserRoundCheck size={20} />
  }

  if (mainUsername === username) {
    return null
  }

  return (
    <>
      {loadingMainUsername ? (
        <span>
          <LoadCircle />
        </span>
      ) : (
        <Button onClick={handleFollow} disabled={loading}>
          {loading ? 'Following...' : 'Follow'}
        </Button>
      )}

      {success && (
        <Alert
          type="success"
          message="Followed user successfully!"
          duration={5000}
        />
      )}

      {error && (
        <Alert
          type="error"
          message="There was an error following the user."
          duration={5000}
        />
      )}
    </>
  )
}
