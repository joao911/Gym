import React from "react";
import { HStack, VStack, Text, Heading, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import photoDefault from "@assets/userPhotoDefault.png";
import UserPhoto from "@components/UserPhoto";
import { useAuth } from "@hooks/useAuth";

const HomeHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : photoDefault}
        size={16}
        alt="Imagem do perfil"
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Ola
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily={"heading"}>
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

export default HomeHeader;
