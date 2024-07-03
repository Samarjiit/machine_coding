//rendering all the comments
import React, { useState } from "react"
import useCommentTree from "../hooks/use-comment-tree"
import "./styles.css"
import Comment from "./comment"
import { NestedCommentsProps } from "./types"
const NestedComments: React.FC<NestedCommentsProps> = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onUpvote = () => {},
  onDownvote = () => {},
}) => {
  const [comment, setComment] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<string>("newest")
  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
    upDownVoteComment,
    sortComments,
  } = useCommentTree(comments)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleUpvote = (commentId: number) => {
    upDownVoteComment(true, commentId)
    onUpvote(commentId)
    if (sortOrder === "most-voted") sortComments(sortOrder)
  }
  const handleDownvote = (commentId: number) => {
    upDownVoteComment(false, commentId)
    onDownvote(commentId)
    if (sortOrder === "most-voted") sortComments(sortOrder)
  }
  const handleReply = (commentId: number | undefined, content: string) => {
    insertComment(commentId, content)
    onSubmit(content)
  }

  const handleEdit = (commentId: number, content: string) => {
    editComment(commentId, content)
    onEdit(content)
  }

  const handleDelete = (commentId: number) => {
    deleteComment(commentId)
    onDelete(commentId)
  }
  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment)
      setComment("")
    }
  }

  const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value)
    sortComments(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit()
    }
  }
  return (
    <>
      <div className="add-comment">
        <textarea
          rows={3}
          cols={50}
          placeholder="add a comments"
          value={comment}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="comment-textarea"
          aria-label="add a new comment"
        />
        <button className="comment-button" onClick={handleSubmit}>
          Add Comment
        </button>
      </div>
      <div>
        <label htmlFor="sortOrder">Sort By:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortOrder}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="most-voted">Most-voted</option>
        </select>
      </div>
      {commentsData.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            onSubmitComment={handleReply}
            onEditComment={handleEdit}
            onDeleteComment={handleDelete}
            onUpVoteComment={handleUpvote}
            onDownVoteComment={handleDownvote}
          />
        )
      })}
    </>
  )
}

export default NestedComments
