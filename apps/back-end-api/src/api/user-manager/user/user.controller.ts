import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/responses/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../../../guard/user.guard';

@ApiTags('Users manager')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /* @Get()
  @Header('Cache-Control', 'no-store')
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs ',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nothing found',
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiOperation({
    summary: 'Get all users ',
    description: 'Get all users',
  })
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  } */

  /*   @Get('/:userId')
  @Header('Cache-Control', 'no-store')
  @ApiParam({
    name: 'userId',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'One user details',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nothing found',
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiOperation({
    summary: 'Get one user ',
    description: 'Get on user by id',
  })
  async getUser(@Param('userId') userId: string): Promise<UserDto> {
    return await this.userService.getOneUserById(userId);
  } */

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.registerUser(user);
  }

  @UseGuards(UserGuard)
  @Post('/me')
  @ApiResponse({
    status: 200,
    description: 'Verif if user is connected',
    type: UserDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Non authorized',
  })
  @ApiOperation({
    summary: 'Get one user',
    description: 'Verify who I am. For user only',
  })
  async getMe(@Body() user: Partial<UserDto>) {
    return await this.userService.getMe(user);
  }
}
