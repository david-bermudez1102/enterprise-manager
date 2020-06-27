import { actionsGenerator } from "../actions/actionsGenerator"

export const conversations = actionsGenerator({
  name: "conversation",
  index: "id",
  "SET-CONVERSATIONS": (state, action) =>
    action.conversations.map(conversation => {
      const { messages } = state.find(c => c.id === conversation.id) || {}
      const unSentMessages = messages
        ? messages.filter(
            m =>
              !conversation.messages.some(message => message.key === m.key) &&
              !m.id
          )
        : []
      return {
        ...conversation,
        messages: [
          ...conversation.messages,
          ...unSentMessages.map(u => ({ ...u, status: 0 }))
        ]
      }
    }),
  "UPDATE-CONVERSATION": (state, action) =>
    state.map(payload => {
      if (payload.id === action.conversation.id) {
        const unSentMessages = payload.messages.filter(
          m =>
            !action.conversation.messages.some(
              message => message.key === m.key
            ) && !m.id
        )
        return {
          ...action.conversation,
          messages: [
            ...action.conversation.messages,
            ...unSentMessages.map(u => ({ ...u, status: 0 }))
          ]
        }
      }
      return payload
    })
})
