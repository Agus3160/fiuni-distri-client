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

export const mapUrlSearchParamsToObject = (
  urlSearchParams: URLSearchParams
) => {
  return Object.fromEntries(urlSearchParams);
};

export const getVisiblePages = (
  pages: number[],
  currentPage: number,
  totalPages: number,
  visiblePages: number
) => {
  if (totalPages <= visiblePages) {
    return pages;
  }
  const start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const end = Math.min(totalPages, start + visiblePages - 1);
  return pages.slice(start - 1, end);
};

export const numberFormatter = new Intl.NumberFormat('es-ES', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})