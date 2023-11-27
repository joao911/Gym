import React, { useCallback, useState } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@store/index";

import ScreenHeader from "@components/ScreenHeader";
import HistoryCard from "@components/HistoryCard";
import { useFocusEffect } from "@react-navigation/native";

const History: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const { history } = useSelector((state: RootState) => state.home);
  const [exercises, setExercises] = useState([
    {
      title: "25.12.2024",
      data: ["oii", "oi"],
    },
  ]);

  const fetchExerciseDetails = () => {
    dispatch.home.getAllHistory();
  };

  useFocusEffect(
    useCallback(() => {
      fetchExerciseDetails();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
      <SectionList
        sections={history}
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
    </VStack>
  );
};

export default History;
