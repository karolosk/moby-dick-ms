from flask import Flask, request
 
app = Flask(__name__)
 
 
@app.route('/')
def hello_whale():
    return ("Hello from docker. I am running at host: {port}".format(port =  request.host))
 
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')