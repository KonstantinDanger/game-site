import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';

import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { getMatchById } from '@/redux/reducers/matches';
import { matchesSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';

export default function MatchPage() {
  const dispatch = useDispatch();
  const { matchId } = useParams<{ matchId: string }>();
  const { status, match } = useSelector(matchesSelector);

  useEffect(() => {
    if (matchId) {
      dispatch(getMatchById(matchId));
    }
  }, [dispatch, matchId]);

  return (
    <Box>
      <h1>Match Info</h1>

      {['idle', 'loading'].includes(status) ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        match && (
          <Flex flexDir='column' gap='24px'>
            <Flex>
              <Text fontWeight='600'>Match Date:</Text>
              <Text>{new Date(match.matchDate).toLocaleDateString()}</Text>
            </Flex>

            <Flex>
              <Text fontWeight='600'>Match Time:</Text>
              <Text>{new Date(match.matchTime * 1000).toISOString().slice(11, 19)}</Text>
            </Flex>
          </Flex>
        )
      )}
    </Box>
  );
}
