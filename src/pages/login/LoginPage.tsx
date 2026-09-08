import { useSearch } from '@tanstack/react-router';
import google from '@shared/assets/google.svg';
import apple from '@shared/assets/apple.svg';
import twitter from '@shared/assets/twitter.svg';
import { useSession } from '@/entities/session';

export function LoginPage() {
  const { signIn } = useSession();
  const search = useSearch({ strict: false }) as { redirect?: string };

  const handleLogin = async () => {
    try {
      await signIn(search.redirect);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white p-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mask-[radial-gradient(ellipse_60%_50%_at_50%_40%,#000_20%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #707FDD 1px, transparent 1px),
            linear-gradient(to bottom,#707FDD 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute h-36 w-36 rounded-full bg-[#707FDD]/40 blur-2xl" />
        </div>

        <h1 className="text-[28px] font-bold tracking-tight text-slate-900">
          Welcome back
        </h1>
        <p className="mt-2 text-base text-slate-500">Please select a sign-in method</p>

        <div className="mt-8 grid w-full grid-cols-3 gap-3">
          <button
            type="button"
            className="flex h-14 items-center justify-center rounded-xl border border-slate-200/90 bg-white transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98]"
          >
            <img className="h-6 w-6" src={apple} alt="Apple icon"></img>
          </button>

          <button
            type="button"
            onClick={handleLogin}
            className="flex h-14 items-center justify-center rounded-xl border border-slate-200/90 bg-white transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98]"
          >
            <img className="h-6 w-6" src={google} alt="Google icon"></img>
          </button>

          <button
            type="button"
            className="flex h-14 items-center justify-center rounded-xl border border-slate-200/90 bg-white transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98]"
          >
            <img className="h-6 w-6" src={twitter} alt="Twitter icon"></img>
          </button>
        </div>
      </div>
    </main>
  );
}
