import { useColorMode, useColorModeValue, IconButton, Tooltip } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('Dark', 'Light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const iconColor = useColorModeValue('blue.600', 'yellow.300');

  return (
    <Tooltip label={`Switch to ${text} mode`} placement="bottom">
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color={iconColor}
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        {...props}
      />
    </Tooltip>
  );
};

ColorModeSwitcher.propTypes = {
  // Add any prop types here if needed
};

export default ColorModeSwitcher; 