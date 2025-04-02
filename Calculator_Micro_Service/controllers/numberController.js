import axios from "axios";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import NumberModel from "../models/number.model.js";

const API_URLS = {
    p: process.env.PRIME_API_URL,
    f: process.env.FIBO_API_URL,
    e: process.env.EVEN_API_URL,
    r: process.env.RAND_API_URL,
};
console.log(process.env.access_token, "access_token");

export const numberController = asyncHandler(async (req, res, next) => {
    const { numberId } = req.params;
    
    if (!API_URLS[numberId]) {
        return next(new ApiError(400, "Invalid numberId"));
    }

    try {
        const response = await axios.get(API_URLS[numberId], {
            headers: {
                Authorization: `Bearer ${process.env.EXTERNAL_API_TOKEN}`
            },
            timeout: 500 
        });
        const newNumbers = response.data.numbers || [];
        let existingNumbers = await NumberModel.find({ numberId }).sort({ createdAt: -1 });
        const uniqueNumbers = [...new Set([...newNumbers, ...existingNumbers.map(n => n.value)])].slice(0, 10);
        await NumberModel.deleteMany({ numberId });
        await NumberModel.insertMany(uniqueNumbers.map(num => ({ numberId, value: num })));
        const average = uniqueNumbers.reduce((sum, num) => sum + num, 0) / uniqueNumbers.length;
        res.json(new ApiResponse(200, { numbers: uniqueNumbers, average }, "Success"));
    } catch (error) {
        console.error("Error fetching data:", error.message);

        if (error.response) {
            if (error.response.status === 401) {
                return next(new ApiError(401, "Unauthorized: Invalid API Token"));
            }
            return next(new ApiError(error.response.status, error.response.data?.message || "External API Error"));
        }

        if (error.code === "ECONNABORTED") {
            return next(new ApiError(500, "Request timed out after 500ms"));
        }
        return next(new ApiError(500, "Server Error"));
    }
});

