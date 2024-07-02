import { useState } from "react"

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments)

  const insertNode = (tree, commentId, content) => {
    //dfs used to insert the comment
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, replies: [...comment.replies, content] }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        }
      }
      return comment
    })
  }
  //responsible for adding a new comment /reply
  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    }

    if (commentId) {
      //user tree algo to add sub comment in already exist comment reply
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      )
    } else {
      //adding a new comment at top
      setComments((prevComments) => [newComment, ...prevComments])
    }
  }

  const editNode = (tree, commentId, content) => {
    //dfs used to insert the comment
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content: content,
          timestamp: new Date().toISOString(),
        }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content),
        }
      }
      return comment
    })
  }
  //responsible for adding a new comment /reply
  const editComment = (commentId, content) => {
    setComments((prevComments) => editNode(prevComments, commentId, content))
  }
  const deleteNode = (tree, commentId) => {
    //dfs used to insert the comment
    return tree.reduce((acc, comment) => {
      if (comment.id === commentId) {
        return acc
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = deleteNode(comment.replies, commentId)
      }
      return [...acc, comment]
    }, [])
  }
  //responsible for adding a new comment /reply
  const deleteComment = (commentId) => {
    setComments((prevComments) => deleteNode(prevComments, commentId))
  }
  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
  }
}

export default useCommentTree
//function with all the power of react- custom hook
