import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from '@/redux/store';
import { updatePlayer, getPlayerList } from '@/redux/reducers/players';
import type { Player } from '@/types/players';
import { playersSelector } from '@/redux/selectors';

type EditPlayerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  player: Player | null;
};

export default function EditPlayerModal({
  isOpen,
  onClose,
  player,
}: EditPlayerModalProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { status } = useSelector(playersSelector);

  useEffect(() => {
    if (isOpen) setName(player?.name || '');
  }, [player, isOpen]);

  if (!player) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updatePlayer({ id: player?.id, data: { name } }));
    dispatch(getPlayerList());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Edit Player</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Player name'
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' colorScheme='blue' isLoading={status === 'updating'}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
