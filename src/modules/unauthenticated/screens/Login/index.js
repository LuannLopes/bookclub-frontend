import { Button, Flex, Image, Input, Link, Text } from '@chakra-ui/react'

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
          <Text mt="48px">Login</Text>
          <Input placeholder="email@exemplo.com" />
          <Input placeholder="*******************" />
          <Link display="flex" justifyContent="right">
            Esqueceu sua senha ?
          </Link>
          <Button>Entrar</Button>
          <Link>Não possui uma conta ? Cadastre-se aqui</Link>
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
