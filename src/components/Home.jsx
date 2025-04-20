import { useState } from 'react';
import { Box, Heading, Text, Flex, Image, Button, LinkBox, LinkOverlay, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = 3;

  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
      title: "Taj Mahal, Agra",
      text: "Discover India's most iconic monument, a symbol of eternal love.",
      link: "/museums/1"
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000",
      title: "Goa Beaches",
      text: "Relax at the stunning beaches and enjoy the vibrant culture of Goa.",
      link: "/museums/2"
    },
    {
      id: 3,
      img: "https://picsum.photos/id/16/800/500",
      title: "Darjeeling Hills",
      text: "Experience the serene beauty of tea gardens and Himalayan views.",
      link: "/museums/3"
    }
  ];

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const buttonColor = useColorModeValue('blue.600', 'blue.300');

  return (
    <Box py={8} px={4} maxW="1200px" mx="auto">
      <Heading 
        as="h1" 
        mb={4} 
        textAlign="center"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
      >
        Welcome to the Indian Tourist Places Booking System
      </Heading>
      
      <Text 
        fontSize={{ base: "md", md: "lg" }} 
        textAlign="center" 
        mb={8}
        fontWeight="medium"
        opacity={0.8}
      >
        Explore India's most beautiful destinations and book your tickets online!
      </Text>

      <Flex
        w="full"
        h={{ base: "300px", md: "400px", lg: "500px" }}
        bg={bgColor}
        borderRadius="lg"
        boxShadow="xl"
        position="relative"
        overflow="hidden"
      >
        {slides.map((slide, index) => (
          <Box
            key={`slide-${index}`}
            w="full"
            h="full"
            position="absolute"
            transition="all 0.5s"
            opacity={index === currentSlide ? 1 : 0}
            zIndex={index === currentSlide ? 1 : 0}
          >
            <Image 
              src={slide.img} 
              alt={slide.title} 
              h="full" 
              w="full" 
              objectFit="cover" 
            />

            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={6}
              bg="rgba(0,0,0,0.7)"
              color="white"
            >
              <Heading as="h3" size="lg" mb={2}>
                {slide.title}
              </Heading>
              <Text mb={4}>{slide.text}</Text>
              <Button
                as={Link}
                to={slide.link}
                colorScheme="blue"
                size="md"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              >
                View Details
              </Button>
            </Box>
          </Box>
        ))}

        <Flex position="absolute" w="full" justify="space-between" p={4} zIndex={2}>
          <Button 
            onClick={prevSlide} 
            colorScheme="blackAlpha" 
            rounded="full" 
            opacity={0.7}
            _hover={{ opacity: 1 }}
          >
            <ChevronLeftIcon boxSize={8} />
          </Button>
          <Button 
            onClick={nextSlide} 
            colorScheme="blackAlpha" 
            rounded="full" 
            opacity={0.7}
            _hover={{ opacity: 1 }}
          >
            <ChevronRightIcon boxSize={8} />
          </Button>
        </Flex>

        <Flex position="absolute" bottom={4} w="full" justify="center" zIndex={2}>
          {Array.from({ length: slidesCount }).map((_, index) => (
            <Box
              key={`dot-${index}`}
              mx={1}
              boxSize={3}
              rounded="full"
              bg={currentSlide === index ? "white" : "whiteAlpha.500"}
              cursor="pointer"
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
