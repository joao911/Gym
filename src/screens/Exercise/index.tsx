import React from "react";
import {
  Center,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Image,
  Box,
  ScrollView,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepeticoesSvg from "@assets/repetitions.svg";
import Button from "@components/Button";

const Exercise: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const handleGoBack = () => {
    navigation.canGoBack();
  };
  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={4}
          mb={8}
        >
          <Heading color="gray.100" fontSize="lg">
            Puxada frontal
          </Heading>
          <HStack alignItems={"center"}>
            <BodySvg />
            <Text
              color="gray.200"
              ml={1}
              textTransform={"capitalize"}
              flexShrink={1}
            >
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{ uri: "https://github.com/joao911.png" }}
            alt="Nome da imagem"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />
          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems={"center"}
              justifyContent={"space-around"}
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  3 séries
                </Text>
              </HStack>
              <HStack>
                <RepeticoesSvg />
                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Exercise;
