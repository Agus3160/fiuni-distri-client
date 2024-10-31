
export const validateRoles = (roles0: string[], roles1: string[]) => {
  const intersection = roles1.filter((role) => roles0.includes(role));
  return intersection.length > 0;
};

export const mapObjectToQueryStringParams = (obj: unknown): string => {
  const queryParams = new URLSearchParams();

  if (obj) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value) queryParams.set(key, value as string);
    });
  }

  return queryParams.toString();
};

export const mapUrlSearchParamsToObject = (urlSearchParams: URLSearchParams ) => {
  return Object.fromEntries(urlSearchParams)
};
