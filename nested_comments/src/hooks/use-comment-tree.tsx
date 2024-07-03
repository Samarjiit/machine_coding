//write all the algo here only
import { useState } from "react"
import { Comment } from "../components/types"
const useCommentTree = (initialComments: Comment[]) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  const insertNode = (tree: Comment[], commentId: number, content: Comment) => {
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
  const insertComment = (commentId: number, content: string) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    }

    if (commentId) {
      //user tree algo to add sub comment in already exist comment reply. use dfs algo
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      )
    } else {
      //adding a new comment at top whn we not reuired any id to match to get
      setComments((prevComments) => [newComment, ...prevComments])
    }
  }

  const editNode = (tree: Comment[], commentId: number, content: Comment) => {
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
  const editComment = (commentId: number, content: string) => {
    setComments((prevComments) => editNode(prevComments, commentId, content))
  }
  const deleteNode = (tree: Comment[], commentId: number): Comment[] => {
    //dfs used to insert the comment
    return tree.reduce<Comment[]>((acc, comment) => {
      if (comment.id === commentId) {
        return acc
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = deleteNode(comment.replies, commentId)
      }
      return [...acc, comment]
    }, [])
  }
  //responsible for adding a new comment /reply
  const deleteComment = (commentId: number) => {
    setComments((prevComments) => deleteNode(prevComments, commentId))
  }

  const upDownVote = (tree: Comment[], upvote: number, commentId: number) => {
    //dfs used to insert the comment
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          votes: upvote ? comment.votes + 1 : comment.votes - 1,
        }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: upDownVote(comment.replies, upvote, commentId),
        }
      }
      return comment
    })
  }
  //responsible for adding a new comment /reply
  const upDownVoteComment = (upvote: boolean = true, commentId: number) => {
    setComments((prevComments) => upDownVote(prevComments, upvote, commentId))
  }

  const sortNodes = (tree: Comment[], sortOrder: string): Comment[] => {
    return tree.slice().sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.timestamp) - new Date(a.timestamp)
      } else if (sortOrder === "oldest") {
        return new Date(a.timestamp) - new Date(b.timestamp)
      } else if (sortOrder === "most-voted") {
        return b.votes - a.votes
      }
      return 0
    })
  }
  const sortComments = (sortOrder: string) => {
    setComments((prevComments) => sortNodes(prevComments, sortOrder))
  }
  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
    upDownVoteComment,
    sortComments,
  }
}

export default useCommentTree
//function with all the power of react- custom hook
