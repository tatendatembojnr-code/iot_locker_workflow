import React from "react";

// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  let logoColor = useColorModeValue("brand.500", "white");

  return (
    <Flex align='center' direction='column'>
      <Text fontSize="2xl" fontWeight="bold" color={logoColor} my='32px'>
        PML Logistics
      </Text>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
