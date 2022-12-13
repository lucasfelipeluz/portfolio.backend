import { Request, Response } from 'express';
import StatusResponse from '@src/utils/StatusResponse';
import ProjetosModel from '@src/models/ProjetosModel';
import { filtersGlobalWithPrioridade } from '@src/utils/filters';
import { Projetos } from '@src/types/Models';
import { validationsProjeto } from '@src/utils/validations';
import strings from '@src/utils/strings';

export default class ProjetosControllers {
  public async getAllProjetos(req: Request, res: Response): Promise<Response> {
    try {
      const projetos = await ProjetosModel.findAll(filtersGlobalWithPrioridade(req));

      return StatusResponse.success<ProjetosModel>(res, projetos, {});
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }

  public async createProjeto(req: Request, res: Response): Promise<Response> {
    try {
      const {
        titulo,
        descricao,
        prioridade,
        url_github: urlGitHub,
        url_website: urlWebsite,
      }: Projetos = req.body;

      const { status, msgError } = validationsProjeto(req);
      if (!status) {
        return StatusResponse.badRequest(res, { msgError });
      }

      const projeto = await ProjetosModel.create({
        titulo,
        descricao,
        prioridade: prioridade || 50,
        url_github: urlGitHub,
        url_website: urlWebsite,
      });

      return StatusResponse.created<ProjetosModel>(res, projeto, {});
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }

  public async editProjeto(req: Request, res: Response): Promise<Response> {
    try {
      const responseEdit = await ProjetosModel.update(
        {
          titulo: req.body.titulo,
          descricao: req.body.descricao,
          prioridade: req.body.prioridade,
          url_github: req.body.url_github,
          url_website: req.body.url_website,
        },
        {
          where: { id: req.params.id },
        },
      );

      if (responseEdit[0] < 1) {
        return StatusResponse.badRequest(res, { msgError: strings.nenhumProjetoEncontrado });
      }

      return StatusResponse.successWithoutData(res, { msg: strings.projetoEditado });
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }

  public async deleteProjeto(req: Request, res: Response): Promise<Response> {
    try {
      const responseEdit = await ProjetosModel.destroy({
        where: { id: req.params.id },
      });

      if (responseEdit < 1) {
        return StatusResponse.badRequest(res, { msgError: strings.nenhumProjetoEncontrado });
      }

      return StatusResponse.successWithoutData(res, { msg: strings.projetoApagado });
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }
}
