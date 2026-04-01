import { CreateCommentRequestDto } from '@common/interfaces/gateway/comment';
import { Request } from '../tcp.interface';

export type CreateCommentRequestTcp = Request<CreateCommentRequestDto>;
