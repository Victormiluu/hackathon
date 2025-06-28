import { ScrollView, YStack } from "tamagui";

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
        <YStack height="100%" width="100%" paddingTop="$10" backgroundColor="$background">
            <ScrollView>
                <YStack flex={1} alignItems="center" justifyContent="center" >
                    {data.map((item, index) => (<QuestionTrailNavigator key={index} item={item} index={index} />))}
                </YStack>
            </ScrollView>
        </YStack>
    )
};