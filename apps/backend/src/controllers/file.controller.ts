import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as Docker from 'dockerode';
import { AuthGuard } from '@nestjs/passport';
import { Configuration, OpenAIApi } from 'openai'

@Controller('file')
export class FileController {
  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, filename);
        },
      }),
    })
  )
  // async analyzeFile(@UploadedFile() file: Express.Multer.File) {
  //   try {
  //     console.log(file.filename);

  //     const docker = new Docker();
  //     const container = await docker.createContainer({
  //       HostConfig: {
  //         Binds: [`${process.cwd()}/uploads:/mnt`],
  //       },

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
        Cmd: ['slither', `/mnt/${file.filename}`],



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
        await parseOutput(logsData);
      });




      logs.on('end', async () => {
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

  const parseMessage = `parse the following output to json where the format would be as followed:\n 
                         - Type of error\n 
                         - error message\n
                         - (if available) reference.\n
                         this is the output:\n' + ${output.toString()}`;

    const completion = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: parseMessage,
    })
    console.log(completion);
    console.log(completion.data.choices[0].text);
}






