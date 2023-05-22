import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as dotenv from 'dotenv';

dotenv.config();
// criar uma função via linha de comando: 
// https://learn.microsoft.com/pt-br/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser&pivots=nodejs-model-v3
// publish: func azure functionapp publish get-azure-open-ai-service

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const ENDPOINT = 'https://learning-az-open-ai.openai.azure.com';

    const URL = `${ENDPOINT}/openai/deployments/${req.query.model}/completions?api-version=${req.query['api-version']}`;

    try {
        
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                "Content-Type": "application/json",
                "api-key": `${process.env.AZURE_OPEN_AI_KEY_API}`
            }
        });

        // TODO: write exceptions
    
        const data = await response.json();
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: data
        };
    } catch (error) {
        throw error;
    }


};

export default httpTrigger;