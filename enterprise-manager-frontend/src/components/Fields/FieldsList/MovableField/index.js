import React, { useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useDispatch } from "react-redux"
import { sortFields } from "../../../../actions/resourceActions"
import { MenuOutlined } from "@ant-design/icons"

const style = {
  padding: 0,
  margin: 0,
  display: "flex",
  flexWrap: "no-wrap",
  flex: 1
}

const MovableField = ({
  permission,
  resource,
  activeFields,
  index,
  moveField,
  children
}) => {
  const [ref, setRef] = useState()
  const dispatch = useDispatch()

  const [, drop] = useDrop({
    accept: "field",
    hover(item, monitor) {
      if (!ref) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveField(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: "field", index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: () =>
      dispatch(
        sortFields({ ...resource, fieldIds: activeFields.map(f => f.id) })
      )
  })

  drag(drop(ref))

  return permission.canUpdate ? (
    <div
      style={{
        ...style,
        opacity: isDragging ? 0.2 : 1
      }}
      ref={drop}>
      <div
        style={{
          display: "flex",
          cursor: "move",
          width: 30,
          paddingTop: 10,
          alignItems: "center",
          justifyContent: "center"
        }}
        ref={setRef}>
        <MenuOutlined />
      </div>
      <div
        style={{
          flex: 1
        }}>
        {children}
      </div>
    </div>
  ) : (
    children
  )
}
export default MovableField
