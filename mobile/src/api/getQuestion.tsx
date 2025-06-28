import axios from "axios";



export const getQuestion = async () => {
    const response = await axios.get("https://capp-hackathon-backend-01.calmstone-15122a91.eastus.azurecontainerapps.io/activity/?difficulty_level=easy");

    return response.data;
};