import VImageMagnifier from "../source/VImageMagnifier.vue";
import { shallowMount } from "@vue/test-utils";
import { expect, vi } from "vitest";

describe("VImageMagnifier", () => {
  let wrapper;
  let component;

  beforeEach(async () => {
    wrapper = shallowMount(VImageMagnifier, {
      props: {
        src: "test.jpg",
      },
    });
    component = wrapper.vm;
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("General", () => {
    test("set default data", () => {
      expect(component.zoomSize).toBe(100);
      expect(component.zoomFactor).toBe(1.8);
      expect(component.deactivate).toBeFalsy();
      expect(component.backgroundColor).toBe("#ffff");
      expect(component.cursorNone).toBeTruthy();
      expect(component.magnifiedBorderRadius).toBe(50);
      expect(component.magnifiedBorderSize).toBe(4);
      expect(component.magnifiedBorderColor).toBe("#ffff");
      expect(component.magnifiedBorderStyle).toBe("solid");
      expect(component.zIndex).toBe(99);
      expect(component.boxShadow).toBe("0 5px 10px -2px rgba(0, 0, 0, 0.5)");
      expect(component.magnifiedTransition).toBe("opacity 0.2s");
      expect(component.fitContent).toBeTruthy();
    });

    test("renders an image and magnified-img", () => {
      expect(wrapper.find("img")).toBeTruthy();
      expect(wrapper.find(".magnified-img")).toBeTruthy();
    });

    test("deactivate options is true - magnified-img should not be visible", async () => {
      await wrapper.setProps({ deactivate: true });

      expect(wrapper.find(".magnified-img").exists()).toBe(false);
    });

    test("deactivate options is true - cursor-none should not be exist on img-zoomer-box", async () => {
      await wrapper.setProps({ deactivate: true });
      expect(wrapper.classes()).not.toContain("cursor-none");
    });

    test("fitContent options is false - own-with should be exist on img-zoomer-box and fit-content not", async () => {
      await wrapper.setProps({ fitContent: false });
      expect(wrapper.classes()).not.toContain("fit-content");
      expect(wrapper.classes()).toContain("own-width");
    });

    test("fitContent options is true - fit-content should be exist on img-zoomer-box and own-width not", async () => {
      await wrapper.setProps({ fitContent: true });
      expect(wrapper.classes()).toContain("fit-content");
      expect(wrapper.classes()).not.toContain("own-width");
    });

    test("cursorNone options is true - cursor-none should be exist on img-zoomer-box", async () => {
      await wrapper.setProps({ cursorNone: true });
      expect(wrapper.classes()).toContain("cursor-none");
    });

    test("cursorNone options is false - cursor-none should not be exist on img-zoomer-box", async () => {
      await wrapper.setProps({ cursorNone: false });
      expect(wrapper.classes()).not.toContain("cursor-none");
    });

    test("setImageSize - originalHeight & originalWidth should be 100", () => {
      component.originalHeight = 0;
      component.originalWidth = 0;
      expect(component.originalHeight).toBe(0);
      expect(component.originalWidth).toBe(0);

      component.original = {
        naturalWidth: 100,
        naturalHeight: 100,
      };

      component.setImageSize();

      expect(component.originalHeight).toBe(100);
      expect(component.originalWidth).toBe(100);
    });

    test("zoomImage - deactivate props is true - should not go inside function", async () => {
      const getBoundingClientRectSpy = vi.spyOn(component.imgZoomerBox, "getBoundingClientRect");
      await wrapper.setProps({ deactivate: true });

      await wrapper.trigger("mousemove", {
        clientX: 100,
        clientY: 200,
      });

      expect(getBoundingClientRectSpy).not.toHaveBeenCalled();
      expect(component.bgPosX).toBe(0);
      expect(component.bgPosY).toBe(0);
      expect(component.leftPos).toBe(0);
      expect(component.topPos).toBe(0);
    });

    test("zoomImage - deactivate props is false ", async () => {
      const getBoundingClientRectSpy = vi.spyOn(component.imgZoomerBox, "getBoundingClientRect").mockReturnValue({
        bottom: 0,
        height: 100,
        left: 0,
        right: 0,
        top: 100,
        width: 100,
      });

      component.original = {
        naturalWidth: 120,
        naturalHeight: 120,
      };

      await wrapper.setProps({ deactivate: false });

      await wrapper.trigger("mousemove", {
        clientX: 100,
        clientY: 200,
      });

      expect(getBoundingClientRectSpy).toHaveBeenCalled();
      expect(component.bgPosX).toBe(50);
      expect(component.bgPosY).toBe(50);
      expect(component.leftPos).toBe(50);
      expect(component.topPos).toBe(50);
    });
  }),
    describe("Computed", () => {
      test("halfZoomSize - return half size of zoomSize", async () => {
        await wrapper.setProps({ zoomSize: 200 });
        expect(component.halfZoomSize).toBe(100);
      });

      test("zoomSizeCss - return px size of zoomSize ", async () => {
        await wrapper.setProps({ zoomSize: 200 });
        expect(component.zoomSizeCss).toBe("200px");
      });

      test("originalSizeCss - return px size of original size multiple by factor ", async () => {
        await wrapper.setProps({ zoomFactor: 2 });
        component.originalWidth = 100;
        component.originalHeight = 100;
        expect(component.originalSizeCss).toBe("200px 200px");
      });

      test("backgroundCss - return css options for background", async () => {
        await wrapper.setProps({ backgroundColor: "#f10f10f1" });
        expect(component.backgroundCss).toBe('url("test.jpg") no-repeat #f10f10f1');
      });

      test("borderRadiusCss - return magnifiedBorderRadius with percent", async () => {
        await wrapper.setProps({ magnifiedBorderRadius: 25 });
        expect(component.borderRadiusCss).toBe("25%");
      });

      test("borderCss - return css options for border", async () => {
        await wrapper.setProps({
          magnifiedBorderSize: 1,
          magnifiedBorderStyle: "solid",
          magnifiedBorderColor: "#f10f10f1",
        });
        expect(component.borderCss).toBe("1px solid #f10f10f1");
      });

      test("maxWidthCss - return magnifiedBorderRadius with percent", async () => {
        component.originalWidth = 100;
        expect(component.maxWidthCss).toBe("100px");
      });
    });
});
