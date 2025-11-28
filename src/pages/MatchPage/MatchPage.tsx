import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { matchesSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { getMatchById } from '@/redux/reducers/matches';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function MatchPage() {
  const dispatch = useDispatch();
  const { matchId } = useParams<{ matchId: string }>();
  const { status, match } = useSelector(matchesSelector);

  useEffect(() => {
    if (matchId) {
      dispatch(getMatchById(matchId));
    }
  }, [dispatch, matchId]);

  if (!match) return <Error />;

  const { matchDate, matchTime } = match;

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
              <Text>{new Date(matchDate).toLocaleDateString()}</Text>
            </Flex>

            <Flex>
              <Text fontWeight='600'>Match Time:</Text>
              <Text>{new Date(matchTime * 1000).toISOString().slice(11, 19)}</Text>
            </Flex>
          </Flex>
        )
      )}
    </Box>
  );
}
