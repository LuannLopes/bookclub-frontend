import { Flex, Image } from '@chakra-ui/react'
import { Button, Input, Link, Text } from 'components'

export const LoginScreen = () => {
  return (
    <Flex flexDir="row" w="100vw" h="100vh">
      <Flex
        alignItems="flex-start"
        justifyContent="center"
        paddingLeft="112px"
        flexDir="column"
        w="40%"
        h="100%"
      >
        <Image src="/img/logo.svg" alt="BookClub Logo" w="160px" h="48px" />
        <Flex flexDir="column" w="416px" gap="24px">
          <Text.ScreenTitle mt="48px">Login</Text.ScreenTitle>
          <Input placeholder="email@exemplo.com" />
          <Input.Password placeholder="*******************" />
          <Flex w="100%" alignItems="flex-end" justifyContent="flex-end">
            <Link>Esqueceu sua senha ?</Link>
          </Flex>
          <Button>Login</Button>
          <Link.Action
            text="Não possui uma conta? "
            actionText="Cadastre-se aqui"
          />
        </Flex>
      </Flex>
      <Flex
        w="60%"
        h="100vh"
        backgroundImage="url('/img/auth_background.svg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        borderTopLeftRadius="32px"
        borderBottomLeftRadius="32px"
      />
    </Flex>
  )
}
