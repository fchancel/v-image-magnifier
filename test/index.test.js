import { createApp } from "vue";
import VImagineMagnifier from "../source/VImageMagnifier.vue";
import { mount } from "@vue/test-utils";
import plugin from "../source/index";

describe("Plugin installation", () => {
  test("registers VImagineMagnifier component", () => {
    const app = createApp({});

    expect(app.component("VImagineMagnifier")).toBeUndefined();

    app.use(plugin);

    expect(app.component("VImagineMagnifier")).toBeDefined();
  });

  test("sets default props", () => {
    const app = createApp({});
    const options = {
      zoomSize: 20,
      deactivate: true,
    };

    app.use(plugin, options);

    const component = mount(VImagineMagnifier, {
      props: {
        src: "test.jpg",
      },
    });

    expect(component.props("zoomSize")).toBe(options.zoomSize);
    expect(component.props("deactivate")).toBe(options.deactivate);
  });
});
