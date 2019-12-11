const { getInput, setFailed } = require("@actions/core");

const SingleCommitPullRequestCheck = require("./singleCommitPullRequestCheck.js")

async function run() {
    try {
        const repoToken = getInput("repo-token", { required: true })
        const check = new SingleCommitPullRequestCheck(repoToken)
        await check.process();
    } catch (error) {
        setFailed(error.message);
    }
}

run();
