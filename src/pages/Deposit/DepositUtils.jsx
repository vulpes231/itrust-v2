const CustomSpan = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {children}
    </div>
  );
};
const CenterSpan = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

const FlexRow = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export { FlexRow, CenterSpan, CustomSpan };
