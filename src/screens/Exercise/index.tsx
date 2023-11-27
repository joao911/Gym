import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@store/index";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepeticoesSvg from "@assets/repetitions.svg";
import Button from "@components/Button";
import { AppError } from "@services/ultils/AppError";
import Loading from "@components/Loading";
import { api } from "@services/api";

interface routeProps {
  exerciseId: string;
}
const Exercise: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const { exerciseDetails, loadingDetails, loadingRegister } = useSelector(
    (state: RootState) => state.home
  );
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const handleGoBack = () => {
    navigation.canGoBack();
  };

  const toast = useToast();
  const route = useRoute();
  const { exerciseId } = route.params as routeProps;

  const fetchExerciseDetails = async (exerciseId: string) => {
    try {
      await dispatch.home.fetchExerciseDetails({ exerciseId });
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
    }
  };

  const handleRegisterExercise = async () => {
    try {
      await dispatch.home.handleExerciseHistoryRegister({ exerciseId });
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
    }
  };

  useEffect(() => {
    fetchExerciseDetails(exerciseId);
  }, []);

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
          <Heading color="gray.100" fontSize="lg" fontFamily={"heading"}>
            {exerciseDetails.name}
          </Heading>
          <HStack alignItems={"center"}>
            <BodySvg />
            <Text
              color="gray.200"
              ml={1}
              textTransform={"capitalize"}
              flexShrink={1}
            >
              {exerciseDetails.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {loadingDetails ? (
        <Loading />
      ) : (
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}`,
            }}
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
                  {exerciseDetails.series} séries
                </Text>
              </HStack>
              <HStack>
                <RepeticoesSvg />
                <Text color="gray.200" ml={2}>
                  {exerciseDetails.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <Button
              title="Marcar como realizado"
              isLoading={loadingRegister}
              onPress={handleRegisterExercise}
            />
          </Box>
        </VStack>
      )}
    </VStack>
  );
};

export default Exercise;
