import unittest

from services import image_service

class TestImageService(unittest.TestCase):

    def test_identify_status(self):

        img = {
            "created": "ok"
        }
        status_code = image_service.identify_status_code(img)
        self.assertEqual(status_code, 200)

        img_err = {
             "error": "some_error"
        }
        status_code_error = image_service.identify_status_code(img_err)
        self.assertEqual(status_code_error, 500)


    def test_retrieve_image_to_delete(self):
        tags = "fk:latest"
        tag_to_delete = image_service.retrieve_image_to_delete(tags)
        self.assertEqual(tag_to_delete, "fk")


    def test_retrieve_tags(self):

        tags_multi = image_service.retrieve_tags(["fk:latest", "alpine:latest"])
        tags_single = image_service.retrieve_tags(["alpine:latest"])

        self.assertEqual(tags_multi, "fk:latest")
        self.assertEqual(tags_single, ["alpine:latest"])
   
   
    def test_clean_id(self):

        id_ = image_service.clean_id("sha:123456")
        self.assertEqual(id_, "123456")


    def test_extract_date(self):

        attributes = {
            "Created": "2019-03-09T16:44:05.1234567"
        }

        date = image_service.extract_date(attributes)
        self.assertEqual(date, "2019-03-09T16:44:05")


    def test_image_creation_negative(self):

        all_images = image_service.retrieve_images()
        self.assertTrue(type(all_images) is list)

        image_len = len(all_images)

        request = {
            "uri": "web/",
            "tag": "fk"
        }            
        self.assertRaises(TypeError, image_service.create_image, request )

        all_images = image_service.retrieve_images()

        self.assertEqual(len(all_images) , image_len)
