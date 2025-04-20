import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  FormControl, 
  FormLabel, 
  Heading, 
  Input,
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper,
  Text,
  VStack,
  HStack,
  Image,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Alert,
  AlertIcon,
  Spinner,
  Select,
  useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';
import { useParams } from 'react-router-dom';

const BuyTicket = () => {
  const { id } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [visitDate, setVisitDate] = useState('');
  const [visitorType, setVisitorType] = useState('Indian');

  // Get tomorrow's date for min date in the date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Tourist places data
  const touristPlaces = [
    { 
      id: 1, 
      name: "Taj Mahal", 
      city: "Agra", 
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000", 
      type: "Monument" 
    },
    { 
      id: 2, 
      name: "Goa Beaches", 
      city: "Goa", 
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000", 
      type: "Beach" 
    },
    { 
      id: 3, 
      name: "Darjeeling Hills", 
      city: "Darjeeling", 
      image: "https://picsum.photos/id/16/800/500", 
      type: "Hill Station" 
    },
    { 
      id: 4, 
      name: "Jaipur City Palace", 
      city: "Jaipur", 
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000", 
      type: "Heritage" 
    },
    { 
      id: 5, 
      name: "Kerala Backwaters", 
      city: "Alleppey", 
      image: "https://picsum.photos/id/143/800/500", 
      type: "Waterway" 
    },
    { 
      id: 6, 
      name: "Varanasi Ghats", 
      city: "Varanasi", 
      image: "https://picsum.photos/id/164/800/500", 
      type: "Religious" 
    }
  ];

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        // In a real app, this would be an API call
        const placeData = touristPlaces.find(p => p.id === parseInt(id));
        if (placeData) {
          setPlace(placeData);
        } else {
          setError('Tourist place not found');
        }
      } catch (err) {
        setError('Failed to load tourist place details.');
      }
    };
    fetchPlace();
  }, [id]);

  let cashfree;
  let initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();

  const getSessionId = async () => {
    try {
      const res = await axios.post("http://localhost:5001/payment", {
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        ticketCount: ticketCount,
        visitor_type: visitorType,
        visit_date: visitDate
      });
      if (res.data && res.data.payment_session_id) {
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async () => {
    try {
      const res = await axios.post("http://localhost:5001/verify", {
        orderId: orderId
      });
      if (res && res.data) {
        alert("Payment verified");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      alert('Payment processing...');
      let sessionId = await getSessionId();
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };
      cashfree.checkout(checkoutOptions).then(() => {
        verifyPayment(orderId);
      });
    } catch (err) {
      setError('Failed to process the payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate price based on visitor type
  const getTicketPrice = () => {
    // These would be different for each place in a real app
    const basePrices = {
      'Indian': 100,
      'Foreign': 500
    };
    return basePrices[visitorType] || 100;
  };

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Book Tickets for {place?.name || 'Loading...'}
      </Heading>
      
      {error && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      {place && (
        <Card overflow="hidden" bg={cardBg} borderColor={borderColor} boxShadow="lg">
          <Image 
            src={place.image} 
            alt={place.name} 
            objectFit="cover" 
            height="250px"
          />
          
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="lg" mb={2}>{place.name}</Heading>
                <HStack spacing={4}>
                  <Text><strong>Location:</strong> {place.city}</Text>
                  <Text><strong>Type:</strong> {place.type}</Text>
                </HStack>
              </Box>
              
              <Divider />
              
              <Box as="form" onSubmit={handlePurchase}>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Visit Date</FormLabel>
                    <Input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      min={minDate}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Visitor Type</FormLabel>
                    <Select
                      value={visitorType}
                      onChange={(e) => setVisitorType(e.target.value)}
                    >
                      <option value="Indian">Indian National</option>
                      <option value="Foreign">Foreign National</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Number of Tickets</FormLabel>
                    <NumberInput
                      min={1}
                      value={ticketCount}
                      onChange={(value) => setTicketCount(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  
                  <Box p={4} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="md" mt={2}>
                    <Text fontWeight="bold">Ticket Price: ₹{getTicketPrice()} per person</Text>
                    <Text fontWeight="bold">Total: ₹{getTicketPrice() * ticketCount}</Text>
                  </Box>
                  
                  <Button
                    mt={6}
                    colorScheme="green"
                    size="lg"
                    width="100%"
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Processing..."
                  >
                    Pay ₹{getTicketPrice() * ticketCount}
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}
    </Container>
  );
};

export default BuyTicket;
