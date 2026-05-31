export const REPOSITORY_STATS_QUERY = `
query RepositoryStats($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    defaultBranchRef {
      target {
        ... on Commit {
          history {
            totalCount
          }
        }
      }
    }

    branches: refs(
      refPrefix: "refs/heads/"
      first: 1
    ) {
      totalCount
    }

    tags: refs(
      refPrefix: "refs/tags/"
      first: 1
    ) {
      totalCount
    }
  }
}
`;
