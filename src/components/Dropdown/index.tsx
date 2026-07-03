import * as React from 'react'
import {
  Stack,
  Typography,
  Box,
  Popper,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
  SxProps,
  Theme,
} from '@mui/material'
import styled from 'styled-components'
import { ArrowDown } from '../../icons/ArrowDown'
import { ArrowUp } from '../../icons/ArrowUp'
import { CheckIcon } from '../../icons/Check'
import {
  HEIGHTS,
  FontSizeMap,
  ComponentSize,
  ComponentVariant,
} from '../../constants'
import { SearchInput } from '../SearchInput'
import { theme } from '../../theme'
import { shadows } from '../../theme/tokens/shadows'

/** Flex row wrapper used to lay out a "Sort by" label alongside a `Dropdown`. */
export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  color: #1b1c1e;
`

/** Height preset for the dropdown trigger; mirrors the shared `ComponentSize` scale. */
export type DropdownSize = ComponentSize
/** Trigger shape: `round` (pill) or `rectangle` (rounded rect); mirrors `ComponentVariant`. */
export type DropdownVariant = ComponentVariant
/** Named palette key (`primary`/`secondary`/`tertiary`) or any raw CSS color string for the trigger background. */
export type DropdownColor = 'primary' | 'secondary' | 'tertiary' | string

/** A single selectable option rendered in the dropdown menu. */
export interface DropdownOption {
  /** Underlying value; matched against `DropdownProps.value` to mark selection and used as fallback display text. */
  value: string
  /** Human-readable display text; falls back to `value` when omitted. */
  label?: string
  /** Optional leading icon component rendered before the option text. */
  icon?: React.ComponentType
}

/** Props for {@link Dropdown}. */
export interface DropdownProps {
  /** Size of the dropdown */
  size?: DropdownSize
  /** Visual variant - round or rectangular */
  variant?: DropdownVariant
  /** Color scheme */
  color?: DropdownColor
  /** Disabled state */
  disabled?: boolean
  /** Label text shown before selected value */
  label?: string
  /** Array of options to display */
  options?: DropdownOption[]
  /** Callback when option is selected */
  onChange?: (option: DropdownOption, index: number) => void
  /** Currently selected value */
  value?: string
  /** Custom popper content instead of default menu */
  customPopperComponent?: React.ReactNode | React.ReactElement
  /** Styles for the main box container */
  boxSx?: SxProps<Theme>
  /** Styles for the popper */
  popperSx?: SxProps<Theme>
  /** Styles for the paper */
  paperSx?: SxProps<Theme>
  /** Styles for menu items */
  menuItemSx?: SxProps<Theme>
  /** Styles for menu list */
  menuListSx?: SxProps<Theme>
  /** Callback when dropdown closes */
  onClose?: () => void
  /** Enable search functionality */
  isSearchRequired?: boolean
  /** Gap between text and arrow */
  arrowGap?: string
  /** Show icon for selected option */
  showSelectedOptionIcon?: boolean
  /** Styles for selected icon wrapper */
  selectedIconWrapperSx?: SxProps<Theme>
  /** Styles for selected option text */
  selectedOptionTextSx?: SxProps<Theme>
  /** Custom end adornment icon */
  endAdornmentIcon?: React.ReactNode
  /** Gap for end adornment icon */
  endAdornmentIconGap?: string
  /** Test ID for testing */
  testid?: string
  /** Default value */
  defaultValue?: string
  /** Add ellipsis to long text */
  isAddEllipsis?: boolean
  /** Index signature: any extra props are spread onto the trigger `Stack`. */
  [key: string]: unknown
}

/**
 * Dropdown select built on MUI `Popper` + `MenuList`.
 * Renders a pill/rectangle trigger showing an optional label and the selected
 * option (icon + text), and opens a menu of `DropdownOption`s with a checkmark
 * on the current selection. Supports optional in-menu search (`isSearchRequired`),
 * fully custom popper content (`customPopperComponent`), sizes/variants/colors,
 * text ellipsis, and an end-adornment icon. Every layer is `sx`-overridable.
 */
export const Dropdown: React.FC<DropdownProps> = ({
  size = 'small',
  variant = 'round',
  color = '',
  disabled = false,
  label = '',
  options = [],
  onChange = () => {},
  value = '',
  customPopperComponent = null,
  boxSx = {},
  popperSx = {},
  paperSx = {},
  menuItemSx = {},
  menuListSx = {},
  onClose = () => {},
  isSearchRequired = false,
  arrowGap = '20px',
  showSelectedOptionIcon = false,
  selectedIconWrapperSx = {},
  selectedOptionTextSx = {},
  endAdornmentIcon = null,
  endAdornmentIconGap = '10px',
  testid,
  isAddEllipsis = false,
  defaultValue = '',
  ...rest
}) => {
  const [open, setOpen] = React.useState(false)
  const [anchorWidth, setAnchorWidth] = React.useState(200)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const popperRef = React.useRef<any>(null)
  const [searchValue, setSearchValue] = React.useState('')
  const fontWeightMedium = theme?.typography?.fontWeight?.medium ?? 500
  const fontWeightRegular = theme?.typography?.fontWeight?.regular ?? 400

  // Update anchor element and width when opening
  React.useEffect(() => {
    if (open && anchorRef.current) {
      setAnchorWidth(anchorRef.current.getBoundingClientRect().width)
    }
  }, [open])

  // Reposition popper when anchor layout or sibling container shifts
  React.useEffect(() => {
    if (!open || !anchorRef.current) return

    const handleResize = () => {
      if (popperRef.current && typeof popperRef.current.update === 'function') {
        popperRef.current.update()
      }
    }

    const observer = new ResizeObserver(() => {
      handleResize()
    })

    observer.observe(anchorRef.current)
    if (anchorRef.current.parentElement) {
      observer.observe(anchorRef.current.parentElement)
    }

    return () => {
      observer.disconnect()
    }
  }, [open])

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    if (disabled) return
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event?.target as Node)
    ) {
      return
    }
    onClose()
    setOpen(false)
  }

  const handleOptionClick = (option: DropdownOption, index: number) => {
    onChange(option, index)
    setOpen(false)
    setSearchValue('')
  }

  // Resolve the option matching `value`, or null when nothing is selected
  const getSelectedOption = (): DropdownOption | null => {
    if (value) {
      return options.find((opt) => opt?.value === value) || null
    }
    return null
  }

  const selectedOption = getSelectedOption()

  const isSelected = (option: DropdownOption): boolean => {
    return option.value === value
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const palette = theme?.palette as any
  // Resolve the trigger background from the palette when `color` names a palette key
  const bgColorPalette = color ? palette?.[color]?.main : undefined

  // Case-insensitive filter on value/label driven by the in-menu search box
  const filteredOptions = options?.filter(
    (option) =>
      searchValue === '' ||
      option.value.toLowerCase().includes(searchValue.toLowerCase()) ||
      (option.label &&
        option.label.toLowerCase().includes(searchValue.toLowerCase()))
  )

  // Parse a px string (e.g. "20px") to a number, defaulting to 0
  const parsePxValue = (valueToParse?: string) => {
    if (!valueToParse) return 0
    const parsed = Number.parseFloat(valueToParse)
    return Number.isNaN(parsed) ? 0 : parsed
  }

  // Compute the ellipsis cap for selected text: anchor width minus arrow gap, padding, and end-adornment space
  const maxSelectedTextWidth = () => {
    if (!isAddEllipsis) return undefined
    const arrowGapValue = parsePxValue(arrowGap)
    const endAdornmentGapValue = endAdornmentIcon
      ? 40 + parsePxValue(endAdornmentIconGap)
      : 0
    return `${anchorWidth - arrowGapValue - 24 - endAdornmentGapValue}px !important`
  }

  // eslint-disable-next-line react-hooks/refs
  const popperAnchorEl = anchorRef.current

  return (
    <>
      <Stack
        ref={anchorRef}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        px={'12px'}
        m={0}
        onClick={handleClick}
        height={'32px'}
        sx={{
          height: `calc(${HEIGHTS[size]} * var(--scale, 1))`,
          border: `0.5px solid ${theme.palette.softSteel[400]}`,
          borderRadius: variant === 'round' ? '100px' : '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          backgroundColor: color ? bgColorPalette : '#ffffff',
          ...boxSx,
        }}
        data-testid={testid ? `dropdown-${testid}` : undefined}
        {...rest}
      >
        <Stack
          height={'100%'}
          direction='row'
          alignItems='center'
          gap={'4px'}
          flex={1}
        >
          {label && (
            <Typography
              noWrap
              variant={
                FontSizeMap[size] as
                  | 'h1'
                  | 'h2'
                  | 'h3'
                  | 'h4'
                  | 'body1'
                  | 'body2'
              }
              sx={{
                fontWeight: fontWeightMedium,
                lineHeight: 'normal',
                margin: 0,
              }}
            >
              {label}
            </Typography>
          )}

          {(selectedOption || defaultValue) && (
            <Stack direction='row' alignItems='center' gap='6px'>
              {selectedOption?.icon && showSelectedOptionIcon && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'calc(18px * var(--scale, 1))',
                    height: 'calc(18px * var(--scale, 1))',
                    ...selectedIconWrapperSx,
                  }}
                >
                  {React.createElement(selectedOption.icon)}
                </Box>
              )}

              <Typography
                title={
                  selectedOption?.label || selectedOption?.value || defaultValue
                }
                noWrap
                variant={
                  FontSizeMap[size] as
                    | 'h1'
                    | 'h2'
                    | 'h3'
                    | 'h4'
                    | 'body1'
                    | 'body2'
                }
                sx={{
                  fontWeight: fontWeightMedium,
                  ...(isAddEllipsis && {
                    maxWidth: maxSelectedTextWidth(),
                  }),
                  ...selectedOptionTextSx,
                }}
              >
                {selectedOption?.label || selectedOption?.value || defaultValue}
              </Typography>
            </Stack>
          )}
        </Stack>
        {endAdornmentIcon && (
          <Stack ml={endAdornmentIconGap}>{endAdornmentIcon}</Stack>
        )}
        <Stack ml={arrowGap}>
          {open ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </Stack>
      </Stack>
      <Popper
        open={
          open &&
          !disabled &&
          (options.length > 0 || !!customPopperComponent || isSearchRequired)
        }
        anchorEl={popperAnchorEl}
        popperRef={popperRef}
        placement='bottom-start'
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ]}
        sx={{ zIndex: 1300, ...popperSx }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            sx={{
              padding: '4px',
              border: `0.5px solid ${theme.palette.primaryBlue[300]}`,
              borderRadius: '8px',
              boxShadow: shadows.elevation03,
              minWidth: anchorWidth,
              backgroundColor: '#FFFFFF',
              maxHeight: '300px',
              overflow: 'auto',
              ...paperSx,
            }}
          >
            {isSearchRequired && (
              <Stack m='4px 0px 10px 0px'>
                <SearchInput
                  value={searchValue}
                  onChange={(nextValue) => setSearchValue(nextValue)}
                  containerSx={{
                    height: 'calc(24px * var(--scale, 1))',
                  }}
                />
              </Stack>
            )}
            {customPopperComponent ? (
              React.isValidElement(customPopperComponent) ? (
                React.cloneElement(
                  customPopperComponent as React.ReactElement<{
                    onClose?: () => void
                  }>,
                  {
                    onClose: () => {
                      onClose()
                      setOpen(false)
                    },
                  }
                )
              ) : (
                customPopperComponent
              )
            ) : filteredOptions?.length > 0 ? (
              <MenuList sx={{ p: 0, ...menuListSx }}>
                {filteredOptions?.map((option, index) => {
                  const selected = isSelected(option)
                  const isLastItem = index === filteredOptions.length - 1
                  const Icon = option.icon

                  return (
                    <MenuItem
                      key={index}
                      onClick={() => handleOptionClick(option, index)}
                      sx={{
                        p: 0,
                        m: 0,
                        height: 'calc(28px * var(--scale, 1))',
                        borderBottom: isLastItem
                          ? 'none'
                          : `0.5px solid ${theme.palette.softSteel[400]}`,
                        backgroundColor: selected
                          ? theme.palette.tertiary.main
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: theme.palette.tertiary.main,
                        },
                        ...menuItemSx,
                      }}
                    >
                      <Stack
                        width={'100%'}
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        px={'6px'}
                        gap={'8px'}
                      >
                        <Stack
                          direction={'row'}
                          alignItems={'center'}
                          flex={1}
                          gap={1}
                        >
                          {Icon && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                minWidth: 'calc(20px * var(--scale, 1))',
                                maxWidth: 'calc(20px * var(--scale, 1))',
                              }}
                            >
                              {React.createElement(Icon)}
                            </Box>
                          )}
                          <Typography
                            variant={
                              FontSizeMap[size] as
                                | 'h1'
                                | 'h2'
                                | 'h3'
                                | 'h4'
                                | 'body1'
                                | 'body2'
                            }
                            sx={{
                              fontSize: '13px !important',
                              fontWeight: selected
                                ? fontWeightMedium
                                : fontWeightRegular,
                              color: theme.palette.black.main,
                            }}
                            data-testid={`option-${testid}-${option.label || option.value}`}
                          >
                            {option?.label || option?.value}
                          </Typography>
                        </Stack>
                        {selected && <CheckIcon color={'#1C1B1E'} />}
                      </Stack>
                    </MenuItem>
                  )
                })}
              </MenuList>
            ) : (
              <Stack
                sx={{
                  height: '100px',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant='body1'>No Options</Typography>
              </Stack>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  )
}

/** Default export of the {@link Dropdown} component. */
export default Dropdown
