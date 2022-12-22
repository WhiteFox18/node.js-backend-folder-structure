import { NextFunction, Request, Response } from "express"
import CustomError from "../errors/CustomError"
import Errors from "../errors"

// Error handling function for
export const errorHandling = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)

    if (!(err instanceof CustomError)) {
        return res.status(500).json({
            "error": {
                "type": "unexpectedServerError",
                "description": ["unexpected server error occurred"],
                "fields": [],
            },
        })
    }

    return res.status(err.statusCode).json({
        error: {
            type: err.message,
            description: err.description,
            fields: err.fields,
        },
    })
}

// To get offset on the routes with pagination
export const getOffset = ({ limit, page }: { limit: number; page: number }) => {
    return limit * (page - 1)
}

// To format array of items from database query result into object with count and items
export const paginate = (result: any) => {
    if (Array.isArray(result)) {
        let count: number = 0
        result.forEach((item: any) => {
            if (item.count) {
                if (count === 0) count = item.count
                delete item.count
            }
        })
        return {
            count,
            items: result,
        }
    }
    return result
}

// Check if database query result has data if no, fire 404 error
export const checkQueryResultNoData = (data: any) => {
    if (!data)
        if (!Array.isArray(data))
            Errors.notExists([])

    return data
}