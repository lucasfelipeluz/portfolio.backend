import { Request, Response } from 'express';
import StatusResponse from '@src/utils/StatusResponse';
import strings from '@src/utils/strings';
import SobreMimModel from '@src/models/SobreMimModel';

export default class SobreMimControllers {
  public async getSobreMim(req: Request, res: Response): Promise<Response> {
    try {
      const sobremim = await SobreMimModel.findOne({ where: { id: 1 } });

      return StatusResponse.success<SobreMimModel | null>(res, sobremim, {});
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }

  public async editSobreMim(req: Request, res: Response): Promise<Response> {
    try {
      await SobreMimModel.update(
        {
          nome: req.body.nome,
          texto: req.body.texto,
          titulo_emprego: req.body.titulo_emprego,
          link_github: req.body.link_github,
          link_instagram: req.body.link_instagram,
          link_linkedin: req.body.link_linkedin,
          link_telegram: req.body.link_telegram,
        },
        {
          where: { id: 1 },
        },
      );

      return StatusResponse.successWithoutData(res, { msg: strings.sobremimEditado });
    } catch (error) {
      console.log(error);
      return StatusResponse.badRequest(res, { msgError: error });
    }
  }
}
