export const validateRoles = (roles0: string[], roles1: string[]) => {
  const intersection = roles1.filter((role) => roles0.includes(role));
  return intersection.length > 0;
};
