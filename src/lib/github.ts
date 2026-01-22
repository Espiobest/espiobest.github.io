export interface GitHubStats {
  followers: number;
  following: number;
  publicRepos: number;
  lastCommit: string;
  lastCommitRepo: string;
}

const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

export const getGitHubStats = async (
  username: string = 'Espiobest',
): Promise<GitHubStats | null> => {
  try {
    // Check cache first
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    }

    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) throw new Error('Failed to fetch user data');
    const userData = await userResponse.json();

    // Fetch recent events to get last commit
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
    );
    if (!eventsResponse.ok) throw new Error('Failed to fetch events');
    const events = await eventsResponse.json();

    // Find the most recent push event
    const pushEvent = events.find((event: any) => event.type === 'PushEvent');
    const lastCommitDate = pushEvent ? new Date(pushEvent.created_at) : new Date();
    const lastCommitRepoName = pushEvent?.repo?.name || '';

    // Calculate time ago
    const now = new Date();
    const diffMs = now.getTime() - lastCommitDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    let lastCommit: string;
    if (diffDays > 0) {
      lastCommit = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      lastCommit = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      lastCommit = `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
      lastCommit = 'just now';
    }

    const stats: GitHubStats = {
      followers: userData.followers,
      following: userData.following,
      publicRepos: userData.public_repos,
      lastCommit,
      lastCommitRepo: lastCommitRepoName,
    };

    // Cache the result
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: stats,
          timestamp: Date.now(),
        }),
      );
    }

    return stats;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
};
