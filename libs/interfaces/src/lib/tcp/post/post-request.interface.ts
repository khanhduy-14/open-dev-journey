import { CreatePostRequestDto } from '@common/interfaces/gateway/post';
import { Request } from '../tcp.interface';

export type CreatePostRequestTcp = Request<CreatePostRequestDto>;
