import strings from '@/domain/utils/strings';
import { Response } from 'express';

/**
 * `200`- A solicitação foi bem-sucedida. O significado do resultado de "sucesso"
 * depende do método HTTP:
 * - GET: o recurso foi buscado e transmitido no corpo da mensagem.
 * - HEAD: os cabeçalhos de representação são incluídos na resposta sem qualquer corpo de mensagem.
 * - PUT ou POST: O recurso que descreve o resultado da ação é transmitido no corpo da mensagem.
 * - TRACE: o corpo da mensagem contém a mensagem de solicitação recebida pelo servidor.
 */
function ok<T>(res: Response, data: T, message?: string) {
  if (data && !message) return res.status(200).send(data);

  return res.status(200).send({ message, data });
}

/**
 * `201`- A solicitação foi bem-sucedida e, como resultado, um novo recurso foi criado.
 * Normalmente, esta é a resposta enviada após POST ou PUT.
 */
function created<T>(res: Response, data: T, message?: string) {
  return res.status(201).send({ message, data });
}

/**
 * `202`- A solicitação foi recebida, mas ainda não foi atendida. É sem compromisso,
 * pois não há como no HTTP enviar posteriormente uma resposta assíncrona
 * indicando o resultado da solicitação. Destina-se a casos em que outro
 * processo ou servidor manipula a solicitação ou processamento em lote.
 */
function accepted<T>(res: Response, data: T) {
  return res.status(202).send({ data });
}

/**
 * `203` - Esse código de resposta significa que os metadados retornados
 * não são exatamente os mesmos que estão disponíveis no servidor de origem,
 * mas são coletados de uma cópia local ou de terceiros. Isso é usado principalmente
 * para espelhos ou backups de outro recurso. Exceto para esse caso específico,
 * a resposta 200 OK é preferida a este status.
 */
function nonAuthoritativeInformation<T>(res: Response, data: T) {
  return res.status(203).send({ data });
}

/**
 * `204` - Não há conteúdo para enviar para esta solicitação, mas os cabeçalhos podem ser úteis.
 *  O agente do usuário pode atualizar seus cabeçalhos em cache para este recurso com os novos.
 */
function noContent(res: Response) {
  return res.status(204).send();
}

/**
 * `206`- Este código de resposta é usado quando o cabeçalho Range é enviado do
 *  cliente para solicitar apenas parte de um recurso.
 */
function partialContent<T>(res: Response, data: T) {
  return res.status(206).send({ data });
}

/**
 * `301` - A URL do recurso solicitado foi alterada permanentemente.
 *  A nova URL é fornecida na resposta.
 */
function movedPermanently(res: Response, newUrl: string, message?: string) {
  return res.status(301).send({ newUrl, message });
}

/**
 * `400` - Esta resposta significa que o servidor não entendeu a solicitação.
 */
function badRequest(res: Response, message: string) {
  return res.status(400).send({ message });
}

/**
 * `401` - Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta
 * significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta
 * solicitada.
 */
function unauthorized(res: Response, message: string) {
  return res.status(401).send({ message });
}

/**
 * `403` - O cliente não tem direitos de acesso ao conteúdo, ou seja, ele está proibido.
 */
function forbidden(res: Response, message: string) {
  return res.status(403).send({ message });
}

/**
 * `404` - O servidor não pode encontrar o recurso solicitado.
 */
function notFound(res: Response) {
  return res.status(404).send({ message: strings.urlNotFound });
}

/**
 * `405`- O método de solicitação é conhecido pelo servidor, mas foi desativado
 * e não pode ser usado.
 * Exemplo: Um cliente tenta usar um método POST em um recurso que aceita apenas solicitações GET.
 */
function methodNotAllowed(res: Response, message: string) {
  return res.status(405).send({ message });
}

/**
 * `500` - O servidor encontrou uma situação inesperada que o impediu de atender à solicitação.
 */
function internalServerError(res: Response, message: string, error?: any) {
  console.log(error);
  return res.status(error.code || 500).send({ message, error });
}

/**
 * Método para lidar com erros de servidor.
 */
function handleServerError(res: Response, message: string, error: any) {
  if (!error.code || error.code === 500) {
    return internalServerError(res, strings.internalServerError, error);
  }

  return res.status(error.code).send({ message: error.message || message, error });
}

export default {
  ok,
  created,
  accepted,
  nonAuthoritativeInformation,
  noContent,
  partialContent,
  movedPermanently,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  internalServerError,
  handleServerError,
};
