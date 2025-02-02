export const getContributors = async ({ owner, repo }) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch contributors");
    }
    return response.json();
  } catch (err) {
    console.error(err?.message);
  }
};
