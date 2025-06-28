import { Text, View, XStack, YStack } from "tamagui";


export const Profile = () => {

    return (
        <YStack height="100%" width="100%" paddingTop="$10" backgroundColor="$background">
            <View></View>
            <YStack height="82%" justifyContent="center" alignItems="center">
                <Text>Gustavo Henrico</Text>
                <XStack gap="$2" paddingTop="$10" alignItems="center">
                    <Text>@GustavoHenrico23454</Text>
                    <Text>- Aqui deis de junho de 2025</Text>
                </XStack>
            </YStack>


        </YStack>
    )
};