export function createContext({ req, res }: any) {
  return {
    req,
    res,
    user: null,
  };
}
