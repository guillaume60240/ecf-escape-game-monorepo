import { mount } from "@vue/test-utils";
import LoginPage from "@/views/LoginPage.vue";

describe("LoginPage.vue", () => {
  it("renders login page", () => {
    const wrapper = mount(LoginPage);
    expect(wrapper.find("ion-title")).toBeDefined();
  });
});
