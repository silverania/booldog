from django.test import TestCase


class ViewsTestCase(TestCase):
    def test_index_loads_properly(self):
       print("testttt")
       breakpoint()
       response = self.client.get('https://127.0.0.1:9000')
        self.assertEqual(response.status_code, 200)
