import { api, githubGraphql } from "@/lib/api";
import { mapGithubRepositories } from "@/mappers/repository.mapper";
import { mapGithubSearchUsers } from "@/mappers/user.mapper";
import { GithubRepositorySearchResponse } from "@/models/github";
import { RepositorySearchResponse } from "@/models/repository";

const SEARCH_USERS_QUERY = `
  query SearchUsers(
    $query: String!
    $first: Int!
    $after: String
  ) {
    search(
      query: $query
      type: USER
      first: $first
      after: $after
    ) {
      userCount

      pageInfo {
        hasNextPage
        endCursor
      }

      nodes {
        ... on User {
          login
          name
          bio
          avatarUrl

          followers {
            totalCount
          }
        }
      }
    }
  }
`;

export async function searchUsers({
  query,
  first = 20,
  after,
}: {
  query: string;
  first?: number;
  after?: string | null;
}) {
  const { data } = await githubGraphql.post("", {
    query: SEARCH_USERS_QUERY,
    variables: {
      query,
      first,
      after,
    },
  });

  const search = data.data.search;

  return {
    items: mapGithubSearchUsers(search.nodes),
    nextCursor: search.pageInfo.endCursor,
    hasNextPage: search.pageInfo.hasNextPage,
    total: search.userCount,
  };
}

export async function searchRepositories({
  q,
  page = 1,
}: {
  q: string;
  page: number;
}): Promise<RepositorySearchResponse> {
  const { data } = await api.get<GithubRepositorySearchResponse>(
    "/search/repositories",
    {
      params: {
        q,
        sort: "stars",
        order: "desc",
        page,
        per_page: 20,
      },
    },
  );

  return { total: data.total_count, items: mapGithubRepositories(data.items) };
}
