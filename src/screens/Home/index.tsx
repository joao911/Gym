import React, { useCallback, useEffect, useState } from "react";
import { VStack, HStack, FlatList, Heading, Text } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, RootState } from "@store/index";

import HomeHeader from "@components/HomeHeader";
import Group from "@components/Group";
import ExerciseCard from "@components/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import Loading from "@components/Loading";

const Home: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const dispatch = useDispatch<Dispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { groups, loadingFetchingGroups, exercises } = useSelector(
    (state: RootState) => state.home
  );

  const [groupSelected, setGroupSelected] = useState("costas");

  const handleOpenExerciseDetails = (id: string) => {
    navigation.navigate("Exercise", { exerciseId: id });
  };

  const fetchExercisesByGroup = (groupSelected: string) => {
    dispatch.home.fetchExercisesByGroup({ groupSelected });
  };

  useEffect(() => {
    dispatch.home.fetchGroups({ token: user?.token });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup(groupSelected);
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
      <VStack flex={1} px={8}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading color="gray.200" fontFamily={"heading"}>
            Exercícios
          </Heading>
          <Text color="gray.200">{exercises.length}</Text>
        </HStack>
        {loadingFetchingGroups ? (
          <Loading />
        ) : (
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
        )}
      </VStack>
    </VStack>
  );
};

export default Home;
