import { IsString, Length } from "class-validator";

export class AddSpaceshipRequest {
  @IsString()
  @Length(1, 20)
  name!: string;
}
