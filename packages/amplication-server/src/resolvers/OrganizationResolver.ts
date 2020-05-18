import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Parent,
  ResolveField
} from '@nestjs/graphql';
import {
  FindManyOrganizationArgs,
  FindOneArgs,
  UpdateOneOrganizationArgs
} from '../dto/args';
import { Organization, App } from '../models';
import { OrganizationService, AppService } from '../core';
import { GqlResolverExceptionsFilter } from '../filters/GqlResolverExceptions.filter';
import { UseGuards, UseFilters } from '@nestjs/common';

@Resolver(_of => Organization)
@UseFilters(GqlResolverExceptionsFilter)
export class OrganizationResolver {
  constructor(
    private readonly OrganizationService: OrganizationService,
    private readonly appService: AppService
  ) {}

  @Query(_returns => Organization, {
    nullable: true,
    description: undefined
  })
  async Organization(
    @Context() ctx: any,
    @Args() args: FindOneArgs
  ): Promise<Organization | null> {
    return this.OrganizationService.Organization(args);
  }

  @ResolveField(() => [App])
  async apps(@Parent() organization: Organization) {
    return this.appService.apps({
      where: { organization: { id: organization.id } }
    });
  }

  @Query(_returns => [Organization], {
    nullable: false,
    description: undefined
  })
  async Organizations(
    @Context() ctx: any,
    @Args() args: FindManyOrganizationArgs
  ): Promise<Organization[]> {
    return this.OrganizationService.Organizations(args);
  }

  @Mutation(_returns => Organization, {
    nullable: true,
    description: undefined
  })
  async deleteOrganization(
    @Context() ctx: any,
    @Args() args: FindOneArgs
  ): Promise<Organization | null> {
    return this.OrganizationService.deleteOrganization(args);
  }

  @Mutation(_returns => Organization, {
    nullable: true,
    description: undefined
  })
  async updateOrganization(
    @Context() ctx: any,
    @Args() args: UpdateOneOrganizationArgs
  ): Promise<Organization | null> {
    return this.OrganizationService.updateOrganization(args);
  }
}