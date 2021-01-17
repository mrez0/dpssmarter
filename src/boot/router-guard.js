// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const currentUser = store.getters["users/getCurrentUser"];
    if (
      (!currentUser || !currentUser.dpsNumber) &&
      to.name != "splash" &&
      to.name != "login"
    ) {
      next({ name: "login" });
    } else {
      next();
    }
  });
};
