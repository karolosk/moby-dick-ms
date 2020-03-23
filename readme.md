## Docker Manager

This is a small application to manage docker containers. 
It is implemented using the Docker SDK for Python.


### Structure

Folders in the project:

* **moby_dick_server** : The backend of the application (exposed as Rest API in order to be consumed from other clients/services) 
* **moby-dick-client** : Consumes the mentioned api and provides a web interface
* **web** : A very simple web application to dockerize
*  **graylog** : Provides a docker compose file (used for the logging of the application)

### Getting Started

Server is developed in Python 3.6 and client in Angular 7. In order to be able to run the application please proceed with the following steps after download/clone. There was some cross-checking for Python 2.x.x compatibility and apart from some Docker SDK issues (which does not seem to affect the runtime) app seems to be ok with this version as well. Although it is not guaranteed that everything is covered for Python 2.x.x

#### Steps to start server
```
cd to/your/project/path
cd moby_dick_server
pip install -r requirements.txt OR pip install --upgrade -r requirements.txt
python -m unittest discover -s tests (Optional)
python app.py
```
Note: If you have both Python 2.x.x and 3.x.x in your machine, most likely you should be able to call the interpreters as :

python command (for version 2)
python3 command (for version 3)

Same goes with pip.

pip command (for version 2)
pip3 command (for version 3)

#### Steps to start client 
```
cd to/your/project/path
cd moby-dick-client
npm install
npm start
```
#### Optional: Steps to start web app
```
cd to/your/project/path
cd web
pip install -r requirements.txt OR pip install --upgrade -r requirements.txt
python app.py
```

This is a very basic application which just returns a hello and the host/post that it lives.

#### Steps to start Graylog 
```
cd to/your/project/path
cd graylog
docker-compose up
```


This will start a Graylog instance in your local machine. We need this because the logging for the containers is happening with a gelf appender which send the logs to the Graylog instance. 

For further information about this installation of Graylog please refer to:
http://docs.graylog.org/en/3.0/pages/installation/docker.html


To be able to log in Graylog we need to setup an input. When the docker-compose up will be finalized visit http://127.0.0.1:9000 and use admin/admin as credentials. Then move to http://127.0.0.1:9000/system/inputs (Or System/Inputs from navigation bar and select Inputs) and select in Select input dropdown GELF UDP. Then click the launch a new input button and in the pop up that will appear select the existing node (Node, Select Node) and provide a title(Title). Click save and everything now is set up to receive the logs from the containers.


### Functionality

Server provides the below endpoints: 

#### Rerieve all images
> GET /api/images

Returns array of images
#### Image model 
```json
  {
    "date": "2019-03-09T16:44:05", 
    "id": "9338769658e740b95ac2b1500432316bc621fee1771e88b423d1730634b7d65d", 
    "tag": "fk:latest"
  }
```
#### Create a new image by providing image path and image tag
> POST /api/images/build?uri=path/to/docker/image&tag=image_tag

Success response
```json
{
  "created": "OK", 
  "new_image": "<Image: 'fk:latest', 'fka:latest', 'fss:latest'>"
}
```
#### Delete an image based on its tags
> DELETE /api/images/delete?tags=image_tags

Success response
```json
{
  "created": "OK"
}
```

*Please note that all the query params above are mandatory and server will return an error repsonse if those are not provided

#### Rerieve all containers
> GET /api/containers

Returns array of containers
#### Container model sample
```json
{
    "cpu_usage": "1.94%", 
    "host": "0.0.0.0:32797", 
    "memory_max_usage": "32.05 MB", 
    "memory_usage": "30.70 MB", 
    "name": "agitated_khorana", 
    "short_id": "ce6bf73c61", 
    "status": "running"
}
```
#### Create a new container and start it for a specific image. The image is static fo the time being and is tagged as 'fk'
> POST /api/containers/run

Success response
```json
{
  "created": "OK", 
  "info": {
    "host": {
      "host_ip": "0.0.0.0", 
      "host_port": "32798"
    }, 
    "state": {
      "running": true, 
      "status": "running"
    }
  }
}
```
#### Start a container by its id/short_id
> PUT /api/containers/<container_id>/start

Success response
```json
{
  "created": "OK"
}
```

#### Stop a container by its id/short_id
> PUT /api/containers/<container_id>/stop

Success response
```json
{
  "created": "OK"
}
```
#### Remove a container by its id/short_id
> DELETE /api/containers/<container_id>/remove

Success response
```json
{
  "created": "OK"
}
```
#### General error responses

The server may as well reply with error response (4xx or 500).
The general model for this response is below

Error response example from attempting to remove a container before stopping it
```json
{
  "details": "Error details from Docker API, Application or Server", 
  "error": "Server error"
}
```

#### Postman Collection

You can get a postman collection with the above endpoints here: 
https://www.getpostman.com/collections/5e1f62e9eacd0ab9ba34



### Using the application

As soon as you start the server and the client you will be able to use the application. If you started normally the client (npm start/ng serve) please visit localhost:4200. This is the initial screen of the application. From the menu you can choose to navigate to containers or images. 

#### Containers

Displays a table of all containers in the machine. Similar to docker ps -a command

| Status   | Name             |Short id     |  Cpu Percent | Memory usage | Max Memory usage| Host           |  | | |
| -------- | -------------    |-------------|------------- |-------------  |-------------    |------------- |------|------|-------|
| running  | vigorous_panini  |c3f47ed4d9   |1.5%          |289.75 MB      |362.38 MB        |0.0.0.0:32769 |Start| Stop |Remove |           
| exited   | tender_liskov    |0d4703dca7   |3.06%         |62.38 MB       |92.38 MB         |0.0.0.0:32768 |Start|Stop |Remove |


* Status: Current status of the container
* Name: Name of the container
* Short id: The ID of the object, truncated to 10 characters
* CPU Percent: Current cpu that is allocated to the container
* Memory usage: Current memory that is allocated to the container
* Max memory usage: Max memory that has been allocated to the container
* Host: At which host and port the container runs. (Works specifically for instances of web application. Rest will be n/a)
* Start: Button, Starts a container. Similar to thedocker start command
* Stop: Button, Stops a container. Similar to the docker stop command
* Remove: Button, Remove this container. Similar to the docker rm command

In addition there is an Add new container button. This will try to start a container with an image "fk" in a random port. This image can be created from the images tab. If the image does not exist it will throw an error. Please check below of how to create the specific image.


#### Images

Displays a list of images on the server. Similar to docker images command

| Id       | Tags     |Created     |   | 
| ------------- | -------- |-------- | -------- | -------|
| 9338769658e7| fk:latest | 2019-02-06T03:37:51 | Delete|
|245216517237|mongo:3	|2019-03-05T03:33:24 | Delete

* Id: The ID of the object.
* Tags: Image tag.
* Created: Date and time the image was created
* Delete: Button, Delete an image. Similar to the docker rmi command

New Image Form: There is a form after the table that allows the user to create a new image. Typically you want to use the application that is provided in the web folder for this.

Use the path of this folder (web) in 'Path to Docker file' input and fk in 'Tag' input. Then you can build the image by clicking the button.


#### Errors

Generally, errors will appear as a popup window and they will include, status code, error type and error message.