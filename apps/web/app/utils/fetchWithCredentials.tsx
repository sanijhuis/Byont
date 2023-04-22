const fetchWithCredentials = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const defaultOptions: RequestInit = {
    credentials: "include",
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
  };

  return await fetch(url, mergedOptions);
};

export default fetchWithCredentials;
