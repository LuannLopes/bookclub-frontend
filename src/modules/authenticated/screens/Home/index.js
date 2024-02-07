import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export const HomeScreen = () => {
  const UserStore = useSelector((state) => state.user)
  console.log({ UserStore })

  return <Flex></Flex>
}
