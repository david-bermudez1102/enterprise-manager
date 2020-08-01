import React, { useState } from "react"
import { Resizable } from "react-resizable"
import { useDrag, useDrop } from "react-dnd"

const type = "DragableBodyColumn"

const ResizeableTitle = props => {
  const {
    onResize,
    className,
    width,
    index,
    moveColumn,
    style,
    ...restProps
  } = props
  const ref = React.useRef()
  const [isResizing, setIsResizing] = useState(false)
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-left" : " drop-over-right"
      }
    },
    drop: item => {
      try {
        moveColumn(item.index, index)
      } catch (error) {
        console.log(error)
      }
    }
  })
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  drop(drag(ref))

  if (!width) {
    return (
      <th
        {...restProps}
        ref={isResizing ? undefined : ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{ cursor: "move", ...style }}
      />
    )
  }
  return (
    <Resizable
      width={width}
      height={100}
      handle={
        <span
          className='react-resizable-handle'
          onClick={e => {
            e.stopPropagation()
          }}
        />
      }
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={() => setIsResizing(false)}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}>
      <th
        {...restProps}
        draggable={!isResizing}
        ref={isResizing ? undefined : ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{ cursor: "move", ...style }}
      />
    </Resizable>
  )
}

export default React.memo(ResizeableTitle)
