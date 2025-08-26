import streamlit as st
import requests
from datetime import datetime

# ------------------------------
# GitHub API Helper Functions
# ------------------------------

def get_repo_details(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    r = requests.get(url)
    if r.status_code == 200:
        return r.json()
    else:
        st.error(f"Error fetching repo details: {r.status_code}")
        return None

def get_repo_contributors(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}/contributors"
    r = requests.get(url)
    if r.status_code == 200:
        return r.json()
    else:
        st.error(f"Error fetching contributors: {r.status_code}")
        return []

# ------------------------------
# Streamlit UI
# ------------------------------

st.set_page_config(page_title="GitHub Repository Analyzer", layout="wide")
st.title("📊 GitHub Repository Analyzer")

# User input for repo
owner = st.text_input("Repository Owner", placeholder="e.g., tensorflow")
repo = st.text_input("Repository Name", placeholder="e.g., keras")

if st.button("Analyze Repository"):
    if owner and repo:
        repo_data = get_repo_details(owner, repo)
        contributors = get_repo_contributors(owner, repo)

        if repo_data:
            st.subheader("📄 Repository Details")
            st.markdown(f"**Name:** {repo_data.get('name', 'N/A')}")
            st.markdown(f"**Description:** {repo_data.get('description', 'No description')}")
            st.markdown(f"**Stars:** ⭐ {repo_data.get('stargazers_count', 0)}")
            st.markdown(f"**Forks:** 🍴 {repo_data.get('forks_count', 0)}")
            st.markdown(f"**Open Issues:** 🐞 {repo_data.get('open_issues_count', 0)}")
            st.markdown(f"**Created At:** {datetime.strptime(repo_data['created_at'], '%Y-%m-%dT%H:%M:%SZ').strftime('%d %b %Y')}")

        if contributors:
            st.subheader("👥 Top Contributors")
            for c in contributors:
                col1, col2 = st.columns([1, 4])
                with col1:
                    st.image(c.get("avatar_url"), width=50)
                with col2:
                    st.markdown(f"**[{c.get('login')}]({c.get('html_url')})** — {c.get('contributions')} contributions")
    else:
        st.warning("Please enter both repository owner and name.")
