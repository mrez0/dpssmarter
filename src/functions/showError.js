import { Dialog, Loading } from "quasar";

export function showError(message) {
  Loading.hide();
  Dialog.create({
    title: "Error",
    message
  });
}
