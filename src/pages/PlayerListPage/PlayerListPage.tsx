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
  const navigate = useNavigate();
  const { status, playerList, pagination } = useSelector(playersSelector);
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const selectedBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

  useEffect(() => {
    dispatch(getPlayerList());
  }, [dispatch]);

  const onChangePaging = (paging: ChangePaging) => {
    dispatch(setPaging(paging));
    dispatch(getPlayerList());
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
            </Tr>
          </Thead>

          <Tbody>
            {playerList.map((el: Player) => {
              const { name, email, id } = el;
              return (
                <Tr
                  key={id}
                  onClick={() => navigate(id)}
                  cursor='pointer'
                  _hover={{ bg: hoverBg }}
                  _selected={{ bg: selectedBg }}
                >
                  <Td>{name}</Td>
                  <Td>{email}</Td>
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
