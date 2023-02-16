import { Octokit } from 'octokit';

const sortString = (field) => {
  return (obj1, obj2) => {
    const { [field]: str1 = '' } = obj1;
    const { [field]: str2 = '' } = obj2;
    return str1.toLowerCase().localeCompare(str2.toLowerCase());
  };
};

export const userListOwners = async ({ token }) => {
  const octokit = new Octokit({ auth: token });
  return octokit.paginate('GET /user/orgs', (response) =>
    response.data
      .map(({ avatar_url: avatarUrl, id, login, url }) => ({
        avatarUrl,
        login,
        url,
        id,
        type: 'org',
      }))
      .sort(sortString('login'))
  );
};

export const ownerListRepos = async ({ token, login, type }) => {
  const octokit = new Octokit({ auth: token });
  if (type === 'user') {
    return await octokit.paginate(
      'GET /users/{username}/repos',
      { username: login },
      (response) =>
        response.data
          .map(
            ({
              id,
              url,
              name,
              updated_at: updatedAt,
              private: isPrivate,
              permissions,
              owner: { login: owner },
            }) => ({
              id,
              url,
              name,
              updatedAt,
              isPrivate,
              permissions,
              owner,
            })
          )
          .sort(sortString('name'))
    );
  }
  return await octokit.paginate(
    'GET /orgs/{org}/repos',
    { org: login },
    (response) =>
      response.data
        .map(
          ({
            id,
            url,
            name,
            updated_at: updatedAt,
            private: isPrivate,
            permissions,
            owner: { login: owner },
          }) => ({
            id,
            url,
            name,
            updatedAt,
            isPrivate,
            permissions,
            owner,
          })
        )
        .sort(sortString('name'))
  );
};

export const repoListBranchs = async ({ token, login, repo, repoId }) => {
  const octokit = new Octokit({ auth: token });
  return await octokit.paginate(
    'GET /repos/{owner}/{repo}/branches',
    { owner: login, repo },
    (response) =>
      response.data
        .map(({ name }) => ({
          name,
          repoId,
        }))
        .sort(sortString('name'))
  );
};
