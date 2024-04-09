import bcrypt

def hashedPassword(password):
    try:
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        hashed_string = hashed.decode('utf-8')
        return hashed_string
    except Exception as e:
        print("Error:", e)
        return None

def CheckPassword(password, hashed):
    try:
        if bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8')):
            # print(hashed)
            return True
    except Exception as e:
        print("Error:", e)
        return False


