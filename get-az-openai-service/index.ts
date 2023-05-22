import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as dotenv from 'dotenv';
import { errors } from "./errors";

dotenv.config();

// publish: func azure functionapp publish get-azure-open-ai-service

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const ENDPOINT = 'https://learning-az-open-ai.openai.azure.com';

    const URL = `${ENDPOINT}/openai/deployments/${req.query.model}/completions?api-version=${req.query['api-version']}`;

    try {
        
        const response: Response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                "Content-Type": "application/json",
                "api-key": `${process.env.AZURE_OPEN_AI_KEY_API}`
            }
        });

        errors[response.status](context, req);

        const data = await response.json();

        context.res = {
            body: data,
            "Content-Type": "application/json"
        };

    } catch (error) {
        context.res = { 
            status: 500,
            message: 'Internal Server Error'
        }
    }


};

export default httpTrigger;