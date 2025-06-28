import { defaultConfig } from "@tamagui/config/v4"
import { createTamagui, TamaguiProvider } from "tamagui"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { LayoutList } from "@tamagui/lucide-icons";

import { TabBar } from "./components/tabBar";

import { QuestionTrail } from "./screens/questionTrail";
import { Settings } from "./screens/settings";

export const App = () => {
  const config = createTamagui(defaultConfig);
  const Tab = createBottomTabNavigator();

  return (
    <TamaguiProvider defaultTheme="dark" config={config} disableInjectCSS>

      <NavigationContainer>
        <Tab.Navigator tabBar={TabBar} screenOptions={{ headerShown: false }}>
          <Tab.Screen name="QuestionTrail" component={QuestionTrail} options={{ headerShown: false, tabBarIcon: LayoutList }} />
          <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false, tabBarIcon: LayoutList }} />
        </Tab.Navigator>
      </NavigationContainer>

    </TamaguiProvider>
  );
};

