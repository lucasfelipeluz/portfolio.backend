import { Request, Response } from 'express';
import StatusResponse from '@src/utils/StatusResponse';
import { filtersGlobalWithPrioridade } from '@src/utils/filters';
import { Habilidades } from '@src/types/Models';
import { validationsHabilidades } from '@src/utils/validations';
import strings from '@src/utils/strings';
import HabilidadesModel from '@src/models/HabilidadesModel';

export default class HabilidadesControllers {
  public async getAllHabilidades(req: Request, res: Response): Promise<Response> {
    try {
      const habiliadades = await HabilidadesModel.findAll(filtersGlobalWithPrioridade(req));

      return StatusResponse.success<HabilidadesModel>(res, habiliadades, {});
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

      const projeto = await HabilidadesModel.create({
        titulo,
        descricao,
        prioridade: prioridade || 50,
        experiencia,
        cores,
        icones,
      });

      return StatusResponse.created<HabilidadesModel>(res, projeto, {});
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
