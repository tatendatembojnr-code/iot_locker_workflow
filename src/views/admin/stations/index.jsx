import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Card, CardHeader, CardBody, Text, Button } from '@chakra-ui/react';
import { useStore } from 'store/useStore';

export default function Stations() {
  const { stations } = useStore();

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Card>
        <CardHeader>
          <Text fontSize='xl' fontWeight='bold'>Stations & Lockers (Namibia)</Text>
        </CardHeader>
        <CardBody>
          <Box overflowX='auto'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Station ID</Th>
                  <Th>Name</Th>
                  <Th>City</Th>
                  <Th>Status</Th>
                  <Th>Available Compartments</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stations.map((station) => (
                  <Tr key={station.id}>
                    <Td>{station.id}</Td>
                    <Td>{station.name}</Td>
                    <Td>{station.city}</Td>
                    <Td>
                      <Badge colorScheme={station.status === 'online' ? 'green' : 'red'}>
                        {station.status}
                      </Badge>
                    </Td>
                    <Td>{station.compartments.available} / {station.compartments.total}</Td>
                    <Td>
                      <Button size='sm' colorScheme='brand'>Manage Lockers</Button>
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
