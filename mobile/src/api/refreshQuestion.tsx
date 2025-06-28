import axios from "axios";



export const refreshQuestion = async () => {
    const response = await axios.get("https://capp-hackathon-backend-01.calmstone-15122a91.eastus.azurecontainerapps.io/activity/refresh?difficulty_level=hard");

    return response.data;
};