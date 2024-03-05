import { getBlogData } from "@/services/spot-prices";
import { NextApiRequest, NextApiResponse } from "next";

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const { pageSize, pageNumber } = req.query; 
    // Check if parameters are provided
    if (!pageSize || !pageNumber) {
        return res.status(400).send({ message: "pageSize and pageNumber are required" });
    }
    // Call getBlogData with parameters
    const data = await getBlogData(Number(pageSize), Number(pageNumber));
    return res.send(data);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return getHandler(req, res);
        default:
            return res.status(405).send({ message: "method not allowed" });
    }
}
