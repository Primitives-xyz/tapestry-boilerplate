import { Profile } from '@/components/profile/profile'
import { getProfilesList } from '@/lib/tapestry'

export async function ProfilesList() {
  const data = await getProfilesList({})

  const profiles = data.nodes.filter((node: any) => {
    return node.labels.includes('profile')
  })

  return (
    <div>
      {profiles.map((profile: any, index: number) => {
        return (
          <div className="mb-4" key={index}>
            <Profile username={profile.properties.username} />
          </div>
        )
      })}
    </div>
  )
}