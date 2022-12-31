import { Request, Response } from 'express';
import StatusResponse from '@src/utils/StatusResponse';
import { filtersGlobalWithPrioridade } from '@src/utils/filters';
import { HomeResponse } from '@src/types/Models';
import HabilidadesModel from '@src/models/HabilidadesModel';
import ProjetosModel from '@src/models/ProjetosModel';
import SobreMimModel from '@src/models/SobreMimModel';

export default class HomeControllers {
  public async getHome(req: Request, res: Response): Promise<Response> {
    try {
      const projetos = await ProjetosModel.findAll(
        filtersGlobalWithPrioridade(req, { model: HabilidadesModel }),
      );

      const habilidades = await HabilidadesModel.findAll(
        filtersGlobalWithPrioridade(req, { model: ProjetosModel }),
      );

      const sobreMim = await SobreMimModel.findOne({ where: { id: 1 } });

      const responseHome: HomeResponse = {
        projetos,
        habilidades,
        sobreMim: sobreMim!,
      };

      return StatusResponse.success<HomeResponse>(res, responseHome, {});
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }
}
