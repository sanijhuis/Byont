import { Controller, Get, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileService } from 'src/services/file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) { }

  @Get('analyze-slither/:repoName')
  async analyzeSlither(
    @Param('repoName') repoName: string,
    @Req() req: Request
  ) {
    const user = req['customUser'];
    //Temporary for testing, this will be replaced with the properties of the user objects
    const tempEmail = 'meesvanberkel120@hotmail.com';
    return this.fileService.analyzeSlither(repoName, user.email);
  }

  //       Image: 'mythril/myth:latest',
  //       Cmd: ['analyze', `/mnt/${file.filename}`],


  //     });


  //     await container.start();

  //     const logs = await container.logs({
  //       follow: true,
  //       stdout: true,
  //       stderr: true,
  //     });

  //     let logsData = '';
  //     logs.pipe(process.stdout);
  //     logs.on('data', async(data) => {
  //        logsData += data;
  //     });





  //     logs.on('end', async() => {
  //       container.remove({ force: true });
  //     });

  //   } catch (err) {
  //     console.error('Error creating or starting container:', err);
  //   }
  // }

  async analyzeSlither(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file.filename);

      const docker = new Docker();
      const container = await docker.createContainer({
        HostConfig: {
          Binds: [`${process.cwd()}/uploads:/mnt`],
        },

        Image: 'trailofbits/slither:latest',
        Cmd: [`slither`,  `/mnt/${file.filename}`],
        Tty: true


      });


      await container.start();

      const logs = await container.logs({
        follow: true,
        stdout: true,
        stderr: true,
      });

      let logsData = '';
      logs.pipe(process.stdout);
      logs.on('data', async (data) => {
        logsData += data;

      });




      logs.on('end', async () => {
        await parseOutput(logsData);
        container.remove({ force: true });
      });




    } catch (err) {
      console.error('Error creating or starting container:', err);
    }
  }
}
async function parseOutput(output: string): Promise<void> {

  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


  try {    
    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: 'user', content: `parse the output to json\n
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
   } catch (err) {
    console.log(err)
  }


}






  @Get('analyze-mythril/:repoName')
  async analyzeMythril(
    @Param('repoName') repoName: string,
    @Req() req: Request
  ) {
    const user = req['customUser'];
    //Temporary for testing, this will be replaced with the properties of the user object
    const tempEmail = 'sanijhuis@live.nl';
    return this.fileService.analyzeMythril(repoName, user.email);
    //What is should look like
    //return this.fileService.analyzeMythril(repoName, user.email);
  }
}
