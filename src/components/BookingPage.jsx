import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  FormControl, 
  FormLabel, 
  Heading, 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Card,
  CardBody,
  FormHelperText,
  Input,
  Select,
  useColorModeValue
} from '@chakra-ui/react';

const BookingPage = () => {
  const { id } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [date, setDate] = useState('');
  const [visitorType, setVisitorType] = useState('Indian');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    // Here, we can call the booking API and handle the response.
  };

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Get tomorrow's date for min date in the date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Container maxW="container.md" py={10}>
      <Card bg={cardBg} boxShadow="md" borderColor={borderColor} borderWidth="1px">
        <CardBody p={8}>
          <VStack spacing={6} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">
              Book Tickets for Tourist Place ID: {id}
            </Heading>
            
            <Box as="form" onSubmit={handleBooking}>
              <VStack spacing={4} align="stretch">
                <FormControl id="visitDate" isRequired>
                  <FormLabel>Visit Date</FormLabel>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={minDate}
                  />
                  <FormHelperText>Select a date for your visit</FormHelperText>
                </FormControl>
                
                <FormControl id="visitorType" isRequired>
                  <FormLabel>Visitor Type</FormLabel>
                  <Select 
                    value={visitorType} 
                    onChange={(e) => setVisitorType(e.target.value)}
                  >
                    <option value="Indian">Indian National</option>
                    <option value="Foreign">Foreign National</option>
                  </Select>
                </FormControl>
                
                <FormControl id="ticketCount" isRequired>
                  <FormLabel>Number of Tickets</FormLabel>
                  <NumberInput 
                    min={1} 
                    max={10} 
                    value={ticketCount} 
                    onChange={(valueString) => setTicketCount(parseInt(valueString))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormHelperText>Maximum 10 tickets per booking</FormHelperText>
                </FormControl>
              
                <Button 
                  mt={6} 
                  colorScheme="green" 
                  type="submit" 
                  width="100%"
                  size="lg"
                >
                  Book Tickets
                </Button>
              </VStack>
            </Box>

            {showConfirmation && (
              <Alert 
                status="success" 
                variant="subtle" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                textAlign="center" 
                borderRadius="md"
                py={4}
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Booking Successful!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Successfully booked {ticketCount} ticket(s) for your visit on {new Date(date).toLocaleDateString()}. A confirmation has been sent to your email.
                </AlertDescription>
              </Alert>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
}

export default BookingPage;
