import { render, screen } from "@testing-library/react";
import {
  Tree,
  Trunk,
  Branch,
  Section,
  Ornament,
  getBranchCountByMultiplier,
} from ".";

describe("Tree", () => {
  describe("Trunk", () => {
    test("return a trunk", () => {
      render(<Trunk treeHeight={1} />);
      expect(screen.getByText("|")).toBeInTheDocument();
    });
    test("return a small trunk", () => {
      render(<Trunk treeHeight={2} />);
      expect(screen.getByText("|")).toBeInTheDocument();
    });
    test("return a trunk with increased size based on height of the tree (increase by every 4 sections)", () => {
      render(<Trunk treeHeight={8} />);
      expect(screen.getByText("| | |")).toBeInTheDocument();
    });
  });
  describe("Branch", () => {
    test("return a branch", () => {
      render(<Branch />);
      expect(screen.getByText("X")).toBeInTheDocument();
    });
  });
  describe("Ornament", () => {
    beforeEach(() => {
      jest.spyOn(global.Math, "random").mockReturnValueOnce(0.12);
      jest.spyOn(global.Math, "random").mockReturnValueOnce(0.35);
      jest.spyOn(global.Math, "random").mockReturnValueOnce(0.25);
      jest.spyOn(global.Math, "random").mockReturnValueOnce(0.65);
    });
    afterEach(() => {
      jest.spyOn(global.Math, "random").mockRestore();
    });
    test("returns an ornament", () => {
      render(<Ornament />);
      expect(screen.getByTestId("ornament")).toBeInTheDocument();
    });
    test("returns a random ornament", () => {
      jest.spyOn(global.Math, "random").mockReturnValueOnce(0.12);
      jest.spyOn(global.Math, "random").mockReturnValueOnce(0.35);

      render(
        <>
          <Ornament />
          <Ornament />
        </>
      );
      const ornaments = screen.getAllByTestId("ornament");
      const ornament0 = ornaments[0].textContent;
      const ornament1 = ornaments[1].textContent;
      console.log({ ornament0, ornament1 });
      expect(ornament0).not.toBe(ornament1);
    });
  });
  describe("Section", () => {
    test("return a section with a single branch", () => {
      render(<Section />);
      const sectionElem = screen.getByTestId("section");
      expect(sectionElem.children).toHaveLength(1);
    });
    test("return a section with a number of branches based on multiplier", () => {
      render(<Section lengthMultiplier={2} />);
      const sectionElem = screen.getByTestId("section");
      expect(sectionElem.children).toHaveLength(3);
    });
    test("applies class via props", () => {
      render(<Section lengthMultiplier={2} className="star" />);
      const sectionElem = screen.getByTestId("section");
      expect(sectionElem).toHaveClass("star");
    });
  });
  describe("getBranchCountByMultiplier", () => {
    test("returns 1 if multiplier is 1 or less", () => {
      let branchCount = getBranchCountByMultiplier();
      expect(branchCount).toBe(1);
      branchCount = getBranchCountByMultiplier(0);
      expect(branchCount).toBe(1);
      branchCount = getBranchCountByMultiplier(1);
      expect(branchCount).toBe(1);
    });
    test("returns branch count of multiplier +2", () => {
      let branchCount = getBranchCountByMultiplier(2);
      expect(branchCount).toBe(3);
      branchCount = getBranchCountByMultiplier(3);
      expect(branchCount).toBe(5);
      branchCount = getBranchCountByMultiplier(6);
      expect(branchCount).toBe(11);
    });
  });
  test("return a small tree", () => {
    render(<Tree height={1} />);
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("|")).toBeInTheDocument();
  });
  test("returns a tree of height when passed in", () => {
    render(<Tree height={5} />);
    const treeElem = screen.getByTestId("tree");
    expect(treeElem.children).toHaveLength(6);
  });
  test("applies star class to the first branch", () => {
    render(<Tree height={5} />);
    const treeElem = screen.getByTestId("tree");
    expect(treeElem.children[0]).toHaveClass("star");
    expect(treeElem.children[1]).not.toHaveClass("star");
  });
});

export {};
