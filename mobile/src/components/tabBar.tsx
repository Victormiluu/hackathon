import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Button, XStack } from "tamagui";


export const TabBar = (props: BottomTabBarProps) => {


    return (
        <XStack padding="$2" backgroundColor="$backgroundHover" borderTopWidth={1}>
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
                    <Button size="$6" key={index} onPress={onPress} icon={Icon} />
                );
            })}
        </XStack>
    )
};