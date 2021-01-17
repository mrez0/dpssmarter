import { mount, createLocalVue } from "@vue/test-utils";
import Splash from "../../../src/layouts/Splash.vue";
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
  jest.useFakeTimers();

  const localVue = createLocalVue();
  localVue.use(Quasar, { components }); // , lang: langEn
  //localVue.use(VueRouter); // , lang: langEn

  //const router = new VueRouter();

  const $router = {
    replace: jest.fn()
  };

  const wrapper = mount(Splash, {
    localVue,
    mocks: { $router }
  });

  const vm = wrapper.vm;

  //  it("has a created hook", () => {
  //    expect(typeof vm.increment).toBe("function");
  //  });
  //
  //  it("accesses the shallowMount", () => {
  //    expect(vm.$el.textContent).toContain("rocket muffin");
  //    expect(wrapper.text()).toContain("rocket muffin"); // easier
  //    expect(wrapper.find("p").text()).toContain("rocket muffin");
  //  });
  //
  //  it("sets the correct default data", () => {
  //    expect(typeof vm.counter).toBe("number");
  //    const defaultData2 = QBUTTON.data();
  //    expect(defaultData2.counter).toBe(0);
  //  });
  //
  //  it("correctly updates data when button is pressed", async () => {
  //    const button = wrapper.find("button");
  //    await button.trigger("click");
  //    expect(vm.counter).toBe(1);
  //  });

  it("load login after 5 seconds", () => {
    expect(true).toBe(true);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });
});
