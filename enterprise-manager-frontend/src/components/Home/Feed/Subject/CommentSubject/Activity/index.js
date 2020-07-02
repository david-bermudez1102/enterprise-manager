import React from "react"
import CommentSubject from ".."
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { updateStory } from "../../../../../../actions/storiesActions"

const Activiy = props => {
  const { id, comments } = props
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const dispatch = useDispatch()
  const { currentUser } = session

  const onCommentLike = comment => {
    const commentLiked = comment.likes.find(l => l.accountId === currentUser.id)
    if (commentLiked)
      dispatch(
        updateStory({
          id,
          commentsAttributes: {
            id: comment.id,
            likesAttributes: [{ id: commentLiked.id, _destroy: true }]
          }
        })
      )
    else
      dispatch(
        updateStory({
          id,
          commentsAttributes: {
            id: comment.id,
            likesAttributes: [{ accountId: currentUser.id }]
          }
        })
      )
  }
  return (
    <CommentSubject {...props}>
      {comments.map(comment => (
        <CommentSubject
          key={`reply_${comment.id}`}
          {...comment}
          onLike={() => onCommentLike(comment)}
        />
      ))}
    </CommentSubject>
  )
}

export default Activiy
