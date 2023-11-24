import React, { useRef, useState } from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, Dispatch } from "@store/index";

import BackGround from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";

interface IDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const dispatch = useDispatch<Dispatch>();

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

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

  const onSubmit = ({ name, email, password }: IDataProps) => {
    dispatch.auth.register({ name, email, password });
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
                secureTextEntry
                ref={passwordRef}
                returnKeyType="next"
                onSubmitEditing={confirmPasswordRef?.current?.focus()}
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
                secureTextEntry
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
