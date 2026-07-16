/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAttachMoney,
  MdBarChart,
  MdLocalShipping,
  MdInventory2,
  MdOutlineDoorSliding,
  MdSensors
} from "react-icons/md";
import { useStore } from "store/useStore";

export default function UserReports() {
  // Zustand Store
  const { parcels, stations } = useStore();

  // Derived Statistics
  const totalParcels = parcels.length;
  const awaitingCollection = parcels.filter(p => p.status === 'Ready for collection').length;
  const activeLockers = stations.filter(s => s.status === 'online').reduce((acc, curr) => acc + curr.compartments.total, 0);
  const totalRevenue = parcels.reduce((acc, curr) => acc + (curr.fees || 0), 0);

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4, "2xl": 4 }}
        gap='20px'
        mb='20px'>
        
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdLocalShipping} color={brandColor} />}
            />
          }
          name='Total Parcels'
          value={totalParcels.toString()}
        />

        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdInventory2} color={brandColor} />}
            />
          }
          name='Awaiting Collection'
          value={awaitingCollection.toString()}
        />

        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdOutlineDoorSliding} color={brandColor} />}
            />
          }
          name='Active Lockers'
          value={activeLockers.toString()}
        />

        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />}
            />
          }
          name='Total Revenue'
          value={`N$ ${totalRevenue.toFixed(2)}`}
        />

      </SimpleGrid>

      {/* Further components (Charts, Tables) will be built here */}
      <Box p={4} bg="white" borderRadius="xl" shadow="sm">
        <p>Charts and Data Tables for PML Logistics are being constructed...</p>
      </Box>

    </Box>
  );
}
