import Input from "@/components/Input";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

enum VariantEnum {
  LOGIN = "login",
  REGISTER = "register",
}

type VariantType = VariantEnum.LOGIN | VariantEnum.REGISTER;

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<VariantType>(VariantEnum.LOGIN);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      await router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
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
