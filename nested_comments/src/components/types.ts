//types of comment ,nested-comment
export interface Comment {
  id: number
  content: string
  votes: number
  timestamp: string
  replies: Comment[]
}

export interface NestedCommentsProps {
  comments: Comment[]
  onSubmit: (content: string) => void
  onEdit: (content: string) => void
  onDelete: (commentId: number) => void
  onUpvote: (commentId: number) => void
  onDownvote: (commentId: number) => void
}

export interface CommentProps {
  comment: Comment
  onSubmitComment: (commentId: number, content: string) => void
  onEditComment: (commentId: number, content: string) => void
  onUpVoteComment: (commentId: number) => void
  onDownVoteComment: (commentId: number) => void
  onDeleteComment: (commentId: number) => void
}
