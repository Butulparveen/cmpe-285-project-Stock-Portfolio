import json
from flask import Flask, request, Response, render_template
import StockManager
from flask_cors import CORS, cross_origin
import re
import UserManager

application = Flask(__name__)
CORS(application)
application.config['CORS_HEADERS'] = 'Content-Type'

# This backend service serves following purpose
# Serve front-end
# Sign up and Login functionality
# Allocate money in stocks


@application.route('/allocate', methods=['POST'])
@cross_origin(origin='*')
def allocate_stocks():

    amount = request.json['amount']
    if amount < 5000:
        return json.dumps({"error": "Amount should be more than $5000"}), 500

    strategies = request.json['strategies']
    if len(strategies) == 0:
        return json.dumps({"error": "Select at-least one strategy"}), 500
    if len(strategies) > 2:
        return json.dumps({"error": "Maximum two strategies can be selected together"}), 500

    allocations = StockManager.allocate_stocks(amount, strategies)

    return json.dumps(allocations), 200


@application.route('/signup', methods=['POST'])
@cross_origin(origin='*')
def signup():

    fn = request.json.get('fn')
    if not fn:
        return json.dumps({"error": "Please Enter your First Name"}), 500

    ln = request.json.get('ln')
    if not ln:
        return json.dumps({"error": "Please Enter your Last Name"}), 500

    email = request.json.get('email')
    if email is None:
        return json.dumps({"error": "Email is not valid"}), 500

    EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

    if not EMAIL_REGEX.match(email):
        return json.dumps({"error": "Email is not valid"}), 500

    password = request.json.get('password')
    if password is None:
        return json.dumps({"error": "Password is not valid"}), 500

    token = UserManager.signup(email, password, fn, ln)

    if token is None:
        return json.dumps({"error": "Please try another email"}), 500

    resp = Response(json.dumps({'code': 200}))

    resp.set_cookie('auth-token', token)

    return resp


@application.route('/login', methods=['POST'])
@cross_origin(origin='*')
def login():

    email = request.json['email']
    if email is None:
        return json.dumps({"error": "Email is not valid"}), 500

    password = request.json['password']
    if password is None:
        return json.dumps({"error": "Password is not valid"}), 500

    token = UserManager.login(email, password)

    if token is None:
        return json.dumps({"error": "Invalid Credentials"}), 500

    resp = Response(json.dumps({'code': 200}))

    resp.set_cookie('auth-token', token)

    return resp


@application.route('/checksession', methods=['GET'])
@cross_origin(origin='*')
def check_session():

    token = request.cookies.get('auth-token')

    if token is None:
        return json.dumps({"error": "Invalid Login"}), 500

    user = UserManager.check_login(token)

    if user is None:
        return json.dumps({"error": "Invalid Login"}), 500

    name = user.get('fn') + " " + user.get('ln')
    resp = Response(json.dumps({'code': 200, 'name': name}))

    return resp


@application.route('/logout', methods=['GET'])
@cross_origin(origin='*')
def logout():

    token = request.cookies.get('auth-token')

    if token is None:
        return json.dumps({"code": 200}), 200

    UserManager.logout(token)

    resp = Response(json.dumps({'code': 200}))

    return resp


@application.route("/")
def serve_template():
    return render_template('index.html')


@application.route("/dashboard")
def serve_template_dashboard():
    return render_template('index.html')


if __name__ == "__main__":
    application.run(debug=True)
    application.run(host='0.0.0.0', port=80)
