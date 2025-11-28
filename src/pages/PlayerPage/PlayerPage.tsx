import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { playersSelector } from '@/redux/selectors';
import { useSelector } from '@/redux/store';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function PlayerPage() {
  const { status, player } = useSelector(playersSelector);

  return (
    <Box>
      <h1>Player Info</h1>

      {['idle', 'loading'].includes(status) ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        player && (
          <Flex flexDir='column' gap='24px'>
            <Flex>
              <Text fontWeight='600'>Name:</Text>
              <Text>{player.name}</Text>
            </Flex>

            <Flex>
              <Text fontWeight='600'>Email:</Text>
              <Text>{player.email}</Text>
            </Flex>
          </Flex>
        )
      )}
    </Box>
  );
}
