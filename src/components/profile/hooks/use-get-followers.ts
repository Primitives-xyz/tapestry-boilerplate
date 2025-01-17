import { IGetSocialResponse } from '@/models/profile.models'
import { useEffect, useState } from 'react'

export const useGetFollowers = (username: string) => {
  const [followers, setFollowers] = useState<IGetSocialResponse>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) return

    const fetchFollowers = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/profiles/${username}/followers`, {
          method: 'GET',
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch followers')
        }

        setFollowers(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchFollowers()
  }, [username])

  return { followers, loading, error }
}
