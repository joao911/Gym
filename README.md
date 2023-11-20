# Gym
Este é o projeto Ignite Gym, desenvolvido para testar meus conhecimentos em React Native. As tecnologias utilizadas foram: NativeBase, Yup, React Hook Form, React Native Async Storage, React Navigation Bottom Tabs, React Navigation Native Stack e React Native SVG.

O NativeBase foi utilizado para reaproveitar os componentes prontos, estilizando-os da forma que considerei melhor.</br> Yup foi empregado junto com o React Hook Form para a validação de formulários.</br> React Native Async Storage foi utilizado para salvar dados na memória do celular.</br> React Navigation Bottom Tabs foi utilizado para criar a navegação de abas na parte inferior.</br> React Navigation Native Stack foi usado nas telas não logadas. </br> React Native SVG foi usado para incorporar imagens no formato .svg e como componente React.

## Front-end
Para rodar o projeto em sua máquina, certifique-se primeiro de ter o ambiente React Native configurado. Como o backend está rodando localmente, modifique o arquivo localizado em src/services/api.ts. Se estiver utilizando Linux, use o comando `ifconfig` para obter o endereço IP da sua máquina; se estiver utilizando o Windows, use o comando `ipconfig`.

Após identificar o endereço IP da sua máquina, siga o exemplo a seguir para ajustar o projeto para o IP da sua máquina:


const api = axios.create({
  baseURL: "http://endereço-de-ip-da-sua-máquina:3333",
});

Após baixar o projeto, execute o comando `yarn install` para instalar as dependências e `yarn start` para iniciar o projeto em sua máquina.

## Back-end
O backend utilizado neste projeto foi configurado localmente em minha máquina. Para utilizá-lo, baixe o projeto do seguinte repositório: [https://github.com/rodrigorgtic/ignitegym-api](https://github.com/rodrigorgtic/ignitegym-api). Para instalar as dependências, utilize o comando `yarn install`, e para iniciar o projeto, utilize `yarn dev`.

Um diferencial deste projeto foi a acessibilidade implementada nos inputs. Em um projeto normal, para passar de um input para outro, você deve clicar no input. Com acessibilidade, ao clicar no próprio input, o foco passa para o próximo. O hook utilizado para realizar isso foi o `forwardRef`.

A próxima funcionalidade que pretendo implementar no projeto será a manipulação de estado global utilizando o Redux Rematch.

Link do Figma: [Ignite Gym (Community)](https://www.figma.com/file/6nbRZUrIu3l4xqTlGiir1u/Ignite-Gym-(Community)?type=design&node-id=37-6&mode=design&t=LIKmIEg6gkPASfLb-0)
