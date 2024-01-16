import { ChakraProvider } from '@chakra-ui/react'
import { LoginScreen } from 'modules/unauthenticated/screens'
import { theme } from 'styles'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LoginScreen />
    </ChakraProvider>
  )
}

export default App
