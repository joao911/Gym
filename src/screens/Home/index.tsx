import React, { useState } from "react";
import { VStack, HStack, FlatList, Heading, Text } from "native-base";

import HomeHeader from "@components/HomeHeader";
import Group from "@components/Group";
import ExerciseCard from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

const Home: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [exercises, setExercises] = useState([
    "Remada unilateral",
    "Remada curvada",
    "Remada unilateral",
  ]);
  const [groups, setGroups] = useState([
    "Costas",
    "Ombro",
    "Bíceps",
    "Tríceps",
    "Peito",
    "Antebraço",
    "Panturrilha",
  ]);
  const [groupSelected, setGroupSelected] = useState("Costas");

  const handleOpenExerciseDetails = () => {
    navigation.navigate("Exercise");
  };

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              String(groupSelected).toLocaleUpperCase() ===
              String(item).toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading color="gray.200" fontFamily={"heading"}>
            Exercícios
          </Heading>
          <Text color="gray.200">{exercises.length}</Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard name={item} onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
};

export default Home;
