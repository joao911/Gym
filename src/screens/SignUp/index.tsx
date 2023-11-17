import React, { useRef, useState } from "react";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BackGround from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

interface IDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const { sigIn } = useAuth();

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);
  const toast = useToast();
  const navigation = useNavigation();

  const schema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
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

  const onSubmit = async ({ name, email, password }: IDataProps) => {
    try {
      setLoading(true);
      const response = await api.post("/users", {
        name,
        email,
        password,
      });
      sigIn(email, password);
      setLoading(false);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel criar a conta. Tente novamente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackGround}
          alt="Pessoas treinando"
          resizeMode="contain"
          position={"absolute"}
          defaultSource={BackGround}
        />
        <Center my={24}>
          <Logo />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" fontFamily={"heading"} mb={6}>
            Crie sua conta sua conta{" "}
          </Heading>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailRef?.current?.focus();
                }}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                ref={emailRef}
                onSubmitEditing={() => {
                  passwordRef?.current?.focus();
                }}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                secureTextEntry={showPassword}
                ref={confirmPasswordRef}
                onSubmitEditing={() => {
                  confirmPasswordRef?.current?.focus();
                }}
                returnKeyType="next"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                useIcon
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                secureTextEntry={showConfirmPassword}
                ref={confirmPasswordRef}
                returnKeyType="done"
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
            title="Criar e acessar "
            mt={"1.5"}
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />
        </Center>
        <Center mt={24}>
          <Button
            title="Voltar para login"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignUp;
