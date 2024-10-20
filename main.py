from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# @app.route('/', methods = ['POST'])
# def index():
#     return render_template('index.html') 

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.get_json()  # Get JSON data from the request
    user_message = data.get("message")

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     user_message = request.args.get('message')
#     # data = request.get_json()
#     # user_message = data.get("message")
    
    responses = [
        "Hello! How can I assist you today?",
        "I'm here to help. What would you like to know?",
        "Feel free to ask me anything.",
        "You are doing great in your life. Stay focused and make small increments."
    ]
    
    # You can replace this with more sophisticated logic
    system_response = {
        "user_message":user_message,
        "Response": random.choice(responses)  # Example of sending a static response
    }
    
    return jsonify(system_response)

if __name__ == '__main__':
    app.run(debug=True)
