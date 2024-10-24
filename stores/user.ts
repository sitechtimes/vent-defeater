export const useUserStore = defineStore("userStore", () => {
  const config = useRuntimeConfig();
  const user = ref({});
  const isAuth = ref(false);

  const theme = ref<"light" | "dark">("light");
  const presentations = ref<Presentation[]>([]);
  const currentPres = ref<Presentation>();

  async function logIn(email: string, password: string) {
    const res = await fetch(config.public.backend + "/auth/login/", {
      method: "POST",
      credentials: "include",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return await res.json();
    const data = await res.json();

    isAuth.value = true;
    user.value = data.user;
    return "Success";
  }

  async function signUp(email: string, password: string, name: string) {
    const res = await fetch(config.public.backend + "auth/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password1: password, name })
    });
    if (!res.ok) return await res.json();
    return "Success";
  }

  async function init() {
    const res = await fetch(config.public.backend + "init/", {
      credentials: "include"
    });
    if (res.status !== 200) return;
    const data = await res.json();
    user.value = data.user;
    isAuth.value = true;
  }

  return { user, isAuth, init, theme, presentations, currentPres, logIn, signUp };
});
