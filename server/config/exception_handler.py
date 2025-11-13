import logging
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Log the exception
    logger.error(f"Exception caught: {exc}", exc_info=True, extra={'request': context['request']})

    # Now add the HTTP status code to the response.
    if response is not None:
        return response
    
    # For unhandled exceptions, return a generic 500 error
    return Response(
        {'detail': 'An unexpected error occurred.'},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
