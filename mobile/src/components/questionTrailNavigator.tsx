import { useLinkTo } from "@react-navigation/native";
import { StarFull } from "@tamagui/lucide-icons";
import { Button, View } from "tamagui";

type QuestionTrailNavigatorProps = {
    item: any;
    index: number;
};

export const QuestionTrailNavigator = ({ index, item }: QuestionTrailNavigatorProps) => {
    const amplitude = 150;
    const offset = Math.sin(index / 1) * amplitude;
    const triggerTheme = item.Finished ? "green" : item.select ? "blue" : "gray";
    const linkTo = useLinkTo();

    const onPress = () => {
        linkTo(`/Question`);
    };

    return (
        <View marginVertical={20} marginRight={offset} >
            <Button
                disabled={!item.select && !item.Finished}
                onTouchStart={onPress}
                icon={StarFull}
                theme={triggerTheme}
                size="$9"
                circular
                borderBottomWidth={10}
                borderLeftWidth={3}
                borderRightWidth={2}
                borderTopWidth={0}
                borderColor="$color6"
                shadowColor="$shadowColor"
                disabledStyle={{
                    opacity: 0.5,
                }}
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
