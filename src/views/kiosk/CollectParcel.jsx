import React, { useState } from 'react';
import { Box, Flex, Text, Button, VStack, Input, useToast, Icon, SimpleGrid, Spinner, Divider } from '@chakra-ui/react';
import { useStore } from 'store/useStore';
import { useNavigate } from 'react-router-dom';
import { MdPayment, MdNfc, MdLockOpen, MdCheckCircle, MdQrCodeScanner, MdDialpad } from 'react-icons/md';

export default function CollectParcel() {
  const [step, setStep] = useState(1);
  const [pickupCode, setPickupCode] = useState('');
  const [parcel, setParcel] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  
  const { parcels, updateParcelStatus } = useStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleVerify = () => {
    const found = parcels.find(p => p.id === pickupCode.toUpperCase());
    if (found) {
      setParcel(found);
      if (found.status === 'Ready for collection') {
        if (found.payer === 'receiver') {
           setStep(3); // Go to Payment
        } else {
           handleUnlock(found); // Skip payment
        }
      } else {
        toast({ title: 'Error', description: `Parcel is ${found.status}`, status: 'error' });
      }
    } else {
      toast({ title: 'Error', description: 'Invalid pickup code. Attempt logged.', status: 'error' });
    }
  };

  const simulateQRScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate scanning the default parcel
      setPickupCode('PML-9923');
      toast({ title: 'QR Scanned Successfully', status: 'success' });
    }, 1500);
  };

  const simulatePayment = (method) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({ title: 'Payment Successful', description: `Paid N$ ${parcel.fees.toFixed(2)} via ${method}`, status: 'success' });
      handleUnlock(parcel);
    }, 2000);
  };

  const handleUnlock = (currentParcel) => {
    setStep(4);
    setUnlocking(true);
    setTimeout(() => {
      updateParcelStatus(currentParcel.id, 'Collected');
      setUnlocking(false);
      toast({ title: 'Locker Opened', description: 'Please take your parcel and close the door.', status: 'info' });
      setTimeout(() => navigate('/kiosk'), 4000);
    }, 3000);
  };

  return (
    <Flex direction="column" h="100vh" w="100vw" align="center" justify="center" bg="brand.50" py={10}>
      <VStack spacing={6} w="90%" maxW="600px" bg="white" p={8} borderRadius="2xl" boxShadow="xl">
        
        {step === 1 && (
          <>
            <Text fontSize="3xl" fontWeight="bold" color="brand.900">Collect Your Parcel</Text>
            <Text color="gray.500" textAlign="center">How would you like to verify your identity?</Text>
            
            <Button w="100%" h="100px" colorScheme="brand" size="lg" fontSize="xl" leftIcon={<Icon as={MdDialpad} boxSize={8} />} onClick={() => setStep(2)}>
              Enter 7-Digit Code
            </Button>
            
            <Button w="100%" h="100px" colorScheme="orange" size="lg" fontSize="xl" leftIcon={<Icon as={MdQrCodeScanner} boxSize={8} />} onClick={simulateQRScan} isLoading={isProcessing}>
              Scan QR Code
            </Button>
            
            {pickupCode && (
              <Button w="100%" colorScheme="green" size="lg" h="80px" fontSize="2xl" onClick={handleVerify} mt={4}>
                Verify Code ({pickupCode})
              </Button>
            )}

            <Button variant="ghost" onClick={() => navigate('/kiosk')} mt={4}>Cancel</Button>
          </>
        )}

        {step === 2 && (
          <>
            <Text fontSize="3xl" fontWeight="bold" color="brand.900">Enter Pickup Code</Text>
            <Text color="gray.500" textAlign="center">Enter the code sent to your SMS or Email.</Text>
            <Input 
              placeholder="e.g. PML-9923" 
              value={pickupCode} 
              onChange={(e) => setPickupCode(e.target.value)} 
              size="lg" 
              textAlign="center"
              fontSize="2xl"
              h="60px"
            />
            <Button w="100%" colorScheme="brand" size="lg" h="80px" fontSize="2xl" onClick={handleVerify}>
              Verify Code
            </Button>
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
          </>
        )}

        {step === 3 && parcel && (
          <>
            <Text fontSize="2xl" fontWeight="bold" color="brand.900">Payment Required</Text>
            <Box w="100%" p={4} bg="orange.50" borderRadius="md" border="1px solid" borderColor="orange.200">
              <Flex justify="space-between" mb={2}>
                <Text color="gray.600">Parcel ID:</Text>
                <Text fontWeight="bold">{parcel.id}</Text>
              </Flex>
              <Flex justify="space-between" mb={2}>
                <Text color="gray.600">Sender:</Text>
                <Text fontWeight="bold">{parcel.sender}</Text>
              </Flex>
              <Divider my={2} />
              <Flex justify="space-between">
                <Text color="gray.800" fontWeight="bold">Total Due:</Text>
                <Text fontWeight="bold" fontSize="xl" color="brand.600">N$ {parcel.fees.toFixed(2)}</Text>
              </Flex>
            </Box>

            {isProcessing ? (
              <VStack py={8} spacing={4}>
                <Spinner size="xl" color="brand.500" thickness="4px" />
                <Text>Processing Payment...</Text>
              </VStack>
            ) : (
              <>
                <Text fontWeight="medium" alignSelf="flex-start">Select Payment Method:</Text>
                <SimpleGrid columns={2} spacing={4} w="100%">
                  <Button h="60px" onClick={() => simulatePayment('Mastercard')} leftIcon={<Icon as={MdPayment} />}>Mastercard</Button>
                  <Button h="60px" onClick={() => simulatePayment('Apple Pay')} leftIcon={<Icon as={MdNfc} />}>Apple Pay</Button>
                  <Button h="60px" onClick={() => simulatePayment('Google Pay')} leftIcon={<Icon as={MdNfc} />}>Google Pay</Button>
                  <Button h="60px" onClick={() => simulatePayment('NFC Tap')} leftIcon={<Icon as={MdNfc} />}>NFC Tap</Button>
                </SimpleGrid>
                <Button variant="ghost" w="100%" mt={4} onClick={() => navigate('/kiosk')}>Cancel</Button>
              </>
            )}
          </>
        )}

        {step === 4 && (
          <VStack py={10} spacing={6}>
            {unlocking ? (
              <>
                <Spinner size="xl" color="orange.500" thickness="6px" />
                <Text fontSize="2xl" fontWeight="bold" color="orange.500">Unlocking Locker...</Text>
              </>
            ) : (
              <>
                <Icon as={MdLockOpen} boxSize={20} color="green.500" />
                <Text fontSize="3xl" fontWeight="bold" color="green.500">Locker Opened!</Text>
                <Text fontSize="lg" textAlign="center">Compartment B-12 is now open. Please retrieve your parcel and push the door closed.</Text>
                <Text color="gray.500">Returning to home screen...</Text>
              </>
            )}
          </VStack>
        )}
        
      </VStack>
    </Flex>
  );
}
