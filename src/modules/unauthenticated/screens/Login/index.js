import { Flex, Image, useToast } from '@chakra-ui/react'
import { Button, Input, Link, Text } from 'components'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { loginCall } from 'services/api/requests'
import { saveItem } from 'services/storage'

export const LoginScreen = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const mutation = useMutation((newUser) => loginCall(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao logar',
        description:
          error?.response?.data?.error || 'Por favor, tente novamente',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Login realizado com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      saveItem('@bookclub_token', data?.data?.token)
      navigate('/home')
    }
  })

  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail obrigatório'),
      password: Yup.string()
        .min(
          6,
          'A senha que você escolher deve conter no mínimo 6 caracteres. Isso ajuda a aumentar a segurança da sua conta.'
        )
        .required('Senha obrigatória')
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
    }
  })

  console.log({ values, errors })

  return (
    <Flex flexDir="row" w="100vw" h="100vh">
      <Flex
        alignItems={['center', 'flex-start']}
        justifyContent="center"
        padding={['24px', '48px', '80px', '112px']}
        flexDir="column"
        w={['100%', '100%', '100%', '40%']}
        h="100%"
      >
        <Flex flexDir="column" w={['100%', '100%', '100%', '416px']} gap="20px">
          <Image src="/img/logo.svg" alt="BookClub Logo" w="160px" h="48px" />
          <Text.ScreenTitle mt="48px">Login</Text.ScreenTitle>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            error={errors.email}
            value={values.email}
            placeholder="email@exemplo.com"
          />
          <Input.Password
            id="password"
            name="password"
            value={values.password}
            placeholder="*******************"
            onChange={handleChange}
            error={errors.password}
          />
          <Flex w="100%" alignItems="flex-end" justifyContent="flex-end">
            <Link onClick={() => navigate('/forgot-password')}>
              Esqueceu sua senha ?
            </Link>
          </Flex>
          <Button onClick={handleSubmit}>Login</Button>
          <Link.Action
            onClick={() => navigate('/signup')}
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
