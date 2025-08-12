import { IComment } from '@/interfaces/table.interface'

export const processComments = (comments: IComment[]): IComment[] => {
  const hasExistingReplies = comments.some(
    (comment) => comment.replies && comment.replies.length > 0
  )

  if (hasExistingReplies) {
    const rootComments = comments.filter((comment) => !comment.parent)

    const sortReplies = (comment: IComment) => {
      if (comment.replies && comment.replies.length > 0) {
        comment.replies.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        comment.replies.forEach(sortReplies)
      }
    }

    rootComments.forEach(sortReplies)

    return rootComments.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  }

  const commentMap = new Map<string, IComment>()
  const rootComments: IComment[] = []

  comments.forEach((comment) => {
    commentMap.set(comment.id, {
      ...comment,
      replies: [],
    })
  })

  comments.forEach((comment) => {
    const commentWithReplies = commentMap.get(comment.id)!

    if (comment.parent) {
      const parentComment = commentMap.get(comment.parent)
      if (parentComment) {
        parentComment.replies = parentComment.replies || []
        parentComment.replies.push(commentWithReplies)
      }
    } else {
      rootComments.push(commentWithReplies)
    }
  })

  const sortReplies = (comment: IComment) => {
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      comment.replies.forEach(sortReplies)
    }
  }

  rootComments.forEach(sortReplies)

  return rootComments.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
}
