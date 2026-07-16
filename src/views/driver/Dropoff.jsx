import React, { useState } from 'react';
import { Box, VStack, Text, Button, Flex, Icon, useToast, Badge, Divider } from '@chakra-ui/react';
import { MdQrCodeScanner, MdCheckCircle, MdNotificationsActive } from 'react-icons/md';
import { useStore } from 'store/useStore';

export default function Dropoff() {
  const [scanState, setScanState] = useState('idle'); // idle, scanning, found, dropped
  const [scannedParcel, setScannedParcel] = useState(null);
  
  const { parcels, updateParcelStatus } = useStore();
  const toast = useToast();

  const simulateScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      // Find a parcel that needs dropping off
      const parcel = parcels.find(p => p.status === 'In transit');
      if (parcel) {
        setScannedParcel(parcel);
        setScanState('found');
        toast({ title: 'QR Code Scanned', status: 'success', duration: 2000 });
      } else {
        setScanState('idle');
        toast({ title: 'No parcels require drop-off', status: 'warning' });
      }
    }, 1500);
  };

  const simulateDropoff = () => {
    updateParcelStatus(scannedParcel.id, 'Ready for collection');
    setScanState('dropped');
    toast({ 
      title: 'Dropped off successfully!', 
      description: 'Locker B-12 secured. Customer notified.', 
      status: 'success' 
    });
  };

  return (
    <Box p={6} h="100%">
      <VStack spacing={6} align="stretch" h="100%">
        <Text fontSize="2xl" fontWeight="bold" color="brand.900">Parcel Drop-off</Text>
        
        {scanState === 'idle' && (
          <Flex direction="column" align="center" justify="center" flex="1" mt={10}>
            <Box bg="gray.100" p={8} borderRadius="full" mb={6} cursor="pointer" onClick={simulateScan} _hover={{ bg: 'gray.200' }}>
              <Icon as={MdQrCodeScanner} boxSize={20} color="brand.500" />
            </Box>
            <Text fontSize="lg" fontWeight="bold">Tap to Scan Parcel QR Code</Text>
            <Text color="gray.500" textAlign="center" mt={2}>Use this to securely log the parcel into the smart locker.</Text>
          </Flex>
        )}

        {scanState === 'scanning' && (
          <Flex direction="column" align="center" justify="center" flex="1" mt={10}>
            <Box className="scanner-animation" bg="brand.50" p={8} borderRadius="full" mb={6}>
              <Icon as={MdQrCodeScanner} boxSize={20} color="brand.500" />
            </Box>
            <Text fontSize="lg" fontWeight="bold" color="brand.500">Scanning...</Text>
          </Flex>
        )}

        {scanState === 'found' && scannedParcel && (
          <VStack align="stretch" spacing={4} mt={4}>
            <Box bg="white" p={5} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="brand.100">
              <Badge colorScheme="purple" mb={2}>Scanned Successfully</Badge>
              <Text fontSize="xl" fontWeight="bold">{scannedParcel.id}</Text>
              <Divider my={3} />
              <Flex justify="space-between" mb={2}>
                <Text color="gray.500">Receiver:</Text>
                <Text fontWeight="bold">{scannedParcel.receiver}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.500">Destination:</Text>
                <Text fontWeight="bold">{scannedParcel.destination}</Text>
              </Flex>
            </Box>

            <Box bg="orange.50" p={4} borderRadius="lg">
              <Text fontWeight="bold" color="orange.700">Allocated Locker: B-12 (Medium)</Text>
              <Text fontSize="sm" color="orange.600">Please place the parcel inside and close the door.</Text>
            </Box>

            <Button colorScheme="brand" size="lg" h="60px" mt={4} onClick={simulateDropoff}>
              Confirm Drop-off
            </Button>
            <Button variant="ghost" onClick={() => setScanState('idle')}>Cancel</Button>
          </VStack>
        )}

        {scanState === 'dropped' && (
          <Flex direction="column" align="center" justify="center" flex="1" mt={10}>
            <Icon as={MdCheckCircle} boxSize={24} color="green.500" mb={6} />
            <Text fontSize="2xl" fontWeight="bold" color="green.500" mb={2}>Drop-off Complete</Text>
            
            <Box bg="blue.50" p={4} borderRadius="lg" w="100%" mt={4}>
              <Flex align="center" color="blue.700" mb={2}>
                <Icon as={MdNotificationsActive} mr={2} />
                <Text fontWeight="bold">Automated Actions Fired:</Text>
              </Flex>
              <Text fontSize="sm" color="blue.600">• WhatsApp notification sent to customer</Text>
              <Text fontSize="sm" color="blue.600">• SMS and Email alerts dispatched</Text>
              <Text fontSize="sm" color="blue.600">• Pickup Code generated</Text>
            </Box>

            <Button colorScheme="brand" size="lg" w="100%" mt={8} onClick={() => setScanState('idle')}>
              Scan Next Parcel
            </Button>
          </Flex>
        )}

      </VStack>
    </Box>
  );
}
