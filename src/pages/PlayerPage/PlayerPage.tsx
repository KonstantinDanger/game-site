import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';

import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { getPlayerById } from '@/redux/reducers/players';
import { playersSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { secondsToTime } from '@/utils';
import type { Match } from '@/types/matches';

export default function PlayerPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playerId } = useParams<{ playerId: string }>();
  const { status, player } = useSelector(playersSelector);
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const selectedBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

  useEffect(() => {
    if (playerId) {
      dispatch(getPlayerById(playerId));
    }
  }, [dispatch, playerId]);

  const totalTime = player?.totalMatchTime || 0;
  const matches = player?.matches || [];

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
              <Text fontWeight='600'>Hello, {player.name}!</Text>
            </Flex>

            <Flex gap='8px'>
              <Text fontWeight='600'>Total Match Time:</Text>
              <Text>{secondsToTime(totalTime)}</Text>
            </Flex>

            {matches.length > 0 && (
              <Flex flexDir='column' gap='16px'>
                <Text fontWeight='600' fontSize='lg'>
                  Played Matches
                </Text>

                <Table w='100%'>
                  <Thead>
                    <Tr>
                      <Th>Match Name</Th>
                      <Th>Match Date</Th>
                      <Th>Match Time</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {matches.map((match: Match) => {
                      const { id, name, matchDate, matchTime } = match;
                      return (
                        <Tr
                          key={id}
                          onClick={() => navigate(`/matches/${id}`)}
                          cursor='pointer'
                          _hover={{ bg: hoverBg }}
                          _selected={{ bg: selectedBg }}
                        >
                          <Td>{name}</Td>

                          <Td>{new Date(matchDate).toLocaleDateString()}</Td>

                          <Td>{secondsToTime(matchTime)}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Flex>
            )}
          </Flex>
        )
      )}
    </Flex>
  );
}
