/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { range, omit, random } from "lodash";
import { shallow, mount } from "enzyme";
import SvgTestHelper from "../svg-test-helper";
import { VictoryVoronoi, Voronoi } from "victory-voronoi";
import { VictoryLabel } from "victory-core";

describe("components/victory-voronoi", () => {
  describe("default component rendering", () => {
    it("accepts user props", () => {
      const wrapper = mount(
        <VictoryVoronoi data-testid="victory-voronoi" aria-label="Chart" />
      );

      const svgNode = wrapper.find("svg").at(0).getDOMNode();
      expect(svgNode.getAttribute("data-testid")).toEqual("victory-voronoi");
      expect(svgNode.getAttribute("aria-label")).toEqual("Chart");
    });

    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(<VictoryVoronoi />);
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).toEqual("100%");
      expect(svg.prop("style").height).toEqual("100%");
    });

    it("renders an svg with the correct viewbox", () => {
      const wrapper = mount(<VictoryVoronoi />);
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).toEqual(viewBoxValue);
    });
  });

  describe("component rendering with data", () => {
    it("renders the correct d3 path", () => {
      const props = {
        width: 400,
        height: 300,
        padding: 50,
        domain: { x: [0, 5], y: [0, 5] },
        data: [
          { x: 0, y: 0 },
          { x: 2, y: 3 },
          { x: 4, y: 1 }
        ]
      };
      const wrapper = mount(<VictoryVoronoi {...props} />);

      const voronoi = wrapper.find(Voronoi);
      voronoi.forEach((node, index) => {
        SvgTestHelper.expectCorrectD3Path(node, props, "voronoi", index);
      });
    });

    it("sorts data by sortKey prop", () => {
      const data = range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      const wrapper = shallow(<VictoryVoronoi data={data} sortKey="x" />);

      const xValues = wrapper
        .find(Voronoi)
        .map((voronoi) => voronoi.prop("datum")._x);
      expect(xValues).toEqual([0, 1, 2, 3, 4]);
    });

    it("reverses sorted data with the sortOrder prop", () => {
      const data = range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      const wrapper = shallow(
        <VictoryVoronoi data={data} sortKey="x" sortOrder="descending" />
      );

      const xValues = wrapper
        .find(Voronoi)
        .map((voronoi) => voronoi.prop("datum")._x);
      expect(xValues).toEqual([4, 3, 2, 1, 0]);
    });

    it("does not render data with null x or y values", () => {
      const data = [
        { x: 1, y: 2 },
        { x: null, y: 4 },
        { x: 5, y: null }
      ];
      const wrapper = mount(<VictoryVoronoi data={data} />);
      expect(wrapper.find(Voronoi).length).toEqual(1);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryVoronoi
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const svg = wrapper.find("svg").at(0);
      svg.simulate("click");
      expect(clickHandler).toBeCalled();
      // the first argument is the standard evt object
      expect(Object.keys(clickHandler.args[0][1])).toEqual(expect.arrayContaining(["data", "scale", "width", "height", "style"]));
    });

    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryVoronoi
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const Data = wrapper.find(Voronoi);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        node.simulate("click");
        expect(clickHandler).toBeCalled();
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"])).toEqual(omit(initialProps, ["events", "key"]));
        expect(`${clickHandler.args[index][2]}`).toEqual(`${index}`);
      });
    });

    it("attaches an event to a label", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryVoronoi
          label="okay"
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const Labels = wrapper.find(VictoryLabel);
      Labels.forEach((node, index) => {
        node.childAt(0).simulate("click");
        expect(clickHandler).toBeCalled();
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).toMatchObject({ text: "okay" });
      });
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to the path area", () => {
      const wrapper = mount(<VictoryVoronoi />);
      wrapper.find("path").forEach((p) => {
        const roleValue = p.prop("role");
        if (roleValue) {
          expect(typeof roleValue).toBe("string");
          expect(roleValue).toEqual("presentation");
        }
      });
    });

    it("adds an aria-label and tabIndex to Voronoi primitive", () => {
      const data = range(3, 6).map((x) => ({ x, y: random(5) }));
      const wrapper = mount(
        <VictoryVoronoi
          data={data}
          dataComponent={
            <Voronoi
              ariaLabel={({ datum }) => `${datum.x}`}
              tabIndex={({ index }) => index + 6}
            />
          }
        />
      );
      expect(wrapper.find("path")).toHaveLength(3);
      wrapper.find("path").forEach((p, i) => {
        expect(p.prop("aria-label")).toEqual(`${data[i].x}`);
        expect(p.prop("tabIndex")).toEqual(i + 6);
      });
    });
  });
});
