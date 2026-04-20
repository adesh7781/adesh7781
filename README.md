# Secure Message Encryption Using Cryptography (Mini Project)

This mini project demonstrates secure message encryption/decryption using:
- **Python (Flask)** for backend APIs
- **HTML, CSS, JavaScript** for frontend
- **Cryptography library (Fernet + PBKDF2)** for secure encrypted messaging

## Features
- Encrypt plaintext using a user-provided secret key
- Decrypt ciphertext with the same secret key
- Salted key derivation using `PBKDF2-HMAC-SHA256`
- Friendly web UI for quick demo/testing

## Project Structure

```text
.
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── app.js
```

## Run Locally (VS Code)

1. Open folder in **VS Code**.
2. Create virtual env and install dependencies:
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
   pip install -r requirements.txt
   ```
3. Run app:
   ```bash
   python app.py
   ```
4. Open browser at: `http://127.0.0.1:5000`

## Security Note
This is an educational mini project. For production:
- Store secrets securely
- Use HTTPS
- Add authentication/rate-limits/auditing
- Follow secure key management practices
