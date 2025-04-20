import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Divider, 
  Button, 
  Badge,
  Image,
  Center,
  Flex,
  Icon,
  IconButton,
  useToast,
  useColorModeValue,
  Spinner,
  keyframes,
  ScaleFade,
  Grid,
  GridItem,
  Stack,
  Tooltip,
  useClipboard
} from '@chakra-ui/react';
import { 
  FaTicketAlt, 
  FaPrint, 
  FaDownload, 
  FaCheck, 
  FaCalendarAlt, 
  FaUser, 
  FaUsers, 
  FaIdCard,
  FaCopy,
  FaArrowLeft
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation for the success checkmark
const checkmarkAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

// Animated components with Chakra UI + framer-motion
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const TicketSuccess = () => {
  const location = useLocation();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const ticketRef = useRef();
  const toast = useToast();
  
  // For copy to clipboard functionality
  const { hasCopied, onCopy } = useClipboard(ticketDetails?.ticketId || '');

  // Dynamic Chakra UI colors based on color mode
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const highlightColor = useColorModeValue('blue.50', 'blue.900');
  const primaryColor = useColorModeValue('blue.500', 'blue.300');
  const qrCodeBg = useColorModeValue('gray.50', 'gray.900');
  
  // Animation for checkmark
  const checkmarkAnim = `${checkmarkAnimation} 1s ease-in-out forwards`;

  useEffect(() => {
    // Parse the query params
    const params = new URLSearchParams(location.search);
    const orderId = params.get('order_id');
    let paymentStatus = params.get('payment_status');
    
    // Default values to handle template variables that weren't replaced
    if (orderId === '$order_id') {
      // Generate a random order ID for demo/testing
      const randomOrderId = Math.random().toString(36).substring(2, 10);
      params.set('order_id', randomOrderId);
    }
    
    if (paymentStatus === '$payment_status') {
      // Assume payment success for demo/testing
      paymentStatus = 'SUCCESS';
    }
    
    // Create ticket details object from URL params
    const details = {
      orderId: params.get('order_id'),
      paymentStatus: paymentStatus,
      customerName: params.get('customer_name') || 'John Doe',
      customerEmail: params.get('customer_email') || 'visitor@example.com',
      visitorType: params.get('visitor_type') || 'Adult',
      ticketCount: params.get('ticket_count') || '1',
      visitDate: params.get('visit_date') || new Date().toISOString().split('T')[0],
      placeName: params.get('place_name') || 'Museum',
      ticketId: `TKT-${params.get('order_id')?.substring(0, 8)?.toUpperCase() || 'DEMO1234'}`
    };
    
    setTicketDetails(details);

    // Generate QR code
    const qrData = {
      ticketId: details.ticketId,
      orderId: details.orderId,
      customerName: details.customerName,
      visitDate: details.visitDate,
      ticketCount: details.ticketCount
    };
    const qrText = JSON.stringify(qrData);
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`;
    setQrCodeUrl(qrCodeApiUrl);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment Successful!",
        description: "Your tickets are ready. You can print or download them.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }, 1500);
    
  }, [location, toast]);

  const handlePrint = () => {
    const printContents = ticketRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Container centerContent maxW="container.md" py={20}>
        <VStack spacing={6}>
          <Spinner 
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Heading size="md">Processing Your Ticket</Heading>
          <Text color="gray.500">Please wait while we generate your e-ticket...</Text>
        </VStack>
      </Container>
    );
  }

  if (!ticketDetails) {
    return (
      <Container centerContent maxW="container.md" py={20}>
        <VStack spacing={6} align="stretch" bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
          <Heading size="lg" mb={4} textAlign="center">No Ticket Information Found</Heading>
          <Text textAlign="center">We could not find your ticket information. Please try again or contact support.</Text>
          <Center mt={4}>
            <Button as={Link} to="/" leftIcon={<FaArrowLeft />} colorScheme="blue">
              Return to Home
            </Button>
          </Center>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <ScaleFade initialScale={0.9} in={true}>
        <VStack spacing={8} align="stretch">
          {/* Success Message */}
          <MotionFlex 
            justify="center" 
            align="center" 
            direction="column"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Center 
              w="80px" 
              h="80px" 
              bg="green.100" 
              borderRadius="full" 
              mb={4}
            >
              <Icon 
                as={FaCheck} 
                w={10} 
                h={10} 
                color="green.500" 
                animation={checkmarkAnim}
              />
            </Center>
            <Heading size="lg" mb={2} textAlign="center">Payment Successful!</Heading>
            <Text fontSize="lg" color="gray.600" textAlign="center">
              Your ticket has been generated successfully.
            </Text>
          </MotionFlex>

          {/* Ticket */}
          <MotionBox
            ref={ticketRef}
            border="1px solid" 
            borderColor={borderColor}
            borderRadius="xl" 
            overflow="hidden"
            bg={cardBg}
            boxShadow="xl"
            position="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Ticket Header */}
            <Box 
              bg={primaryColor} 
              py={5} 
              px={6} 
              color="white"
              position="relative"
              overflow="hidden"
            >
              <Box 
                position="absolute" 
                top="-20px" 
                right="-20px" 
                width="100px" 
                height="100px" 
                borderRadius="full" 
                bg="rgba(255,255,255,0.1)" 
              />
              <Box 
                position="absolute" 
                bottom="-30px" 
                left="-20px" 
                width="120px" 
                height="120px" 
                borderRadius="full" 
                bg="rgba(255,255,255,0.1)" 
              />
              
              <Flex justify="space-between" align="center">
                <HStack>
                  <Icon as={FaTicketAlt} w={6} h={6} />
                  <Heading size="md">
                    {ticketDetails.placeName} E-Ticket
                  </Heading>
                </HStack>
                <Badge 
                  colorScheme="green" 
                  py={2} 
                  px={4} 
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  CONFIRMED
                </Badge>
              </Flex>
            </Box>
            
            {/* Dotted separator to make it look like a real ticket */}
            <Box 
              height="4px" 
              bgImage="radial-gradient(circle, #e2e8f0 1px, transparent 1px)" 
              bgSize="8px 8px"
              mx={4}
            />
            
            {/* Ticket Body */}
            <Grid 
              templateColumns={{ base: "1fr", md: "3fr 2fr" }} 
              gap={6} 
              p={6}
            >
              {/* Left side - Ticket Info */}
              <GridItem>
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">TICKET ID</Text>
                    <Flex align="center" mt={1}>
                      <Text fontWeight="bold" fontSize="lg">{ticketDetails.ticketId}</Text>
                      <Tooltip 
                        label={hasCopied ? "Copied!" : "Copy ID"} 
                        placement="top"
                        hasArrow
                      >
                        <IconButton
                          icon={<FaCopy />}
                          size="sm"
                          variant="ghost"
                          ml={2}
                          aria-label="Copy ticket ID"
                          onClick={onCopy}
                          color={hasCopied ? "green.500" : "gray.500"}
                        />
                      </Tooltip>
                    </Flex>
                  </Box>
                  
                  <Divider />
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Box>
                      <HStack color="gray.600" mb={1}>
                        <Icon as={FaUser} />
                        <Text fontSize="sm">VISITOR</Text>
                      </HStack>
                      <Text fontWeight="semibold">{ticketDetails.customerName}</Text>
                    </Box>
                    
                    <Box>
                      <HStack color="gray.600" mb={1}>
                        <Icon as={FaUsers} />
                        <Text fontSize="sm">VISITOR TYPE</Text>
                      </HStack>
                      <Text fontWeight="semibold">{ticketDetails.visitorType}</Text>
                    </Box>
                    
                    <Box>
                      <HStack color="gray.600" mb={1}>
                        <Icon as={FaTicketAlt} />
                        <Text fontSize="sm">TICKETS</Text>
                      </HStack>
                      <Text fontWeight="semibold">{ticketDetails.ticketCount} {parseInt(ticketDetails.ticketCount) > 1 ? 'tickets' : 'ticket'}</Text>
                    </Box>
                    
                    <Box>
                      <HStack color="gray.600" mb={1}>
                        <Icon as={FaCalendarAlt} />
                        <Text fontSize="sm">VISIT DATE</Text>
                      </HStack>
                      <Text fontWeight="semibold">{formatDate(ticketDetails.visitDate)}</Text>
                    </Box>
                  </Grid>
                  
                  <Divider />
                  
                  <Box>
                    <HStack color="gray.600" mb={1}>
                      <Icon as={FaIdCard} />
                      <Text fontSize="sm">ORDER REFERENCE</Text>
                    </HStack>
                    <Text>{ticketDetails.orderId}</Text>
                  </Box>
                  
                  <Box 
                    bg={highlightColor} 
                    p={4} 
                    borderRadius="md" 
                    mt={2}
                  >
                    <Text fontSize="sm">
                      Please present this ticket at the entrance. Valid only for the date mentioned.
                      This e-ticket can be shown on your mobile device or printed.
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
              
              {/* Right side - QR Code */}
              <GridItem>
                <Center h="100%">
                  <VStack spacing={4}>
                    <Box 
                      p={4} 
                      borderRadius="md" 
                      border="1px dashed" 
                      borderColor={borderColor}
                      bg={qrCodeBg}
                    >
                      {qrCodeUrl && (
                        <VStack>
                          <Image 
                            src={qrCodeUrl}
                            alt="Ticket QR Code"
                            borderRadius="md"
                            boxSize="200px"
                            fallback={<Spinner />}
                          />
                          <Text fontSize="sm" fontWeight="medium" textAlign="center" mt={2}>
                            Scan for verification
                          </Text>
                        </VStack>
                      )}
                    </Box>
                  </VStack>
                </Center>
              </GridItem>
            </Grid>
          </MotionBox>

          {/* Action Buttons */}
          <Stack 
            direction={{ base: 'column', sm: 'row' }} 
            spacing={4} 
            justify="center"
            mt={4}
          >
            <Button 
              leftIcon={<FaPrint />} 
              colorScheme="blue" 
              size="lg"
              onClick={handlePrint}
              boxShadow="md"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Print Ticket
            </Button>
            <Button 
              leftIcon={<FaDownload />} 
              variant="outline" 
              colorScheme="blue"
              size="lg"
              onClick={handlePrint}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'sm' }}
              transition="all 0.2s"
            >
              Save as PDF
            </Button>
            <Button
              as={Link}
              to="/"
              leftIcon={<FaArrowLeft />}
              variant="ghost"
              size="lg"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              Back to Home
            </Button>
          </Stack>
        </VStack>
      </ScaleFade>
    </Container>
  );
};

export default TicketSuccess;