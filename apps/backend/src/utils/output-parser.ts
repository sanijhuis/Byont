import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';

export async function parseOutput(output: string, configService: ConfigService): Promise<void> {
  const configuration = new Configuration({
    apiKey: configService.get("OPEN_AI_API_KEY"),
  });

  console.log(configuration, 'configuration');
  const openai = new OpenAIApi(configuration);
  const parseMessage = [
    {
      role: 'assistant',
      content: `parse the following output to json where the format would be as followed:
                           - Type of error
                           - error message
                           - (if available) reference. 
                           
                           this is the output: + ${output}`,
    },
  ];
  const result = await openai.createCompletion({
    model: 'gpt-3.5-turbo',
    prompt: parseMessage,
    temperature: 0.6,
  });
  console.log(result);
}
