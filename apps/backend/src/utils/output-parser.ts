import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';

export async function parseOutput(
  output: string,
  configService: ConfigService
): Promise<any> {
  const configuration = new Configuration({
    apiKey: configService.get('OPEN_AI_API_KEY'),
  });
  const openai = new OpenAIApi(configuration);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: 'user', content:
          `summarize this output to basic english text and
     give a explanation of the slither errors with a few details about each error individually.\n
     give it the following format:\n
     give details like:\n
     - the error type\n
     - line number\n
     - the specific error discription and explain this discription\n
      do the same with the mythril output.\n
      skip the chatGPT part\n
    this is the output:\n\n
      ${output.toString()}`
      }],
    })

    return completion.data.choices[0].message?.content;
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
