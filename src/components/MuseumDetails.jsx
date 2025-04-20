import { useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Badge, 
  Image, 
  Flex,
  Button,
  SimpleGrid,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaCalendar, FaMoneyBillWave } from 'react-icons/fa';

const MuseumDetails = () => {
  const { id } = useParams();

  // Fetch place details based on the ID
  // This could be from an API, static data, or context.
  const touristPlaces = [
    { 
      id: 1, 
      name: "Taj Mahal", 
      city: "Agra", 
      description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
      entryFee: "₹1100 for foreigners, ₹50 for Indians",
      openingHours: "Sunrise to Sunset (Closed on Fridays)",
      bestTime: "October to March",
      type: "Monument"
    },
    { 
      id: 2, 
      name: "Goa Beaches", 
      city: "Goa", 
      description: "Goa is famous for its pristine beaches, vibrant nightlife, and Portuguese influence. Calangute, Baga, and Anjuna are among the most popular beaches, offering water sports, beach shacks, and beautiful sunset views.",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000",
      entryFee: "Free (Some beach activities may have charges)",
      openingHours: "24 hours (Beach activities: 9:00 AM - 6:00 PM)",
      bestTime: "November to February",
      type: "Beach"
    },
    { 
      id: 3, 
      name: "Darjeeling Hills", 
      city: "Darjeeling", 
      description: "Darjeeling is a town in India's West Bengal state, in the Himalayan foothills. Famous for its tea plantations, it offers breathtaking views of Mount Kanchenjunga. The Darjeeling Himalayan Railway, toy train, is a UNESCO World Heritage Site.",
      image: "https://picsum.photos/id/16/800/500",
      entryFee: "Various attractions have different fees",
      openingHours: "Most attractions: 8:00 AM - 6:00 PM",
      bestTime: "March to May, September to November",
      type: "Hill Station"
    },
    { 
      id: 4, 
      name: "Jaipur City Palace", 
      city: "Jaipur", 
      description: "The City Palace in Jaipur was established at the same time as the city by Maharaja Sawai Jai Singh II. The palace is a blend of Rajasthani and Mughal architecture and houses a museum with a collection of royal artifacts.",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000",
      entryFee: "₹500 for foreigners, ₹190 for Indians",
      openingHours: "9:30 AM - 5:00 PM daily",
      bestTime: "October to March",
      type: "Heritage"
    },
    { 
      id: 5, 
      name: "Kerala Backwaters", 
      city: "Alleppey", 
      description: "The Kerala backwaters are a network of interconnected canals, rivers, lakes, and inlets, a labyrinthine system formed by more than 900 km of waterways. The backwaters offer a serene houseboat experience through the palm-fringed landscape.",
      image: "https://picsum.photos/id/143/800/500",
      entryFee: "Houseboat rates vary (₹5000-₹15000 per day)",
      openingHours: "Houseboats typically operate 12:00 PM - 9:00 AM next day",
      bestTime: "September to March",
      type: "Waterway"
    },
    { 
      id: 6, 
      name: "Varanasi Ghats", 
      city: "Varanasi", 
      description: "Varanasi, one of the world's oldest continually inhabited cities, is famous for its ghats - steps leading down to the River Ganges. The city is a major religious hub in India with the Ganga Aarti ceremony being a highlight for visitors.",
      image: "https://picsum.photos/id/164/800/500",
      entryFee: "Free (Boat rides: ₹100 per person)",
      openingHours: "24 hours (Ganga Aarti: 6:30 PM - 7:30 PM)",
      bestTime: "October to March",
      type: "Religious"
    },
  ];

  const place = touristPlaces.find(place => place.id === parseInt(id));
  const cardBg = useColorModeValue('white', 'gray.700');
  const badgeBg = useColorModeValue('blue.50', 'blue.900');
  const infoBg = useColorModeValue('gray.50', 'gray.800');

  if (!place) {
    return (
      <Container maxW="container.lg" py={10}>
        <Heading>Tourist Place not found</Heading>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <Box 
        bg={cardBg} 
        borderRadius="lg" 
        overflow="hidden" 
        boxShadow="xl"
      >
        <Image 
          src={place.image} 
          alt={place.name} 
          w="100%" 
          h="400px" 
          objectFit="cover"
        />
        
        <Box p={8}>
          <Flex justify="space-between" align="flex-start" mb={6} direction={{ base: 'column', md: 'row' }}>
            <VStack align="flex-start" spacing={2} mb={{ base: 4, md: 0 }}>
              <Heading as="h2" size="xl">
                {place.name}
              </Heading>
              <Flex align="center">
                <Icon as={FaMapMarkerAlt} color="red.500" mr={2} />
                <Text fontSize="lg">{place.city}</Text>
              </Flex>
              <Badge 
                colorScheme="blue" 
                fontSize="md" 
                px={3} 
                py={1} 
                borderRadius="full"
                bg={badgeBg}
              >
                {place.type}
              </Badge>
            </VStack>
            
            <Button 
              as={Link} 
              to={`/museums/${id}/buy`} 
              colorScheme="green"
              size="lg"
            >
              Book Tickets
            </Button>
          </Flex>
          
          <Text fontSize="lg" mt={4} mb={8} lineHeight="1.8">
            {place.description}
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={8}>
            <Box p={4} bg={infoBg} borderRadius="md" boxShadow="sm">
              <Flex align="center" mb={2}>
                <Icon as={FaMoneyBillWave} color="green.500" mr={2} boxSize={5} />
                <Heading as="h3" size="sm">Entry Fee</Heading>
              </Flex>
              <Text>{place.entryFee}</Text>
            </Box>
            
            <Box p={4} bg={infoBg} borderRadius="md" boxShadow="sm">
              <Flex align="center" mb={2}>
                <Icon as={FaClock} color="blue.500" mr={2} boxSize={5} />
                <Heading as="h3" size="sm">Opening Hours</Heading>
              </Flex>
              <Text>{place.openingHours}</Text>
            </Box>
            
            <Box p={4} bg={infoBg} borderRadius="md" boxShadow="sm">
              <Flex align="center" mb={2}>
                <Icon as={FaCalendar} color="purple.500" mr={2} boxSize={5} />
                <Heading as="h3" size="sm">Best Time to Visit</Heading>
              </Flex>
              <Text>{place.bestTime}</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Container>
  );
};

export default MuseumDetails;
