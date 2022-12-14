import React from "react";

export const Trunk = (props: { treeHeight: number }) => {
  const trunkSymbolCount =
    props.treeHeight > 2 ? Math.floor(props.treeHeight / 2 - 1) : 1;
  const trunkSymbols = "| ".repeat(trunkSymbolCount).trim();
  return <div className="trunk">{trunkSymbols}</div>;
};

const randomIntInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const Ornament = () => {
  const charEntropy = randomIntInRange(161, 255);
  const randomASCII = String.fromCharCode(charEntropy);

  const colorPalette = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4"];
  const colorEntropy = randomIntInRange(0, colorPalette.length);

  return (
    <div
      data-testID="ornament"
      className="ornament"
      style={{ color: colorPalette[colorEntropy] }}
    >
      {randomASCII}
    </div>
  );
};
export const Branch = () => {
  return <div className="branch">X</div>;
};
export const getBranchCountByMultiplier = (multiplier = 1) => {
  if (multiplier < 1) return 1;
  const branchCount = multiplier * 2 - 1;

  return branchCount;
};
type ComponentProps = React.PropsWithChildren<{
  lengthMultiplier?: number;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Section = (props: ComponentProps) => {
  const { lengthMultiplier } = props;
  const branchCount = getBranchCountByMultiplier(lengthMultiplier);
  return (
    <div data-testID="section" className={`section ${props.className}`}>
      {[...Array(branchCount)].map(() => {
        const ornamentWeight = 4;
        const entropy = randomIntInRange(1, 10);
        const hangAnOrnament = ornamentWeight > entropy;
        const isTopOfTree = branchCount === 1;
        if (!isTopOfTree && hangAnOrnament) {
          return <Ornament />;
        }
        return <Branch />;
      })}
    </div>
  );
};

export const Tree = (props: { height: number }) => {
  const { height } = props;

  return (
    <div data-testID="tree" className="tree">
      {[...Array(height || 1)].map((_, i) => {
        return (
          <Section
            lengthMultiplier={i + 1}
            className={i === 0 ? "star" : undefined}
          />
        );
      })}
      <Trunk treeHeight={height} />
    </div>
  );
};

export default Tree;
