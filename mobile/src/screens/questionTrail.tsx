import { ScrollView, YStack } from "tamagui";

import { QuestionTrailNavigator } from "../components/questionTrailNavigator";
import { HeaderBar } from "../components/headerBar";

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
    select: true,
    Finished: false
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
}];



export const QuestionTrail = () => {

    return (
        <YStack height="100%" width="100%" backgroundColor="$background">
            <HeaderBar />
            <ScrollView >
                <YStack paddingVertical="$4" flex={1} alignItems="center" justifyContent="center" >
                    {data.map((item, index) => (<QuestionTrailNavigator key={index} item={item} index={index} />))}
                </YStack>
            </ScrollView>
        </YStack>
    )
};