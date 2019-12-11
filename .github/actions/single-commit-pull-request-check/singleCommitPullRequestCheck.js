const { debug, error } = require("@actions/core");
const {
    context,
    GitHub,
} = require("@actions/github");

class SingleCommitPullRequestCheck {

    constructor(repoToken) {
        this.client = new GitHub(repoToken);
    }

    async process() {
        const commits = await this.client.pulls.listCommits({
            ...context.repo,
            pull_number: context.issue.number,
        });

        if (commits.data.length > 1) {
            throw Error(`This pull request contains more than one commit. Once this pull request is approved, squash these commits so this pull request can be merged.`);
        }
    }
}

module.exports = SingleCommitPullRequestCheck;
