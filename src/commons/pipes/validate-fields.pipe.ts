import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export class ValidateFieldsPipe extends ValidationPipe {
  constructor() {
    const customExceptionFactory = (errors: ValidationError[]) => {
      const formattedMessageArray = errors.map((error) => {
        const messagesArray = Object.values(error.constraints);

        const messagesString = messagesArray.join(', ');

        return messagesString;
      });

      const formattedMessageString = formattedMessageArray.join(', ');

      return new BadRequestException(formattedMessageString);
    };

    super({
      exceptionFactory: customExceptionFactory,
    });
  }
}
