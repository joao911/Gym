import React from "react";
import { HStack, VStack, Text, Heading, Icon } from "native-base";
import UserPhoto from "@components/UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@store/index";
import { IUser } from "@store/modules/auth/types";
import { api } from "@services/api";

import photoDefault from "@assets/userPhotoDefault.png";

const HomeHeader: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const { imagePhoto, user } = useSelector((state: RootState) => state.auth);
  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        source={
          imagePhoto
            ? { uri: `${api.defaults.baseURL}/avatar/${imagePhoto}` }
            : photoDefault
        }
        size={16}
        alt="Imagem do perfil"
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily={"heading"}>
          {user?.user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={() => dispatch.auth.setUser({} as IUser)}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

export default HomeHeader;
