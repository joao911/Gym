import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

export default Reactotron.configure({
  name: "Gym",
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();
