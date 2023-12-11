from django.test import TestCase

# TEST A CAPOCCHIA SU RESPONSE CHE DEVE DARMI "CODE 200"

class ViewsTestCase(TestCase):
    def test_index_loads_properly(self):
       response = self.client.get('https://127.0.0.1:8000/parametroerrato')
       self.assertEqual(response.status_code, 200)
