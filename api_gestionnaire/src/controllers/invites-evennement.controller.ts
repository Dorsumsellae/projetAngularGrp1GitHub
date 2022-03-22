import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InvitesEvennement} from '../models';
import {InvitesEvennementRepository} from '../repositories';

export class InvitesEvennementController {
  constructor(
    @repository(InvitesEvennementRepository)
    public invitesEvennementRepository : InvitesEvennementRepository,
  ) {}

  @post('/invites-evennements')
  @response(200, {
    description: 'InvitesEvennement model instance',
    content: {'application/json': {schema: getModelSchemaRef(InvitesEvennement)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitesEvennement, {
            title: 'NewInvitesEvennement',
            
          }),
        },
      },
    })
    invitesEvennement: InvitesEvennement,
  ): Promise<InvitesEvennement> {
    return this.invitesEvennementRepository.create(invitesEvennement);
  }

  @get('/invites-evennements/count')
  @response(200, {
    description: 'InvitesEvennement model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InvitesEvennement) where?: Where<InvitesEvennement>,
  ): Promise<Count> {
    return this.invitesEvennementRepository.count(where);
  }

  @get('/invites-evennements')
  @response(200, {
    description: 'Array of InvitesEvennement model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InvitesEvennement, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InvitesEvennement) filter?: Filter<InvitesEvennement>,
  ): Promise<InvitesEvennement[]> {
    return this.invitesEvennementRepository.find(filter);
  }

  @patch('/invites-evennements')
  @response(200, {
    description: 'InvitesEvennement PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitesEvennement, {partial: true}),
        },
      },
    })
    invitesEvennement: InvitesEvennement,
    @param.where(InvitesEvennement) where?: Where<InvitesEvennement>,
  ): Promise<Count> {
    return this.invitesEvennementRepository.updateAll(invitesEvennement, where);
  }

  @get('/invites-evennements/{id}')
  @response(200, {
    description: 'InvitesEvennement model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InvitesEvennement, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InvitesEvennement, {exclude: 'where'}) filter?: FilterExcludingWhere<InvitesEvennement>
  ): Promise<InvitesEvennement> {
    return this.invitesEvennementRepository.findById(id, filter);
  }

  @patch('/invites-evennements/{id}')
  @response(204, {
    description: 'InvitesEvennement PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitesEvennement, {partial: true}),
        },
      },
    })
    invitesEvennement: InvitesEvennement,
  ): Promise<void> {
    await this.invitesEvennementRepository.updateById(id, invitesEvennement);
  }

  @put('/invites-evennements/{id}')
  @response(204, {
    description: 'InvitesEvennement PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() invitesEvennement: InvitesEvennement,
  ): Promise<void> {
    await this.invitesEvennementRepository.replaceById(id, invitesEvennement);
  }

  @del('/invites-evennements/{id}')
  @response(204, {
    description: 'InvitesEvennement DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.invitesEvennementRepository.deleteById(id);
  }
}
