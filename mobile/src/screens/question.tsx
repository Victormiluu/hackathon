import { Button, H1, ScrollView, XStack, YStack } from "tamagui";

import { AudioQuestionForm } from "../components/questions/audioQuestion";
import { MultiChoiceQuestionForm } from "../components/questions/multiChoice";
import { FillQuestionForm } from "../components/questions/fill";
import { ChevronLeft } from "@tamagui/lucide-icons";

export const Question = () => {
    return (
        <YStack height="100%" width="100%" backgroundColor="$background">
            <YStack paddingVertical="$10" height="100%">
                <MultiChoiceQuestionForm />
            </YStack>
        </YStack>
    );
}