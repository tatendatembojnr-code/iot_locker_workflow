import React, { useState } from 'react';
import { Box, Flex, Text, Button, Icon, VStack, Input, Divider } from '@chakra-ui/react';
import { MdArrowBack, MdSupportAgent, MdSend } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input) return;
    setChat([...chat, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setChat(prev => [...prev, { sender: 'agent', text: 'An agent will be with you shortly. Thank you for contacting PML Support.' }]);
    }, 1000);
  };

  return (
    <Box h="100vh" w="100vw" bg="brand.50" p={8}>
      <Button 
        size="lg" 
        leftIcon={<Icon as={MdArrowBack} />}
        onClick={() => navigate('/kiosk')}
        mb={8}
      >
        Back to Welcome
      </Button>

      <Flex h="calc(100vh - 160px)" maxW="800px" mx="auto" bg="white" borderRadius="2xl" boxShadow="xl" overflow="hidden">
        
        {/* Left Side: FAQs */}
        <Box w="40%" bg="gray.50" p={6} borderRight="1px solid" borderColor="gray.200">
          <Flex align="center" mb={6}>
            <Icon as={MdSupportAgent} boxSize={8} color="brand.500" mr={3} />
            <Text fontSize="2xl" fontWeight="bold">Help & Support</Text>
          </Flex>
          <Text fontWeight="bold" mb={4} color="gray.600">Frequently Asked Questions</Text>
          <VStack align="stretch" spacing={4}>
            <Box bg="white" p={3} borderRadius="md" boxShadow="sm">
              <Text fontWeight="bold" fontSize="sm">What happens if I forget my code?</Text>
              <Text fontSize="xs" color="gray.500">Contact support or use the "Resend Code" option on the mobile app.</Text>
            </Box>
            <Box bg="white" p={3} borderRadius="md" boxShadow="sm">
              <Text fontWeight="bold" fontSize="sm">Can I pay with cash?</Text>
              <Text fontSize="xs" color="gray.500">Kiosks currently only support digital payments via card, NFC, and mobile wallets.</Text>
            </Box>
            <Box bg="white" p={3} borderRadius="md" boxShadow="sm">
              <Text fontWeight="bold" fontSize="sm">How long will my parcel stay?</Text>
              <Text fontSize="xs" color="gray.500">Parcels are held for 12 hours for free. Overstay charges of N/hour apply after.</Text>
            </Box>
          </VStack>
        </Box>

        {/* Right Side: Chatbot */}
        <Flex w="60%" direction="column">
          <Box bg="brand.500" p={4} color="white">
            <Text fontWeight="bold" fontSize="lg">Live Agent Chat</Text>
          </Box>
          <Box flex="1" p={6} overflowY="auto">
            <Text textAlign="center" fontSize="sm" color="gray.400" mb={4}>Chat Started at {new Date().toLocaleTimeString()}</Text>
            {chat.map((msg, i) => (
              <Flex key={i} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'} mb={4}>
                <Box bg={msg.sender === 'user' ? 'brand.100' : 'gray.100'} p={3} borderRadius="lg" maxW="70%">
                  <Text>{msg.text}</Text>
                </Box>
              </Flex>
            ))}
          </Box>
          <Divider />
          <Flex p={4} align="center">
            <Input 
              placeholder="Type your message..." 
              size="lg" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button colorScheme="brand" size="lg" ml={2} onClick={handleSend}>
              <Icon as={MdSend} />
            </Button>
          </Flex>
        </Flex>

      </Flex>
    </Box>
  );
}
