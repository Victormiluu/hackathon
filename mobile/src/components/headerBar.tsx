// components/headerBar.tsx
import React from "react";
import { XStack, Button } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { LayoutList, Star, User, Settings, Coins } from "@tamagui/lucide-icons";

export const HeaderBar = () => {
  const navigation = useNavigation();

  return (
    <XStack 
      justifyContent="space-between"
      alignItems="center"
      padding="$3"
      paddingTop="$9" 
      backgroundColor="$background"
      borderBottomWidth={1}
      borderColor="$background"
      width="100%"
    >
      <Button 
        icon={<LayoutList size="$2" />} 
        chromeless 
        // onPress={() => navigation.navigate('Menu')}
      />
      <Button 
        icon={<Coins size="$2" />} 
        
        chromeless 
      >5</Button>
      <Button 
        icon={<Coins size="$2" />} 
        
        chromeless 
      >564</Button>
    </XStack>
  );
};