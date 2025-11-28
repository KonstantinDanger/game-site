import { useEffect } from 'react';
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import type { Match } from '@/types/matches';
import { matchesSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { setPaging, getMatchList } from '@/redux/reducers/matches';
import Pagination from '@/components/Pagination/Pagination';
import type { ChangePaging } from '@/components/Pagination/Pagination';
import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';

export default function MatchListPage() {
  const dispatch = useDispatch();
  const { status, matchList, pagination } = useSelector(matchesSelector);

  useEffect(() => {
    dispatch(getMatchList());
  }, [dispatch]);

  const onChangePaging = (paging: ChangePaging) => {
    dispatch(setPaging(paging));
  };

  return (
    <Flex flexDir='column' gap='24px'>
      <h1>Match List</h1>

      {['idle', 'loading'].includes(status) ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        <Table w='100%'>
          <Thead>
            <Tr>
              <Th>Match Date</Th>
              <Th>Match Time</Th>
            </Tr>
          </Thead>

          <Tbody>
            {matchList.map((el: Match) => {
              const { id, matchDate, matchTime } = el;
              return (
                <Tr key={id}>
                  <Td>{new Date(matchDate).toLocaleDateString()}</Td>
                  <Td>{matchTime}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      <Pagination paging={pagination} onChange={onChangePaging} />
    </Flex>
  );
}
