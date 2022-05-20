/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class RequestUser {
  @ApiProperty({ type: String, description: 'Github user' })
  user: string;
}

export class RequestBranch extends RequestUser {
  @ApiProperty({ type: String, description: 'Github repository' })
  repo: string;
}
export class RequestCommit extends RequestBranch {
  @ApiProperty({ type: String, description: 'Github branch' })
  branch: string;
}
