import { CreateCommentRequestDto } from '@common/interfaces/gateway/comment';
import { Request } from '../tcp.interface';

export type CreateCommentTcpRequest = Request<CreateCommentRequestDto>;
