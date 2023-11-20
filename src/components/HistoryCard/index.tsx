import React from "react";
import { HStack, VStack, Heading, Text } from "native-base";
import { HistoryDto } from "@dtos/HistoryDto";

interface HistoryCardProps {
  item: HistoryDto;
}
const HistoryCard: React.FC<HistoryCardProps> = ({ item }) => {
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
          fontFamily={"heading"}
        >
          {item.group}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {item.name}
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        {item.hour}
      </Text>
    </HStack>
  );
};

export default HistoryCard;
