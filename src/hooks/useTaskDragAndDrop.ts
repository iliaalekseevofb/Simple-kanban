import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { ItemType } from '../utils/enums';
import { DragItem, TaskModel } from '../utils/models';

function useTaskDragAndDrop<T extends HTMLElement> ({
  task,
  index,
  handleDropHover
}: {
  task: TaskModel,
  index: number,
  handleDropHover: (i: number, j: number) => void
}) {
  const ref = useRef<T>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType.TASK,
    item: { from: task.column, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemType.TASK,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;

      if (draggedItemIndex === hoveredItemIndex) {
        return;
      }

      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      // get mouse coordinates
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord;

      // get hover item rectangle
      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      // get hover item middle height position
      const hoveredMiddleHeight = 
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight = mouseYRelativeToHovered > hoveredMiddleHeight;

      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursir is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) {
        return;
      }

      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) {
        return;
      }

      handleDropHover(draggedItemIndex, hoveredItemIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of perfomance
      // to avoid expensive index searches
      item.index = hoveredItemIndex;
    }
  })

  drag(drop(ref));

  return {
    ref,
    isDragging
  };
}

export default useTaskDragAndDrop;