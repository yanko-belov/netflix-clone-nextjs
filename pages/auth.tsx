import Input from "@/components/Input";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

enum VariantEnum {
  LOGIN = "login",
  REGISTER = "register",
}

type VariantType = VariantEnum.LOGIN | VariantEnum.REGISTER;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<VariantType>(VariantEnum.LOGIN);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw response;
      }
      await login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, login]);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === VariantEnum.LOGIN
        ? VariantEnum.REGISTER
        : VariantEnum.LOGIN
    );
  }, []);

  const gitHubLogin = useCallback(async () => {
    try {
      await signIn("github", {
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const googleLogin = useCallback(async () => {
    try {
      await signIn("google", {
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const isLogin = useMemo(() => variant === VariantEnum.LOGIN, [variant]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="Netflix"
            className="h-12"
            height={48}
            width={178}
          />
        </nav>
        <div className="flex justify-center">
          <div className="mt-2 w-full self-center rounded-md bg-black bg-opacity-70 p-16 lg:w-2/5 lg:max-w-md">
            <h2 className="mb-8 text-4xl font-semibold text-white">
              {isLogin ? "Login" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                value={email}
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                value={password}
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={isLogin ? login : register}
              className="mt-7 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
            <div className="mt-8 flex flex-row items-center justify-center gap-4">
              <div
                onClick={googleLogin}
                className="flex h-10 w-10 transform cursor-pointer items-center justify-center rounded-full bg-white hover:opacity-80"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={gitHubLogin}
                className="flex h-10 w-10 transform cursor-pointer items-center justify-center rounded-full bg-white hover:opacity-80"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="mt-8 text-neutral-500">
              {isLogin ? "New to Netflix?" : "Already a member?"}
              <span
                onClick={toggleVariant}
                className="ml-1 cursor-pointer text-white hover:underline"
              >
                {isLogin ? "Create account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
