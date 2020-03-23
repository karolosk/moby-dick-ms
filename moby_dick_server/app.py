from flask import Flask
from flask_cors import CORS
from controllers import container_controller, image_controller

app = Flask(__name__)
CORS(app)


# CONTAINER ENDPOINTS
app.register_blueprint(container_controller.api)

# IMAGE ENDPOINTS
app.register_blueprint(image_controller.api)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
