import actioncable from "actioncable"

const cable = actioncable.createConsumer("ws://localhost:3001/cable")

export default cable
