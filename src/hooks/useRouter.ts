import { useNavigate, useSearchParams } from "react-router-dom";

const useRouter = () => {
  const [params, setParams] = useSearchParams();
  const push = useNavigate();
  const query = Object.fromEntries(params.entries());

  return { query, setParams, push };
};

export default useRouter;
