using System;
using System.Linq;
using FluentValidation.Results;
using Strive.Core.Dto;
using Strive.Core.Errors;
using Strive.Core.Services;

namespace Strive.Core.Extensions
{
    public static class ErrorExtensions
    {
        public static Error ToError(this ValidationResult validationResult)
        {
            if (validationResult.IsValid)
                throw new ArgumentException("The validation result must have failed.", nameof(validationResult));

            var error = validationResult.Errors.First();
            return new FieldValidationError(error.PropertyName, error.ErrorMessage);
        }

        public static Exception ToException(this Error error)
        {
            return new IdErrorException(error);
        }
    }
}
