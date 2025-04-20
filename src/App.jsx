import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Home from './components/Home';
import MuseumList from './components/MuseumList';
import MuseumDetails from './components/MuseumDetails';
import BookingPage from './components/BookingPage';
import Navigation from './components/Navbar';
import BuyTicket from './components/BuyTicket';
import ContactUs from './components/ContactUs';
import TicketSuccess from './components/TicketSuccess';

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Router>
      <Box bg={bgColor} minH="100vh">
        <Navigation />
        <Box as="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/museums" element={<MuseumList />} />
            <Route path="/museums/:id/buy" element={<BuyTicket />} />
            <Route path="/museums/:id" element={<MuseumDetails />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/ticket-success" element={<TicketSuccess />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
