import React from "react";
import { HStack, VStack, Heading, Text } from "native-base";

const HistoryCard: React.FC = () => {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      alignItems="center"
      justifyContent="space-between"
      rounded="md"
    >
      <VStack flex={1}>
        <Heading
          color="white"
          fontSize="md"
          textTransform="capitalize"
          numberOfLines={1}
        >
          Costas
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        12:36
      </Text>
    </HStack>
  );
};

export default HistoryCard;
