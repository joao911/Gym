import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
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
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import UserPhoto from "@components/UserPhoto";
import ForwardInput from "@components/Input";
import Button from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

interface IDataProps {
  name: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
const Profile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const toast = useToast();
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(user.name);

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

        const fileExtension = photoInfo.uri.split(".").pop();
        const photoFile = {
          name: `${user.name}.${fileExtension}`
            .toLowerCase()
            .split(" ")
            .join(""),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotoUploadPhoto = new FormData();
        userPhotoUploadPhoto.append("avatar", photoFile);

        const response = await api.patch(
          "/users/avatar",
          userPhotoUploadPhoto,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.show({
          title: "Foto alterada com sucesso",
          placement: "top",
          bgColor: "green.500",
        });

        const userUpdated = user;
        userUpdated.avatar = response.data.avatar;

        await updateUserProfile(userUpdated);
      }
    } catch (error) {
      console.log("error ao selecionar imagem:", error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  const profileSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    oldPassword: yup.string().when("password", {
      is: (value: any) => !!value,
      then: (schema) => schema.required("Senha antiga é obrigatória"),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: yup
      .string()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Deve conter 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial"
      ),
    confirmPassword: yup
      .string()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .when("password", {
        is: (value: any) => !!value,
        then: (schema) =>
          schema
            .required("Confirme a nova senha")
            .nullable()
            .transform((value) => (!!value ? value : null)),
        otherwise: (schema) => schema.notRequired(),
      })
      .oneOf([yup.ref("password"), null], "As senhas não correspondem"),
  });

  const initialValues = {
    name: userName.length > 0 ? userName : user?.name,
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: initialValues,
  });

  const handleProfileUpdate = async (data: IDataProps) => {
    try {
      setIsLoading(true);
      await api.put("/users", {
        name: data.name,
        password: data.password,
        old_password: data.oldPassword,
      });

      const userUpdated = user;
      userUpdated.name = data.name;
      await updateUserProfile(userUpdated);
      toast.show({
        title: "Informações alteradas com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios. Tente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
      reset(initialValues);
    } finally {
      setIsLoading(false);
    }
  };

  const watchNameUser = watch("name", "");
  const onSubmit = (data: IDataProps) => {
    handleProfileUpdate(data);
  };

  useEffect(() => {
    setUserName(watchNameUser);
  }, [watchNameUser]);

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
              source={{ uri: `${api.defaults.baseURL}/avatar/${user?.avatar}` }}
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
            value={user?.email}
          />
        </Center>
        <VStack mt={12} mb={9} px={10}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily={"heading"}>
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

          <Button
            title="Atualizar"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Profile;
