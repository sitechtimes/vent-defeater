export const useUserStore = defineStore("userStore", () => {
  const user = ref({});
  const isAuth = ref(false);

  const theme = ref<"light" | "dark">("light");
  const presentations = ref<Presentation[]>([]);
  const currentPres = ref<Presentation>();

  async function logIn(email: string, password: string) {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/login/", {
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
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name })
    });
    if (!res.ok) return await res.json();
    return "Success";
  }

  async function init() {
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) return false;
      const data = await res.json();
      user.value = data.user;
      isAuth.value = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  return { user, isAuth, init, theme, presentations, currentPres, logIn, signUp };
});
