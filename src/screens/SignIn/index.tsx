import React, { useRef, useState } from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BackGround from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProps } from "@routes/auth.routes";

interface IDataProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const passwordRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation<AuthNavigationProps>();

  const schema = yup.object({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IDataProps) => {
    console.log("data", data);
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
            Acesse sua conta{" "}
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
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
                placeholder="Senha"
                secureTextEntry={showPassword}
                ref={passwordRef}
                returnKeyType="done"
                // onSubmitEditing={onSubmit}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                useIcon
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(onSubmit)} />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize={"sm"} mb={3} fontFamily={"body"}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={() => navigation.navigate("SignUp")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignIn;
