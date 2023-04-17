const Auth = () => {
  return (
    <div className="relative -z-20 h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="absolute -z-10 h-full w-full bg-black lg:bg-opacity-50" />
      <nav className="px-12 py-5">
        <img src="/images/logo.png" alt="Netflix" className="h-12" />
      </nav>
      <div className="flex justify-center">
        <div className="mt-2 w-full self-center rounded-md bg-black bg-opacity-70 p-16 lg:w-2/5 lg:max-w-md">
          <h2 className="mb-8 text-4xl font-semibold text-white">Sign in</h2>
          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
