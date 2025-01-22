from flask import Flask, request, jsonify
import random
import string

app = Flask(__name__)

# Simulate a database of users
users_db = {
    "user@example.com": {"password": "oldpassword"},
    "admin@example.com": {"password": "adminpassword"},
}

# Function to generate a reset token
def generate_reset_token():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=64))

# Route to handle forgot password request
@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    # Get the email from the frontend request
    data = request.get_json()
    email = data.get('email')

    # Check if the email exists in the "database"
    if email in users_db:
        # Generate a password reset token (in real life, you would email this to the user)
        reset_token = generate_reset_token()
        
        # Simulate sending an email
        print(f"Password reset link sent to {email}: https://example.com/reset-password?token={reset_token}")
        
        return jsonify({"success": True, "message": "Password reset link sent to your email!"})
    else:
        return jsonify({"success": False, "message": "Email not found in our system."})

if __name__ == "__main__":
    app.run(debug=True)
