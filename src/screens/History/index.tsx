import React, { useCallback, useEffect, useState } from "react";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";
import Loading from "@components/Loading";
import { useFocusEffect } from "@react-navigation/native";

import ScreenHeader from "@components/ScreenHeader";
import HistoryCard from "@components/HistoryCard";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { HistoryGroupByDayDTO } from "@dtos/HistoryGroupByDayDTO";

const History: React.FC = () => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryGroupByDayDTO[]>([]);

  const getAllHistory = async () => {
    try {
      const response = await api.get("/history");
      setIsLoading(true);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios. Tente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      getAllHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard item={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
              fontFamily={"heading"}
            >
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. Vamos fazer exercícios?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
};

export default History;
