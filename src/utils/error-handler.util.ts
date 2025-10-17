import { HttpException } from '@nestjs/common';

export const ErrorHandler = (params: {
  code?: number;
  error?: Error;
  message?: string;
}) => {
  const code = params.error?.stack ?? params.code;
  const message = params.error?.message ?? params.message;

  if (params.error instanceof HttpException) {
    throw params.error;
  }

  switch (code) {
    case 400:
      throw new ClientException(message);
    case 401:
      throw new AuthenticationException(message);
    case 403:
      throw new NotAllowedException(message);
    case 404:
      throw new NotFoundException(message);
    case 409:
      throw new ClientInputException(message);
    case 413:
      throw new ClientInputException(message);
    default:
      throw new ServerException(message);
  }
};

//400
export class ClientException extends HttpException {
  constructor(message: string | undefined) {
    super(message || 'CLIENT SIDE ERROR', 400);
  }
}

//401
export class AuthenticationException extends HttpException {
  constructor(message: string | undefined) {
    super(message || 'NOT AUTHENTICATION', 401);
  }
}

//403
export class NotAllowedException extends HttpException {
  constructor(message: string | undefined) {
    super(message || 'NOT AUTHORIZATION', 403);
  }
}

//404
export class NotFoundException extends HttpException {
  constructor(message: string | undefined) {
    super(message || 'NOT FOUND', 404);
  }
}

//409
export class ClientInputException extends HttpException {
  constructor(message: string | undefined) {
    super(message || 'CONFLICT', 409);
  }
}

//500
export class ServerException extends HttpException {
  constructor(message: string | undefined) {
    super(message || 'SERVER SIDE ERROR', 500);
  }
}
