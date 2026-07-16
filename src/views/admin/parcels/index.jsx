import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Card, CardHeader, CardBody, Text, Button } from '@chakra-ui/react';
import { useStore } from 'store/useStore';

export default function Parcels() {
  const { parcels } = useStore();

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Card>
        <CardHeader>
          <Text fontSize='xl' fontWeight='bold'>Parcels & Shipments</Text>
        </CardHeader>
        <CardBody>
          <Box overflowX='auto'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Tracking ID</Th>
                  <Th>Sender</Th>
                  <Th>Receiver</Th>
                  <Th>Destination</Th>
                  <Th>Fees (NAD)</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {parcels.map((parcel) => (
                  <Tr key={parcel.id}>
                    <Td fontWeight='bold'>{parcel.id}</Td>
                    <Td>{parcel.sender}</Td>
                    <Td>{parcel.receiver}</Td>
                    <Td>{parcel.destination}</Td>
                    <Td>N$ {parcel.fees.toFixed(2)}</Td>
                    <Td>
                      <Badge colorScheme={parcel.status === 'Ready for collection' ? 'green' : 'orange'}>
                        {parcel.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Button size='sm' colorScheme='brand' variant='outline'>View Details</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
