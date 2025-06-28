import { Button, H1, Progress, ScrollView, XStack, YStack } from "tamagui";

import { AudioQuestionForm } from "../components/questions/audioQuestion";
import { MultiChoiceQuestionForm } from "../components/questions/multiChoice";
import { FillQuestionForm } from "../components/questions/fill";
import { X } from "@tamagui/lucide-icons";
import { useNavigation } from "@react-navigation/native";


export const Question = () => {
    const navigate = useNavigation();

    const handleBack = () => {
        navigate.goBack();
    }

    return (
        <YStack height="100%" width="100%" backgroundColor="$background">
            <XStack gap="$2" paddingTop="$10" alignItems="center" >
                <Button onPress={handleBack} circular icon={X} />
                <Progress theme="green" value={90} width="80%" height={8} borderRadius="$2" >
                    <Progress.Indicator animation="bouncy" />
                </Progress>
            </XStack>

            <YStack height="82%">
                <MultiChoiceQuestionForm />
            </YStack>
        </YStack>
    );
}