import React from 'react';
import { Box, VStack, Text, Flex, Icon, Progress, Badge } from '@chakra-ui/react';
import { MdLocalShipping, MdCheckCircle } from 'react-icons/md';

export default function DriverDashboard() {
  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="sm" color="gray.500">Welcome back,</Text>
          <Text fontSize="2xl" fontWeight="bold" color="brand.900">Courier Driver</Text>
        </Box>
        
        <Box bg="brand.500" p={5} borderRadius="xl" color="white" boxShadow="lg">
          <Text fontWeight="bold" mb={2}>Today's Route Progress</Text>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm">12 / 45 Parcels Delivered</Text>
            <Text fontSize="sm" fontWeight="bold">26%</Text>
          </Flex>
          <Progress value={26} colorScheme="orange" size="sm" borderRadius="md" bg="brand.600" />
        </Box>

        <Text fontWeight="bold" fontSize="lg" mt={2}>Next Stops</Text>
        
        <Flex bg="white" p={4} borderRadius="lg" boxShadow="sm" align="center" borderLeft="4px solid" borderColor="orange.500">
          <Box bg="orange.100" p={3} borderRadius="full" mr={4}>
            <Icon as={MdLocalShipping} color="orange.500" boxSize={6} />
          </Box>
          <Box flex="1">
            <Text fontWeight="bold">Windhoek Central Hub</Text>
            <Text fontSize="sm" color="gray.500">18 Parcels to drop off</Text>
          </Box>
          <Badge colorScheme="orange">ETA: 12 min</Badge>
        </Flex>
        
        <Flex bg="white" p={4} borderRadius="lg" boxShadow="sm" align="center">
          <Box bg="gray.100" p={3} borderRadius="full" mr={4}>
            <Icon as={MdLocalShipping} color="gray.500" boxSize={6} />
          </Box>
          <Box flex="1">
            <Text fontWeight="bold">Wernhil Park Mall</Text>
            <Text fontSize="sm" color="gray.500">7 Parcels to drop off</Text>
          </Box>
        </Flex>

      </VStack>
    </Box>
  );
}
