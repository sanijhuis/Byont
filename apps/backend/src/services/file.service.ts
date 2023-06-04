import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Docker from 'dockerode';
import { parseOutput } from 'src/utils/output-parser';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { RepoService } from './repo.service';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { Stream } from 'stream';

type Scanner = 'mythril' | 'slither';

type ScanResultItem = {
  scanner: Scanner;
  filename: string;
  output: any;
};

@Injectable()
export class FileService {
  private docker: Docker;
  private imageTag = 'slither-image';
  constructor(
    private prisma: PrismaService,
    private repoService: RepoService,
    private userService: UsersService,
    private configService: ConfigService
  ) {
    this.docker = new Docker();
    this.prisma = new PrismaClient();
  }

  async analyzeMythril(repoName: string, user: any) {
    try {
      const currentDir = __dirname;
      const rootDir = path.join(currentDir, '..', '..', '..', '..', '..');
      const contractsDir = path.join(
        rootDir,
        'apps',
        'backend',
        'src',
        'contracts',
        `${repoName}`
      );

      const solFiles = fs
        .readdirSync(contractsDir)
        .filter((file) => path.extname(file) === '.sol');

      const scanOutputItemsData: { filename: string; output: string }[] = [];

      for (const filename of solFiles) {
        console.log(`Analyzing ${filename}`);

        const docker = new Docker();
        const container = await docker.createContainer({
          HostConfig: {
            Binds: [`${contractsDir}:/mnt`],
          },

          Image: 'mythril/myth:latest',
          Cmd: ['analyze', `/mnt/${filename}`, '-o', 'json'],
          Tty: true,
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

        await new Promise<void>((resolve, reject) => {
          logs.on('end', async () => {
            const output = this.removeNonPrintableChars(logsData);
            console.log('output with no characters', output);
            const GPTResponse = await parseOutput(output, this.configService);
            console.log('GPTResponse', GPTResponse);

            // Push the result into the scanOutputItemsData array
            scanOutputItemsData.push({
              filename: filename,
              output: output,
            });

            await container.remove({ force: true });
            resolve();
          });
          logs.on('error', (err) => {
            reject(err);
          });
        });
      }

      // Create a single scanOutput entry with the scanOutputItemsData array
      const userId = await this.userService.findIdByEmail(user);
      const repoId = await this.repoService.findRepoByNameAndUserId(
        repoName,
        userId!
      );
      const scanOutput = await this.prisma.scanOutput.create({
        data: {
          repo: { connect: { id: repoId } },
          date: new Date(),
        },
      });

      for (const item of scanOutputItemsData) {
        await this.prisma.scanOutputItem.create({
          data: {
            scanOutput: { connect: { id: scanOutput.id } },
            filename: item.filename,
            mythril: JSON.parse(item.output),
          },
        });
      }
    } catch (err) {
      console.error('Error creating or starting container:', err);
    }
  }
  async processFile(file: Express.Multer.File) {
    // Do something with the file, e.g., read its content, process it, etc.
    const content = fs.readFileSync(file.path, 'utf8');
    fs.rm(file.path, () => {});
  }

  async analyzeSlither(repoName: string, user: any) {
    try {
      const currentDir = __dirname;
      const rootDir = path.join(currentDir, '..', '..', '..', '..', '..');
      const contractsDir = path.join(
        rootDir,
        'apps',
        'backend',
        'src',
        'contracts',
        `${repoName}`
      );

      const solFiles = fs
        .readdirSync(contractsDir)
        .filter((file) => path.extname(file) === '.sol');
      console.log(contractsDir);

      const scanOutputItemsData: { filename: string; output: string }[] = [];

      // loop through the .sol files
      for (const filename of solFiles) {
        console.log(`Analyzing ${filename}`);
        const data = await this.createContainer(filename, contractsDir)
      }

      // Create a single scanOutput entry with the scanOutputItemsData array
      const userId = await this.userService.findIdByEmail(user);
      const repoId = await this.repoService.findRepoByNameAndUserId(
        repoName,
        userId!
      );

      const scanOutput = await this.prisma.scanOutput.create({
        data: {
          repo: { connect: { id: repoId } },
          date: new Date(),
        },
      });

      for (const item of scanOutputItemsData) {
        await this.prisma.scanOutputItem.create({
          data: {
            scanOutput: { connect: { id: scanOutput.id } },
            filename: item.filename,
            slither: JSON.parse(item.output),
          },
        });
      }
    } catch (err) {
      console.error('Error creating or starting container:', err);
    }
  }

  async createContainer(filename: string, contractsDir: string) {
    const container = await this.docker.createContainer({
      Image: 'trailofbits/eth-security-toolbox',
      Tty: true,
      HostConfig: {
        Binds: [`${contractsDir}:/mnt`],
      },
    });

    // Start the container
    await container.start();

    await this.execDeleteFile(filename, container);
    const data = await this.execAnalyzeFile(filename, container);
    console.log(data);
    //await parseOutput(data, this.configService)
    //console.log('GigaChatGPT', data)

    return data;
  }

  removeNonPrintableChars(s: string): string {
    return s
      .split('')
      .filter((char) => char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126)
      .join('');
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async execDeleteFile(filename: string, container: Docker.Container) {
    try {
      const exec1 = await container.exec({
        Cmd: ['rm', '-f', `/mnt/${filename}.json`],
        AttachStdout: true,
        AttachStderr: true,
      });
      await exec1.start({ hijack: true, stdin: true });
      console.log('deleted previous json file output if it exists');
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  }

  async execAnalyzeFile(
    filename: string,
    container: Docker.Container
  ): Promise<any> {
    const exec2 = await container.exec({
      Cmd: [
        'slither',
        `/mnt/${filename}`,
        '--json',
        `/mnt/${filename}.json` /** , '--print', 'human-summary'*/,
      ],
      AttachStdout: true,
      AttachStderr: true,
    });
    const execStream2 = await exec2.start({ hijack: true, stdin: true });

    // Log the output of the second command
    let logStream2 = new Stream.PassThrough();
    let output = '';
    logStream2.on('data', (chunk) => {
      const chunkAsString = chunk.toString('utf8');
      output += chunkAsString;
    });

    exec2.modem.demuxStream(execStream2, logStream2, logStream2);

    return new Promise((resolve, reject) => {
      execStream2.on('end', async () => {
        logStream2.end();
        try {
          // wait for the JSON from execPrintJson
          const jsonOutput = await this.execPrintJson(filename, container);
          // resolve the promise with the JSON output
          resolve(jsonOutput);
        } catch (err) {
          reject(err);
        }
      });
      execStream2.on('error', reject);
    });
  }

  async execPrintJson(filename, container: Docker.Container) {
    const exec3 = await container.exec({
      Cmd: ['cat', `/mnt/${filename}.json`],
      AttachStdout: true,
      AttachStderr: true,
    });

    const execStream3 = await exec3.start({ hijack: true, stdin: true });

    let output = '';
    let logStream3 = new Stream.PassThrough();
    logStream3.on('data', (chunk) => (output += chunk.toString('utf8')));
    exec3.modem.demuxStream(execStream3, logStream3, logStream3);

    return new Promise((resolve, reject) => {
      execStream3.on('end', () => {
        logStream3.end();
        try {
          const json = JSON.parse(output); // parse the output as JSON
          resolve(json); // resolve the promise with the JSON
        } catch (err) {
          reject(err); // if an error occurs when parsing the JSON, reject the promise
        }
      });

      execStream3.on('error', reject); // if an error occurs with the stream, reject the promise
    });
  }

  async createContainerMythril(file: Express.Multer.File) {
    try {
      console.log(`Analyzing ${file.filename}`);

      const docker = this.docker;
      const container = await docker.createContainer({
        Image: 'mythril/myth:latest',

        HostConfig: {
          Binds: [`${process.cwd()}/uploads:/mnt`],
        },
        Cmd: ['analyze', `/mnt/${file.filename}`, '-o', 'json'],
      });

      await container.start();

      const data = await this.analyzeSingleFileMythril(file, container);
      return data;
    } catch (err) {
      console.error('Error creating or starting container:', err);
    }
  }

  async analyzeSingleFileMythril(
    file: Express.Multer.File,
    container: Docker.Container
  ): Promise<any> {
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
    console.log('logsdata', logsData);

    return new Promise((resolve, reject) => {
      logs.on('end', async () => {
        try {
          const output = this.removeNonPrintableChars(logsData);
          console.log('output with no characters', output);
          //const GPTResponse = await parseOutput(output, this.configService);
          //console.log('GPTResponse', GPTResponse);
          resolve(output);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}
