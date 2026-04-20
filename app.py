from __future__ import annotations

import base64
import hashlib
import os

from flask import Flask, jsonify, render_template, request
from cryptography.fernet import Fernet, InvalidToken

app = Flask(__name__)


def derive_key(password: str, salt: bytes) -> bytes:
    """Derive a Fernet-compatible key from a user password and salt."""
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 390000)
    return base64.urlsafe_b64encode(dk)


@app.get("/")
def index() -> str:
    return render_template("index.html")


@app.post("/encrypt")
def encrypt_message():
    payload = request.get_json(silent=True) or {}
    message = payload.get("message", "").strip()
    password = payload.get("password", "")

    if not message or not password:
        return jsonify({"error": "Message and secret key are required."}), 400

    salt = os.urandom(16)
    key = derive_key(password, salt)
    token = Fernet(key).encrypt(message.encode("utf-8"))

    combined = base64.urlsafe_b64encode(salt + token).decode("utf-8")
    return jsonify({"ciphertext": combined})


@app.post("/decrypt")
def decrypt_message():
    payload = request.get_json(silent=True) or {}
    ciphertext = payload.get("ciphertext", "").strip()
    password = payload.get("password", "")

    if not ciphertext or not password:
        return jsonify({"error": "Encrypted text and secret key are required."}), 400

    try:
        data = base64.urlsafe_b64decode(ciphertext.encode("utf-8"))
        salt, token = data[:16], data[16:]
        key = derive_key(password, salt)
        plaintext = Fernet(key).decrypt(token).decode("utf-8")
        return jsonify({"message": plaintext})
    except (ValueError, InvalidToken):
        return jsonify({"error": "Could not decrypt. Check your key and encrypted text."}), 400


if __name__ == "__main__":
    app.run(debug=True)
