import { useMemo, type ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';

import type { SelectOption } from '@/types/fields';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  onChange: (e: number) => void;
  value?: number;
};

const PageSizeSelect = ({ min = 10, max = 50, step = 5, onChange, value }: Props) => {
  const options = useMemo(() => {
    return Array((max - min) / step + 1)
      .fill(1)
      .map((_, i) => {
        const size = min + i * step;
        return { label: size, value: size };
      });
  }, [min, max, step]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(+e.currentTarget.value);
  };

  return (
    <Select w='110px' onChange={handleChange} value={value}>
      {options.map(({ label, value }: SelectOption) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};

export default PageSizeSelect;
