import { useEffect, useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import RCPagination from 'rc-pagination';

import PageSizeSelect from './PageSizeSelect';
import type { Paging } from '@/types/fields';
import { sleep } from '@/utils';
import './Pagination.scss';

export type ChangePaging = Partial<Omit<Paging, 'totalCount'>>;

type Props = {
  paging: Paging;
  onChange: (e: ChangePaging) => void;
  disabled?: boolean;
};

export default function Pagination({
  paging: { page = 1, perPage = 10, totalCount = 1 },
  onChange,
  disabled = false,
}: Props) {
  const [_disabled, _setDisabled] = useState(disabled);

  useEffect(() => {
    if (!disabled) _setDisabled(false);
  }, [disabled, page]);

  const handlePageChange = async (nextPage: number) => {
    if (nextPage === page) return;
    await _setDisabled(true);
    await sleep(200); // for animation
    window.scrollTo(0, 0);
    onChange({ page: nextPage });
    _setDisabled(false);
  };

  const handlePageSizeChange = async (newPerPage: number) => {
    await _setDisabled(true);
    onChange({ perPage: newPerPage, page: 1 });
  };

  return (
    <Flex
      mt='30px'
      gap='24px'
      justifyContent='flex-end'
      pointerEvents={_disabled ? 'none' : 'all'}
      opacity={_disabled ? 0.5 : 1}
      flexWrap='wrap'
    >
      <PageSizeSelect onChange={handlePageSizeChange} value={perPage} />

      <RCPagination
        total={totalCount}
        pageSize={perPage}
        current={page}
        showQuickJumper
        showSizeChanger={false}
        onChange={handlePageChange}
        style={{ display: 'flex', listStyle: 'none' }}
        prevIcon={<Button variant='outline'>Prev</Button>}
        nextIcon={<Button variant='outline'>Next</Button>}
      />
    </Flex>
  );
}
