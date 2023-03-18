import { Heading, Container } from '@chakra-ui/react';

function App() {
  return (
    <>
      <Heading
        fontSize={{base: '3xl', sm: '4xl', md: '5xl'}}
        fontWeight='bold'
        textAlign='center'
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        mt={4}
      >
        Welcome to the Kanban
      </Heading>
      <Container
        maxWidth='container.lg'
        px={4}
        py={10}
      >

      </Container>
    </>
  )
}

export default App
