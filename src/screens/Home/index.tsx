import React, { useCallback, useEffect, useState } from "react";
import { VStack, HStack, FlatList, Heading, Text, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import HomeHeader from "@components/HomeHeader";
import Group from "@components/Group";
import ExerciseCard from "@components/ExerciseCard";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDto } from "@dtos/ExerciseDto";
import Loading from "@components/Loading";

const Home: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [groups, setGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState("antebraço");
  const [isLoading, setIsLoading] = useState(true);
  const handleOpenExerciseDetails = (id: string) => {
    navigation.navigate("Exercise", { exerciseId: id });
  };

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel carregar os grupos. Tente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const fetchExercisesByGroup = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel carregar os exercícios. Tente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

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
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent={"space-between"} mb={5}>
            <Heading color="gray.200" fontFamily={"heading"}>
              Exercícios
            </Heading>
            <Text color="gray.200">{exercises.length}</Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                item={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default Home;
