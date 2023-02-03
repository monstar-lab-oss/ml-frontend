const style = {
  display: "grid",
  placeContent: "center",
  height: "100vh",
};

export default function NotFound() {
  return (
    <div style={style}>
      <p>
        <b>404</b> This is not the page you are looking for.
      </p>
    </div>
  );
}
