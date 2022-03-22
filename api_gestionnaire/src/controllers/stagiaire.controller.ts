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
import {Stagiaire} from '../models';
import {StagiaireRepository} from '../repositories';

export class StagiaireController {
  constructor(
    @repository(StagiaireRepository)
    public stagiaireRepository: StagiaireRepository,
  ) {}

  @post('/stagiaires')
  @response(200, {
    description: 'Stagiaire model instance',
    content: {'application/json': {schema: getModelSchemaRef(Stagiaire)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stagiaire, {
            title: 'NewStagiaire',
            exclude: ['id_stagiaire'],
          }),
        },
      },
    })
    stagiaire: Omit<Stagiaire, 'id_stagiaire'>,
  ): Promise<Stagiaire> {
    return this.stagiaireRepository.create(stagiaire);
  }

  @get('/stagiaires/count')
  @response(200, {
    description: 'Stagiaire model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Stagiaire) where?: Where<Stagiaire>,
  ): Promise<Count> {
    return this.stagiaireRepository.count(where);
  }

  @get('/stagiaires')
  @response(200, {
    description: 'Array of Stagiaire model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Stagiaire, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Stagiaire) filter?: Filter<Stagiaire>,
  ): Promise<Stagiaire[]> {
    return this.stagiaireRepository.find(filter);
  }

  @patch('/stagiaires')
  @response(200, {
    description: 'Stagiaire PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stagiaire, {partial: true}),
        },
      },
    })
    stagiaire: Stagiaire,
    @param.where(Stagiaire) where?: Where<Stagiaire>,
  ): Promise<Count> {
    return this.stagiaireRepository.updateAll(stagiaire, where);
  }

  @get('/stagiaires/{id}')
  @response(200, {
    description: 'Stagiaire model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Stagiaire, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Stagiaire, {exclude: 'where'})
    filter?: FilterExcludingWhere<Stagiaire>,
  ): Promise<Stagiaire> {
    return this.stagiaireRepository.findById(id, filter);
  }

  @patch('/stagiaires/{id}')
  @response(204, {
    description: 'Stagiaire PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stagiaire, {partial: true}),
        },
      },
    })
    stagiaire: Stagiaire,
  ): Promise<void> {
    await this.stagiaireRepository.updateById(id, stagiaire);
  }

  @put('/stagiaires/{id}')
  @response(204, {
    description: 'Stagiaire PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() stagiaire: Stagiaire,
  ): Promise<void> {
    await this.stagiaireRepository.replaceById(id, stagiaire);
  }

  @del('/stagiaires/{id}')
  @response(204, {
    description: 'Stagiaire DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.stagiaireRepository.deleteById(id);
  }
}
