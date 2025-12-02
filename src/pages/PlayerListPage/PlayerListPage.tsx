import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import type { Player } from '@/types/players';
import { playersSelector, authSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { setPaging, getPlayerList, deletePlayer } from '@/redux/reducers/players';
import Pagination from '@/components/Pagination/Pagination';
import type { ChangePaging } from '@/components/Pagination/Pagination';
import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import EditPlayerModal from '@/components/EditPlayerModal/EditPlayerModal';

export default function PlayerListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, playerList, pagination } = useSelector(playersSelector);
  const { player: currentPlayer } = useSelector(authSelector);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const selectedBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const isAdmin = currentPlayer?.isAdmin === true;

  useEffect(() => {
    dispatch(getPlayerList());
  }, [dispatch]);

  const onChangePaging = (paging: ChangePaging) => {
    dispatch(setPaging(paging));
    dispatch(getPlayerList());
  };

  const handleEditClick = (e: React.MouseEvent, playerId: string) => {
    e.stopPropagation();
    setEditingPlayerId(playerId);
  };

  const handleDeleteClick = async (e: React.MouseEvent, playerId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this player?')) {
      await dispatch(deletePlayer(playerId));
    }
  };

  const editingPlayer = playerList.find(p => p.id === editingPlayerId) || null;

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
              <Th>Played Matches</Th>
              {isAdmin && <Th>Actions</Th>}
            </Tr>
          </Thead>

          <Tbody>
            {playerList.map((el: Player) => {
              const { name, id, isAdmin: isPlayerAdmin, playedMatchesCount } = el;
              return (
                <Tr
                  key={id}
                  onClick={() => navigate(id)}
                  cursor='pointer'
                  _hover={{ bg: hoverBg }}
                  _selected={{ bg: selectedBg }}
                >
                  <Td>
                    <Flex align='center' gap='8px'>
                      {name}
                      {isAdmin && isPlayerAdmin && (
                        <Badge colorScheme='red' fontSize='xs'>
                          Admin
                        </Badge>
                      )}
                      {currentPlayer?.id === id && (
                        <Badge colorScheme='green' fontSize='xs'>
                          You
                        </Badge>
                      )}
                    </Flex>
                  </Td>

                  <Td>{playedMatchesCount ?? 0}</Td>

                  {isAdmin && (
                    <Td onClick={e => e.stopPropagation()}>
                      <Flex gap='8px'>
                        {!isPlayerAdmin && (
                          <>
                            <IconButton
                              aria-label='Edit player'
                              icon={<EditIcon />}
                              size='sm'
                              onClick={e => handleEditClick(e, id)}
                            />

                            <IconButton
                              aria-label='Delete player'
                              icon={<DeleteIcon />}
                              size='sm'
                              colorScheme='red'
                              onClick={e => handleDeleteClick(e, id)}
                            />
                          </>
                        )}
                      </Flex>
                    </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      <Pagination paging={pagination} onChange={onChangePaging} />

      <EditPlayerModal
        isOpen={!!editingPlayerId}
        onClose={() => setEditingPlayerId(null)}
        player={editingPlayer}
      />
    </Flex>
  );
}
