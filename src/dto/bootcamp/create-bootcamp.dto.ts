import { IsBoolean, IsString } from 'class-validator';

export class CreateBootcampDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly website: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly address: string;

  // each: true for expect each string value
  @IsString({ each: true })
  readonly careers: string[];

  @IsBoolean()
  readonly housing: boolean;

  @IsBoolean()
  readonly jobAssistance: boolean;

  @IsBoolean()
  readonly jobGuarantee: boolean;

  @IsBoolean()
  readonly acceptGi: boolean;
}
