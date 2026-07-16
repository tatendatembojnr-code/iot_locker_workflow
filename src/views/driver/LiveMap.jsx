import React from 'react';
import { Box, Flex, Text, Button, Icon } from '@chakra-ui/react';
import { MdNavigation, MdMyLocation } from 'react-icons/md';

export default function LiveMap() {
  return (
    <Box position="relative" h="100vh" w="100%" bg="gray.200">
      {/* Simulated Map Background - A placeholder for actual map integration */}
      <Box 
        position="absolute" 
        top="0" left="0" w="100%" h="100%"
        backgroundImage="url('https://maps.googleapis.com/maps/api/staticmap?center=-22.5609,17.0658&zoom=14&size=600x800&maptype=roadmap&markers=color:red%7Clabel:S%7C-22.5609,17.0658&key=YOUR_API_KEY')"
        backgroundSize="cover"
        backgroundPosition="center"
        opacity="0.6"
      >
        <Flex w="100%" h="100%" align="center" justify="center" direction="column">
           <Text fontSize="2xl" fontWeight="bold" color="gray.600">Simulated Live Map</Text>
           <Text color="gray.500">(Requires Maps API Key)</Text>
        </Flex>
      </Box>

      {/* Floating Action Buttons */}
      <Flex position="absolute" right={4} bottom={100} direction="column" gap={4}>
        <Box bg="white" p={3} borderRadius="full" boxShadow="lg">
          <Icon as={MdMyLocation} boxSize={6} color="gray.600" />
        </Box>
      </Flex>

      {/* Bottom Sheet */}
      <Box position="absolute" bottom="70px" w="100%" bg="white" borderTopRadius="2xl" p={5} boxShadow="0 -4px 10px rgba(0,0,0,0.1)">
        <Text fontWeight="bold" fontSize="lg">Navigating to:</Text>
        <Text fontSize="2xl" fontWeight="bold" color="brand.600">Windhoek Central Hub</Text>
        <Flex justify="space-between" mt={2} mb={4} color="gray.500">
          <Text>12 min (4.2 km)</Text>
          <Text>ETA: 14:30</Text>
        </Flex>
        <Button colorScheme="green" size="lg" w="100%" leftIcon={<Icon as={MdNavigation} />}>
          Start Navigation
        </Button>
      </Box>
    </Box>
  );
}
