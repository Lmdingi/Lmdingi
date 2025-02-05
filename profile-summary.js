const fs = require("fs");
const fetch = require("node-fetch");

async function fetchGitHubData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("GitHub API request failed");

        const data = await response.json();
        const profileStats = `
## 🚀 GitHub Stats for ${data.name || data.login}
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark)

- **Repositories:** ${data.public_repos}
- **Followers:** ${data.followers}
- **Following:** ${data.following}
- **GitHub Profile:** [${data.html_url}](${data.html_url})
        `;

        fs.writeFileSync("README.md", profileStats);
        console.log("✅ README.md updated!");
    } catch (error) {
        console.error("❌ Error fetching GitHub data:", error);
    }
}

// Replace 'your-username' with your actual GitHub username
fetchGitHubData("Lmdingi");
