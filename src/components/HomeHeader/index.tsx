import React from "react";
import { HStack, VStack, Text, Heading, Icon } from "native-base";
import UserPhoto from "@components/UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "@store/index";
import { IUser } from "@store/modules/auth/types";

const HomeHeader: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        source={{ uri: "https://github.com/joao911.png" }}
        size={16}
        alt="Imagem do perfil"
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Ola
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily={"heading"}>
          João
        </Heading>
      </VStack>
      <TouchableOpacity onPress={() => dispatch.auth.setUser({} as IUser)}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

export default HomeHeader;
