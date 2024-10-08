import { GetSuggested } from '@/components/get-suggested/get-suggested'
import { CreateProfile } from '@/components/profile/create-profile'
import { ProfilesList } from '@/components/profile/profile-list'

export default async function Home() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between space-x-4">
        <CreateProfile />
        <GetSuggested />
      </div>
      <div className="w-full">
        <h2 className="text-xl mb-3">Profiles</h2>
        <ProfilesList />
      </div>
    </div>
  )
}
