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
import { updateMatch, getMatchList } from '@/redux/reducers/matches';
import type { Match } from '@/types/matches';
import { matchesSelector } from '@/redux/selectors';

type EditMatchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
};

export default function EditMatchModal({
  isOpen,
  onClose,
  match,
}: EditMatchModalProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { status } = useSelector(matchesSelector);

  useEffect(() => {
    if (isOpen) setName(match?.name || '');
  }, [match, isOpen]);

  if (!match) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateMatch({ id: match.id, data: { name } }));
    dispatch(getMatchList());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Edit Match</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Match name'
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
