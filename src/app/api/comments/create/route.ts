// app/api/comments/create/route.ts
import { FetchMethod, fetchTapestry } from '@/utils/api'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const profileId = formData.get('profileId')?.toString()
  const contentId = formData.get('contentId')?.toString()
  const text = formData.get('text')?.toString()
  const commentId = formData.get('commentId')?.toString()

  if (!profileId || !contentId || !text) {
    return NextResponse.json(
      { error: 'Profile, content id and text are required fields' },
      { status: 400 },
    )
  }

  try {
    const createCommentResponse = await fetchTapestry({
      endpoint: 'comments',
      method: FetchMethod.POST,
      data: {
        profileId,
        contentId,
        text,
        ...(commentId ? { commentId }: {})
      },
    })

    return NextResponse.json(createCommentResponse)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create comment' },
      { status: 500 },
    )
  }
}
