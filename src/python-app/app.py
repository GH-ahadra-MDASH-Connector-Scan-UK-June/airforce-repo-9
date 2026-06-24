import os
import subprocess
import sqlite3
from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route("/search")
def search():
    query = request.args.get("q", "")
    # SQL Injection
    conn = sqlite3.connect("database.db")
    cursor = conn.execute(f"SELECT * FROM items WHERE name LIKE '%{query}%'")
    results = cursor.fetchall()
    
    # XSS via template injection
    template = f"<h1>Results for: {query}</h1>"
    return render_template_string(template)

@app.route("/run")
def run_command():
    cmd = request.args.get("cmd", "ls")
    # Command injection
    output = subprocess.check_output(cmd, shell=True)
    return output.decode()

@app.route("/read")
def read_file():
    filename = request.args.get("file", "")
    # Path traversal
    with open(os.path.join("/data", filename)) as f:
        return f.read()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
