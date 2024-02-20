import { useRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Avatar,
  useToast,
  Icon
} from '@chakra-ui/react'
import { Button, Text } from 'components/atoms'
import { Input } from 'components/molecules'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { updateUserAvatar, updateUserCall } from 'services/api/requests'
import { setUser } from 'services/store/slices/user'
import { MdModeEditOutline } from 'react-icons/md'

export const UserModal = ({ onClose }) => {
  const inputFileRef = useRef()
  const toast = useToast()
  const userStore = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const mutation = useMutation((data) => updateUserCall(data), {
    onError: (error) => {
      toast({
        title: 'Falha ao atualizar usuário.',
        description:
          error?.response?.data?.error || 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Usuário atualizado com sucesso.',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      dispatch(setUser({ user: data?.data?.user }))
    }
  })

  const mutationAvatar = useMutation((data) => updateUserAvatar(data), {
    onError: (error) => {
      toast({
        title: 'Falha ao atualizar foto.',
        description:
          error?.response?.data?.error || 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Foto atualizado com sucesso.',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      dispatch(setUser({ user: data?.data }))
    }
  })

  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      name: userStore?.user?.name,
      email: userStore?.user?.email
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Nome deve conter no mínimo 3 caracteres.')
        .required('Nome obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail obrigatório')
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
    }
  })

  const onChangeImage = (event) => {
    const file = event?.target?.files[0]
    const type = file?.type

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result
      mutationAvatar.mutate({
        mime: type,
        base64
      })
    }
  }

  return (
    <Drawer size="sm" isOpen={true} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text.ScreenTitle>Dados pessoais</Text.ScreenTitle>
        </DrawerHeader>

        <DrawerBody>
          <Flex flexDir="row" alignItems="center" justifyContent="center">
            <input
              ref={inputFileRef}
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={onChangeImage}
            />
            <Avatar
              cursor="pointer"
              name={userStore?.user?.name}
              src={userStore?.user?.avatar_url}
              w="100px"
              h="100px"
              borderWidth="4px"
              borderColor="brand.primary"
              bg="brand.greyLight"
              onClick={() => inputFileRef?.current?.click()}
            />
            <Flex
              margin="-32px"
              w="32px"
              h="32px"
              bg="brand.primary"
              borderRadius="16px"
              position="relative"
              top="36px"
              alignItems="center"
              justifyContent="center"
              onClick={() => inputFileRef?.current?.click()}
              cursor="pointer"
            >
              <Icon color="brand.black" boxSize="18px" as={MdModeEditOutline} />
            </Flex>
          </Flex>
          <Input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            mt="24px"
            placeholder="Nome completo"
          />
          <Input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            mt="24px"
            placeholder="E-mail"
          />
          <Button
            onClick={handleSubmit}
            isLoading={mutation.isLoading || mutationAvatar.isLoading}
            w="100%"
            mt={['64px']}
          >
            Atualizar
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
