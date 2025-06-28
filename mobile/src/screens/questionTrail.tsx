import { ScrollView, XStack, YStack } from "tamagui";

import { QuestionTrailNavigator } from "../components/questionTrailNavigator";

const data = [{
    select: false,
    Finished: true
},
{
    select: false,
    Finished: true
},
{
    select: false,
    Finished: true
},
{
    select: true,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
},
{
    select: false,
    Finished: false
}];

export const QuestionTrail = () => {

    return (
        <YStack height="100%" width="100%" backgroundColor="$background">
            <ScrollView >
                <YStack paddingVertical="$13" flex={1} alignItems="center" justifyContent="center" >
                    {data.map((item, index) => (<QuestionTrailNavigator key={index} item={item} index={index} />))}
                </YStack>
            </ScrollView>
        </YStack>
    )
};