import { Response } from 'express';

export interface StatusResponseTypes {
  /** Estas requisição foi bem sucedida. O significado do sucesso varia de acordo com o método HTTP: */
  success<T>(res: Response, data: T[] | T, info: Info): any;
  /** Estas requisição foi bem sucedida. */
  successWithoutData(res: Response, info: Info): any;
  /** A requisição foi bem sucedida e um novo recurso foi criado como resultado. Esta é uma tipica resposta enviada após uma requisição POST. */
  created<T>(res: Response, data: T[] | T, info: Info): any;
  /** Não há conteúdo para enviar para esta solicitação, mas os cabeçalhos podem ser úteis. */
  noContent(res: Response): any;
  /** Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida. */
  badRequest(res: Response, info: Info): any;
  /** Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta solicitada. */
  unauthenticated(res: Response, info: Info): any;
  /** O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta. Diferente do código 401, aqui a identidade do cliente é conhecida. */
  forbidden(res: Response, info: Info): any;
  /** O servidor não pode encontrar o recurso solicitado. */
  notFound(res: Response, info: Info): any;
  /** O método de solicitação é conhecido pelo servidor, mas foi desativado e não pode ser usado. */
  methodNotAllowed(res: Response, info: Info): any;
  /** Essa resposta é enviada quando o servidor da Web após realizar a negociação de conteúdo orientada pelo servidor, não encontra nenhum conteúdo seguindo os critérios fornecidos pelo agente do usuário. */
  notAcceptable(res: Response, info: Info): any;
  /** O servidor encontrou uma situação com a qual não sabe lidar. */
  internalServerError(res: Response, info: Info): any;
  /** O método da requisição não é suportado pelo servidor e não pode ser manipulado. */
  notImplemented(res: Response, info: Info): any;
  /** O servidor não está pronto para manipular a requisição. Causas comuns são um servidor em manutenção ou sobrecarregado. */
  serviceUnavailable(res: Response, info: Info): any;
}

export interface Info {
  msg?: string | any | unknown;
  msgError?: any;
}
