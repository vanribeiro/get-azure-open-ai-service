import { Context, HttpRequest } from "@azure/functions";

const errors = {
    400: (context: Context, req: HttpRequest) => {
            context.res = {
                status: 400,
                message: `One or more data were sent incorrectly. Values sent was model=${req.query.model} api-version=${req.query['api-version']}`
            }
            return;
        },
    404: (context: Context, req: HttpRequest) => {
            context.res = {
                status: 404,
                message: `Resource not found. Values sent was model=${req.query.model} api-version=${req.query['api-version']}`
            }
            return;
        }
}

export {
    errors
}