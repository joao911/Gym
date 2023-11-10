import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import ScreenHeader from "@components/ScreenHeader";
import {
  Center,
  VStack,
  ScrollView,
  Skeleton,
  Text,
  Heading,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import UserPhoto from "@components/UserPhoto";
import ForwardInput from "@components/Input";
import Button from "@components/Button";

interface IDataProps {
  name: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
const Profile: React.FC = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(
    "https://github.com/joao911.png"
  );
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const passwordRef = useRef<any>(null);
  const oldPasswordRef = useRef<any>(null);
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
        console.log("photoInfo: ", photoInfo.size / 1024 / 1024 > 5);
        setPhotoSelected(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log("error ao selecionar imagem:", error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  const schema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    oldPassword: yup.string().required("Senha é obrigatória"),
    password: yup
      .string()
      .required("Digite sua senha")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Deve conter 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial"
      ),
    confirmPassword: yup
      .string()
      .required("Confirme a nova senha")
      .oneOf([yup.ref("password"), null], "As senhas não correspondem"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IDataProps) => {
    console.log("data", data);
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

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ForwardInput
                bg="gray.600"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordRef?.current?.focus();
                }}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
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
          <Controller
            name="oldPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ForwardInput
                bg="gray.600"
                placeholder="Senha antiga"
                returnKeyType="next"
                ref={oldPasswordRef}
                onSubmitEditing={() => {
                  passwordRef?.current?.focus();
                }}
                secureTextEntry={showOldPassword}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.oldPassword?.message}
                showPassword={showOldPassword}
                setShowPassword={setShowOldPassword}
                useIcon
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ForwardInput
                bg="gray.600"
                placeholder="Nova senha"
                returnKeyType="next"
                ref={passwordRef}
                onSubmitEditing={() => {
                  confirmPasswordRef?.current?.focus();
                }}
                secureTextEntry={showNewPassword}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                showPassword={showNewPassword}
                setShowPassword={setShowNewPassword}
                useIcon
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ForwardInput
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry={showConfirmPassword}
                returnKeyType="send"
                ref={confirmPasswordRef}
                onSubmitEditing={handleSubmit(onSubmit)}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmPassword?.message}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                useIcon
              />
            )}
          />

          <Button title="Atualizar" onPress={handleSubmit(onSubmit)} />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Profile;
