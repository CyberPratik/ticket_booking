import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  Flex, 
  Text, 
  IconButton, 
  Stack, 
  Collapse, 
  Icon, 
  Container, 
  HStack,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';
import { FaHome, FaPlane, FaEnvelope } from 'react-icons/fa';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import ColorModeSwitcher from './ColorModeSwitcher';

// Desktop Navigation Link Component
const NavLink = ({ children, icon, to, active }) => {
  const activeColor = useColorModeValue('blue.500', 'blue.200');
  const hoverColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  
  return (
    <Link to={to}>
      <Flex 
        align="center" 
        p={2}
        fontSize="md"
        fontWeight={active ? "semibold" : "medium"}
        color={active ? activeColor : textColor}
        _hover={{
          textDecoration: 'none',
          color: hoverColor,
        }}
      >
        <Icon as={icon} mr={2} />
        {children}
      </Flex>
    </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ children, icon, to, active, onClick }) => {
  const activeColor = useColorModeValue('blue.500', 'blue.200');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const hoverBg = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Link to={to} onClick={onClick} style={{ width: '100%' }}>
      <Flex
        align="center"
        p={3}
        borderRadius="md"
        role="group"
        cursor="pointer"
        fontWeight={active ? "semibold" : "normal"}
        color={active ? activeColor : textColor}
        bg={active ? hoverBg : 'transparent'}
        _hover={{
          bg: hoverBg,
        }}
        width="100%"
      >
        <Icon as={icon} mr={3} />
        {children}
      </Flex>
    </Link>
  );
};

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  
  // Close navbar on route change
  useEffect(() => {
    if (isOpen) onToggle(); // Close the navbar on navigation
  }, [location, isOpen, onToggle]);

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mobileMenuBg = useColorModeValue('white', 'gray.800');

  return (
    <Box 
      position="fixed"
      top="0"
      width="100%"
      zIndex="1000"
      boxShadow="sm"
      bg={bgColor}
    >
      <Container maxW="container.xl" p={4}>
        {/* Main Navbar Row */}
        <Flex align="center" justify="space-between" width="100%">
          {/* Logo */}
          <Link to="/" onClick={() => isOpen && onToggle()}>
            <Flex align="center">
              <Icon as={FaPlane} w={6} h={6} color="blue.500" />
              <Text
                textAlign="left"
                fontFamily="heading"
                fontWeight="bold"
                fontSize="xl"
                ml={2}
                color={textColor}
              >
                Tourist Places Booking
              </Text>
            </Flex>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={8} alignItems="center" display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/" icon={FaHome} active={isActive('/')}>
              Home
            </NavLink>
            <NavLink to="/museums" icon={FaPlane} active={isActive('/museums')}>
              Tourist Places
            </NavLink>
            <NavLink to="/contact" icon={FaEnvelope} active={isActive('/contact')}>
              Contact Us
            </NavLink>
          </HStack>

          {/* Right Side Controls */}
          <Flex>
            <ColorModeSwitcher />
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
              ml={2}
            />
          </Flex>
        </Flex>

        {/* Mobile Menu */}
        <Collapse in={isOpen} animateOpacity>
          <Box
            mt={4}
            p={4}
            display={{ md: 'none' }}
            bg={mobileMenuBg}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderColor}
            shadow="md"
          >
            <Stack spacing={4} width="100%">
              <MobileNavLink to="/" icon={FaHome} active={isActive('/')} onClick={onToggle}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/museums" icon={FaPlane} active={isActive('/museums')} onClick={onToggle}>
                Tourist Places
              </MobileNavLink>
              <MobileNavLink to="/contact" icon={FaEnvelope} active={isActive('/contact')} onClick={onToggle}>
                Contact Us
              </MobileNavLink>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

// Define prop types for NavLink component
NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

// Define prop types for MobileNavLink component
MobileNavLink.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Navigation;