import { useEffect } from 'react';
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import type { Player } from '@/types/players';
import { playersSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { setPaging, getPlayerList } from '@/redux/reducers/players';
import Pagination from '@/components/Pagination/Pagination';
import type { ChangePaging } from '@/components/Pagination/Pagination';
import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';

export default function PlayerListPage() {
  const dispatch = useDispatch();
  const { status, playerList, pagination } = useSelector(playersSelector);

  useEffect(() => {
    dispatch(getPlayerList());
  }, [dispatch]);

  const onChangePaging = (paging: ChangePaging) => {
    dispatch(setPaging(paging));
  };

  return (
    <Flex flexDir='column' gap='24px'>
      <h1>Player List</h1>

      {['idle', 'loading'].includes(status) ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        <Table w='100%'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>

          <Tbody>
            {playerList.map((el: Player) => {
              const { name, email, score } = el;
              return (
                <Tr>
                  <Td>{name}</Td>
                  <Td>{email}</Td>
                  <Td>{score}</Td>
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
