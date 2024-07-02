import { useState } from "react"

const Comment = ({
  comment = {},
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
}) => {
  const [expand, setExpand] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const toggleEditMode = () => {
    setEditMode(!editMode)
    setEditedContent(comment.content)
  }
  const handleEditSubmit = () => {
    onEditComment(comment.id, editedContent)
    setEditMode(false)
  }
  const handleChange = (e) => {
    if (editMode) {
      setEditedContent(e.target.value)
    } else setReplyContent(e.target.value)
  }

  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment.id, replyContent)
      //do logic
      setReplyContent("")
    }
  }
  const toggleExpand = () => {
    setExpand(!expand)
  }
  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-info">Votes:{comment.votes}</p>
          <p className="comment-info">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <div className="add-comment">
          <textarea
            rows={3}
            cols={50}
            placeholder="add a comments"
            value={editedContent}
            onChange={handleChange}
            className="comment-textarea"
          />
          <button className="comment-button" onClick={handleEditSubmit}>
            save Edit
          </button>
          <button className="comment-button" onClick={toggleEditMode}>
            Cancel edit
          </button>
        </div>
      )}

      <div className="comment-actions">
        <button className="comment-button " onClick={toggleExpand}>
          {expand ? "Hide replies" : "Reply"}
        </button>
        <button className="comment-button" onClick={toggleEditMode}>
          Edit
        </button>
        <button
          className="comment-button"
          onClick={() => onDeleteComment(comment.id)}
        >
          Delete
        </button>
      </div>
      {expand && (
        <div className="comment-replies">
          <div className="add-comment">
            <textarea
              rows={3}
              cols={50}
              placeholder="add a comments"
              value={replyContent}
              onChange={handleChange}
              className="comment-textarea"
            />
            <button className="comment-button" onClick={handleReplySubmit}>
              Add Comment
            </button>
          </div>
          {comment?.replies?.map((reply) => {
            return (
              <Comment
                key={reply.id}
                comment={reply}
                onSubmitComment={onSubmitComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Comment
