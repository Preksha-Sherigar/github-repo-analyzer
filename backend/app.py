from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# ✅ Home route (to avoid 404 on root URL)
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "GitHub Repository Analyzer API is running ✅"}), 200

# ✅ Analyze endpoint
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    repo_url = data.get("url")

    if not repo_url:
        return jsonify({"error": "Repository URL is required"}), 400

    try:
        # Extract owner/repo from URL
        parts = repo_url.strip("/").split("/")
        owner, repo = parts[-2], parts[-1]

        repo_api_url = f"https://api.github.com/repos/{owner}/{repo}"
        contrib_api_url = f"https://api.github.com/repos/{owner}/{repo}/contributors"

        repo_res = requests.get(repo_api_url).json()
        contrib_res = requests.get(contrib_api_url).json()

        result = {
            "name": repo_res.get("name"),
            "description": repo_res.get("description"),
            "stars": repo_res.get("stargazers_count"),
            "forks": repo_res.get("forks_count"),
            "open_issues": repo_res.get("open_issues_count"),
            "contributors": [
                {"login": c.get("login"), "contributions": c.get("contributions")}
                for c in contrib_res
            ]
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
