import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';

type authRoutesProps = {
  SignIn: undefined;
  SignUp: undefined;
}

export type AuthNavigationProps = NativeStackNavigationProp<authRoutesProps>

const {Navigator, Screen} = createNativeStackNavigator<authRoutesProps>();

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}