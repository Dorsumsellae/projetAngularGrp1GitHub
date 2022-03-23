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
import {Evennement} from '../models';
import {EvennementRepository} from '../repositories';

export class EvennementController {
  constructor(
    @repository(EvennementRepository)
    public evennementRepository: EvennementRepository,
  ) {}

  @post('/evennements')
  @response(200, {
    description: 'Evennement model instance',
    content: {'application/json': {schema: getModelSchemaRef(Evennement)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evennement, {
            title: 'NewEvennement',
            exclude: ['id_evenement'],
          }),
        },
      },
    })
    evennement: Omit<Evennement, 'id_evenement'>,
  ): Promise<Evennement> {
    return this.evennementRepository.create(evennement);
  }

  @get('/evennements/count')
  @response(200, {
    description: 'Evennement model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Evennement) where?: Where<Evennement>,
  ): Promise<Count> {
    return this.evennementRepository.count(where);
  }

  @get('/evennements')
  @response(200, {
    description: 'Array of Evennement model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Evennement, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Evennement) filter?: Filter<Evennement>,
  ): Promise<Evennement[]> {
    return this.evennementRepository.find(filter);
  }

  @patch('/evennements')
  @response(200, {
    description: 'Evennement PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evennement, {partial: true}),
        },
      },
    })
    evennement: Evennement,
    @param.where(Evennement) where?: Where<Evennement>,
  ): Promise<Count> {
    return this.evennementRepository.updateAll(evennement, where);
  }

  @get('/evennements/{id}')
  @response(200, {
    description: 'Evennement model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Evennement, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Evennement, {exclude: 'where'})
    filter?: FilterExcludingWhere<Evennement>,
  ): Promise<Evennement> {
    return this.evennementRepository.findById(id, filter);
  }

  @patch('/evennements/{id}')
  @response(204, {
    description: 'Evennement PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evennement, {partial: true}),
        },
      },
    })
    evennement: Evennement,
  ): Promise<void> {
    await this.evennementRepository.updateById(id, evennement);
  }

  @put('/evennements/{id}')
  @response(204, {
    description: 'Evennement PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evennement: Evennement,
  ): Promise<void> {
    await this.evennementRepository.replaceById(id, evennement);
  }

  @del('/evennements/{id}')
  @response(204, {
    description: 'Evennement DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evennementRepository.deleteById(id);
  }
}
