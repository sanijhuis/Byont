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
  try {    
    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: 'user', content: 
    `parse the output to json\n
    things to keep in mind:\n
    every single parameter is one error\n
    the format should be as followed:\n
    errorNumber: {\n
      error:\n
      (optional) reference:\n
    }\n\n
    this is the output:\n
      ${output.toString()}`}],
  })
  console.log(completion.data.choices[0].message?.content);
   } catch (error) {
    if (error.response) {
      console.log('Error response status:', error.response.status);
      console.log('Error response data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
    }
  }
}
