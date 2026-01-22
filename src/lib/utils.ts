export const getUptime = (dob: Date) => {
  const now = new Date();
  const diff = new Date(now.getTime() - dob.getTime());
  return `${diff.getUTCFullYear() - 1970} years, ${diff.getUTCMonth()} months, ${diff.getUTCDate() - 3} days`;
};
