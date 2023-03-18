import { Box, Textarea, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { TaskModel } from '../utils/models';

type TaskProps = {
  index: number;
  task: TaskModel;
}

function Task ({ index, task }: TaskProps) {
  return (
    <Box
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
      />
      <Textarea 
        value={task.title}
        fontWeight='semibold'
        cursor='inherit'
        border='none'
        resize='none'
        focusBorderColor='none'
        color='gray.700'
        minH={70}
        maxH={200}
        p={0}
      />
    </Box>
  )
}

export default Task;