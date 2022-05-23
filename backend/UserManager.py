import uuid
users = []


def signup(email, password, fn, ln):

    token = str(uuid.uuid4())

    # check if user exists
    index = next((users.index(u) for u in users if u['email'] == email), None)

    if index is not None:
        return

    users.append({'email': email, 'password': password, 'token': token, 'fn': fn, 'ln': ln})
    return token


def login(email, password):

    token = str(uuid.uuid4())

    # check if user exists
    index = next((users.index(u) for u in users if u['email'] == email and u['password'] == password), None)

    if index is None:
        return

    users[index]['token'] = token

    return token


def logout(token):

    # check if user exists
    index = next((users.index(u) for u in users if u['token'] == token), None)

    if index is None:
        return

    users[index]['token'] = None

    return


def check_login(token):

    # check if user exists
    index = next((users.index(u) for u in users if u['token'] == token), None)

    if index is None:
        return

    return users[index]
