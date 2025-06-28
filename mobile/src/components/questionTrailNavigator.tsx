import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Check, StarFull } from "@tamagui/lucide-icons";
import { Button, View } from "tamagui";
import { useTheme } from 'tamagui'

type QuestionTrailNavigatorProps = {
    item: any;
    index: number;
};

export const QuestionTrailNavigator = ({ index, item }: QuestionTrailNavigatorProps) => {
    const amplitude = 200;
    const offset = Math.sin(index / 1) * amplitude;
    const triggerTheme = item.Finished ? "success" : item.select ? "base" : "base"
    const navigation = useNavigation();

    const icon = item.Finished ? <Check /> : <StarFull />;

    const onPress = () => {
        if (!item.Finished) {
            (navigation as any).navigate("Question", { item });
        }
    };

    return (
        <View marginVertical={20} marginRight={offset} position="relative">
            <Button
                disabled={!item.select && !item.Finished}
                onPress={onPress}
                icon={icon}
                theme={triggerTheme}
                size="$8"
                circular
                borderBottomWidth={10}
                borderLeftWidth={3}
                borderRightWidth={2}
                borderTopWidth={0}
                borderColor="$color6"
                shadowColor="$shadowColor"
                pressStyle={{
                    transform: [{ scaleY: 0.9 }, { scaleX: 1 }],
                    borderBottomWidth: 0,
                    borderTopWidth: 0.5,
                    borderLeftWidth: 0.5,
                    borderRightWidth: 0.5,
                }}
            />
        </View>
    );
};
