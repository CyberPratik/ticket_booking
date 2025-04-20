import { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Input, 
  Select, 
  SimpleGrid, 
  Flex, 
  Card, 
  CardBody, 
  CardFooter,
  Image, 
  Text, 
  Button,
  Spinner,
  Center,
  Container,

  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MuseumList = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [sortType, setSortType] = useState('name');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve([
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
          },
        ]), 500)
      );
      setPlaces(response);
      setLoading(false);
    };

    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity ? place.city === filterCity : true;
    return matchesSearch && matchesCity;
  });

  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortType === 'name') return a.name.localeCompare(b.name);
    if (sortType === 'city') return a.city.localeCompare(b.city);
    return 0;
  });

  // eslint-disable-next-line no-unused-vars
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="1200px" mt={10} mb={10}>
      <Heading as="h2" mb={6} textAlign="center">Popular Tourist Places in India</Heading>

      {/* Search Bar */}
      <Box mb={6}>
        <Input
          placeholder="Search for a tourist place..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="lg"
          borderRadius="md"
          focusBorderColor="blue.400"
        />
      </Box>

      {/* Filters and Sorting */}
      <Flex 
        mb={6} 
        direction={{ base: "column", md: "row" }} 
        gap={4}
      >
        <Select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          placeholder="Filter by City"
          flex={1}
        >
          <option value="Agra">Agra</option>
          <option value="Goa">Goa</option>
          <option value="Darjeeling">Darjeeling</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Alleppey">Alleppey</option>
          <option value="Varanasi">Varanasi</option>
        </Select>

        <Select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          flex={1}
        >
          <option value="name">Sort by Name</option>
          <option value="city">Sort by City</option>
        </Select>
      </Flex>

      {/* Loading Spinner */}
      {loading ? (
        <Center py={10}>
          <Spinner size="xl" thickness="4px" color="blue.500" />
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {sortedPlaces.length ? (
            sortedPlaces.map((place) => (
              <Card 
                key={place.id} 
                overflow="hidden"
                variant="outline"
                borderColor={borderColor}
                bg={cardColor}
                boxShadow="md"
                height="100%"
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'lg',
                }}
              >
                <Image
                  src={place.image}
                  alt={place.name}
                  height="200px"
                  objectFit="cover"
                />
                <CardBody>
                  <Heading size="md" mb={2}>{place.name}</Heading>
                  <Text mb={2}>{place.city}</Text>
                  <Text fontSize="sm" color="gray.500">{place.type}</Text>
                </CardBody>
                <CardFooter pt={0}>
                  <Button 
                    as={Link} 
                    to={`/museums/${place.id}/buy`}
                    colorScheme="green" 
                    width="100%"
                  >
                    Book Tickets
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Box gridColumn="span 4" textAlign="center" py={10}>
              <Text fontSize="lg">No tourist places found matching your search.</Text>
            </Box>
          )}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default MuseumList;
