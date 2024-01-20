import { Flex, Image } from '@chakra-ui/react'
import { Button, Input, Link, Text } from 'components'

export const LoginScreen = () => {
  return (
    <Flex flexDir="row" w="100vw" h="100vh">
      <Flex
        alignItems={['center', 'flex-start']}
        justifyContent="center"
        paddingLeft={['0px', '0px', '0px', '112px']}
        padding={['24px', '48px', '80px', '0px']}
        flexDir="column"
        w={['100%', '100%', '100%', '40%']}
        h="100%"
      >
        <Flex flexDir="column" w={['100%', '100%', '100%', '416px']} gap="24px">
          <Image src="/img/logo.svg" alt="BookClub Logo" w="160px" h="48px" />
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
        w={['0%', '0%', '0%', '60%']}
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
