import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import {
  EntityPage,
  CreateEntityPageArgs,
  FindManyEntityPageArgs,
  EntityPageSettings
} from './dto/';

import { BlockService } from '../block/block.service';
import { EnumBlockType } from 'src/enums/EnumBlockType';
import { FindOneWithVersionArgs } from 'src/dto';

@Injectable()
export class EntityPageService {
  constructor(
    private readonly prisma: PrismaService,
    private blockService: BlockService
  ) {}

  async create(args: CreateEntityPageArgs): Promise<EntityPage> {
    return this.blockService.create({
      data: {
        ...args.data,
        blockType: EnumBlockType.EntityPage
      }
    });
  }

  async findOne(args: FindOneWithVersionArgs): Promise<EntityPage | null> {
    return this.blockService.findOne<EntityPageSettings>(args);
  }

  async findMany(args: FindManyEntityPageArgs): Promise<EntityPage[]> {
    return this.blockService.findManyByBlockType(
      args,
      EnumBlockType.EntityPage
    );
  }
}