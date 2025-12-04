import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Badge,
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
import { authSelector, playersSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { secondsToTime } from '@/utils';
import type { Match } from '@/types/matches';

export default function PlayerPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playerId } = useParams<{ playerId: string }>();
  const { status, playerData } = useSelector(playersSelector);
  const { player: currentPlayer } = useSelector(authSelector);
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const selectedBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

  useEffect(() => {
    if (playerId) {
      dispatch(getPlayerById(playerId));
    }
  }, [dispatch, playerId]);

  const { player: { name } = {}, totalMatchTime = 0, matches = [] } = playerData || {};

  return (
    <Flex flexDir='column' gap='24px'>
      {name && (
        <Flex align='center' gap='16px'>
          <h1>
            Player Info {'>'} {`${name}`}
          </h1>

          {currentPlayer?.isAdmin && (
            <Badge colorScheme='cyan' fontSize='xs'>
              Admin
            </Badge>
          )}

          {currentPlayer?.id === playerId && (
            <Badge colorScheme='green' fontSize='xs'>
              You
            </Badge>
          )}
        </Flex>
      )}

      {['idle', 'loading'].includes(status) ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        playerData && (
          <Flex flexDir='column' gap='24px'>
            <Flex gap='8px'>
              <Text fontWeight='600'>Total playtime:</Text>
              <Text>{secondsToTime(totalMatchTime)}</Text>
            </Flex>

            {
              <Flex gap='8px'>
                <Text fontWeight='600'>Total matches played:</Text>
                <Text>{matches.length}</Text>
              </Flex>
            }

            {matches.length > 0 ? (
              <Flex flexDir='column' gap='16px'>
                <Text fontWeight='600' fontSize='lg'>
                  Played Matches:
                </Text>

                <Table w='100%'>
                  <Thead>
                    <Tr>
                      <Th>Match Date</Th>
                      <Th>Match Time</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {matches.map((match: Match) => {
                      const { id, matchDate, matchTime } = match;
                      return (
                        <Tr
                          key={id}
                          onClick={() => navigate(`/matches/${id}`)}
                          cursor='pointer'
                          _hover={{ bg: hoverBg }}
                          _selected={{ bg: selectedBg }}
                        >
                          <Td>{new Date(matchDate).toLocaleDateString()}</Td>

                          <Td>{secondsToTime(matchTime)}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Flex>
            ) : (
              <div>No played matches yet...</div>
            )}
          </Flex>
        )
      )}
    </Flex>
  );
}
