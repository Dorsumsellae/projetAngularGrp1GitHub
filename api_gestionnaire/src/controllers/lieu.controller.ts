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
import {Lieu} from '../models';
import {LieuRepository} from '../repositories';

export class LieuController {
  constructor(
    @repository(LieuRepository)
    public lieuRepository : LieuRepository,
  ) {}

  @post('/lieus')
  @response(200, {
    description: 'Lieu model instance',
    content: {'application/json': {schema: getModelSchemaRef(Lieu)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lieu, {
            title: 'NewLieu',
            exclude: ['id_lieu'],
          }),
        },
      },
    })
    lieu: Omit<Lieu, 'id_lieu'>,
  ): Promise<Lieu> {
    return this.lieuRepository.create(lieu);
  }

  @get('/lieus/count')
  @response(200, {
    description: 'Lieu model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Lieu) where?: Where<Lieu>,
  ): Promise<Count> {
    return this.lieuRepository.count(where);
  }

  @get('/lieus')
  @response(200, {
    description: 'Array of Lieu model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Lieu, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Lieu) filter?: Filter<Lieu>,
  ): Promise<Lieu[]> {
    return this.lieuRepository.find(filter);
  }

  @patch('/lieus')
  @response(200, {
    description: 'Lieu PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lieu, {partial: true}),
        },
      },
    })
    lieu: Lieu,
    @param.where(Lieu) where?: Where<Lieu>,
  ): Promise<Count> {
    return this.lieuRepository.updateAll(lieu, where);
  }

  @get('/lieus/{id}')
  @response(200, {
    description: 'Lieu model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Lieu, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Lieu, {exclude: 'where'}) filter?: FilterExcludingWhere<Lieu>
  ): Promise<Lieu> {
    return this.lieuRepository.findById(id, filter);
  }

  @patch('/lieus/{id}')
  @response(204, {
    description: 'Lieu PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lieu, {partial: true}),
        },
      },
    })
    lieu: Lieu,
  ): Promise<void> {
    await this.lieuRepository.updateById(id, lieu);
  }

  @put('/lieus/{id}')
  @response(204, {
    description: 'Lieu PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lieu: Lieu,
  ): Promise<void> {
    await this.lieuRepository.replaceById(id, lieu);
  }

  @del('/lieus/{id}')
  @response(204, {
    description: 'Lieu DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lieuRepository.deleteById(id);
  }
}
