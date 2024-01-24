import { Flex, Image } from '@chakra-ui/react'
import { Button, Input, Text, Link } from 'components'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const ResetPasswordScreen = () => {
  const navigate = useNavigate()

  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      code: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .length(4, 'Código deve conter 4 caracteres')
        .required('Código obrigatório'),
      password: Yup.string()
        .min(
          6,
          'A senha que você escolher deve conter no mínimo 6 caracteres. Isso ajuda a aumentar a segurança da sua conta.'
        )
        .required('Senha obrigatória'),
      confirmPassword: Yup.string()
        .min(
          6,
          'A senha que você escolher deve conter no mínimo 6 caracteres. Isso ajuda a aumentar a segurança da sua conta.'
        )
        .required('Senha obrigatória')
    }),
    onSubmit: (data) => {
      navigate('/login')
    }
  })

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
        <Flex flexDir="column" w={['100%', '100%', '100%', '416px']} gap="22px">
          <Image src="/img/logo.svg" alt="BookClub Logo" w="160px" h="48px" />
          <Text.ScreenTitle mt="14px">Nova senha</Text.ScreenTitle>
          <Text>
            Digite o código enviado e uma nova senha nos campos abaixo:
          </Text>
          <Input
            type="text"
            id="code"
            name="code"
            value={values.code}
            onChange={handleChange}
            error={errors.code}
            placeholder="Código"
            maxLength={4}
          />
          <Input.Password
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Nova senha"
          />
          <Input.Password
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Confirmar nova senha"
          />
          <Button onClick={handleSubmit}>Salvar</Button>
          <Link.Action
            mt="14px"
            text="Não recebeu o código?"
            actionText="Clique aqui para reenviar."
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
