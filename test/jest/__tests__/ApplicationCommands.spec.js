import { mount, createLocalVue } from "@vue/test-utils";
import ApplicationCommands from "../../../src/components/ApplicationCommands.vue";
import * as All from "quasar";
const { Quasar } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

describe("Mount Quasar", () => {
  const localVue = createLocalVue();
  localVue.use(Quasar, { components });

  //const router = new VueRouter();

  const $router = {
    replace: jest.fn()
  };

  const wrapper = mount(ApplicationCommands, {
    localVue,
    mocks: { $router }
  });

  const vm = wrapper.vm;

  it("show confirmation dialog before close", async () => {
    await wrapper.find(".closeBtn").trigger("click");
    expect(wrapper.findAll(".q-ialog").length).toBe(1);
  });
});
