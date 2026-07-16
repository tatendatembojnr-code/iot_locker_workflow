import React, { useState } from 'react';
import { Box, Flex, Text, Button, Icon, SimpleGrid, Select, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdSend, MdMoveToInbox, MdMap, MdSupportAgent, MdLanguage } from 'react-icons/md';

export default function KioskWelcome() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  return (
    <Flex direction="column" h="100vh" w="100vw" bg="brand.50" align="center" justify="center">
      
      {/* Top Right: Language Selector */}
      <Flex position="absolute" top="30px" right="30px" align="center" bg="white" p={2} borderRadius="md" boxShadow="sm">
        <Icon as={MdLanguage} color="brand.500" boxSize={6} mr={2} />
        <Select variant="unstyled" fontWeight="bold" w="120px" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="French">Français</option>
          <option value="Oshiwambo">Oshiwambo</option>
        </Select>
      </Flex>

      <VStack spacing={6} mb={10}>
        {/* Placeholder for Logo */}
        <Box bg="white" p={6} borderRadius="full" boxShadow="xl" mb={4}>
          <Text fontSize="4xl" fontWeight="black" color="brand.500" letterSpacing="tight">PML</Text>
        </Box>
        <Text fontSize="5xl" fontWeight="bold" color="brand.900" textAlign="center">
          {language === 'Oshiwambo' ? 'Waalelapo Smart Locker' : language === 'French' ? 'Bienvenue à Smart Locker' : 'Welcome to Smart Locker'}
        </Text>
        <Text fontSize="xl" color="gray.500">
          {language === 'Oshiwambo' ? 'To tumu nenge to tegelele okapakete?' : language === 'French' ? 'Envoyer ou récupérer un colis?' : 'Send or retrieve your parcels instantly.'}
        </Text>
      </VStack>

      <SimpleGrid columns={2} spacing={10} w="80%" maxW="800px">
        <Button 
          w="100%" 
          h="140px" 
          colorScheme="blue" 
          size="lg" 
          leftIcon={<Icon as={MdSend} boxSize={12} mr={4} />}
          fontSize="3xl"
          boxShadow="lg"
          borderRadius="2xl"
          onClick={() => navigate('/kiosk/send')}
        >
          {language === 'Oshiwambo' ? 'Tuma Okapakete' : language === 'French' ? 'Envoyer un Colis' : 'Send a Parcel'}
        </Button>
        <Button 
          w="100%" 
          h="140px" 
          colorScheme="brand" 
          size="lg" 
          leftIcon={<Icon as={MdMoveToInbox} boxSize={12} mr={4} />}
          fontSize="3xl"
          boxShadow="lg"
          borderRadius="2xl"
          onClick={() => navigate('/kiosk/collect')}
        >
          {language === 'Oshiwambo' ? 'Kufa Okapakete' : language === 'French' ? 'Récupérer un Colis' : 'Collect a Parcel'}
        </Button>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={10} w="80%" maxW="800px" mt={10}>
        <Button 
          variant="outline" 
          colorScheme="gray" 
          h="80px" 
          fontSize="xl" 
          leftIcon={<Icon as={MdMap} boxSize={8} />}
          borderRadius="xl"
          bg="white"
          onClick={() => navigate('/kiosk/map')}
        >
          Find a Locker
        </Button>
        <Button 
          variant="outline" 
          colorScheme="gray" 
          h="80px" 
          fontSize="xl" 
          leftIcon={<Icon as={MdSupportAgent} boxSize={8} />}
          borderRadius="xl"
          bg="white"
          onClick={() => navigate('/kiosk/support')}
        >
          Help & Support
        </Button>
      </SimpleGrid>

      <Text position="absolute" bottom="20px" color="gray.400" fontSize="sm">
        Terminal ID: WDH-CENTRAL-01
      </Text>
    </Flex>
  );
}

// Ensure VStack is imported from Chakra (fixing the missing import above)
// We will replace the entire file content, but just adding VStack to the import is important.
