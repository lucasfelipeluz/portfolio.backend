import { Request, Response } from 'express';
import StatusResponse from '@src/utils/StatusResponse';
import { filtersGlobalWithPrioridade } from '@src/utils/filters';
import { Habilidades } from '@src/types/Models';
import { validationsHabilidades } from '@src/utils/validations';
import strings from '@src/utils/strings';
import HabilidadesModel from '@src/models/HabilidadesModel';
import ProjetosModel from '@src/models/ProjetosModel';

export default class HabilidadesControllers {
  public async getAllHabilidades(req: Request, res: Response): Promise<Response> {
    try {
      const habilidades = await HabilidadesModel.findAll(
        filtersGlobalWithPrioridade(req, { model: ProjetosModel }),
      );

      return StatusResponse.success<HabilidadesModel>(res, habilidades, {});
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }

  public async createHabilidades(req: Request, res: Response): Promise<Response> {
    try {
      const { titulo, descricao, prioridade, experiencia, cores, icones }: Habilidades = req.body;

      const { status, msgError } = validationsHabilidades(req);
      if (!status) {
        return StatusResponse.badRequest(res, { msgError });
      }

      const habilidade = await HabilidadesModel.create({
        titulo,
        descricao,
        prioridade: prioridade || 50,
        experiencia,
        cores,
        icones,
      });

      return StatusResponse.created<HabilidadesModel>(res, habilidade, {});
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }

  public async editHabilidades(req: Request, res: Response): Promise<Response> {
    try {
      const responseEdit = await HabilidadesModel.update(
        {
          titulo: req.body.titulo,
          descricao: req.body.descricao,
          prioridade: req.body.prioridade,
          experiencia: req.body.experiencia,
          cores: req.body.cores,
          icones: req.body.icones,
        },
        {
          where: { id: req.params.id },
        },
      );

      if (responseEdit[0] < 1) {
        return StatusResponse.badRequest(res, { msgError: strings.nenhumaHabilidadeEncontrada });
      }

      return StatusResponse.successWithoutData(res, { msg: strings.habilidadeEditada });
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }

  public async deleteHabilidades(req: Request, res: Response): Promise<Response> {
    try {
      const responseEdit = await HabilidadesModel.destroy({
        where: { id: req.params.id },
      });

      if (responseEdit < 1) {
        return StatusResponse.badRequest(res, { msgError: strings.nenhumaHabilidadeEncontrada });
      }

      return StatusResponse.successWithoutData(res, { msg: strings.habilidadeApagada });
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }
}
