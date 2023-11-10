import React, { useRef, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import ScreenHeader from "@components/ScreenHeader";
import {
  Center,
  VStack,
  ScrollView,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import UserPhoto from "@components/UserPhoto";
import ForwardInput from "@components/Input";
import Button from "@components/Button";

const Profile: React.FC = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(
    "https://github.com/joao911.png"
  );
  const toast = useToast();

  const oldPasswordRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);
  const PHOTO_SIZE = 33;

  const handleUserSelectPhot = async () => {
    try {
      setPhotoIsLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem e muito grande. Escolha uma menor.",
            placement: "top",
            bgColor: "red.500",
          });
        }
        setPhotoSelected(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log("error ao selecionar imagem:", error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  const handleInput2Submit = () => {
    // Lide com a submissão do segundo input aqui.
  };
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor={"gray.500"}
              endColor={"gray.400"}
            />
          ) : (
            <UserPhoto
              source={{ uri: photoSelected }}
              alt="Imagem do perfil"
              size={33}
            />
          )}
          <TouchableOpacity onPress={handleUserSelectPhot}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <ForwardInput
            bg="gray.600"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef?.current?.focus();
            }}
          />
          <ForwardInput
            bg="gray.600"
            placeholder="e-mail"
            isDisabled
            value="y7BzK@example.com"
          />
        </Center>
        <VStack mt={12} mb={9} px={10}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>
          <ForwardInput
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
            returnKeyType="next"
            ref={oldPasswordRef}
            onSubmitEditing={() => {
              passwordRef?.current?.focus();
            }}
          />
          <ForwardInput
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
            returnKeyType="next"
            ref={passwordRef}
            onSubmitEditing={() => {
              confirmPasswordRef?.current?.focus();
            }}
          />
          <ForwardInput
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
            returnKeyType="send"
            ref={confirmPasswordRef}
            onSubmitEditing={handleInput2Submit}
          />
          <Button title="Atualizar" />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Profile;
