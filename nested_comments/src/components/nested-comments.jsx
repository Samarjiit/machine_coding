import { useState } from "react"
import useCommentTree from "../hooks/use-comment-tree"
import "./styles.css"
import Comment from "./comment"
const NestedComments = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [comment, setComment] = useState("")
  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
  } = useCommentTree(comments)

  const handleChange = (e) => {
    setComment(e.target.value)
  }
  const handleReply = (commentId, content) => {
    insertComment(commentId, content)
    onSubmit(content)
  }

  const handleEdit = (commentId, content) => {
    editComment(commentId, content)
    onEdit(content)
  }

  const handleDelete = (commentId) => {
    deleteComment(commentId)
    onDelete(commentId)
  }
  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment)
      setComment("")
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
          className="comment-textarea"
        />
        <button className="comment-button" onClick={handleSubmit}>
          Add Comment
        </button>
      </div>
      {commentsData.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            onSubmitComment={handleReply}
            onEditComment={handleEdit}
            onDeleteComment={handleDelete}
          />
        )
      })}
    </>
  )
}

export default NestedComments
