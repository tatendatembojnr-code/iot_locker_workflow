import React from 'react';
import { Box, Flex, Text, Button, Icon, VStack, Badge } from '@chakra-ui/react';
import { MdMap, MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'store/useStore';

export default function LockerMap() {
  const navigate = useNavigate();
  const { stations } = useStore();

  return (
    <Box position="relative" h="100vh" w="100vw" bg="gray.200">
      <Button 
        position="absolute" 
        top="30px" 
        left="30px" 
        zIndex={10} 
        size="lg" 
        leftIcon={<Icon as={MdArrowBack} />}
        onClick={() => navigate('/kiosk')}
        boxShadow="md"
      >
        Back to Welcome
      </Button>

      <Box 
        position="absolute" 
        top="0" left="0" w="100%" h="100%"
        backgroundImage="url('https://maps.googleapis.com/maps/api/staticmap?center=-22.5594,17.0832&zoom=7&size=1000x1280&maptype=roadmap&markers=color:orange%7Clabel:W%7C-22.5594,17.0832&markers=color:blue%7Clabel:S%7C-22.6792,14.5273&key=YOUR_API_KEY')"
        backgroundSize="cover"
        backgroundPosition="center"
        opacity="0.8"
      >
        <Flex w="100%" h="100%" align="center" justify="center" direction="column">
           <Text fontSize="4xl" fontWeight="bold" color="gray.800" bg="white" p={4} borderRadius="xl" boxShadow="lg">
             PML Network Map
           </Text>
        </Flex>
      </Box>

      {/* Floating Panel for Locations */}
      <Box position="absolute" bottom="0" left="0" w="100%" bg="white" p={6} borderTopRadius="3xl" boxShadow="0 -10px 40px rgba(0,0,0,0.1)">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Live Station Availability</Text>
        <VStack spacing={4} align="stretch" maxH="300px" overflowY="auto">
          {stations.map(station => (
            <Flex key={station.id} justify="space-between" align="center" p={4} bg="gray.50" borderRadius="lg" border="1px solid" borderColor="gray.200">
              <Box>
                <Text fontWeight="bold" fontSize="lg">{station.name}</Text>
                <Text color="gray.500">{station.city}, {station.region}</Text>
              </Box>
              <Badge colorScheme={station.availableCompartments > 0 ? 'green' : 'red'} p={2} borderRadius="md">
                {station.availableCompartments} Available
              </Badge>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
