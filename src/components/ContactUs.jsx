import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  HStack,
  Icon,
  useToast,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: 'We\'ll get back to you as soon as possible.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  const cardBg = useColorModeValue('white', 'gray.700');
  const iconBg = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.xl" py={10} mt={10}>
      <Heading as="h1" size="xl" textAlign="center" mb={10}>
        Contact Us
      </Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* Contact Form */}
        <Card bg={cardBg} shadow="lg" borderColor={borderColor} borderWidth="1px">
          <CardBody p={8}>
            <VStack as="form" spacing={6} onSubmit={handleSubmit}>
              <Heading size="md" alignSelf="flex-start">Send Us a Message</Heading>
              
              <FormControl isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Booking Inquiry"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please provide details about your inquiry..."
                  minH="120px"
                />
              </FormControl>
              
              <Button 
                type="submit"
                colorScheme="blue"
                size="lg"
                width="100%"
                isLoading={isSubmitting}
                loadingText="Sending..."
              >
                Send Message
              </Button>
            </VStack>
          </CardBody>
        </Card>
        
        {/* Contact Information */}
        <VStack align="stretch" spacing={6}>
          <Heading size="md">Our Contact Information</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
            Have questions about booking tourist places in India? Reach out to our customer support team.
          </Text>
          
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6} mt={4}>
            <ContactInfoCard 
              icon={FaMapMarkerAlt} 
              title="Our Office" 
              content="123 Tourism Road, New Delhi, India - 110001"
            />
            
            <ContactInfoCard 
              icon={FaPhone} 
              title="Phone Number" 
              content="+91 98765 43210"
            />
            
            <ContactInfoCard 
              icon={FaEnvelope} 
              title="Email Address" 
              content="info@touristplaces.com"
            />
            
            <ContactInfoCard 
              icon={FaGlobe} 
              title="Website" 
              content="www.touristplaces.com"
            />
          </SimpleGrid>
          
          <Box mt={8}>
            <Heading size="md" mb={4}>Operating Hours</Heading>
            <VStack align="stretch" spacing={2}>
              <Flex justify="space-between">
                <Text fontWeight="medium">Monday - Friday:</Text>
                <Text>9:00 AM - 6:00 PM</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="medium">Saturday:</Text>
                <Text>10:00 AM - 4:00 PM</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="medium">Sunday:</Text>
                <Text>Closed</Text>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

const ContactInfoCard = ({ icon, title, content }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const iconBg = useColorModeValue('blue.50', 'blue.900');
  
  return (
    <Card bg={cardBg} shadow="md">
      <CardBody>
        <HStack spacing={4}>
          <Flex
            w="40px"
            h="40px"
            align="center"
            justify="center"
            borderRadius="full"
            bg={iconBg}
          >
            <Icon as={icon} color="blue.500" boxSize={5} />
          </Flex>
          <Box>
            <Text fontWeight="bold">{title}</Text>
            <Text>{content}</Text>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ContactUs; 