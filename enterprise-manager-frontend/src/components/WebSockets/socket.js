import actioncable from "actioncable"

const cable = actioncable.createConsumer(process.env.REACT_APP_SOCKET_URL)

export default cable
