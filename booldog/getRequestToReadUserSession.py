class getRequestToReadSession:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        print("HO PRESO LA REQUEST PRIMA DELLA VIEW !")
        response = self.get_response(request)
        try:
            print(str(request.headers['cookie']))
        except Exception:
            pass
        print("IN MIDDLEWARE USER AUTHENTICAED ==="+str(request.user))
        # Code to be executed for each request/response after
        # the view is called.

        return response
