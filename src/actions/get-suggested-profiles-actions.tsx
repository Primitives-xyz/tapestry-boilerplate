'use server'

import { getSuggestedProfiles } from '@/lib/tapestry'

export async function getSuggestedProfilesAction(formData: FormData) {
  const ownerWalletAddress = formData.get('ownerWalletAddress')?.toString()

  if (!ownerWalletAddress) {
    console.error('Owner wallet address is required')
    return
  }

  const data = await getSuggestedProfiles({
    ownerWalletAddress,
  })

  return data
}
