
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
const getcurrentUserฺByContext = (context: ExecutionContext) => {
    if (context.getType() === 'http') {
    const httpRequest = context.switchToHttp().getRequest();
    return httpRequest.user;
};
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getcurrentUserฺByContext(context),
);
