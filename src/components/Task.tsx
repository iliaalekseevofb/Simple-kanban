import { Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { TaskModel } from '../utils/models';
import AutoResizeTextArea from './Task/AutoResizeTextArea';
import useTaskDragAndDrop from '../hooks/useTaskDragAndDrop';

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel['id'], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel['id']) => void;
}

function Task ({
  index,
  task,
  onUpdate: updateTask,
  onDelete: deleteTask
}: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    updateTask(task.id, {...task, title: newTitle});
  }

  const handleDeleteClick = () => {
    deleteTask(task.id);
  }
  
  return (
    <Box
      ref={ref}
      as='div'
      role='group'
      position='relative'
      rounded='lg'
      w={200}
      pl={3}
      pr={7}
      pt={1}
      pb={1}
      boxShadow='xl'
      cursor='grab'
      bgColor={task.color}
      opacity={isDragging ? 0.5 : 1}
    >
      <IconButton
        position='absolute'
        top={0}
        right={0}
        zIndex={1}
        aria-label='delete-task'
        size='md'
        colorScheme='solid'
        color='gray.700'
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1
        }}
        onClick={handleDeleteClick}
      />
      <AutoResizeTextArea
        value={task.title}
        fontWeight='semibold'
        cursor='inherit'
        border='none'
        resize='none'
        variant='unstyled'
        focusBorderColor='none'
        color='gray.700'
        minH={70}
        maxH={200}
        p={0}
        onChange={handleTitleChange}
      />
    </Box>
  )
}

export default Task;