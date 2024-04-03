import { getBlogsData } from "@/services/spot-prices";
import { NextApiRequest, NextApiResponse } from "next";

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
        const { size, pageNumber } = req.query;
        const pageSize = parseInt(size as string) || 10; // Default page size: 10
        const page = parseInt(pageNumber as string) || 1; // Default page number: 1
        const offset = (page - 1) * pageSize;
        const data = await getBlogsData(pageSize, offset);
        return res.send(data );
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return getHandler(req, res);
        default:
            return res.status(405).send({ message: "Method not allowed" });
    }
}
