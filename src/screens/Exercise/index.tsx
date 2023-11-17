import React, { useEffect, useState } from "react";
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
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepeticoesSvg from "@assets/repetitions.svg";
import Button from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDetailsDto } from "@dtos/ExerciseDetailsDt";
import Loading from "@components/Loading";

interface routeProps {
  exerciseId: string;
}

const Exercise: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [exercise, setExercises] = useState<ExerciseDetailsDto>(
    {} as ExerciseDetailsDto
  );
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const toast = useToast();
  const route = useRoute();
  const { exerciseId } = route.params as routeProps;
  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício. Tente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseHistoryRegister = async () => {
    try {
      setSendingRegister(true);
      await api.post("/history", { exercise_id: exerciseId });
      toast.show({
        title: "Exercício registrado no seu histórico",
        placement: "top",
        bgColor: "green.700",
      });
      navigation.navigate("History");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício. Tente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  };

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={4}
          mb={8}
        >
          <Heading color="gray.100" fontSize="lg" fontFamily={"heading"}>
            {exercise.name}
          </Heading>
          <HStack alignItems={"center"}>
            <BodySvg />
            <Text
              color="gray.200"
              ml={1}
              textTransform={"capitalize"}
              flexShrink={1}
            >
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <VStack p={8}>
          <Box rounded="lg" overflow="hidden" mb={3}>
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Nome da imagem"
              resizeMode="cover"
              rounded="lg"
            />
          </Box>

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
                  {exercise.series} séries
                </Text>
              </HStack>
              <HStack>
                <RepeticoesSvg />
                <Text color="gray.200" ml={2}>
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <Button
              title="Marcar como realizado"
              onPress={handleExerciseHistoryRegister}
            />
          </Box>
        </VStack>
      )}
    </VStack>
  );
};

export default Exercise;
