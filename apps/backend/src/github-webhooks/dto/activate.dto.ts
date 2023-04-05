import { IsNotEmpty, IsString } from 'class-validator';

export class ActivateDto {
  @IsNotEmpty()
  @IsString()
  repoName: string;

  @IsNotEmpty()
  @IsString()
  ownerName: string;
}
