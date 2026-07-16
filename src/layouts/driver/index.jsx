import React from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { MdHome, MdQrCodeScanner, MdMap } from 'react-icons/md';
import DriverDashboard from 'views/driver/Dashboard';
import Dropoff from 'views/driver/Dropoff';
import LiveMap from 'views/driver/LiveMap';

export default function DriverLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/driver', icon: MdHome },
    { name: 'Dropoff', path: '/driver/dropoff', icon: MdQrCodeScanner },
    { name: 'Map', path: '/driver/map', icon: MdMap },
  ];

  return (
    <Box w="100vw" minH="100vh" bg="gray.900">
      <Box maxW="480px" mx="auto" minH="100vh" bg="gray.50" boxShadow="md" position="relative" pb="70px">
        <Routes>
          <Route path="/" element={<DriverDashboard />} />
          <Route path="/dropoff" element={<Dropoff />} />
          <Route path="/map" element={<LiveMap />} />
        </Routes>
        
        {/* Bottom Nav */}
        <Flex position="absolute" bottom="0" w="100%" h="70px" bg="white" borderTop="1px solid" borderColor="gray.200" justify="space-around" align="center">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (location.pathname === '/driver/' && item.path === '/driver');
            return (
              <Flex key={item.name} direction="column" align="center" justify="center" color={isActive ? 'brand.500' : 'gray.400'} onClick={() => navigate(item.path)} cursor="pointer">
                <Icon as={item.icon} boxSize={6} mb={1} />
                <Text fontSize="xs" fontWeight="bold">{item.name}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
