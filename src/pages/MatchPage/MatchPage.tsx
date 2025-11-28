import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';

import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { getMatchById } from '@/redux/reducers/matches';
import { matchesSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { secondsToTime } from '@/utils';

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
    <Flex flexDir='column' gap='24px'>
      <h1>Match Info</h1>

      {['idle', 'loading'].includes(status) ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        match && (
          <Flex flexDir='column' gap='24px'>
            <Flex gap='8px'>
              <Text fontWeight='600'>Match Date:</Text>
              <Text>{new Date(match.matchDate).toLocaleDateString()}</Text>
            </Flex>

            <Flex gap='8px'>
              <Text fontWeight='600'>Match Time:</Text>
              <Text>{secondsToTime(match.matchTime)}</Text>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
}
