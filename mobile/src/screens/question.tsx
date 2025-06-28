import { H1, ScrollView, YStack } from "tamagui";

import { AudioQuestionForm } from "../components/questions/audioQuestion";
import { MultiChoiceQuestionForm } from "../components/questions/multiChoice";
import { FillQuestionForm } from "../components/questions/fill";

export const Question = () => {
    return (
        <YStack height="100%" width="100%" backgroundColor="$background">
            <ScrollView>
                <YStack paddingVertical="$10" flex={1} alignItems="center" justifyContent="center" >
                    <MultiChoiceQuestionForm />
                </YStack>
            </ScrollView>
        </YStack>
    );
}