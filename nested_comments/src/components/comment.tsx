//render single comment

import React, { useEffect, useRef, useState } from "react"
import { CommentProps } from "./types"

const Comment: React.FC<CommentProps> = ({
  comment,
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
  onUpVoteComment = () => {},
  onDownVoteComment = () => {},
}) => {
  const [expand, setExpand] = useState<boolean>(false)
  const [replyContent, setReplyContent] = useState<string>("")
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editedContent, setEditedContent] = useState<string>(comment.content)
  //accessibility
  const replyTextareaRef = useRef<HTMLTextAreaElement | null>(null)
  const editTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (editMode && editTextareaRef.current) editTextareaRef.current.focus()
    if (expand && replyTextareaRef.current) replyTextareaRef.current.focus()
  }, [editMode, expand])

  const toggleEditMode = () => {
    setEditMode(!editMode)
    setEditedContent(comment.content)
  }
  const handleEditSubmit = () => {
    onEditComment(comment.id, editedContent)
    setEditMode(false)
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editMode) {
      setEditedContent(e.target.value)
    } else setReplyContent(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      if (editMode) {
        handleEditSubmit()
      } else handleReplySubmit()
    }
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
            ref={editTextareaRef}
            placeholder="add a comments"
            value={editedContent}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="comment-textarea"
            aria-label="edit comment"
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
        <button
          className="comment-button"
          onClick={() => onUpVoteComment(comment.id)}
        >
          👍
        </button>
        <button
          className="comment-button"
          onClick={() => onDownVoteComment(comment.id)}
        >
          👎
        </button>
        <button className="comment-button " onClick={toggleExpand}>
          {expand ? "Hide replies" : "Reply"}
        </button>
        <button className="comment-button" onClick={toggleEditMode}>
          Edit
        </button>
        <button
          className="comment-button"
          onClick={() => onDeleteComment(comment.id)}
          aria-label="delete comment"
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
              ref={replyTextareaRef}
              placeholder="add a comments"
              value={replyContent}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="comment-textarea"
            />
            <button className="comment-button" onClick={handleReplySubmit}>
              Add Comment
            </button>
          </div>
          {comment?.replies?.map((reply) => {
            //only iterate if reply are present
            return (
              <Comment
                key={reply.id}
                comment={reply}
                onSubmitComment={onSubmitComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
                onDownVoteComment={onDownVoteComment}
                onUpVoteComment={onUpVoteComment}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Comment
