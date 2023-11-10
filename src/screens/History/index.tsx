import React, { useState } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";
import ScreenHeader from "@components/ScreenHeader";
import HistoryCard from "@components/HistoryCard";

const History: React.FC = () => {
  const [exercises, setExercises] = useState([
    {
      title: "25.12.2024",
      data: ["oii", "oi"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
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
