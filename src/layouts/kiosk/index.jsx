import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import KioskWelcome from "views/kiosk/index";
import SendParcel from "views/kiosk/SendParcel";
import CollectParcel from "views/kiosk/CollectParcel";
import LockerMap from "views/kiosk/LockerMap";
import Support from "views/kiosk/Support";

export default function KioskLayout() {
  return (
    <Box w="100vw" h="100vh" bg="white" overflow="hidden">
      <Routes>
        <Route path="/" element={<KioskWelcome />} />
        <Route path="/welcome" element={<KioskWelcome />} />
        <Route path="/send" element={<SendParcel />} />
        <Route path="/collect" element={<CollectParcel />} />
        <Route path="/map" element={<LockerMap />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Box>
  );
}
