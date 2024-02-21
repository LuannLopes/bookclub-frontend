import { Flex } from '@chakra-ui/react'
import { BookList, NavBar, Text } from 'components'
import { useQuery } from 'react-query'
import { getAuthorDetail } from 'services/api/requests'
import { useParams } from 'react-router-dom'

export const AuthorDetailScreen = () => {
  const { id } = useParams()
  const { data, isLoading } = useQuery(
    ['authorDetail', id],
    () => getAuthorDetail(id),
    {
      enabled: !!id
    }
  )

  return (
    <Flex flexDir="column">
      <NavBar />
      <Flex
        flexDir={['column', 'row']}
        alignItems={['center', 'flex-start']}
        justifyContent={['center', 'flex-start']}
        mt={['24px', '48px']}
        w="100%"
        maxW={'100vw'}
        paddingX={['24px', '48px', '80px', '112px']}
      >
        <Flex
          w={['170px', '238px']}
          h={['256px', '358px']}
          backgroundImage={`url(${data?.data?.avatar_url})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          borderRadius={['12px']}
        />

        <Flex
          mt={['24px', '0px']}
          w={['100%', '70%']}
          mx={['0px', '48px']}
          flexDir="column"
        >
          <Text.ScreenTitle fontSize="24px">
            {data?.data?.name}
          </Text.ScreenTitle>

          <Text.ScreenTitle mt="16px">Sobre o(a) autor(a)</Text.ScreenTitle>

          <Text maxW="80%" fontSize="12px" mt="4px" color="brand.greyDark">
            {data?.data?.bio}
          </Text>
        </Flex>
      </Flex>
      <BookList
        title="Livros do(a) autor(a)"
        data={data?.data.book}
        isLoading={isLoading}
      />
    </Flex>
  )
}
