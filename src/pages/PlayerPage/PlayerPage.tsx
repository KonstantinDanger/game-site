import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';

import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { getPlayerById } from '@/redux/reducers/players';
import { playersSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';

export default function PlayerPage() {
  const dispatch = useDispatch();
  const { playerId } = useParams<{ playerId: string }>();
  const { status, player } = useSelector(playersSelector);

  useEffect(() => {
    if (playerId) {
      dispatch(getPlayerById(playerId));
    }
  }, [dispatch, playerId]);

  return (
    <Flex flexDir='column' gap='24px'>
      <h1>Player Info</h1>

      {['idle', 'loading'].includes(status) ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        player && (
          <Flex flexDir='column' gap='24px'>
            <Flex gap='8px'>
              <Text fontWeight='600'>Name:</Text>
              <Text>{player.name}</Text>
            </Flex>

            <Flex gap='8px'>
              <Text fontWeight='600'>Email:</Text>
              <Text>{player.email}</Text>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
}
