import { defaultConfig } from "@tamagui/config/v4"
import { createTamagui, TamaguiProvider } from "tamagui"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LayoutList, Trophy, User } from "@tamagui/lucide-icons";

import { TabBar } from "./components/tabBar";

import { QuestionTrail } from "./screens/questionTrail";
import { Profile } from "./screens/profile";
import { Ranking } from "./screens/ranking";
import { Question } from "./screens/question";
import { StatusBar } from "react-native";
import { HeaderBar } from "./components/headerBar";




const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="QuestionTrail" tabBar={TabBar}>
      <Tab.Screen name="QuestionTrail" component={QuestionTrail} options={{ headerShown: false, tabBarIcon: () => <LayoutList size={24} /> }} />
      <Tab.Screen name="Ranking" component={Ranking} options={{ headerShown: false, tabBarIcon: () => <Trophy size={24} /> }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarIcon: () => <User size={24} /> }} />
    </Tab.Navigator>
  )
}

export const App = () => {
  const config = createTamagui(defaultConfig);
  const Stack = createNativeStackNavigator();

  return (
    <TamaguiProvider defaultTheme="dark" config={config} disableInjectCSS>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
};

