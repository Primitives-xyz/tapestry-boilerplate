'use client'

import { getSuggestedProfilesAction } from '@/actions/get-suggested-profiles-actions'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Card } from './card'
import { Input } from './form/input'
import { SubmitButton } from './form/submit-button'

interface Props {}

export function GetSuggestedProfiles({}: Props) {
  const [suggestedProfiles, setSuggestedProfiles] = useState<any>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      const result = await getSuggestedProfilesAction(formData)
      setSuggestedProfiles(result)
    } catch (error) {
      console.error('Error fetching suggested profiles:', error)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input name="ownerWalletAddress" placeholder="Owner wallet address" />
        <SubmitButton>Get Suggested Profiles</SubmitButton>
      </form>
      <div>
        {!!suggestedProfiles &&
          Object.entries(suggestedProfiles).map(
            ([key, item]: [string, any]) => {
              const username = item.profile.properties.username
              return (
                <Link href={`/${username}`} key={key}>
                  <Card>
                    <h2 className="text-xl mb-2">{username}</h2>
                    {item.namespaces.map((val: any, idx: any) => {
                      return <div key={idx}>{val.readableName}</div>
                    })}
                  </Card>
                </Link>
              )
            },
          )}
      </div>
    </Card>
  )
}
