import { createApp } from "vue";
import VImageMagnifier from "../source/VImageMagnifier.vue";
import { mount } from "@vue/test-utils";
import plugin from "../source/index";

describe("Plugin installation", () => {
  test("registers VImageMagnifier component", () => {
    const app = createApp({});

    expect(app.component("VImageMagnifier")).toBeUndefined();

    app.use(plugin);

    expect(app.component("VImageMagnifier")).toBeDefined();
  });

  test("sets default props", () => {
    const app = createApp({});
    const options = {
      zoomSize: 20,
      deactivate: true,
    };

    app.use(plugin, options);

    const component = mount(VImageMagnifier, {
      props: {
        src: "test.jpg",
      },
    });

    expect(component.props("zoomSize")).toBe(options.zoomSize);
    expect(component.props("deactivate")).toBe(options.deactivate);
  });
});
