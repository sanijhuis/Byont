import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';

export async function parseOutput(
  output: string,
  configService: ConfigService
): Promise<void> {
  const configuration = new Configuration({
    apiKey: configService.get('OPEN_AI_API_KEY'),
  });
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
  try {
    const result = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: parseMessage,
      temperature: 0.6,
    });
  } catch (error) {
    if (error.response) {
      console.log('Error response status:', error.response.status);
      console.log('Error response data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
    }
  }
}
