import unittest

from services import container_service 


class TestContainerService(unittest.TestCase):

    def test_set_cpu_percent(self):
    
        cpu_per = container_service.set_cpu_percent("some_name", "exited")
        self.assertEqual("n/a", cpu_per)
    

    def test_start_one_and_stop_all_containers(self):

        container_service.run_container()
        containers = container_service.retrieve_containers()
        
        for container in containers:
            container_service.stop_container(container['short_id'])
                
        status = []
        for container in container_service.retrieve_containers():
            status.append(container['status'])
        
        
        self.assertNotIn("running", status)

    