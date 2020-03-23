import unittest

from utils import docker_utils 


class TestDockerUtils(unittest.TestCase):

    def test_humanize_bytes(self):

        result = docker_utils.humanize_bytes(1234567654321)
        self.assertTrue("TB" in result)

        result = docker_utils.humanize_bytes(12345678)
        self.assertTrue("MB" in result)

        result = docker_utils.humanize_bytes(123456)
        self.assertTrue("kB" in result)
