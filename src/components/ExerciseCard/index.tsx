import React from "react";
import { HStack, Heading, Image, VStack, Text, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Exercise } from "@store/modules/home/types";
import { api } from "@services/api";

interface ExerciseCardProps extends TouchableOpacityProps {
  item: Exercise;
}
const ExerciseCard: React.FC<ExerciseCardProps> = ({ item, ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems={"center"}
        p={2}
        rounded="md"
        pt={2}
        pl={2}
        pb={2}
        pr={4}
        mb={3}
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${item.thumb}`,
          }}
          alt="Imagem do perfil"
          h={16}
          w={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily={"heading"}>
            {item.name}
          </Heading>
          <Text fontSize="sm" color="gray.200" numberOfLines={2}>
            {item.series} séries de {item.repetitions} repedições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
