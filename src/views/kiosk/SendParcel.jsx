import React, { useState } from 'react';
import { Box, Flex, Text, Button, VStack, Input, useToast, Icon, SimpleGrid, Spinner, Divider, Checkbox } from '@chakra-ui/react';
import { useStore } from 'store/useStore';
import { useNavigate } from 'react-router-dom';
import { MdPayment, MdNfc, MdLockOpen, MdCheckCircle, MdPerson, MdLocalShipping } from 'react-icons/md';

export default function SendParcel() {
  // Step 2 is now the first screen (combined Sender/Receiver info)
  const [step, setStep] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  
  // Form State
  const [senderInfo, setSenderInfo] = useState({ name: '', phone: '', address: '', email: '' });
  const [receiverInfo, setReceiverInfo] = useState({ name: '', phone: '', address: '', email: '' });
  const [destination, setDestination] = useState('');
  const [deliveryType, setDeliveryType] = useState(''); // 'direct' or 'courier'
  const [payer, setPayer] = useState(''); // 'sender' or 'receiver'
  const [lockerSize, setLockerSize] = useState(''); // 'S', 'M', 'L', 'XL'
  const [doorClosed, setDoorClosed] = useState(false);
  
  // Generated Waybill
  const [generatedWaybill, setGeneratedWaybill] = useState('');

  const { stations, addParcel } = useStore();
  const toast = useToast();
  const navigate = useNavigate();

  // Pricing Logic
  const sizePricing = {
    'S': { maxWeight: '5kg', price: 50 },
    'M': { maxWeight: '15kg', price: 80 },
    'L': { maxWeight: '25kg', price: 120 },
    'XL': { maxWeight: '50kg', price: 180 },
  };

  const calculateCharges = () => {
    const basePrice = sizePricing[lockerSize]?.price || 0;
    const deliveryFee = deliveryType === 'courier' ? 45 : 0;
    const serviceFee = 15;
    const tax = (basePrice + deliveryFee + serviceFee) * 0.15; // 15% VAT
    return {
      locker: basePrice,
      delivery: deliveryFee,
      service: serviceFee,
      tax: tax,
      total: basePrice + deliveryFee + serviceFee + tax
    };
  };

  const validateDetails = () => {
    if (!senderInfo.name || !senderInfo.phone || !senderInfo.address) {
      return toast({ title: 'Error', description: 'Sender Name, Phone, and Address are required', status: 'error' });
    }
    if (!receiverInfo.name || !receiverInfo.phone || !receiverInfo.address) {
      return toast({ title: 'Error', description: 'Receiver Name, Phone, and Address are required', status: 'error' });
    }
    setStep(5); // Skip Step 3 and 4, go directly to Destination (Step 5)
  };

  const handleDestination = (val) => {
    setDestination(val);
    setStep(6);
  };

  const handleDeliveryType = (val) => {
    setDeliveryType(val);
    setStep(7);
  };

  const handlePayer = (val) => {
    setPayer(val);
    setStep(8);
  };

  const handleSize = (val) => {
    setLockerSize(val);
    setStep(9);
  };

  const handleCheckout = () => {
    if (payer === 'sender') {
      setStep(10); // Go to payment
    } else {
      finalizeDropOff(); // Skip payment, goes to Step 11
    }
  };

  const simulatePayment = (method) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const total = calculateCharges().total.toFixed(2);
      toast({ title: 'Payment Successful', description: `Paid N$ ${total} via ${method}`, status: 'success' });
      finalizeDropOff();
    }, 2000);
  };

  const finalizeDropOff = () => {
    setStep(11);
    setUnlocking(true);
    
    // Auto-generate Waybill
    const newWaybill = 'WB-' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedWaybill(newWaybill);

    setTimeout(() => {
      setUnlocking(false);
      const newParcel = {
        id: newWaybill,
        status: deliveryType === 'courier' ? 'WAITING_FOR_DELIVERY' : 'Ready for collection',
        sender: senderInfo.name,
        receiver: receiverInfo.name,
        destination: destination,
        fees: calculateCharges().total,
        payer: payer,
        size: lockerSize
      };
      addParcel(newParcel);
      toast({ title: 'Locker Opened', description: 'Please insert parcel and close door.', status: 'info' });
    }, 2500);
  };

  const confirmClosure = () => {
    if (!doorClosed) {
      return toast({ title: 'Warning', description: 'Please confirm the door is closed', status: 'warning' });
    }
    setStep(12);
  };

  return (
    <Flex direction="column" minH="100vh" w="100vw" align="center" justify="center" bg="brand.50" py={10}>
      <VStack spacing={6} w="95%" maxW={step === 2 ? "1000px" : "600px"} bg="white" p={8} borderRadius="2xl" boxShadow="xl">
        <Text fontSize="2xl" fontWeight="bold" color="brand.900">Parcel Drop-Off</Text>
        
        {step === 2 && (
          <VStack w="100%" spacing={6}>
            <SimpleGrid columns={2} spacing={8} w="100%">
              <Box bg="blue.50" p={6} borderRadius="xl" border="1px solid" borderColor="blue.100">
                <Flex align="center" mb={4}>
                  <Icon as={MdPerson} color="blue.500" boxSize={6} mr={2} />
                  <Text fontWeight="bold" fontSize="lg" color="blue.800">Sender Details</Text>
                </Flex>
                <VStack spacing={4}>
                  <Input bg="white" placeholder="Full Name" value={senderInfo.name} onChange={(e) => setSenderInfo({...senderInfo, name: e.target.value})} />
                  <Input bg="white" placeholder="Phone Number (+264...)" value={senderInfo.phone} onChange={(e) => setSenderInfo({...senderInfo, phone: e.target.value})} />
                  <Input bg="white" placeholder="Physical Address" value={senderInfo.address} onChange={(e) => setSenderInfo({...senderInfo, address: e.target.value})} />
                  <Input bg="white" placeholder="Email Address (Optional)" value={senderInfo.email} onChange={(e) => setSenderInfo({...senderInfo, email: e.target.value})} />
                </VStack>
              </Box>

              <Box bg="orange.50" p={6} borderRadius="xl" border="1px solid" borderColor="orange.100">
                <Flex align="center" mb={4}>
                  <Icon as={MdLocalShipping} color="orange.500" boxSize={6} mr={2} />
                  <Text fontWeight="bold" fontSize="lg" color="orange.800">Receiver Details</Text>
                </Flex>
                <VStack spacing={4}>
                  <Input bg="white" placeholder="Full Name" value={receiverInfo.name} onChange={(e) => setReceiverInfo({...receiverInfo, name: e.target.value})} />
                  <Input bg="white" placeholder="Phone Number (+264...)" value={receiverInfo.phone} onChange={(e) => setReceiverInfo({...receiverInfo, phone: e.target.value})} />
                  <Input bg="white" placeholder="Physical Address" value={receiverInfo.address} onChange={(e) => setReceiverInfo({...receiverInfo, address: e.target.value})} />
                  <Input bg="white" placeholder="Email Address (Optional)" value={receiverInfo.email} onChange={(e) => setReceiverInfo({...receiverInfo, email: e.target.value})} />
                </VStack>
              </Box>
            </SimpleGrid>
            <Button w="100%" colorScheme="brand" size="lg" onClick={validateDetails}>Proceed to Destination</Button>
            <Button variant="ghost" onClick={() => navigate('/kiosk')}>Cancel Drop-Off</Button>
          </VStack>
        )}

        {step === 5 && (
          <VStack w="100%" spacing={4}>
            <Text fontWeight="bold">Select Destination Locker</Text>
            {stations.map(s => (
              <Button key={s.id} w="100%" h="60px" variant="outline" colorScheme="blue" onClick={() => handleDestination(s.id)}>
                {s.name} ({s.city})
              </Button>
            ))}
            <Button variant="ghost" onClick={() => setStep(2)} w="100%">Back</Button>
          </VStack>
        )}

        {step === 6 && (
          <VStack w="100%" spacing={4}>
            <Text fontWeight="bold">Select Delivery Type</Text>
            <Button w="100%" h="80px" colorScheme="blue" onClick={() => handleDeliveryType('direct')}>
              Direct Pickup (Stays in this locker)
            </Button>
            <Button w="100%" h="80px" colorScheme="orange" onClick={() => handleDeliveryType('courier')}>
              Courier Delivery (Transported to destination)
            </Button>
            <Button variant="ghost" onClick={() => setStep(5)} w="100%">Back</Button>
          </VStack>
        )}

        {step === 7 && (
          <VStack w="100%" spacing={4}>
            <Text fontWeight="bold">Select Payer</Text>
            <Button w="100%" h="60px" colorScheme="green" onClick={() => handlePayer('sender')}>Sender Pays Now</Button>
            <Button w="100%" h="60px" colorScheme="purple" onClick={() => handlePayer('receiver')}>Receiver Pays on Pickup</Button>
            <Button variant="ghost" onClick={() => setStep(6)} w="100%">Back</Button>
          </VStack>
        )}

        {step === 8 && (
          <VStack w="100%" spacing={4}>
            <Text fontWeight="bold">Select Locker Size</Text>
            {Object.keys(sizePricing).map(size => (
              <Button key={size} w="100%" h="70px" variant="outline" onClick={() => handleSize(size)}>
                <Flex w="100%" justify="space-between">
                  <Text fontWeight="bold">Size: {size}</Text>
                  <Text>Max: {sizePricing[size].maxWeight}</Text>
                  <Text>N$ {sizePricing[size].price}</Text>
                </Flex>
              </Button>
            ))}
            <Button variant="ghost" onClick={() => setStep(7)} w="100%">Back</Button>
          </VStack>
        )}

        {step === 9 && (
          <VStack w="100%" spacing={4} align="stretch">
            <Text fontWeight="bold" fontSize="xl">Order Summary & Charges</Text>
            <Box bg="gray.50" p={4} borderRadius="md">
              <Flex justify="space-between"><Text>Locker Fee:</Text><Text>N$ {calculateCharges().locker.toFixed(2)}</Text></Flex>
              <Flex justify="space-between"><Text>Delivery Fee:</Text><Text>N$ {calculateCharges().delivery.toFixed(2)}</Text></Flex>
              <Flex justify="space-between"><Text>Service Fee:</Text><Text>N$ {calculateCharges().service.toFixed(2)}</Text></Flex>
              <Flex justify="space-between"><Text>Tax (15%):</Text><Text>N$ {calculateCharges().tax.toFixed(2)}</Text></Flex>
              <Divider my={2} />
              <Flex justify="space-between"><Text fontWeight="bold">Total:</Text><Text fontWeight="bold" color="brand.600" fontSize="lg">N$ {calculateCharges().total.toFixed(2)}</Text></Flex>
            </Box>
            <Text color="gray.500" fontSize="sm">Payer: {payer === 'sender' ? 'Sender (Pay Now)' : 'Receiver (Pay at Pickup)'}</Text>
            <Button w="100%" colorScheme="brand" size="lg" onClick={handleCheckout}>Confirm & Proceed</Button>
            <Button variant="ghost" onClick={() => setStep(8)}>Back</Button>
          </VStack>
        )}

        {step === 10 && (
          <VStack w="100%" spacing={4}>
            <Text fontWeight="bold" fontSize="xl">Payment</Text>
            <Text>Amount Due: N$ {calculateCharges().total.toFixed(2)}</Text>
            {isProcessing ? (
              <VStack py={8} spacing={4}>
                <Spinner size="xl" color="brand.500" thickness="4px" />
                <Text>Processing Payment...</Text>
              </VStack>
            ) : (
              <SimpleGrid columns={2} spacing={4} w="100%">
                <Button h="60px" onClick={() => simulatePayment('Mastercard')} leftIcon={<Icon as={MdPayment} />}>Mastercard</Button>
                <Button h="60px" onClick={() => simulatePayment('Apple Pay')} leftIcon={<Icon as={MdNfc} />}>Apple Pay</Button>
                <Button h="60px" onClick={() => simulatePayment('Google Pay')} leftIcon={<Icon as={MdNfc} />}>Google Pay</Button>
                <Button h="60px" onClick={() => simulatePayment('NFC Tap')} leftIcon={<Icon as={MdNfc} />}>NFC Tap</Button>
              </SimpleGrid>
            )}
            <Button variant="ghost" mt={4} onClick={() => setStep(9)}>Cancel Payment</Button>
          </VStack>
        )}

        {step === 11 && (
          <VStack w="100%" py={10} spacing={6}>
            {unlocking ? (
              <>
                <Spinner size="xl" color="orange.500" thickness="6px" />
                <Text fontSize="xl" fontWeight="bold" color="orange.500">Allocating Locker...</Text>
              </>
            ) : (
              <>
                <Icon as={MdLockOpen} boxSize={20} color="green.500" />
                <Text fontSize="2xl" fontWeight="bold" color="green.500">Locker B-14 Opened</Text>
                <Text textAlign="center">Please place your parcel inside. When finished, firmly close the locker door.</Text>
                <Checkbox size="lg" isChecked={doorClosed} onChange={(e) => setDoorClosed(e.target.checked)}>
                  I have closed the locker door
                </Checkbox>
                <Button colorScheme="brand" size="lg" w="100%" mt={4} onClick={confirmClosure}>Complete Drop-Off</Button>
              </>
            )}
          </VStack>
        )}

        {step === 12 && (
          <VStack w="100%" py={8} spacing={5}>
            <Icon as={MdCheckCircle} boxSize={24} color="brand.500" />
            <Text fontSize="3xl" fontWeight="bold" color="brand.900">Transaction Complete</Text>
            
            <Box bg="gray.50" p={5} borderRadius="xl" w="100%" textAlign="center" border="1px dashed" borderColor="gray.300">
              <Text fontSize="sm" color="gray.500">Auto-Generated Waybill Number</Text>
              <Text fontSize="3xl" fontWeight="black" color="brand.600" letterSpacing="widest">{generatedWaybill}</Text>
            </Box>

            <Text textAlign="center" color="gray.600" fontSize="lg">
              The locker is secured. We have sent an SMS and Email notification with the Waybill Number to both the Sender and Receiver.
            </Text>
            <Button w="100%" size="lg" colorScheme="gray" onClick={() => navigate('/kiosk')}>Return to Home</Button>
          </VStack>
        )}

      </VStack>
    </Flex>
  );
}
