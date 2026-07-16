import React, { useState } from 'react';
import { Box, VStack, Text, Input, Button, Badge, Divider, Icon, Flex, useToast, IconButton } from '@chakra-ui/react';
import { useStore } from 'store/useStore';
import { MdSearch, MdLocationOn, MdLocalShipping, MdBluetoothConnected, MdChatBubble } from 'react-icons/md';

export default function TrackParcel() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [unlocking, setUnlocking] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
  const { parcels, stations, updateParcelStatus } = useStore();
  const toast = useToast();

  const handleTrack = () => {
    const parcel = parcels.find(p => p.id === trackingId.toUpperCase());
    if (parcel) {
      const station = stations.find(s => s.id === parcel.destination);
      setResult({ ...parcel, stationName: station?.name || 'Unknown' });
    } else {
      setResult('not_found');
    }
  };

  const simulateDigitalUnlock = () => {
    setUnlocking(true);
    toast({ title: 'Connecting to Locker...', description: 'Establishing secure Bluetooth/NFC connection.', status: 'info', duration: 2000 });
    
    setTimeout(() => {
      updateParcelStatus(result.id, 'Collected');
      setUnlocking(false);
      setResult({ ...result, status: 'Collected' });
      toast({ title: 'Locker Opened!', description: 'Digital unlock successful. Please take your parcel.', status: 'success', duration: 4000 });
    }, 2500);
  };

  return (
    <Box p={6} position="relative" minH="100vh">
      <VStack spacing={6} align="stretch" pb={20}>
        <Box textAlign="center" pt={8} pb={4}>
          <Text fontSize="2xl" fontWeight="bold" color="brand.500">PML Tracker</Text>
          <Text color="gray.500">Track your parcel easily</Text>
        </Box>

        <Flex gap={2}>
          <Input 
            placeholder="Enter Tracking ID (e.g. PML-9923)" 
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            size="lg"
            bg="gray.50"
          />
          <Button colorScheme="brand" size="lg" onClick={handleTrack}>
            <Icon as={MdSearch} />
          </Button>
        </Flex>

        {result === 'not_found' && (
          <Box p={4} bg="red.50" color="red.600" borderRadius="md">
            Parcel not found. Please check the tracking ID.
          </Box>
        )}

        {result && result !== 'not_found' && (
          <Box p={5} borderWidth="1px" borderRadius="xl" boxShadow="sm">
            <VStack align="stretch" spacing={4}>
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="lg">{result.id}</Text>
                <Badge colorScheme={result.status === 'Ready for collection' ? 'green' : result.status === 'Collected' ? 'gray' : 'orange'}>
                  {result.status}
                </Badge>
              </Flex>
              <Divider />
              <Box>
                <Text fontSize="sm" color="gray.500">Sender</Text>
                <Text fontWeight="medium">{result.sender}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Receiver</Text>
                <Text fontWeight="medium">{result.receiver}</Text>
              </Box>
              <Flex align="center" bg="blue.50" p={3} borderRadius="md" color="blue.700">
                <Icon as={MdLocationOn} mr={2} />
                <Box>
                  <Text fontSize="xs">Destination Locker</Text>
                  <Text fontWeight="bold">{result.stationName}</Text>
                </Box>
              </Flex>
              
              {result.status === 'Ready for collection' && (
                <Button 
                  colorScheme="orange" 
                  size="lg" 
                  w="100%" 
                  mt={4} 
                  isLoading={unlocking}
                  leftIcon={<Icon as={MdBluetoothConnected} />}
                  onClick={simulateDigitalUnlock}
                >
                  Digital Unlock (Bluetooth/NFC)
                </Button>
              )}

            </VStack>
          </Box>
        )}
      </VStack>

      {/* Floating Chatbot Button */}
      <IconButton 
        position="fixed" 
        bottom="30px" 
        right="30px" 
        colorScheme="brand" 
        borderRadius="full" 
        size="lg" 
        boxShadow="xl"
        icon={<Icon as={MdChatBubble} boxSize={6} />}
        onClick={() => setChatOpen(!chatOpen)}
        zIndex={100}
      />

      {/* Chatbot Simulator UI */}
      {chatOpen && (
        <Box position="fixed" bottom="90px" right="30px" w="300px" bg="white" borderRadius="xl" boxShadow="2xl" border="1px solid" borderColor="gray.200" zIndex={100}>
          <Box bg="brand.500" p={3} borderTopRadius="xl" color="white">
            <Text fontWeight="bold">PML Support Bot</Text>
          </Box>
          <Box p={4} h="200px" overflowY="auto" bg="gray.50">
            <Text fontSize="sm" bg="gray.200" p={2} borderRadius="lg" mb={2} display="inline-block">Hello! I am your PML Assistant. How can I help you today?</Text>
            {result && result !== 'not_found' && (
              <Text fontSize="sm" bg="brand.100" color="brand.800" p={2} borderRadius="lg" display="inline-block" alignSelf="flex-end" ml={10}>
                Can you tell me about {result.id}?
              </Text>
            )}
            {result && result !== 'not_found' && (
              <Text fontSize="sm" bg="gray.200" p={2} borderRadius="lg" mt={2} display="inline-block">
                Yes! Your parcel {result.id} is currently: {result.status}. 
                {result.status === 'Ready for collection' ? ' It is waiting for you at ' + result.stationName + '!' : ''}
              </Text>
            )}
          </Box>
          <Flex p={2} borderTop="1px solid" borderColor="gray.200">
            <Input size="sm" placeholder="Type a message..." mr={2} />
            <Button size="sm" colorScheme="brand">Send</Button>
          </Flex>
        </Box>
      )}

    </Box>
  );
}
