import styled from '@emotion/styled'
import { forwardRef, SelectHTMLAttributes } from 'react'
import Flex from './Flex'
import Text from './Text'
import { colors } from '@styles/colorPalette'

export interface Option {
  label: string
  value: string | number | undefined
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.gray};
  border: none;
  border-radius: 15px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }
`

const Select = forwardRef<
  HTMLSelectElement,
  SelectProps & { placeholder: string }
>(function Select({ label, options, value, placeholder, ...props }, ref) {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t7"
          color="black"
          display="inline block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        <option disabled value="" selected hidden>
          {placeholder}
        </option>
        {options.map(({ label, value }, index) => (
          <option key={`${label} ${index}`} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})

export default Select
