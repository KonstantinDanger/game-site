import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';

import type { Match } from '@/types/matches';
import { matchesSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { setPaging, getMatchList } from '@/redux/reducers/matches';
import Pagination from '@/components/Pagination/Pagination';
import type { ChangePaging } from '@/components/Pagination/Pagination';
import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { secondsToTime } from '@/utils';

export default function MatchListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, matchList, pagination } = useSelector(matchesSelector);
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const selectedBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

  useEffect(() => {
    dispatch(getMatchList());
  }, [dispatch]);

  const onChangePaging = (paging: ChangePaging) => {
    dispatch(setPaging(paging));
    dispatch(getMatchList());
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
                <Tr
                  key={id}
                  onClick={() => navigate(id)}
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
      )}

      <Pagination paging={pagination} onChange={onChangePaging} />
    </Flex>
  );
}
