import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Button, ListItem, XStack } from "tamagui";


export const TabBar = (props: BottomTabBarProps) => {


    return (
        <XStack justifyContent="space-between" alignItems="center" padding="$2" backgroundColor="$backgroundHover" paddingBottom="$5" borderTopWidth={1}>
            {props.state.routes.map((route, index) => {
                const isFocused = props.state.index === index;
                const { options } = props.descriptors[route.key];
                const Icon = options.tabBarIcon;



                const onPress = () => {
                    if (!isFocused) {
                        props.navigation.navigate(route.name);
                    }
                };

                return (
                    <Button pressTheme hoverTheme focusTheme onPress={onPress} theme="gray" size="$6" icon={Icon} key={index} chromeless={!isFocused} />
                );
            })}
        </XStack>
    )
};