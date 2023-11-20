
# Gym
Esté é o projeto ignite Gym feito para testar meus conhecimentos em react-native.
As tecnologias ultilizadas foram: native-base, yup, react-hook-form, react-native-async-storage/async-storage,
react-navigation/bottom-tabs, react-navigation/native-stack, react-native-svg, react-native-svg,
Native-base foi ultilizado para reaproveitar os componentes prontos que ele oferece estilizando da forma que achar melhor.
Yup foi ultilizado junto com o react-hook-form para a validação de formulários.
react-native-async-storage/async-storage para salvar dados na memoria do celular,
react-navigation/bottom-tabs para fazer a tab-bottom navigation,
react-navigation/native-stack para fazer navegação em pilhas foi ultilizado nas screens não logadas,
react-native-svg para ultilizar fotos com o formato.svg,
react-native-svg para ultilizar fotos como se fosse um componente do react.

Front-end
Para rodar o projeto na sua máquina primeiro certifiqui-se de te o set up de react-native na sua máquina,
Por ser um projeto que o back end está rodando na sua máquina modifique o arquivo que está no seguinte caminho src/services/api.ts.
Caso esteja ultilizando linux use o camndo ifconfig para saber o endereço ip da sua máquina, se estiver ultilizando windows ultilize o comando ipconfig.

Após saber qual o endereço ip da sua maquina siga o seguinte exemplo pra mudar o ip do projeto para o ip da sua máquina:
const api = axios.create({
  baseURL: "http://endereço de ip da sua máquina:3333",
});

Apos fazer o download do projeto basta usar o comando yarn install para baixar as dependencias do projeto e yarn start para iniciar o projeto na sua máquina.


Back-end 
O back end ultilizado nesse projeto foi ultilizado de forma local na minha máquina para ultilizar o mesmo deve baixar o projeto do seguinte repositório https://github.com/rodrigorgtic/ignitegym-api, para baixar as dependencias user o comando yarn install e para iniciar o projeto yarn run dev.

O diferencial desse projeto foi a acessiblidade feita nos inputs em um projeto normal para sair de um input para outro você deve clicar no input com acessibilidade através do proprio input ja vai para o próximo. o hook ultilizado para fazer isso foi o fowardRef.


A próxima feature que irei implementar no projeto vai ser manipulação de estado global ultilizando redux-rematch

link do figma: https://www.figma.com/file/6nbRZUrIu3l4xqTlGiir1u/Ignite-Gym-(Community)?type=design&node-id=37-6&mode=design&t=LIKmIEg6gkPASfLb-0


![Screenshot from 2023-11-20 19-36-50](https://github.com/joao911/Gym/assets/49724031/511baafa-702a-4b58-bb89-ac0595bb0796)

