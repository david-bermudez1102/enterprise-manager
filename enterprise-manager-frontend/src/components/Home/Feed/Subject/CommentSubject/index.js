import React, { useEffect, useState, useRef } from "react"
import { Comment, Tooltip, Button } from "antd"
import { format, formatDistance } from "date-fns"
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  MoreOutlined
} from "@ant-design/icons"
import defaultAvatar from "../../../../../default_user.png"
import { updateStory } from "../../../../../actions/storiesActions"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import ReplyEditor from "./ReplyEditor"
import "./styles.scss"
import Paragraph from "antd/lib/typography/Paragraph"
import Text from "antd/lib/typography/Text"

const CommentSubject = props => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const dispatch = useDispatch()
  const { currentUser } = session

  const { id, content, likes, author, createdAt, children } = props
  const [date, setDate] = useState(new Date())
  const timerId = useRef()
  const like = likes.find(l => l.accountId === currentUser.id)
  const [replyFormOpen, setReplyFormOpen] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)

  const onLike = () =>
    like
      ? dispatch(
          updateStory({
            id,
            likesAttributes: [{ id: like.id, _destroy: true }]
          })
        )
      : dispatch(
          updateStory({
            id,
            likesAttributes: [{ accountId: currentUser.id }]
          })
        )

  useEffect(() => {
    timerId.current = setInterval(() => setDate(new Date()), 2000)
    return () => {
      clearInterval(timerId.current)
    }
  }, [])

  return (
    <Comment
      className={children ? undefined : "comment"}
      author={children ? undefined : author.name}
      actions={[
        children && (
          <span onClick={() => setReplyFormOpen(!replyFormOpen)}>Reply to</span>
        ),
        <span>
          <Button
            icon={like ? <LikeFilled /> : <LikeOutlined />}
            type={"link"}
            shape={"circle"}
            onClick={props.onLike || onLike}></Button>
          {likes.length > 0 ? likes.length : 0}
        </span>,
        children && (
          <span>
            <Button
              icon={<CommentOutlined />}
              type={"text"}
              shape={"circle"}
              style={{ color: "inherit" }}
              onClick={() => setCommentsOpen(!commentsOpen)}></Button>
            {props.comments.length > 0 ? props.comments.length : 0}
          </span>
        ),
        !children && (
          <Button
            icon={<MoreOutlined />}
            type={"text"}
            shape={"circle"}
            onClick={() => setCommentsOpen(!commentsOpen)}
          />
        )
      ]}
      content={
        <Text style={{ width: "100%" }} ellipsis>
          {content}
        </Text>
      }
      avatar={author.avatarSrc || defaultAvatar}
      datetime={
        <Tooltip title={format(new Date(createdAt), "PPPPpppp")}>
          <span>
            {formatDistance(new Date(createdAt), date, {
              addSuffix: true
            })}
          </span>
        </Tooltip>
      }>
      {children && replyFormOpen && (
        <ReplyEditor {...props} currentUser={currentUser} />
      )}
      {commentsOpen && children}
    </Comment>
  )
}

export default CommentSubject
