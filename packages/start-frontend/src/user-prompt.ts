import { group, text, select, multiselect } from "@clack/prompts";

export async function userPrompt() {
  return await group({
    dir: () =>
      text({
        message: "Please input the name of the app you are trying to create",
        initialValue: "my-app",
      }),
    modules: () =>
      multiselect({
        message: `Choose the functions you want to include in your applicaiton`,
        initialValues: ["crud", "provider.authentication", "router"],
        options: [
          {
            value: "crud",
            label: "Basic Create, Read, Update, Delete functionality",
          },
          { value: "provider.authentication", label: "Authentication" },
          { value: "provider.theme", label: "Styles and themes" },
          { value: "router", label: "Routing" },
        ],
      }),
    router: ({ results }: { results: { modules?: string[] } }) => {
      if (!results.modules?.includes("router")) return;

      return select({
        message: "Select a routing for your app",
        initialValue: "react-router",
        options: [
          { value: "react-router", label: "React router" },
          { value: "wouter", label: "Wouter" },
        ],
      });
    },
  });
}
