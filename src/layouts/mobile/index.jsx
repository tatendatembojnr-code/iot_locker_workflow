import React from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import TrackParcel from 'views/mobile/TrackParcel';

export default function MobileLayout() {
  return (
    <Box w="100vw" minH="100vh" bg="gray.50">
      {/* Mobile Shell Constraint */}
      <Box maxW="480px" mx="auto" minH="100vh" bg="white" boxShadow="md" position="relative">
        <Routes>
          <Route path="/" element={<TrackParcel />} />
          <Route path="/track" element={<TrackParcel />} />
        </Routes>
      </Box>
    </Box>
  );
}
