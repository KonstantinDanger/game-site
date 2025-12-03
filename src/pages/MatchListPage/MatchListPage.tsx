import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
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
// import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import EditMatchModal from '@/components/EditMatchModal/EditMatchModal';
import Pagination from '@/components/Pagination/Pagination';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';

import { setPaging, getMatchList, deleteMatch } from '@/redux/reducers/matches';
import { matchesSelector, authSelector } from '@/redux/selectors';
import { useDispatch, useSelector } from '@/redux/store';
import { secondsToTime } from '@/utils';

import type { ChangePaging } from '@/components/Pagination/Pagination';
import type { Match } from '@/types/matches';

export default function MatchListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, matchList, pagination } = useSelector(matchesSelector);
  const { player: currentPlayer } = useSelector(authSelector);
  const [editingMatchId, setEditingMatchId] = useState<string | null>(null);
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const selectedBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const isAdmin = currentPlayer?.isAdmin === true;

  useEffect(() => {
    dispatch(getMatchList());
  }, [dispatch]);

  const onChangePaging = (paging: ChangePaging) => {
    dispatch(setPaging(paging));
    dispatch(getMatchList());
  };

  const handleEditClick = (e: React.MouseEvent, matchId: string) => {
    e.stopPropagation();
    setEditingMatchId(matchId);
  };

  const handleDeleteClick = async (e: React.MouseEvent, matchId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this match?')) {
      await dispatch(deleteMatch(matchId));
    }
  };

  const editingMatch = matchList.find(m => m.id === editingMatchId) || null;

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
              <Th>Winner</Th>
              <Th>Loser</Th>
              {isAdmin && <Th>Actions</Th>}
            </Tr>
          </Thead>

          <Tbody>
            {matchList.map((el: Match) => {
              const { id, matchDate, matchTime, winner, loser } = el;
              return (
                <Tr
                  key={id}
                  onClick={() => navigate(id)}
                  cursor='pointer'
                  _hover={{ bg: hoverBg }}
                  _selected={{ bg: selectedBg }}
                >
                  {/* <Td>{name}</Td> */}

                  <Td>{new Date(matchDate).toLocaleDateString()}</Td>
                  <Td>{secondsToTime(matchTime)}</Td>
                  <Td><Link to={"playerPath"}>{winner?.name}</Link></Td>
                  <Td><Link to={"playerPath"}>{loser?.name}</Link></Td>

                  {isAdmin && (
                    <Td onClick={e => e.stopPropagation()}>
                      <Flex gap='8px'>
                        <IconButton
                          aria-label='Edit match'
                          icon={<EditIcon />}
                          size='sm'
                          onClick={e => handleEditClick(e, id)}
                        />

                        <IconButton
                          aria-label='Delete match'
                          icon={<DeleteIcon />}
                          size='sm'
                          colorScheme='red'
                          onClick={e => handleDeleteClick(e, id)}
                        />
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

      <EditMatchModal
        isOpen={!!editingMatchId}
        onClose={() => setEditingMatchId(null)}
        match={editingMatch}
      />
    </Flex>
  );
}
